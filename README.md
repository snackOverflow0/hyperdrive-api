# 🚀 HyperDrive API — RideShare & Delivery Logistics Engine

HyperDrive is a high-performance, production-ready backend logistics engine built with **NestJS**, **TypeScript**, and **Prisma ORM**, backed by a relational **PostgreSQL** database. 

The architecture is explicitly designed to handle real-time transportation logistics workflows, strict multi-tenant profile isolation (Riders vs. Drivers), data payload sanitization, cryptographic session tracking, and transactional state-machine transitions.

---

## 🏗️ Architectural Core Features

* **Strict Security Gatekeepers:** Global `ValidationPipe` enforcement that strips malicious incoming payloads and automatically transforms network types.
* **Unified Identity Blueprint:** A decoupled user mapping schema that separates lightweight core credentials from heavy compliance-driven `DriverProfile` and `Vehicle` data structures.
* **Atomic State Machine:** Robust `PATCH` transition routes handling trip cycles (`REQUESTED` ➔ `ACCEPTED` ➔ `IN_TRANSIT` ➔ `COMPLETED`) configured with strict concurrency protection layers to eliminate race conditions.
* **Enterprise Pagination & Filtering:** A high-speed driver dispatch query engine optimized with Prisma `$transaction` blocks to calculate data offsets and total item configurations concurrently.
* **Sanitized File Interceptors:** A secure binary media processing pipeline utilizing `Multer` disk storage bounded by aggressive file-type filters and rigid physical size limits (2MB max).
* **Static Asset Delivery:** Integrated static directory mapping allowing immediate localized public access rendering of uploaded user assets.

---

## 🛠️ Tech Stack & Dependecies

* **Framework:** NestJS (v10+)
* **Language:** TypeScript (Strict Null Checks enabled)
* **Database abstraction:** Prisma ORM
* **Database Engine:** PostgreSQL
* **Security & Encryption:** Bcrypt, Passport JWT, JSONWebTokens
* **File Streaming Engine:** Multer

---

## 📁 System Folder Directory Structure

```text
src/
├── app.module.ts            # Root orchestrator initializing configs & modules
├── main.ts                  # Application entry point & global filter configuration
├── prisma/
│   ├── prisma.module.ts     # Global wrapper exposing database context
│   └── prisma.service.ts    # Live connection pool lifecycle manager
├── auth/
│   ├── dto/                 # Input sanitization and payload constraint rules
│   ├── jwt.strategy.ts      # Passport cryptographic verification extraction hook
│   ├── auth.controller.ts   # Network routers for user login and onboarding
│   ├── auth.service.ts      # Encryption, verification, and hash compare routines
│   └── auth.module.ts       # Async JWT token module factory injection
├── trips/
│   ├── dto/                 # Geometric constraints & pagination parameters
│   ├── trips.controller.ts  # State transition routes & dispatcher board endpoints
│   └── trips.service.ts     # Transactional multi-row update algorithms
└── storage/
    ├── utils/               # Multer file size ceilings & format filters
    ├── storage.controller.ts# Binary multipart upload interceptor pipeline
    └── storage.module.ts    # File system encapsulation orchestrator
⚙️ Quick Start Installation & Local Setup1. Clone & Install DependenciesEnsure your local environment has Node.js (v18+) and a running instance of PostgreSQL.Bash# Install core and framework development tools
npm install
2. Configure Environment PropertiesCreate a .env file in your project's absolute root and feed your parameters:Code snippetDATABASE_URL="postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/hyperdrive_db?schema=public"
JWT_SECRET="hyperdrive_super_secret_signing_key_2026"
JWT_EXPIRES_IN="15m"
3. Initialize Database TablesRun your migrations to compile schemas directly onto your local PostgreSQL cluster:Bashnpx prisma migrate dev --name init_logistics_infrastructure
4. Fire Up the Watch EngineBash# Start local microservices in development watch mode
npm run start:dev

The server will boot and bind to: http://localhost:3000/api/v1📡 

Essential Core API EndpointsAll base endpoints are routed through the /api/v1 versioning namespace.

🔐 Authentication 
Context Method Endpoint Payload Constraints Access Level Description
POST/auth/registerRegisterDto (JSON)PublicOnboards a Client or Driver profilePOST/auth/loginLoginDto (JSON)PublicEvaluates hashes & returns a JWTGET/auth/profile-testNoneBearer TokenValidates session passport credentials🚗 Trip & Dispatch LogisticsMethodEndpointQuery / Body ParametersAccess LevelDescriptionPOST/tripsCreateTripDto (JSON)Bearer TokenRequests an open ride queue entryGET/trips/available?page=1&limit=10&pickupSearch=textBearer TokenFetches paginated unassigned requestsPATCH/trips/:id/acceptURL Param :idBearer: DRIVERClaims ride; shifts state atomicallyPATCH/trips/:id/cancelURL Param :idBearer TokenTerminates ride if state permits📁 Media Asset StorageMethodEndpointPayload ConstraintsAccess LevelDescriptionPOST/storage/upload-avatarmultipart/form-data (avatar file)Bearer TokenEncrypts name, writes file, updates User rowGET/uploads/avatars/:nameURL Param filenamePublic