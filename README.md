# ColdChain Drone-Ops

**An autonomous, zero-GPS sub-zero warehouse auditing infrastructure and companion companion Android-based monitoring gateway for climate-resilient logistics.**

## Table of Contents
* [Problem Landscape](#problem-landscape)
* [System Architecture & Innovation](#system-architecture--innovation)
* [High-Fidelity Android Interface UI](#high-fidelity-android-interface-ui)
* [Technical Specifications](#technical-specifications)
* [Repository Structure](#repository-structure)
* [Running the Frontend Prototype](#running-the-frontend-prototype)

---

## Problem Landscape
Vietnam's rising status as a premier agricultural exporter and biopharmaceutical hub has generated an acute infrastructure bottleneck, resulting in an estimated shortage of 400,000 square meters of cold storage space. Existing facilities satisfy only 30–35% of total market demand, forcing warehouse operators to maximize volume via dense, multi-tier vertical racking systems. 

This extreme asset utilization leads to critical operational failures:
* **Thermal Anomalies:** Undetected insulation breaches and structural heat leaks in dense racks.
* **Inventory Decay:** Delayed inventory updates, missing product batches, and regulatory noncompliance.
* **High Operational Cost:** Soaring electricity tariffs paired with micro-climate anomalies like frost over-accumulation.

ColdChain Drone-Ops addresses these systemic inefficiencies, contributing to a framework that aligns with **Decision No. 2229/QD-TTg** for the digital transformation of 80% of logistics enterprises by 2035.

---

## System Architecture & Innovation
ColdChain Drone-Ops bridges the gap between rugged edge-hardware and predictive logistics analytics through a dual-layer approach:

1. **Autonomous Cryogenic Fleet:** Drone nodes running localized **Visual SLAM** and Ultra-Wideband (UWB) positioning for structural navigation in zero-GPS, "lights-out" sub-zero (-25°C) environments.
2. **Android Operator Gateway:** A high-fidelity mobile application utilizing a **Stacked Ensemble Classifier** to process edge telemetry, predict packaging failures, and visualize real-time localized environmental tracking.

---

## High-Fidelity Android Interface UI
The frontend system mimics a five-frame smartphone deployment pipeline, mapping the core edge-AI capabilities directly onto the operator UI:
* **Distributed Multi-Zone Thermal Profiling:** Real-time 3D micro-climate heat maps displaying localized insulation anomalies.
* **Frost & Ice Over-Accumulation Detection:** Live regional oversight of evaporator coil status across fragmented storage nodes.
* **AI Expiry & Batch-Code OCR Reader:** Autonomous string translation of heavily frosted labels to meet export compliance.
* **Intelligent Sealed-Packaging Breach Analysis:** Active computer vision flagging torn wrapping and physical structural damage on vertical tiers.
* **Zero-GPS Sub-Zero Visual SLAM Navigation:** Spatial tracking loops plotting empty storage slots in total darkness.

🔗 **[Click here to view the interactive Figma Mockup](PASTE_YOUR_CLEAN_FIGMA_LINK_HERE)**

---

## Technical Specifications

### Hardware Architecture (Cryogenic Edge-Nodes)
* **Thermal-Sealed Chassis:** Aerogel-lined carbon fiber casing designed to trap processor heat and mitigate condensation during extreme temperature shifts.
* **Smart-Heat Power:** Self-heating LiPo battery arrays preventing deep-freeze voltage drops to sustain a stable 25-minute flight profile.
* **Cryogenic Vision Payload:** Integrated dual-sensor module with active anti-frost lens heaters containing:
  * *Radiometric Thermal Camera:* Pixel-by-pixel thermal gradient evaluation.
  * *4K Global Shutter Camera & LED Array:* Synchronized flash tracking for rapid high-speed OCR capture in dark environments.
* **Local Data-Fusion Transceiver:** Industrial dual-band Wi-Fi module streaming data directly via local network protocols, bypassing cloud latency.

### Software & Analytics Pipeline (Frontend/Mock Backend)
* **Edge-AI Core:** Simulated text mapping from the global shutter camera for frosted label decoding.
* **Predictive Layer:** Stacked Ensemble Classifier templates predicting package degradation based on localized humidity and thermal indices.

---

## Repository Structure
```text
├── data/
│   └── telemetry_mock.json       # Mock backend payload tracking -25°C multi-tier sensor nodes
└── frontend/
    └── App.jsx                   # High-fidelity React Native/Android UI gateway code
