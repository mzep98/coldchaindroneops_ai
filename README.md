#  ColdChainDroneOps AI 

**An autonomous AI-driven drone network for climate-resilient cold-chain logistics and cryogenic asset monitoring.**

## Table of Contents
* [Problem](#problem)
* [System Architecture Prototype](#system-architecture-prototype)
* [Interactive UI Mockup](#interactive-ui-mockup)
* [Edge-AI & Sensor Integration](#edge-ai--sensor-integration)
* [Repository Structure](#repository-structure)
* [Running the Prototype](#running-the-prototype)

## Problem
During severe climate events, traditional cold-chain logistics for critical medical and agricultural supplies often fail due to structural breaches or power grid anomalies. Standard monitoring systems are reactive, alerting operators only after temperature thresholds are critically breached and assets are lost. ColdChainDroneOps solves this by deploying an autonomous drone mesh network equipped with thermal profiling and edge-AI OCR to preemptively detect frost build-up, thermal drift, and structural anomalies before they cause asset loss.

## System Architecture Prototype
This repository contains the **High-Fidelity Frontend Prototype** of the ColdChainDroneOps operator gateway. 
To ensure a modular, production-ready architecture, this project is split into two simulated layers:
1. **The Display Layer (React):** A responsive, multi-view dashboard for operators to monitor drone telemetry, thermal matrixes, and OCR scans.
2. **The Data Layer (Mock Backend):** Structured JSON payloads that simulate live edge-node sensor data.

## Interactive UI Mockup
The visual logic and user experience flow was initially designed and mapped in Figma before being translated to React.

🔗 **[Click here to view the interactive Figma Mockup](PASTE_YOUR_CLEAN_FIGMA_LINK_HERE)**

## Edge-AI & Sensor Integration
While this repository focuses on the frontend visualization, the system is designed to consume data from the following hardware/AI pipelines:
* **Thermal Profiling:** Detects anomalous thermal drift (e.g., a localized -15°C drift in a -25°C baseline zone).
* **Frost Monitor:** Identifies evaporator coil ice build-up resulting in degraded airflow velocity.
* **Edge-AI OCR Scanner:** Scans and commits batch IDs (e.g., VN-2026-99X) directly to the Warehouse Management System (WMS) without relying on stable internet.

## Repository Structure
* `/frontend`: Contains the React/JSX components for the Operator Gateway UI.
* `/data`: Contains mock JSON payloads simulating real-time telemetry from the drone nodes.

## Running the Prototype
1. Clone this repository.
2. Navigate to the `/frontend` directory.
3. Run `npm install` to install dependencies.
4. Run `npm start` (or `npm run dev`) to launch the local interface.
