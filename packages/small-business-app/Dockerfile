# --- Stage 1: Build Backend ---
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS builder
WORKDIR /app
COPY backend/SBA.sln backend/ ./
COPY backend/src/ ./src/
RUN dotnet restore && dotnet publish src/SmallBusinessApp.Api/SmallBusinessApp.Api.csproj -c Release -o /app/publish

# --- Stage 2: Build Frontend ---
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build

# --- Stage 3: Production ---
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=builder /app/publish ./
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist
ENV ASPNETCORE_URLS=http://+:3000
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/v1/health || exit 1
ENTRYPOINT ["dotnet", "SmallBusinessApp.Api.dll"]