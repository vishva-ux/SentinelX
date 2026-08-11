# SentinelX — Enterprise SOC & SIEM Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Frontend: React + TS](https://img.shields.io/badge/Frontend-React_19_TypeScript-blue.svg)](https://react.dev/)
[![Backend: ASP.NET Core](https://img.shields.io/badge/Backend-ASP.NET_Core_.NET_9-purple.svg)](https://dotnet.microsoft.com/)

**SentinelX** is an enterprise-grade Security Operations Center (SOC) and Security Information & Event Management (SIEM) platform designed for high-throughput security telemetry ingestion, real-time threat detection, stateful correlation, and automated incident response workflows.

---

## 📌 Active Network Ports Guide

### Currently Running Port (Web Dashboard)

| Port | Service | Access URL | Status | Description |
| :--- | :--- | :--- | :--- | :--- |
| **5173** | **React Frontend UI** | [http://localhost:5173](http://localhost:5173) | 🟢 **ACTIVE NOW** | Main SOC Analyst Web Workbench & Dashboard |

---

### Backend Microservices Ports (ASP.NET Core .NET 9 Templates)

| Port | Service Name | Target Protocol | Status | Description |
| :--- | :--- | :--- | :--- | :--- |
| **5000** | **API Gateway** | HTTP / REST | 🟡 Future Dev | Gateway reverse proxy, CORS, JWT header forwarding |
| **5001** | **Identity Service** | HTTP / OIDC | 🟡 Future Dev | OAuth2 / OpenID Connect provider & JWT issuer |
| **5002** | **SIEM Log Ingestion** | HTTP / Syslog | 🟡 Future Dev | High-throughput normalized security log collector |
| **5003** | **Incident Response** | HTTP / SignalR | 🟡 Future Dev | Active incident ticket workflow manager |
| **5004** | **Attack Simulation Engine**| HTTP / REST | 🟡 Future Dev | Synthetic cyber attack generator |

---

### Database & Storage Layer Ports

| Port | Database Engine | Default Host | Description |
| :--- | :--- | :--- | :--- |
| **5432** | **PostgreSQL 16** | `localhost:5432` | Relational operational data (Users, Assets, Incidents, Audit Records) |
| **6379** | **Redis 7** | `localhost:6379` | In-memory cache, session tokens, rate limiting counters |
| **9200** | **Elasticsearch 8** | `localhost:9200` | Log indexer, full-text KQL log search, time-series threat analytics |

---

## ⚡ How to Run the Project Locally

Running SentinelX requires zero Docker container setup for frontend local development.

### Step 1: Launch Frontend Web Dashboard
```bash
cd SentinelX/frontend
npm run dev
```

### Step 2: Access the Application
Open your web browser and navigate directly to:
👉 **[http://localhost:5173](http://localhost:5173)**

---

## 🎯 Platform Features & Capabilities

1. **SOC Executive Dashboard**: Real-time log telemetry chart, security posture score, high-risk assets focus, and active incident workbench.
2. **SIEM Log Explorer**: Full-text KQL log queries (`sourceIp:192.168.1.140`), severity filters, and raw payload inspector.
3. **MITRE ATT&CK® Matrix**: Full threat coverage grid across 14 tactics with highlighted active detections.
4. **Security Attack Simulation Lab**: Interactive synthetic attack generator supporting 10 full lifecycles (SQLi, XSS, Brute Force, Credential Stuffing, Port Scanning, DDoS, Privilege Escalation, Reverse Shell, Ransomware, Insider Exfiltration).
5. **Asset Risk Inventory**: Centralized server, endpoint, and database risk scoring.
6. **Threat Intelligence Feed**: Malicious IP, domain, and file hash database.
7. **Immutable Audit Log**: Searchable record of administrative and security events.
# SentinelX
