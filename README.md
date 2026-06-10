# Pishgaman Business Platform

**پلتفرم کسب و کار پیشگامان**

A modular SaaS platform for small and medium businesses in Iran and the Middle East market. Handles the full employee lifecycle — HR, contracts, time & attendance, payroll, and mobile self-service — with a central Customer Portal managing subscriptions, invoicing, provisioning, and per-customer deployments.

## Repository Structure

```
SMB_tool/
├── packages/
│   ├── customer-portal/       # Customer Portal (NestJS + React/Vite)
│   │   ├── backend/           # NestJS API server
│   │   └── frontend/          # React/Vite client
│   ├── small-business-app/    # SBA per-tenant app
│   ├── peds/                  # Pishgaman Enterprise Design System
│   └── shared/                # Shared types and interfaces
├── ops/                       # DevOps: Docker, Nginx, scripts
├── docs/                      # Documentation
└── .github/workflows/         # CI/CD pipelines
```

## Customer Portal

### Backend (NestJS + TypeScript + PostgreSQL)
- **Auth**: JWT-based authentication for portal users
- **Products**: Product → Module → Permission → Limit hierarchy
- **Sales Plans**: Predefined and custom plan definitions
- **Customers**: Customer lifecycle (create, suspend, update)
- **Subscriptions**: Full lifecycle (draft → active → suspended → cancelled)
- **Invoices**: Invoice generation, approval, payment registration
- **Licenses**: License generation for SBA enforcement
- **Provisioning**: Provisioning request orchestration
- **Audit**: Full audit logging for sensitive operations
- **Notifications**: Internal notification system

### Frontend (React/Vite + Tailwind + PEDS)
- RTL-first Persian interface
- PEDS design tokens as CSS custom properties
- React Query for API state management
- React Router for navigation

## Quick Start

```bash
# Start infrastructure
cd ops
docker-compose up -d postgres redis

# Backend
cd packages/customer-portal/backend
npm install
npm run start:dev

# Frontend
cd packages/customer-portal/frontend
npm install
npm run dev
```

## API Documentation
Swagger UI available at `http://localhost:3000/api/docs`