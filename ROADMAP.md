# HDS Software Engineering Curriculum Roadmap

This document defines the 2-Day intensive curriculum for the Hyperlocal Delivery System (HDS) software engineering path.

---

## ☀️ DAY 1 — Backend & System Foundations

### Session 01 — Software Engineering & System Thinking
* **Topics:** Engineering vs. Coding, Functional/Non-Functional Requirements, Actors, Business Rules, System Boundaries, Trade-offs.
* **HDS Focus:** Identify major actors (Customer, Merchant, Driver, Admin) and core domains.

### Session 02 — How the Web Backend Works
* **Topics:** Client/Server, HTTP Protocol, REST APIs, JSON, Request/Response Lifecycle, Status Codes, API Boundaries.
* **HDS Focus:** End-to-end trace of `POST /orders` from PWA to DB and back.

### Session 03 — Backend Architecture
* **Topics:** Layered Architecture (Routes → Controllers → Services → Repositories → DB), Separation of Concerns, Middleware, Error Boundaries.
* **HDS Focus:** Design layered architecture for Order Creation & Dispatch.

### Session 04 — Databases & Data Modeling
* **Topics:** Relational DBs (PostgreSQL), Tables, Foreign Keys, One-to-Many / Many-to-Many, Indexes, Transactions, ACID basics.
* **HDS Focus:** Entity relationships for Users, Merchants, Products, Orders, Drivers, Deliveries, Payments, Settlements.

### Session 05 — Authentication, Authorization & Security Basics
* **Topics:** AuthN vs. AuthZ, JWTs, Sessions, Password Hashing, RBAC, Resource Ownership, API Security.
* **HDS Focus:** Multi-actor access control scenarios across Customer, Merchant, Driver, Admin.

### Session 06 — Orders, Business Logic & State Machines
* **Topics:** Domain States, Transitions, Pre/Postconditions, Invariants, Edge Cases, Idempotency.
* **HDS Focus:** Full Order Lifecycle (`PENDING` → `MERCHANT_ACCEPTED` → `DRIVER_ASSIGNED` → `PICKED_UP` → `OUT_FOR_DELIVERY` → `DELIVERED`).

---

## 🌙 DAY 2 — HDS Core Systems & Architectural Evaluation

### Session 07 — Async Processing & Event-Driven Thinking
* **Topics:** Sync vs. Async, Events, Message Queues, Pub/Sub, Background Jobs, Retry Logic, Failure Isolation.
* **HDS Focus:** Event-driven architecture for `OrderCreated` side-effects.

### Session 08 — Redis & Real-Time Systems
* **Topics:** Redis Cache & Pub/Sub, WebSockets, Real-time Events, Connection Lifecycles, Presence Tracking.
* **HDS Focus:** Live Driver GPS updates and real-time customer tracking.

### Session 09 — Geospatial Systems & PostGIS
* **Topics:** Coordinates, Distance Metrics, Radius Search, Geofencing, Spatial Indexes, PostGIS.
* **HDS Focus:** Service area checking, nearby driver queries, merchant zones.

### Session 10 — Delivery Dispatch & Driver Matching
* **Topics:** Candidate Filtering, Scoring Algorithms, Ranking, Offer/Accept Workflow, Race Conditions in Dispatch.
* **HDS Focus:** Multi-factor driver matching strategy (Distance, Workload, Rating, Availability).

### Session 11 — Payments, Commissions & Settlements
* **Topics:** Order Totals, Delivery Fees, Platform Commission, Merchant Settlements, Driver Earnings, Refunds, COD, Ledgers.
* **HDS Focus:** Money flow calculations and multi-party financial reconciliation.

### Session 12 — Reliability, Failure Cases & Distributed Systems
* **Topics:** Timeouts, Retries, Idempotency, Race Conditions, Partial Failures, Observability, Rate Limiting.
* **HDS Focus:** Edge-case failure modes (network loss, double-accepts, DB outages).

### Session 13 — Testing & Verification
* **Topics:** Unit, Integration, and E2E Testing, Test Cases for Business Rules, Auditing AI-generated Tests.
* **HDS Focus:** Formulating test scenarios for dispatch matching and order state transitions.

### Session 14 — Deployment & Production Architecture
* **Topics:** Dev vs. Prod, Environment Variables, Docker/Compose, Reverse Proxies (Nginx), HTTPS, CI/CD, Logs.
* **HDS Focus:** Infrastructure topology diagramming for HDS.

### Session 15 — System Design & Architecture Synthesis
* **Topics:** Monolith vs. Modular Monolith vs. Microservices, Caching, Bottlenecks, Trade-off Analysis.
* **HDS Focus:** Designing the high-level MVP system architecture for HDS.

### Session 16 — AI-Assisted Software Engineering
* **Topics:** AI as implementation partner, Context Engineering, Prompt Strategy, Task Decomposition, Code/Security Audits.
* **HDS Focus:** Establishing the AI-Agent collaboration workflow (`Understand` → `Specify` → `Design` → `Ask AI` → `Review` → `Test`).

### Session 17 — Fleetbase & ERPNext Architecture Reading
* **Topics:** Deep-dive architectural comparison of Fleetbase (FleetOps/Storefront/Navigator) vs. ERPNext (Frappe/Webshop/POS).
* **HDS Focus:** Preparing the learner to evaluate open-source foundations for HDS.

---

## 🏆 Final 2-Day Assessment
Complete evaluation across 30 core system questions covering Understanding, Backend, DB, Security, Realtime, Geospatial, Dispatch, Finance, Reliability, AI, and System Architecture.
