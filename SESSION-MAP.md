# HDS Session Map & Learning Contracts

## 🔗 Session Dependency Graph

```text
01 Big Picture & Marketplace
      ↓
02 Web Backend & APIs
      ↓
03 Layered Backend Architecture
      ↓
04 Databases & Data Modeling
      ↓
05 AuthN, AuthZ & Security
      ↓
06 Order Lifecycle & State Machines
      ↓
07 Async Processing & Event Driven
      ↓
08 Redis & Real-Time Systems
      ↓
09 Geospatial Systems & PostGIS
      ↓
10 Delivery Dispatch & Matching
      ↓
11 Payments, Commissions & Settlements
      ↓
12 Reliability, Failures & Idempotency
      ↓
13 Testing & Business Rule Verification
      ↓
14 Deployment & Production Topology
      ↓
15 System Design & Architecture Synthesis
      ↓
16 AI-Assisted Software Engineering
      ↓
17 Fleetbase vs ERPNext Architecture Reading
```

---

## 🗺️ Session Contracts & Exit Criteria Map

| # | Session Title | Primary Objective | In Scope Concepts | Learner Activity | Exit Target & PASS Evidence |
|---|---|---|---|---|---|
| **01** | [HDS Big Picture & Marketplace](sessions/SESSION-01.md) | Understand HDS as a 3-sided marketplace and top-down product journey | Marketplace trade-offs, 12-step order flow, 3 operational flows, 10 domains | Trace 3 flows for COD order; map order steps to domains | Observable capability to explain 3 flows, domain boundaries, and marketplace trade-offs |
| **02** | [Web Backend & HTTP APIs](sessions/SESSION-02.md) | Understand how 3 client apps communicate with backend APIs | HTTP methods, REST paths, Headers, Status codes, Request lifecycle | Trace `POST /orders`; audit status codes & validation in AI flow | Explain request lifecycle end-to-end and identify missing validation |
| **03** | [Backend Architecture](sessions/SESSION-03.md) | Understand layered backend architecture and separation of concerns | Routes, Controllers, Services, Repositories, Fat Controller antipattern | Map order placement to 4 layers; detect layer coupling in AI code | Explain why business logic belongs in Service layer and audit AI code |
| **04** | [Databases & Data Modeling](sessions/SESSION-04.md) | Master relational data modeling, constraints, and DB transactions | PKs/FKs, 1:N / N:M relations, Foreign key constraints, ACID transactions | Model HDS entities; identify required constraints and transaction boundaries | Design relational schema for HDS order & audit missing constraints in AI ORM schemas |
| **05** | [AuthN, AuthZ & Security](sessions/SESSION-05.md) | Differentiate AuthN vs AuthZ and prevent IDOR vulnerabilities | JWTs, RBAC scopes, Resource ownership guards, IDOR prevention | Classify security flaws; audit endpoint code for missing ownership checks | Identify IDOR vulnerabilities in AI API controllers and write ownership guard logic |
| **06** | [Order Lifecycle & State Machines](sessions/SESSION-06.md) | Model Order lifecycle as a non-CRUD Finite State Machine | FSM state transitions, State guards, Transition rules, Side effects | Define state matrix for 8 order states; challenge illegal FSM transitions | Model Order as FSM with strict guards and catch illegal state transitions in AI proposals |
| **07** | [Async Processing & Events](sessions/SESSION-07.md) | Architect event-driven background flows and decouple side effects | Sync vs Async, Event Bus, Message Queues, Event Listeners | Categorize 8 tasks into Sync vs Async; map `OrderCreatedEvent` listeners | Explain why notifications/dispatch belong in async queue and design event bus flow |
| **08** | [Redis & Real-Time Systems](sessions/SESSION-08.md) | Understand Redis in-memory caching, WebSockets, and Pub/Sub | Redis Key-Value, Caching, WebSockets, Pub/Sub broadcasting | Trace GPS update from Driver app to Customer map; audit DB vs Redis usage | Explain why WebSockets & Redis are used for live tracking instead of DB polling |
| **09** | [Geospatial & PostGIS](sessions/SESSION-09.md) | Understand coordinates, spatial queries, and PostGIS indexing | Lat/Lng, Geofencing Polygons, `ST_Contains`, `ST_DWithin`, GiST Indexing | Formulate spatial availability query; audit PostGIS SQL for missing indexes | Formulate PostGIS queries for service eligibility and explain GiST index necessity |
| **10** | [Delivery Dispatch & Matching](sessions/SESSION-10.md) | Evaluate driver matching algorithms and handle concurrency | Candidate filtering, Multi-factor scoring, Atomic offers, Race conditions | Attack AI dispatch algorithm with edge cases (parallel accepts, driver load) | Evaluate logical soundness of dispatch strategy and attack AI race conditions |
| **11** | [Payments & Settlements](sessions/SESSION-11.md) | Trace multi-party financial flows, COD settlements, and ledgers | Subtotals, Platform commission, Driver fee, COD wallet debit, Immutable Ledgers | Calculate 4-way settlement for COD order with coupon; audit float rounding | Trace money flow for online & COD orders and audit double-entry ledger entries |
| **12** | [Reliability & Failure Cases](sessions/SESSION-12.md) | Reason about system failures, retries, and idempotency | Idempotency keys, Retries, Circuit breakers, Partial failure, Transactions | Perform failure analysis on payment/order flow; audit missing idempotency | Ask "What happens if this fails?" for any flow and design Idempotency Key protection |
| **13** | [Testing & Verification](sessions/SESSION-13.md) | Convert business requirements into test scenarios and audit AI tests | Unit vs Integration vs E2E, Business Invariants, Edge case tests | Write 8 test scenarios for order cancellation; audit AI Jest tests for gaps | Formulate test cases for complex business rules and identify missing edge cases in AI tests |
| **14** | [Deployment & Production](sessions/SESSION-14.md) | Understand production topology, Docker containers, and reverse proxy | Environments (Dev/Staging/Prod), Docker Compose, Nginx Proxy, Worker pool | Map HDS traffic through Nginx to Containers; audit Docker Compose security | Explain Nginx reverse proxy & worker separation and identify security risks in Docker files |
| **15** | [System Design Synthesis](sessions/SESSION-15.md) | Design high-level HDS MVP architecture and evaluate trade-offs | Monolith vs Modular Monolith vs Microservices, Single Points of Failure | Draw high-level HDS MVP topology; evaluate Modular Monolith vs Microservices | Produce high-level HDS MVP architecture diagram and defend architectural trade-offs |
| **16** | [AI-Assisted Engineering](sessions/SESSION-16.md) | Formalize complete AI collaboration, context engineering, and auditing | Golden AI workflow, Context engineering, Task specification, AI rejection | Write complete AI prompt specification for HDS worker; challenge & reject flawed AI code | Formulate precise AI task specifications and audit/reject bad AI code with reasoning |
| **17** | [Fleetbase vs ERPNext Reading](sessions/SESSION-17.md) | Read open-source architectures and evaluate feature fit for HDS | Fleetbase FleetOps vs ERPNext Frappe, Customization cost, Fit matrix | Compare Fleetbase vs ERPNext for HDS; verify AI claims against source code | Read open-source codebase architectures and verify AI claims against source code |
