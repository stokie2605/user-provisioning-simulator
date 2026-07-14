# IAM User Provisioning & Lifecycle Simulation Engine

An Identity & Access Management (IAM) simulation core designed to automate enterprise user onboarding, manage role-based security permissions, and audit directory group policies.

<div align="center">
  <img src="image_7e11bb.png" width="800" alt="IAM User Provisioning Simulation Interface">
</div>

---

## Operational Focus
* **The Problem:** Manual user onboarding and provisioning across diverse directory environments introduce configuration drift, permission bloat, and operational delays.
* **The Solution:** A declarative simulation engine that models secure user lifecycles and role assignments based on organizational structures and Active Directory (AD) best practices.

---

## Core Capabilities
* **Role-Based Access Control (RBAC):** Programmatically defines and enforces granular user roles, group memberships, and resource inheritance rules.
* **Automated Provisioning Pipelines:** Simulates end-to-end employee lifecycles from initial directory creation to automated de-provisioning and asset recovery.
* **Policy Drift Detection:** Scans simulated environments to flag unassigned groups, orphaned permissions, and security policy violations.
* **Directory Export Reporting:** Generates clean, structured directory logs and audit summaries to verify access compliance.

---

## 🛠️ Local Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to: `http://localhost:5173`.

---

## Recent Architectural Upgrades
* **Operational Restructuring:** Standardized repository file hierarchies by separating core automation logic, helper scripts, and test files.
* **Security Hardening:** Swapped legacy credential configs for environment variables and secure token validation policies.
* **Database Schema Upgrades:** Refactored primitive database types into native data structures for robust ORM and transaction handling.
* **Systems Maintenance:** Eradicated legacy diagnostic scripts, optimized loops, and established static analysis scanning to ensure code hygiene.
