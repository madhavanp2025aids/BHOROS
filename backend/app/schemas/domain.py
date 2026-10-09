from pydantic import BaseModel, ConfigDict
from typing import List, Optional
from datetime import datetime
from enum import Enum

class AnomalySeverity(str, Enum):
    INFO = "INFO"
    WARNING = "WARNING"
    CRITICAL = "CRITICAL"

class WellBase(BaseModel):
    name: str
    status: str
    depth: float
    reservoir_temperature: float
    reservoir_pressure: float

class WellCreate(WellBase):
    id: str

class Well(WellBase):
    id: str
    model_config = ConfigDict(from_attributes=True)

class ProductionRecordBase(BaseModel):
    oil_rate: float
    water_rate: float
    gas_rate: float

class ProductionRecord(ProductionRecordBase):
    id: int
    well_id: str
    timestamp: datetime
    model_config = ConfigDict(from_attributes=True)

class CSSCycleBase(BaseModel):
    cycle_number: int
    start_date: datetime
    steam_volume: float
    injection_pressure: float
    soak_time_days: float
    status: str

class CSSCycle(CSSCycleBase):
    id: int
    well_id: str
    model_config = ConfigDict(from_attributes=True)

class SRPRecordBase(BaseModel):
    stroke_length: float
    strokes_per_minute: float
    vfd_setting: float
    pump_efficiency: float
    rod_load: float

class SRPRecord(SRPRecordBase):
    id: int
    well_id: str
    timestamp: datetime
    model_config = ConfigDict(from_attributes=True)

class AnomalyBase(BaseModel):
    subsystem: str
    anomaly_type: str
    severity: AnomalySeverity
    detected_parameter: str
    deviation: float
    status: str
    description: str

class Anomaly(AnomalyBase):
    id: int
    well_id: str
    timestamp: datetime
    model_config = ConfigDict(from_attributes=True)

class WellState(BaseModel):
    well: Well
    latest_production: Optional[ProductionRecord]
    latest_srp: Optional[SRPRecord]
    active_css: Optional[CSSCycle]
    active_anomalies: List[Anomaly]
