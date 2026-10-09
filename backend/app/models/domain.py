from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean, Enum
from sqlalchemy.orm import relationship
import enum
import datetime
from app.core.database import Base

class AnomalySeverity(enum.Enum):
    INFO = "INFO"
    WARNING = "WARNING"
    CRITICAL = "CRITICAL"

class Well(Base):
    __tablename__ = "wells"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    status = Column(String)  # Active, Inactive, Maintenance
    depth = Column(Float)
    reservoir_temperature = Column(Float)
    reservoir_pressure = Column(Float)
    
    production_records = relationship("ProductionRecord", back_populates="well")
    css_cycles = relationship("CSSCycle", back_populates="well")
    srp_records = relationship("SRPRecord", back_populates="well")
    anomalies = relationship("Anomaly", back_populates="well")

class ProductionRecord(Base):
    __tablename__ = "production_records"

    id = Column(Integer, primary_key=True, index=True)
    well_id = Column(String, ForeignKey("wells.id"))
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    oil_rate = Column(Float)
    water_rate = Column(Float)
    gas_rate = Column(Float)
    
    well = relationship("Well", back_populates="production_records")

class CSSCycle(Base):
    __tablename__ = "css_cycles"

    id = Column(Integer, primary_key=True, index=True)
    well_id = Column(String, ForeignKey("wells.id"))
    cycle_number = Column(Integer)
    start_date = Column(DateTime)
    steam_volume = Column(Float)
    injection_pressure = Column(Float)
    soak_time_days = Column(Float)
    status = Column(String) # Injecting, Soaking, Producing, Completed
    
    well = relationship("Well", back_populates="css_cycles")

class SRPRecord(Base):
    __tablename__ = "srp_records"

    id = Column(Integer, primary_key=True, index=True)
    well_id = Column(String, ForeignKey("wells.id"))
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    stroke_length = Column(Float)
    strokes_per_minute = Column(Float)
    vfd_setting = Column(Float)
    pump_efficiency = Column(Float)
    rod_load = Column(Float)
    
    well = relationship("Well", back_populates="srp_records")

class Anomaly(Base):
    __tablename__ = "anomalies"

    id = Column(Integer, primary_key=True, index=True)
    well_id = Column(String, ForeignKey("wells.id"))
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    subsystem = Column(String) # e.g., SRP, Production, CSS
    anomaly_type = Column(String)
    severity = Column(Enum(AnomalySeverity))
    detected_parameter = Column(String)
    deviation = Column(Float)
    status = Column(String) # Active, Resolved, Ignored
    description = Column(String)
    
    well = relationship("Well", back_populates="anomalies")
