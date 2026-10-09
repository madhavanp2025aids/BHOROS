from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models import domain
from app.schemas import domain as schemas

router = APIRouter()

@router.get("/wells", response_model=List[schemas.Well])
def get_wells(db: Session = Depends(get_db)):
    wells = db.query(domain.Well).all()
    return wells

@router.get("/wells/{well_id}/state", response_model=schemas.WellState)
def get_well_state(well_id: str, db: Session = Depends(get_db)):
    well = db.query(domain.Well).filter(domain.Well.id == well_id).first()
    if not well:
        raise HTTPException(status_code=404, detail="Well not found")
        
    latest_prod = db.query(domain.ProductionRecord).filter(domain.ProductionRecord.well_id == well_id).order_by(domain.ProductionRecord.timestamp.desc()).first()
    latest_srp = db.query(domain.SRPRecord).filter(domain.SRPRecord.well_id == well_id).order_by(domain.SRPRecord.timestamp.desc()).first()
    active_css = db.query(domain.CSSCycle).filter(domain.CSSCycle.well_id == well_id).order_by(domain.CSSCycle.start_date.desc()).first()
    anomalies = db.query(domain.Anomaly).filter(domain.Anomaly.well_id == well_id, domain.Anomaly.status == "Active").all()
    
    return schemas.WellState(
        well=well,
        latest_production=latest_prod,
        latest_srp=latest_srp,
        active_css=active_css,
        active_anomalies=anomalies
    )

@router.get("/anomalies", response_model=List[schemas.Anomaly])
def get_anomalies(db: Session = Depends(get_db)):
    anomalies = db.query(domain.Anomaly).filter(domain.Anomaly.status == "Active").all()
    return anomalies
