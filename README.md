# IT Corporate User Provisioning Simulator

Built by Dean Wilshaw.

IT Corporate User Provisioning Simulator is a React-based Identity and Access Management demo that models employee onboarding logic for Active Directory-style environments. It transforms new-hire input into standardized usernames, corporate email addresses, temporary credentials, home directory paths, and department-specific security group assignments.

The project demonstrates practical IAM automation thinking in a safe frontend environment: input sanitization, deterministic identity generation, role-based access mapping, and instant provisioning output for technician review.

### Visual Output / Preview

![User Provisioning Dashboard](image_7e11bb.png)

```text
┌─────────────────────────┬──────────────────────────────────────────────┐
│ Provisioning Field      │ Generated Example                            │
├─────────────────────────┼──────────────────────────────────────────────┤
│ sAMAccountName          │ jsmith                                       │
│ User Principal Name     │ john.smith@corporate-it.com                  │
│ Home Directory          │ \\corp-storage\home\jsmith                   │
│ Base Groups             │ Domain Users, Corporate-VPN-Access           │
│ Department Groups       │ IT-ServiceDesk-Tier1, Local-Admins           │
└─────────────────────────┴──────────────────────────────────────────────┘
```

### Frontend Architecture & IAM Logic

- **Client-side workflow:** The simulator keeps all provisioning logic in React state so the demo is safe, repeatable, and does not touch real directory services.
- **Input sanitization:** First and last names are trimmed, lowercased, and cleaned with `/[^a-z0-9]/g` to prevent symbols from breaking account naming rules.
- **Username generation:** The app builds a `sAMAccountName` pattern from first initial plus sanitized surname, such as `jsmith`.
- **UPN/email standardization:** Sanitized names are combined into `firstname.lastname@corporate-it.com`.
- **Temporary credential generation:** A random password is generated from a controlled character pool and finished with complexity characters.
- **Home directory mapping:** Each user receives a simulated network path in the format `\\corp-storage\home\username`.
- **Department access model:** Department selection maps users into base access groups plus role-specific Active Directory security groups.

## The Business Problem

New employee onboarding requires consistent identity data, correct group membership, and clean handover evidence. Manual account creation can introduce naming mistakes, missing access groups, weak temporary credentials, or inconsistent home folder paths.

Common operational problems include:

- Names with apostrophes, spaces, or symbols can break directory naming rules.
- Usernames and email addresses may be generated inconsistently between technicians.
- Security group membership is often copied manually from previous users.
- Temporary credentials need predictable complexity without being reused.
- Home directory paths must follow a standard storage convention.
- Service desk teams need a safe way to demonstrate onboarding logic without using a real domain controller.

## The Solution & Architecture

The app models a deterministic onboarding pipeline:

```text
New Hire Form
     |
     v
Input Sanitization
     |
     +--> sAMAccountName Generation
     |
     +--> Corporate UPN / Email Generation
     |
     +--> Temporary Password Generation
     |
     +--> Department Security Group Mapping
     |
     v
Provisioned Account Summary
```

## Department Group Mapping

```text
IT Support
  Domain Users
  Corporate-VPN-Access
  IT-ServiceDesk-Tier1
  Local-Admins
  M365-Global-Reader

Finance
  Domain Users
  Corporate-VPN-Access
  Finance-SAGE-Access
  Payroll-Folder-ReadWrite
  BACS-Transfer-Users

Human Resources
  Domain Users
  Corporate-VPN-Access
  HR-Personnel-Records
  Confidential-Salary-View
  Onboarding-SLA-Managers

Operations / Warehouse
  Domain Users
  Corporate-VPN-Access
  Warehouse-WMS-Cloud
  Inventory-Audit-Users
  Logistics-Distribution-Group
```

## Technical Toolkit

- React
- Vite
- JavaScript
- React hooks
- Regex-based input sanitization
- Role-based access mapping
- Browser-based IAM simulation UI

## Local Execution Setup

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Production Readiness Notes

- Move provisioning rules into a tested service layer before connecting to real directory APIs.
- Add validation for duplicate usernames and reserved account names.
- Add approval workflows for privileged groups such as local administrators.
- Add audit logging for generated accounts and access decisions.
- Add export support for CSV, JSON, or ticketing-system handoff.
- Add unit tests for sanitization, department mapping, and password complexity rules.
