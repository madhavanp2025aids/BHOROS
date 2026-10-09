import datetime
import random
from sqlalchemy.orm import Session
from app.core.database import engine, Base, SessionLocal
from app.models import domain

def init_db():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    # Check if we already seeded
    if db.query(domain.Well).first():
        print("Database already seeded.")
        db.close()
        return

    print("Seeding database with Baghewala demo data...")

    # 1. Create Wells
    well_1 = domain.Well(
        id="BW-101",
        name="Baghewala-101",
        status="Active",
        depth=2060.5,
        reservoir_temperature=55.0,
        reservoir_pressure=120.0
    )
    well_2 = domain.Well(
        id="BW-102",
        name="Baghewala-102",
        status="Active",
        depth=2100.0,
        reservoir_temperature=52.0,
        reservoir_pressure=115.0
    )
    db.add(well_1)
    db.add(well_2)
    db.commit()

    # 2. Add some Production Records for BW-101 (last 7 days)
    now = datetime.datetime.utcnow()
    for i in range(7):
        date = now - datetime.timedelta(days=7-i)
        # Introduce a decline anomaly in the last 2 days
        base_rate = 85.0 if i < 5 else 60.0 - (i-5)*5.0
        
        pr = domain.ProductionRecord(
            well_id="BW-101",
            timestamp=date,
            oil_rate=base_rate + random.uniform(-2, 2),
            water_rate=20.0 + random.uniform(-1, 1),
            gas_rate=5.0
        )
        db.add(pr)

    # 3. Add CSS Cycle for BW-101
    css = domain.CSSCycle(
        well_id="BW-101",
        cycle_number=3,
        start_date=now - datetime.timedelta(days=30),
        steam_volume=1500.0,
        injection_pressure=85.0,
        soak_time_days=7.0,
        status="Producing"
    )
    db.add(css)

    # 4. Add SRP Records for BW-101
    # Introduce pump efficiency decline matching production decline
    for i in range(7):
        date = now - datetime.timedelta(days=7-i)
        efficiency = 0.82 if i < 5 else 0.65 - (i-5)*0.05
        
        srp = domain.SRPRecord(
            well_id="BW-101",
            timestamp=date,
            stroke_length=3.5,
            strokes_per_minute=5.0,
            vfd_setting=45.0,
            pump_efficiency=efficiency,
            rod_load=4000.0 + random.uniform(-100, 100)
        )
        db.add(srp)

    # 5. Add Anomaly for BW-101
    anomaly = domain.Anomaly(
        well_id="BW-101",
        timestamp=now - datetime.timedelta(days=1),
        subsystem="SRP",
        anomaly_type="Pump Efficiency Decline",
        severity=domain.AnomalySeverity.WARNING,
        detected_parameter="pump_efficiency",
        deviation=-18.5,
        status="Active",
        description="Pump efficiency dropped below 70% accompanied by a decline in production rate. Possible gas interference or wear."
    )
    db.add(anomaly)

    db.commit()
    db.close()
    print("Seeding complete.")

if __name__ == "__main__":
    init_db()
