# 🛢️ BHOROS | Subsurface Telemetry & Digital Twin Platform

[![Telemetry Status](https://img.shields.io/badge/Telemetry-100Hz_Live_RT-0284c7?style=flat-square)](http://localhost:3000/index.html)
[![Digital Twin](https://img.shields.io/badge/Digital_Twin-3D_WebGL_Bathymetric-16a34a?style=flat-square)](http://localhost:3000/well-3d.html)
[![SCADA Platform](https://img.shields.io/badge/SCADA-Sucker_Rod_Pump_Optimized-ea580c?style=flat-square)](http://localhost:3000/index.html)

**BHOROS** is a next-generation Oilfield Telemetry, Subsurface Digital Twin, and Sucker Rod Pump (SRP) AI Optimization SCADA platform.

---

## 🌟 Key Features & Architecture

### 1. 🎛️ Real-Time SCADA Telemetry & Dynamic Instruments
- **Dynamic Downhole Pressure Stream (60s Continuous)**: Multi-frequency, non-linear physical pressure wave generator simulating casing pulses, fluid shear turbulence, and valve seating acoustics across varied crest heights.
- **Dynamic 60fps Radial Gauges**: Real-time kinematic synchronization of **Rod Load (kN)** (sweeping with polished rod kinematics between MPRL ~21 kN and PPRL ~74 kN), **Casing Head Pressure (bar)**, and **Bottomhole Temperature (°C)**.

### 2. 🌐 3D Bathymetric Subsurface Digital Twin (`well-3d.html`)
- **Three.js WebGL 3D Visualization**: Complete well trajectory from Surface Wellhead (0m) to Payzone Toe (2,060m TD).
- **Bathymetric Strata Relief**: Geological strata layers (Overburden Shale, Evaporite Caprock, Wolfcamp Limestone, Payzone Sandstone) with depth isolines.
- **5,300+ Multi-Layer Fluid Streamlines**:
  - Porous payzone rock matrix seepage.
  - 16 active casing perforation jet bursts.
  - High-velocity helical tubing core streams.
  - Surface flowline discharge to production gathering manifolds.
- **Reciprocating Surface Pumpjack**: Walking beam, samson post, horsehead, and polished rod string moving in 3D sync.
- **Dynamic Stroke Frequency (SPM) Coupling**: Fluid velocity, production rate (BOPD), rod tension, and drawdown scale proportionally in real time with stroke frequency.

### 3. 🧠 Anomaly Detection & AI Optimization
- **FFT Vibration Spectrum Analyzer**: 48-channel harmonic spectrum identifying downhole pump cavitation and gas interference.
- **Interactive Pareto Frontier Optimizer**: Real-time Monte-Carlo simulation (2,400 runs) computing optimal setpoint vectors $u^*$ (SPM & Choke) with net financial gain estimations.
- **CSS Steam Cycle Heat Diffusion**: Radial thermodynamic thermal plume mesh simulation.
- **Dynacard Surface & Downhole Load Analysis**: Goodman fatigue limits and continuous stroke position tracking.

---

## 🚀 Getting Started

### Prerequisites
- Any modern web browser with WebGL support (Chrome, Edge, Firefox, Safari).
- Python 3 / Node.js (or any static HTTP server).

### Running Locally
```bash
# Clone the repository
git clone https://github.com/jeyanthj2025aids-png/BOHROS-.git

# Navigate into the project folder
cd BOHROS-

# Start local server
python -m http.server 3000
```

Open your browser and navigate to:
- **Main SCADA Telemetry Suite**: [`http://localhost:3000/index.html`](http://localhost:3000/index.html)
- **3D Bathymetric Digital Twin**: [`http://localhost:3000/well-3d.html`](http://localhost:3000/well-3d.html)

---

## 📁 Repository Structure
```
BOHORUS/
├── index.html       # Primary SPA SCADA Platform (7 integrated telemetry views + left sidebar)
├── well-3d.html     # Dedicated 3D WebGL Bathymetric Subsurface & Fluid Flow Digital Twin
├── live-well.html   # Live Well State View
├── alerts.html      # Anomaly Alerts & FFT Spectrum View
├── optimize.html    # AI Optimization & Pareto Frontier Simulation
├── css-cycle.html   # Cyclic Steam Stimulation Heat Mesh Tracker
├── dynamo.html      # SRP Dynamometer Dynacard View
├── history.html     # Historical Telemetry & Wellbore Trajectory
├── debug.html       # Calibration & 500-Point Physics Residual View
└── README.md        # Project Documentation
```

---

## 🛠️ Technology Stack
- **Rendering**: Vanilla HTML5, Vanilla JavaScript (ES6+), Canvas 2D API, WebGL (Three.js r128).
- **Styling**: Vanilla CSS, Tailwind CSS.
- **Typography & Icons**: IBM Plex Mono, IBM Plex Sans, Google Material Symbols.
