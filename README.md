# Pishgaman Small Business Tool (SMB_tool)

Monorepo for the Pishgaman Business Platform — a modular SaaS platform for small and medium businesses in Iran and the Middle East.

## Structure

```
SMB_tool/
├── packages/
│   ├── small-business-app/    # SBA per-tenant app (NestJS + React/Vite)
│   │   ├── backend/           # NestJS + TypeScript + PostgreSQL (TypeORM)
│   │   ├── frontend/          # React/Vite + Tailwind CSS + PEDS tokens
│   │   └── Dockerfile         # Multi-stage production build
│   ├── customer-portal/       # Customer Portal (future)
│   ├── peds/                  # PEDS component library (future)
│   └── shared/                # Shared types & utilities (future)
├── ops/                       # DevOps configs
└── docs/                      # Documentation
```

## SBA Backend

- **Framework:** NestJS 10 + TypeScript
- **Database:** PostgreSQL via TypeORM (auto-sync in dev)
- **API:** RESTful at `/api/v1`, Swagger docs at `/api/docs`
- **Health:** `GET /api/v1/health`

### Modules

- **Core:** Users, Organization Charts, Positions, Projects, Attachments, AuditLog, Settings, License
- **HR:** Personnel Profiles, Employment Info, Contracts, Amendments, Compensation, Insurance
- *(Future: Attendance, Payroll, Reports, Mobile)*

## SBA Frontend

- **Framework:** React 18 + Vite + TypeScript
- **Styling:** Tailwind CSS + PEDS Design Tokens (RTL-first)
- **Routing:** React Router v6
- **API:** Axios client proxied to backend

## Getting Started

```bash
# Backend
cd packages/small-business-app/backend
npm install
npm run start:dev

# Frontend
cd packages/small-business-app/frontend
npm install
npm run dev
```

## License

Proprietary — Pishgaman Business Platform