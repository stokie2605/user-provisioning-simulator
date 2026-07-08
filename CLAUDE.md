# CLAUDE.md

This file is lightweight project memory for AI-assisted work on User Provisioning Simulator.
It is documentation only and does not affect the application runtime.

## 1. Git Workflow

- Main branch: main
- Commit style: short, practical messages that describe the user-facing change.
- Push policy: push only after checks pass or documentation-only changes are reviewed.
- Avoid unrelated cleanup while working on a focused change.

## 2. Project Purpose

React IAM onboarding simulator that turns new-hire inputs into usernames, emails, temporary credentials, home directory paths, and department access groups.

Primary stack: React, Vite, JavaScript, deterministic IAM logic, Node test runner, GitHub Actions.

## 3. Decisions

- Keep all identity logic client-side and simulated.
- Do not connect to real Active Directory, Microsoft 365, or identity providers.
- Keep generated credentials demonstrative only.
- Prioritise deterministic mapping and testable sanitisation logic.

## 4. Session Mode

- Read this file and README.md before making non-trivial changes.
- Explain intent before multi-file edits.
- Run the relevant check command where practical: $(System.Collections.Hashtable.Check).
- Keep copy technical, plain, and recruiter-safe.
- Do not introduce secrets, real customer data, or unrelated commercial positioning.

## 5. Current State

### What got done

- Repository is part of the active portfolio set.
- README explains the project purpose and reviewer-facing evidence.
- Project memory has been added so future work starts with context.

### Where things stand

- Current positioning: React IAM onboarding simulator that turns new-hire inputs into usernames, emails, temporary credentials, home directory paths, and department access groups.
- Review command/context: $(System.Collections.Hashtable.Check).

### Next

- Clean README encoding artefacts and improve the visual preview if revisiting.

### Blocked on

- Nothing.