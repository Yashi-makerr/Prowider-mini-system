# Provider Mini System

A scalable Mini Lead Distribution System built using Next.js, TypeScript, MongoDB, and Socket.IO.

This system automatically distributes incoming service leads to providers using a fair round robin allocation strategy while handling concurrency, quota management, webhook idempotency, and real time dashboard updates.

---

# Live Demo

Deployment URL:
https://provider-mini-system-lvoo.onrender.com

---

# Features

## Lead Distribution
- Automatic provider assignment
- Fair round robin allocation
- Multi provider allocation support
- Duplicate lead prevention

## Provider Quota Management
- Monthly quota tracking
- Remaining quota calculation
- Auto skip exhausted providers
- Quota reset simulation

## Real Time Dashboard
- Live provider updates
- Live lead assignment updates
- Real time quota changes

## Concurrency Handling
- Transaction safe lead allocation
- Prevents race conditions
- Supports simultaneous lead requests

## Webhook Idempotency
- Duplicate webhook protection
- Unique webhook event tracking
- Safe retry handling

## Testing Tools
- Concurrency stress testing
- Duplicate webhook simulation
- Quota reset testing

---

# Tech Stack

Frontend:
- Next.js 15
- React
- TypeScript
- Tailwind CSS

Backend:
- Next.js API Routes
- MongoDB
- Mongoose

Deployment:
- Render

---

# Project Structure

src/
├── app/
│ ├── dashboard/
│ ├── request-service/
│ ├── test-tools/
│ └── api/
│
├── lib/
├── models/
├── modules/
│ ├── allocation/
│ ├── lead/
│ ├── provider/
│ └── realtime/

---

# Setup Instructions

## 1. Clone Repository
```bash
git clone https://github.com/Yashi-maker/Prowider-mini-system.git
```

## 2. Install Dependencies
```bash
npm install
```
## 3. Create Environment File

Create .env.local
```env
MONGODB_URI=your_mongodb_connection_string
```

## 4. Run Development Server
```bash
npm run dev
```

--server runs on
http://localhost:3000

# Allocation Algorithm Explanation

The system uses a fair Round Robin allocation strategy.

How it works
System fetches active providers for requested service
Providers with exhausted quota are skipped
Last assigned provider index is stored
Next provider is selected cyclically
Allocation state updates after every assignment

Example:

Provider Order:

P1 → P2 → P3 → P4

Assignments:

Lead 1 → P1
Lead 2 → P2
Lead 3 → P3
Lead 4 → P4
Lead 5 → P1

This ensures fairness in distribution.

# Concurrency Handling Explanation

Multiple users may create leads simultaneously.

To prevent race conditions:

MongoDB transactions are used
Provider quota updates happen atomically
Allocation state updates are synchronized
Duplicate provider assignment conflicts are avoided

This guarantees:

Correct quota usage
No over-allocation
Safe concurrent requests

# Webhook Idempotency Explanation

Webhook retries can cause duplicate processing.

To prevent this:

Every webhook event stores a unique webhookId
Before processing, system checks:
Has this webhook already been processed?
If yes:
Request is ignored safely
If no:
Event is processed and stored

This ensures:

No duplicate quota reset
Safe retry handling
Reliable webhook processing

# API Endpoints

Create Lead
POST /api/leads

Dashboard Data
GET /api/dashboard

Reset Provider Quotas
POST /api/webhook/reset-quota

Test Endpoint
GET /api/test

# Testing Instructions
Test Round Robin

Create multiple leads using same service type.

Verify providers rotate fairly.

# Test Concurrency

Go to:
/test-tools

Click:
Generate 10 Leads Instantly

Observe:
No quota overflow
Proper provider rotation

# Test Webhook Idempotency

Click:
Test Idempotency

Expected:
First request processes
Duplicate requests ignored safely

# Author 

Yashi Kesarwani

Github: https://github.com/Yashi-maker
