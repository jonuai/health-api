# Service Health & Incident Tracker

A containerized backend service for tracking application health status and operational incidents.  
Designed as a **2-tier architecture** using Node.js, PostgreSQL, and Docker Compose, with a focus on **real-world container lifecycle debugging, service networking, and persistence**.

This project simulates an **internal operations tool** commonly used by platform or DevOps teams.

---

## Architecture Overview

This application follows a **2-tier architecture**:

1. **Application Tier**
   - Node.js + Express API
   - Handles health pings and incident records
   - Runs as a containerized service

2. **Data Tier**
   - PostgreSQL database
   - Runs in a separate container
   - Uses a Docker named volume for persistence

Containers communicate over Docker’s internal network using service discovery.

---

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** PostgreSQL
- **Containerization:** Docker, Docker Compose
- **Configuration:** Environment variables
- **Persistence:** Docker named volumes

---

## Project Structure
service-health-api/
├── src/
│ ├── server.js # App startup and lifecycle management
│ ├── db.js # PostgreSQL connection pool
│ ├── routes.js # API routes
│ └── migrate.js # Startup database migration
├── package.json
├── Dockerfile
├── docker-compose.yml
├── .env
└── README.md


---

## Environment Configuration

The application is fully environment-driven.

`.env` file:



> **Important:**  
> `DB_HOST` must be set to the Docker Compose service name (`db`), not `localhost`.  
> Containers do not share localhost.

---

## API Endpoints

### Record Service Health
**POST** `/health/ping`

```json
{
  "service_name": "auth-service",
  "status": "UP",
  "message": "Healthy"
}
Get Recent Health Status

GET /health/status

Returns the latest recorded health entries.
Create Incident

POST /incidents
{
  "service_name": "auth-service",
  "description": "Database latency spike"
}

List Incidents

GET /incidents

Returns all recorded incidents.

Running the Application
Builddocker compose build --no-cache
docker compose up
Verify containers
docker ps
Both api and db containers should be in Up state.

 Verifying Application Health
Check logs
docker logs api-1
Starting Service Health API...
Database migrated
API running on port 5000
Test API
curl -X POST http://localhost:5000/health/ping \
  -H "Content-Type: application/json" \
  -d '{"service_name":"auth","status":"UP"}'

curl http://localhost:5000/health/status

Database Persistence
PostgreSQL data is stored using a Docker named volume:
volumes:
  pgdata:
This ensures:

Data survives container restarts

Database container can be safely recreated
docker exec -it db-1 psql -U username -d dbname 
SELECT * FROM service_health;

Common Failure Scenarios (Learning Focus)

This project intentionally exposed real-world issues such as:

Container exiting with code 1 due to startup failures

Database not ready when application starts

Misconfigured environment variables

Incorrect hostname resolution (localhost vs Docker service name)

Application process crashes causing container restarts

Each issue was diagnosed using:

docker ps

docker logs

Environment inspection

Service-level reasoning
Key Learnings

Containers are disposable; data is not

Logs are the primary debugging signal

Service discovery in Docker uses service names

depends_on does not guarantee service readiness

Configuration errors are a common cause of production outages
