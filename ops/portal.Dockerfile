# --- Stage 1: Build ---
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS builder
WORKDIR /app

# Copy solution and project files
COPY src/Pishgaman.sln .
COPY src/Shared/Shared.Kernel/*.csproj Shared/Shared.Kernel/
COPY src/Shared/Shared.Security/*.csproj Shared/Shared.Security/
COPY src/Domain/Domain.Portal/*.csproj Domain/Domain.Portal/
COPY src/CustomerPortal/CustomerPortal.Api/*.csproj CustomerPortal/CustomerPortal.Api/

# Restore
RUN dotnet restore CustomerPortal/CustomerPortal.Api/CustomerPortal.Api.csproj

# Copy all source
COPY src/ .

# Build and publish
WORKDIR /app/CustomerPortal/CustomerPortal.Api
RUN dotnet publish -c Release -o /app/publish

# --- Stage 2: Runtime ---
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=builder /app/publish .

ENV ASPNETCORE_ENVIRONMENT=Production
ENV ASPNETCORE_URLS=http://0.0.0.0:3000

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:3000/health || exit 1

ENTRYPOINT ["dotnet", "CustomerPortal.Api.dll"]