# Pishgaman Business Platform

**پلتفرم کسب و کار پیشگامان**

A modular SaaS platform for small and medium businesses in Iran and the Middle East. Central Customer Portal managing subscriptions, invoicing, provisioning, and per-customer deployments.

## Repository Structure

```
SMB_tool/
├── src/                            # .NET Backend
│   ├── CustomerPortal/
│   │   └── CustomerPortal.Api/     # ASP.NET Core 9 Web API
│   ├── Domain/
│   │   └── Domain.Portal/          # Portal domain entities
│   └── Shared/
│       ├── Shared.Kernel/          # BaseEntity, audit fields
│       └── Shared.Security/        # JWT, RBAC (future)
├── packages/
│   └── customer-portal/
│       └── frontend/               # React/Vite + Tailwind + PEDS
├── ops/                            # DevOps: Docker, Nginx, scripts
└── docs/                           # Documentation
```

## Tech Stack
- **Backend**: C# ASP.NET Core (.NET 9) with EF Core + PostgreSQL
- **Frontend**: React 18 + Vite + Tailwind CSS + PEDS tokens
- **Auth**: JWT-based authentication
- **Database**: PostgreSQL 16

## Quick Start

```bash
# Backend
cd src/CustomerPortal/CustomerPortal.Api
dotnet run

# Frontend
cd packages/customer-portal/frontend
npm install && npm run dev

# Infrastructure
cd ops
docker-compose up -d postgres redis
```

## API Documentation
Swagger UI at `http://localhost:5000/swagger` (dev) or `/api/docs`