# Early Detection of Burnout Risk among IT Professionals Using Lightweight Daily Self-Assessments: A Machine Learning Approach – **Mobile App**

**Capstone Project – MSIT 5910**  
**Institution:** University of the People  
**Course:** Master of Science in Information Technology  
**Author:** Mark Yakubu Melton  
**Date:** August 01, 2025

---

## 📍 Project at a Glance

This capstone project delivers a _complete, production-style pipeline_—from daily data capture on a phone to real-time ML inference and dashboards—to surface early warning signs of burnout.

---

### 🔄 End-to-End Flow

1. Daily Check-in (Mobile)
2. Secure API Call
3. ML Inference
4. Persistence & Analytics
5. Instant Feedback (Mobile)

---

### 🧠 Machine-Learning Components

| Item           | Details                                                          |
| -------------- | ---------------------------------------------------------------- |
| Features       | 7-day means of EE, PA, DP (DP = 6 − _meaningfulness_)            |
| Algorithms     | Logistic Regression, Random Forest, XGBoost                      |
| Target         | `Low` / `Moderate` / `High` burnout risk + binary _at-risk_ flag |
| Data (Phase 1) | 1,000 simulated users, class-balanced, MBI-aligned               |
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

- Modular **routers**: `/users`, `/assessments`, `/dashboard`.
- **Argon2id** password hashing, Pydantic validation & CORS middleware.
- Model inference endpoint hot-loads `.pkl` artefacts.

---

### 🎯 Research Questions & Objectives

| **RQ / Objective** | **Focus**                                                                                                   |
| ------------------ | ----------------------------------------------------------------------------------------------------------- |
| **RQ1**            | _Accuracy_: Can weekly averages of 3 MBI-aligned items classify Low / Moderate / High burnout?              |
| **RQ2**            | _Model choice_: Which algorithm balances **recall**, **calibration**, and **interpretability** best?        |
| **RQ3**            | _Systems_: Can the prototype deliver **< 1 min** UX + **< 2 s** API inference under ≥ 100 concurrent users? |
| **Primary Goal**   | Prove technical feasibility of low-burden, continuous burnout monitoring on modest infra.                   |

---

> **Why it matters:**  
> Intermittent surveys miss day-to-day stress fluctuations.  
> This project shows that a _three-tap daily check-in_ and a _tiny ML service_ are enough for timely, personalised burnout alerts—without intrusive data grabs or heavyweight infrastructure.

---

## Some screenshots of Mobile App

| Dashboard                                                                                                               | Assessment                                                                                                               |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| <img src="https://github.com/user-attachments/assets/7cfe0786-6c02-404c-8a1d-9afbcad106d8" alt="dashboard" width="300"> | <img src="https://github.com/user-attachments/assets/bd2bedcd-009f-40b9-8af3-9ae6d49fd3de" alt="assessment" width="300"> |

| Register                                                                                                               | Login                                                                                                               |
| ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/954f97cc-ed56-4ce9-baa6-2d93d7965ce5" alt="register" width="300"> | <img src="https://github.com/user-attachments/assets/da35f750-9d24-42a2-8633-ceb0ad03b52b" alt="login" width="300"> |

| Notification time setup                                                                                                   | Push notification reminder                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/8998d1bd-bc61-4f72-bd38-0be1f1003125" alt="notif-setup" width="300"> | <img src="https://github.com/user-attachments/assets/54d5ef90-4788-419b-8106-bc1c81c4d666" alt="login" width="300"> |

---

## Repository Overview

This cross‑platform **React Native (Expo)** application lets IT professionals perform a **1‑minute, three‑item daily check‑in** (exhaustion, capability, meaningfulness).  
Responses are sent to the FastAPI backend, where an **XGBoost** model instantly returns burnout‑risk feedback and rolling 7‑day trends.

The backend api and ML code lives in a separate repo here: [https://github.com/coommark/burnout_app_api](https://github.com/coommark/burnout_app_api).

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
   git clone https://github.com/coommark/burnout_app_mobile.git && cd frontend
   npm install -g pnpm # Install pnpm package manager
   pnpm install # Install all required packages
   ```
2. **Environment**
   ```env
   EXPO_PUBLIC_API_URL_LOCAL_ANDROID=http://10.0.2.2:8000
   EXPO_PUBLIC_API_URL_LOCAL_IOS=http://127.0.0.1:8000
   ```
3. **Run Dev Server**
   ```bash
   pnpm ios  # To run the app in the iOS simulator
   pnpm android  # To run the app in the Android emulator OR
   pnpm start  # Scan QR with Expo Go or run in emulator
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
