# Early Detection of Burnout Risk – **Mobile App**

**Capstone Project – MSIT 5910**  
**Institution:** University of the People  
**Course:** Master of Science in Information Technology  
**Author:** Mark Yakubu Melton  
**Date:** August 01, 2025

---

## 📍 Project at a Glance

Early Detection of **Burnout Risk among IT Professionals** is the MSIT 5910 capstone project for the University of the People.  
It delivers a _complete, production-style pipeline_—from daily data capture on a phone to real-time ML inference and dashboards—to surface early warning signs of burnout.

---

### 🔄 End-to-End Flow

1. Daily Check-in (Mobile)
2. Secure API Call
3. ML Inference
4. Persistence & Analytics
5. Instant Feedback (Mobile)
6. Offline Retraining Loop

---

### 🧠 Machine-Learning Components

| Item           | Details                                                          |
| -------------- | ---------------------------------------------------------------- |
| Features       | 7-day means of EE, PA, DP (DP = 6 − _meaningfulness_)            |
| Algorithms     | Logistic Regression, Random Forest, **XGBoost**                  |
| Target         | `Low` / `Moderate` / `High` burnout risk + binary _at-risk_ flag |
| Data (Phase 1) | 1 000 simulated users, class-balanced, MBI-aligned               |
| Eval split     | Stratified 70 / 30 hold-out                                      |
| Key metrics    | Per-class P/R/F1, macro ROC-AUC, Brier, log-loss                 |
| Ops target     | **≤ 2 s** p95 API latency (Locust: 61 ms)                        |

---

### 📱 Frontend (React Native / Expo)

- Nine core screens: onboarding, daily assessment, dashboard, profile.
- **Expo Router** navigation & **NativeWind/Tailwind** styling.
- Stores auth state with **JWT** + refresh, handles push-token registration (Expo Notifications).
- Typed API layer via **React Query** hooks with optimistic updates.

### 🔧 Backend (FastAPI / Python 3.10)

- Modular **routers**: `/users`, `/assessments`, `/dashboard`, `/push-token`.
- **Argon2id** password hashing, Pydantic validation, rate-limit & CORS middleware.
- Model inference endpoint hot-loads `.pkl` artefacts; zero-downtime swaps via CI pipeline.
- Structured JSON logging + Prometheus `/metrics` for ops.

---

### 🎯 Research Questions & Objectives

| **RQ / Objective** | **Focus**                                                                                                   |
| ------------------ | ----------------------------------------------------------------------------------------------------------- |
| **RQ1**            | _Accuracy_: Can weekly averages of 3 MBI-aligned items classify Low / Moderate / High burnout?              |
| **RQ2**            | _Model choice_: Which algorithm balances **recall**, **calibration**, and **interpretability** best?        |
| **RQ3**            | _Systems_: Can the prototype deliver **< 1 min** UX + **< 2 s** API inference under ≥ 100 concurrent users? |
| **Primary Goal**   | Prove technical feasibility of low-burden, continuous burnout monitoring on modest infra.                   |
| **Secondary Goal** | Prepare codebase & pipelines for Phase 2: consent-based real-world validation.                              |

---

> **Why it matters:**  
> Intermittent surveys miss day-to-day stress fluctuations.  
> This project shows that a _three-tap daily check-in_ and a _tiny ML service_ are enough for timely, personalised burnout alerts—without intrusive data grabs or heavyweight infrastructure.

---

## Repository Overview

This cross‑platform **React Native (Expo)** application lets IT professionals perform a **1‑minute, three‑item daily check‑in** (exhaustion, capability, meaningfulness).  
Responses are sent to the FastAPI backend, where an **XGBoost** model instantly returns burnout‑risk feedback and rolling 7‑day trends.

---

## Features

- **Secure Authentication** – Sign‑up, login, password reset (JWT + Argon2).
- **Daily Self‑Assessment** – Slider UI (0–6 Likert).
- **Real‑Time Prediction** – Feedback displayed in < 2 s.
- **Dashboard** – Rolling 7‑day averages & risk trends.
- **Push Notifications** – Daily reminders via Expo Notifications.
- **Profile Management** – Update account & notification prefs.
- **Cross‑Platform** – Single code‑base for iOS & Android.

---

## Tech Stack

| Layer     | Technology                                              |
| --------- | ------------------------------------------------------- |
| Frontend  | **React Native (Expo)**, **TypeScript**, **NativeWind** |
| State/API | **React Query**, **Zustand**                            |
| Backend   | **FastAPI**, **PostgreSQL** (see backend repo)          |
| Testing   | **Jest**, **React Native Testing Library**              |
| CI/CD     | **GitHub Actions**, **Expo EAS**                        |

---

## Project Structure

```text
frontend/
├── app/                 # Screens
│   ├── (tabs)/          # index, assessment, profile
│   └── ...
├── components/          # Reusable UI elements
├── core/                # API hooks, store, theme, utils
├── assets/              # Images & icons
├── __tests__/           # Unit & integration tests
├── package.json
└── README.md
```

---

## Setup & Installation

1. **Clone & install**
   ```bash
   git clone <repo-url> && cd frontend
   npm install
   ```
2. **Environment**
   ```env
   API_BASE_URL=https://<backend-host>/api
   ```
3. **Run Dev Server**
   ```bash
   npm start  # Scan QR with Expo Go or run in emulator
   ```

---

## Testing

```bash
npm test
```

Covers auth, assessment, dashboard, and profile flows.

---

## Security

- TLS 1.3 backend communication
- JWT Bearer auth (stored with Expo SecureStore)
- Client‑side validation with **Zod**

---

## Deployment & Maintenance

| Stage | Tool / Notes                                            |
| ----- | ------------------------------------------------------- |
| CI    | GitHub Actions – lint & Jest                            |
| CD    | Expo EAS build → submit to App Store / Play Store       |
| OTA   | Expo OTA updates for JS bundles; native changes via EAS |

---

## Glossary

| Term    | Meaning                   |
| ------- | ------------------------- |
| **JWT** | JSON Web Token (auth)     |
| **EAS** | Expo Application Services |
| **p95** | 95th‑percentile latency   |
| **MBI** | Maslach Burnout Inventory |

---

## Contact

Bugs, suggestions, or contributions? Open an issue or email **mark.y.melton [at] uop.edu**.
