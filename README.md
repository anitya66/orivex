<div align="center">

# ORIVEX

### AI Powered Freelance Marketplace

A production-ready AI-powered freelance marketplace built using **Spring Boot**, **React**, **MySQL**, **JWT**, **WebSocket**, **LiveKit**, **Docker**, and **Razorpay**.

Connecting **Clients**, **Freelancers**, and **Administrators** through a secure, scalable, and real-time platform.

---

<!-- Add these after deployment -->

[![Frontend](https://img.shields.io/badge/Frontend-Live-success?style=for-the-badge)]()
[![Backend](https://img.shields.io/badge/Backend-Live-success?style=for-the-badge)]()
[![Docker](https://img.shields.io/badge/Docker-Ready-blue?style=for-the-badge)]()
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)]()

</div>

---

# Overview

ORIVEX is a modern full-stack freelance marketplace inspired by platforms like **Upwork** and **Fiverr**, designed with enterprise-level architecture and production-ready practices.

Unlike traditional CRUD-based projects, ORIVEX focuses on solving real-world freelancing workflows including secure authentication, project management, proposal handling, contracts, real-time messaging, voice/video communication, payment integration, and role-based administration.

The platform supports three different user roles:

- Client
- Freelancer
- Administrator

Each role has its own dashboard, permissions, workflows, and business logic.

---

# Why ORIVEX?

Modern freelance platforms require much more than simple job posting.

ORIVEX demonstrates implementation of:

- Secure Authentication using JWT
- Role-Based Authorization
- Real-Time Chat using WebSockets
- Voice & Video Calling using LiveKit
- Payment Integration using Razorpay
- Dockerized Deployment
- Production Folder Structure
- Clean REST API Design
- Responsive Modern UI
- Enterprise Backend Architecture

The goal of this project is to simulate how a real SaaS freelance marketplace would be designed in production.

---

# Core Features

## Authentication

- User Registration
- Secure Login
- JWT Authentication
- BCrypt Password Encryption
- Change Password
- Role-Based Authorization
- Protected APIs
- Persistent Login

---

## Client Module

Clients can

- Create Projects
- Edit Projects
- Delete Projects
- View Dashboard
- Receive Proposals
- Hire Freelancers
- Track Contracts
- Chat with Freelancers
- Make Payments

---

## Freelancer Module

Freelancers can

- Create Professional Profile
- Browse Projects
- Submit Proposals
- Manage Contracts
- Chat with Clients
- Join Audio Calls
- Join Video Calls
- Track Dashboard Statistics

---

## Admin Module

Administrator has complete platform control.

Features include

- Dashboard Analytics
- User Management
- Project Monitoring
- User Suspension
- User Activation
- Platform Statistics
- Administrative Controls

---

## Real-Time Communication

ORIVEX provides production-style communication features.

Implemented using

- Spring WebSocket
- STOMP Messaging
- SockJS
- LiveKit

Features

- Real-Time Chat
- Message Synchronization
- Audio Calling
- Video Calling
- Camera Controls
- Microphone Controls
- Screen Sharing
- Call Timer
- Network Quality Indicator

---

## Payment Module

Integrated with Razorpay

Current Features

- Secure Payment Flow
- Order Creation
- Payment Verification

Future Improvements

- Escrow Payments
- Subscription Plans
- Refund Handling

---

## Security

Security implementation includes

- Spring Security
- JWT Tokens
- BCrypt Password Hashing
- Protected Routes
- Stateless Authentication
- Role-Based Access Control
- API Authorization
- CORS Configuration

---

## DevOps

Production-ready Docker setup

- Dockerized Backend
- Dockerized Frontend
- Docker Compose
- MySQL Container
- Multi-Stage Builds
- Nginx Configuration

---

# Project Highlights

- Enterprise Folder Structure
- Clean Architecture
- DTO Pattern
- Repository Pattern
- Service Layer
- Global Exception Handling
- Validation
- API Response Wrapper
- Docker Support
- Production Ready Structure
- Responsive UI
- Reusable Components
- Modular Design

---

# User Roles

| Role | Responsibilities |
|-------|------------------|
| Client | Post projects, hire freelancers, manage contracts, payments |
| Freelancer | Browse projects, send proposals, communicate with clients |
| Administrator | Manage users, monitor projects, control platform |

---

# Current Status

Current implementation includes

- Authentication System
- Project Management
- Proposal System
- Contracts
- Dashboard
- Admin Panel
- Real-Time Chat
- LiveKit Calling
- Razorpay Integration
- Docker Support

Project is under continuous development with upcoming AI-powered features.

---

# System Architecture

```text
                           ORIVEX Architecture

                        +----------------------+
                        |      React (Vite)    |
                        |----------------------|
                        | Tailwind CSS         |
                        | React Router         |
                        | React Query          |
                        | Axios               |
                        | React Hook Form      |
                        | Zod Validation       |
                        +----------+-----------+
                                   |
                     REST API (JWT Authentication)
                                   |
                                   v
                    +------------------------------+
                    |     Spring Boot Backend       |
                    |------------------------------|
                    | Spring Security              |
                    | JWT Authentication           |
                    | REST Controllers             |
                    | Service Layer                |
                    | DTO + Mapper                 |
                    | JPA / Hibernate              |
                    | Global Exception Handling    |
                    +----------+-------------------+
                               |
         +---------------------+----------------------+
         |                                            |
         |                                            |
         v                                            v
+----------------------+               +-----------------------------+
|      MySQL           |               |      WebSocket (STOMP)      |
|----------------------|               |-----------------------------|
| Users                |               | Real-Time Chat              |
| Projects             |               | Notifications               |
| Proposals            |               | Live Updates                |
| Contracts            |               +-----------------------------+
| Messages             |
| Reviews              |
+----------------------+
                               |
                               |
                               v
                     +----------------------+
                     |      LiveKit         |
                     |----------------------|
                     | Audio Calling        |
                     | Video Calling        |
                     | Screen Sharing       |
                     +----------------------+
```

---

# Technology Stack

## Frontend

| Technology | Purpose |
|------------|---------|
| React | User Interface |
| Vite | Build Tool |
| Tailwind CSS | Styling |
| React Router | Routing |
| React Query | Server State |
| Axios | HTTP Client |
| React Hook Form | Form Management |
| Zod | Validation |
| Sonner | Toast Notifications |
| Lucide React | Icons |

---

## Backend

| Technology | Purpose |
|------------|---------|
| Java 21 | Programming Language |
| Spring Boot 3 | Backend Framework |
| Spring Security | Authentication & Authorization |
| JWT | Stateless Authentication |
| Spring Data JPA | Database Layer |
| Hibernate | ORM |
| Maven | Dependency Management |
| MapStruct | DTO Mapping |
| Lombok | Boilerplate Reduction |

---

## Database

| Technology | Purpose |
|------------|---------|
| MySQL 8 | Relational Database |

---

## Real-Time Communication

| Technology | Purpose |
|------------|---------|
| Spring WebSocket | Real-Time Communication |
| STOMP | Messaging Protocol |
| SockJS | WebSocket Fallback |
| LiveKit | Audio & Video Calling |

---

## Payments

| Technology | Purpose |
|------------|---------|
| Razorpay | Payment Gateway |

---

## DevOps

| Technology | Purpose |
|------------|---------|
| Docker | Containerization |
| Docker Compose | Multi-container Deployment |
| Nginx | Frontend Web Server |

---

# Project Structure

```text
ORIVEX
│
├── orivex-backend
│   ├── src
│   │   ├── auth
│   │   ├── chat
│   │   ├── contract
│   │   ├── dashboard
│   │   ├── file
│   │   ├── notification
│   │   ├── payment
│   │   ├── project
│   │   ├── proposal
│   │   ├── review
│   │   ├── security
│   │   ├── user
│   │   └── websocket
│   │
│   └── pom.xml
│
├── orivex-frontend
│   ├── src
│   │   ├── components
│   │   ├── config
│   │   ├── constants
│   │   ├── contexts
│   │   ├── features
│   │   │   ├── auth
│   │   │   ├── call
│   │   │   ├── chat
│   │   │   ├── dashboard
│   │   │   ├── project
│   │   │   ├── proposal
│   │   │   ├── contract
│   │   │   └── payment
│   │   ├── hooks
│   │   ├── layouts
│   │   ├── pages
│   │   ├── routes
│   │   └── utils
│   │
│   └── package.json
│
├── docker-compose.yml
├── README.md
└── .env.example
```

---

# Request Flow

```text
User

↓

React Frontend

↓

Axios

↓

JWT Authentication

↓

Spring Security

↓

Controller

↓

Service

↓

Repository

↓

MySQL Database

↓

Response

↓

React UI
```

---

# Authentication Flow

```text
User Login

↓

Spring Security Authentication

↓

JWT Token Generation

↓

Frontend Stores Token

↓

Axios Interceptor

↓

Authorization Header

↓

Protected APIs

↓

Authenticated User
```

---

# Real-Time Chat Flow

```text
User A

↓

WebSocket

↓

Spring STOMP Broker

↓

WebSocket

↓

User B
```

---

# Audio / Video Calling Flow

```text
Caller

↓

Spring Boot

↓

LiveKit Token

↓

LiveKit Server

↓

Receiver

↓

Connected Call
```

---

# Design Principles

The project follows several production-level software engineering practices.

- Layered Architecture
- DTO Pattern
- Repository Pattern
- Service Layer Pattern
- Dependency Injection
- Separation of Concerns
- Stateless Authentication
- Modular Feature-Based Frontend
- RESTful API Design
- Reusable Components
- Clean Code Practices
---

# Getting Started

Follow the steps below to set up ORIVEX on your local machine.

---

# Prerequisites

Before running the project, make sure the following software is installed.

| Software | Version |
|-----------|---------|
| Java | 21+ |
| Maven | 3.9+ |
| Node.js | 22+ |
| npm | Latest |
| Docker Desktop | Latest |
| Git | Latest |
| MySQL | 8+ (Only for local setup) |

---

# Clone Repository

```bash
git clone https://github.com/your-username/orivex.git

cd orivex
```

---

# Environment Variables

Create a `.env` file in the project root.

Example:

```env
############################
# Database
############################

SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=your_password

############################
# JWT
############################

JWT_SECRET=your_super_secret_key

############################
# LiveKit
############################

LIVEKIT_URL=https://your-livekit-server

LIVEKIT_API_KEY=your_livekit_key

LIVEKIT_API_SECRET=your_livekit_secret

############################
# Razorpay
############################

RAZORPAY_KEY_ID=your_key

RAZORPAY_KEY_SECRET=your_secret
```

---

# Frontend Environment

Inside

```
orivex-frontend
```

Create

```
.env
```

Example

```env
VITE_API_BASE_URL=http://localhost:8080/api/v1

VITE_RAZORPAY_KEY=your_key
```

---

# Running Backend (Local)

```bash
cd orivex-backend

mvn spring-boot:run
```

Backend starts on

```
http://localhost:8080
```

Swagger UI

```
http://localhost:8080/swagger-ui/index.html
```

---

# Running Frontend (Local)

```bash
cd orivex-frontend

npm install

npm run dev
```

Frontend starts on

```
http://localhost:5173
```

---

# Docker Setup

The project supports full Docker deployment.

Containers included

- Frontend
- Backend
- MySQL

---

# Build Containers

```bash
docker compose build
```

---

# Run Containers

```bash
docker compose up
```

Run in detached mode

```bash
docker compose up -d
```

---

# Stop Containers

```bash
docker compose down
```

---

# Rebuild Containers

```bash
docker compose down

docker compose up --build
```

---

# Docker Services

| Service | Port |
|----------|------|
| Frontend | 3000 |
| Backend | 8080 |
| MySQL | 3307 |

---

# Docker Architecture

```text
                 Docker Compose

          +----------------------+
          |     Frontend         |
          |      (Nginx)         |
          +----------+-----------+
                     |
                     |
          +----------v-----------+
          |    Spring Boot API   |
          +----------+-----------+
                     |
                     |
          +----------v-----------+
          |       MySQL          |
          +----------------------+
```

---

# API Documentation

Swagger UI

```
http://localhost:8080/swagger-ui/index.html
```

---

# Default Test Users

Example Client

```text
Email:
client@gmail.com

Password:
********
```

Example Freelancer

```text
Email:
freelancer@gmail.com

Password:
********
```

> Replace these credentials with your own demo accounts.

---

# Common Docker Commands

View running containers

```bash
docker ps
```

View logs

```bash
docker logs orivex-backend

docker logs orivex-frontend

docker logs orivex-mysql
```

Restart containers

```bash
docker compose restart
```

Remove containers

```bash
docker compose down
```

Remove everything

```bash
docker compose down -v
```

---

# Troubleshooting

## Backend not starting

- Check Java version
- Verify `.env`
- Check database connection

---

## Frontend cannot connect to backend

- Verify `VITE_API_BASE_URL`
- Check CORS configuration
- Ensure backend is running

---

## Docker build issues

```bash
docker compose down

docker system prune -a

docker compose up --build
```

---

## MySQL connection failed

Verify

- MySQL container is healthy
- Port mapping
- Environment variables
- Database credentials

---

# Project Architecture

```
                    ORIVEX

             React + Vite Frontend
                      │
                      │ REST API
                      ▼
             Spring Boot Backend
                      │
        ┌─────────────┴─────────────┐
        │                           │
      MySQL                    WebSocket
        │                           │
        │                           │
     User Data              Real-Time Chat
                              Notifications
                              Calling Signals
```

---

# User Roles

ORIVEX currently supports three different user roles.

## Client

- Register & Login
- Create Projects
- Edit Projects
- Delete Projects
- View Proposals
- Hire Freelancer
- Chat
- Audio Call
- Video Call
- Contracts
- Notifications
- Dashboard

---

## Freelancer

- Register & Login
- Complete Profile
- Browse Projects
- Send Proposal
- Chat
- Audio Call
- Video Call
- Contracts
- Notifications
- Dashboard

---

## Administrator

- Dashboard Analytics
- User Management
- Suspend Users
- Ban Users
- Activate Users
- Project Monitoring
- Platform Statistics

---

# Module Overview

| Module | Status |
|---------|--------|
| Authentication | ✅ |
| JWT Security | ✅ |
| Client Dashboard | ✅ |
| Freelancer Dashboard | ✅ |
| Admin Dashboard | ✅ |
| Project Management | ✅ |
| Proposal System | ✅ |
| Chat | ✅ |
| Notifications | ✅ |
| Contracts | ✅ |
| File Upload | ✅ |
| Audio Calling | ✅ |
| Video Calling | ✅ |
| Docker | ✅ |

---

# API Modules

Authentication

```
/api/v1/auth
```

Projects

```
/api/v1/projects
```

Proposals

```
/api/v1/proposals
```

Contracts

```
/api/v1/contracts
```

Chat

```
/api/v1/chat
```

Notifications

```
/api/v1/notifications
```

Files

```
/api/v1/files
```

Dashboard

```
/api/v1/dashboard
```

Calling

```
/api/v1/calls
```

---

# Authentication Flow

```
User Login
     │
     ▼
Spring Security
     │
Authentication Manager
     │
JWT Generation
     │
Frontend stores Token
     │
Protected API Requests
```

---

# Chat Flow

```
Client

    │
    ▼

Spring Boot

    │

WebSocket

    │

Freelancer
```

---

# Audio / Video Calling

Calling is powered by **LiveKit**.

Features

- Audio Calling
- Video Calling
- Screen Sharing
- Camera Toggle
- Microphone Toggle
- Participant Count
- Call Timer
- Network Indicator
- Call Cleanup
- Leave Confirmation

---

# Notifications

Real-time notifications are implemented using WebSocket.

Examples

- New Proposal
- Proposal Accepted
- Proposal Rejected
- Contract Created
- Incoming Call
- Chat Message

---

# Screenshots

> Screenshots will be added after deployment.

## Landing Page

(Add Screenshot)

---

## Client Dashboard

(Add Screenshot)

---

## Freelancer Dashboard

(Add Screenshot)

---

## Admin Dashboard

(Add Screenshot)

---

## Chat

(Add Screenshot)

---

## Calling

(Add Screenshot)

---

## Contracts

(Add Screenshot)

---

## Mobile Responsive UI

(Add Screenshot)

---

# Future Improvements

- AI Project Recommendation
- AI Freelancer Matching
- AI Proposal Ranking
- AI Resume Analysis
- Stripe Integration
- Email Verification
- Google Login
- Two Factor Authentication
- Kubernetes Deployment
- CI/CD Pipeline
- Monitoring Dashboard
- Elasticsearch
- Redis Caching

---

# Performance

- Responsive UI
- Lazy Loading
- Optimized API Calls
- JWT Authentication
- Stateless Backend
- Dockerized Services
- Modular Architecture
- Production Ready Structure

---

# Database Design Overview

The application is designed using a relational database architecture with proper entity relationships.

### Major Entities

- User
- Client Profile
- Freelancer Profile
- Project
- Proposal
- Contract
- Conversation
- Message
- Notification
- Review
- Payment

The backend uses **Spring Data JPA** with **Hibernate** for ORM and maintains proper relationships using `@OneToOne`, `@OneToMany`, and `@ManyToOne`.

---

# Security Features

Security is one of the primary focuses of ORIVEX.

Implemented security mechanisms include:

- JWT Authentication
- Spring Security
- BCrypt Password Hashing
- Role-Based Access Control (RBAC)
- Protected REST APIs
- Authentication Interceptor
- CORS Configuration
- Stateless Authentication
- Request Validation
- Global Exception Handling

---

# Software Design Patterns

The project follows multiple production-level design patterns.

- Layered Architecture
- DTO Pattern
- Repository Pattern
- Service Pattern
- Builder Pattern
- Dependency Injection
- Factory Pattern (Spring Beans)
- Singleton Pattern (Spring Managed Beans)

---

# Code Quality

The project emphasizes clean and maintainable code.

Practices followed:

- Feature-based folder structure
- Reusable UI components
- Validation using Zod & Jakarta Validation
- API Response Wrapper
- Centralized Error Handling
- Consistent Naming Conventions
- Separation of Concerns
- Modular Architecture

---

# Engineering Challenges Solved

During development several real-world engineering challenges were solved.

### Authentication

- JWT Authentication
- Role-Based Security
- Protected Routes
- Token Persistence

---

### Real-Time Communication

- WebSocket Integration
- STOMP Messaging
- Live Chat
- Real-Time Notifications

---

### Audio & Video Calling

- LiveKit Integration
- Room Management
- Call Lifecycle Handling
- Network Quality Monitoring
- Screen Sharing
- Call Timer
- Automatic Cleanup

---

### Dockerization

Successfully containerized:

- Spring Boot Backend
- React Frontend
- MySQL Database

Using Docker Compose for one-command deployment.

---

### Responsive Design

The UI is optimized for:

- Desktop
- Laptop
- Tablet
- Mobile

---

# What I Learned

Building ORIVEX provided hands-on experience with:

- Enterprise Backend Development
- REST API Design
- Authentication & Authorization
- Spring Security
- JWT
- Hibernate
- WebSocket
- Docker
- React Architecture
- Production Folder Structure
- State Management
- LiveKit Integration
- Payment Gateway Integration
- Git & GitHub Workflow

---

# Future Roadmap

Upcoming enhancements planned for ORIVEX:

### AI Features

- AI Freelancer Recommendation
- AI Project Matching
- AI Proposal Generator
- AI Resume Analysis
- AI Skill Scoring

---

### Platform Features

- Escrow Payments
- Multi-language Support
- Dark / Light Themes
- Calendar Integration
- Video Interview Scheduling
- Portfolio Builder
- Advanced Search & Filters

---

### DevOps Improvements

- GitHub Actions (CI/CD)
- Kubernetes Deployment
- Redis Caching
- AWS Deployment
- Monitoring with Prometheus & Grafana

---

# Production Readiness Checklist

| Feature | Status |
|---------|:------:|
| JWT Authentication | ✅ |
| Role-Based Authorization | ✅ |
| Global Exception Handling | ✅ |
| Input Validation | ✅ |
| Docker Support | ✅ |
| Responsive UI | ✅ |
| WebSocket | ✅ |
| Audio / Video Calling | ✅ |
| API Documentation | ✅ |
| Payment Integration | ✅ |
| Clean Architecture | ✅ |
| Production Folder Structure | ✅ |

---

# Key Highlights

- Enterprise-level Architecture
- Secure Authentication
- Modular Codebase
- Reusable Components
- Dockerized Deployment
- Real-Time Communication
- Production-ready Design
- Scalable Backend
- Modern React Frontend
- Interview-ready Full Stack Project

---

# Contributing

Contributions are welcome!

If you would like to improve ORIVEX, feel free to:

1. Fork the repository
2. Create a new feature branch

```bash
git checkout -b feature/your-feature
```

3. Commit your changes

```bash
git commit -m "feat: add amazing feature"
```

4. Push your branch

```bash
git push origin feature/your-feature
```

5. Create a Pull Request

---

# Deployment

Deployment support is included for both local and production environments.

## Frontend

- Vercel (Recommended)

## Backend

- Railway
- Render
- AWS EC2

## Database

- Railway MySQL
- Aiven
- PlanetScale (if compatible)

---

# Deployment URLs

> These will be updated after deployment.

### Frontend

```
Coming Soon
```

### Backend

```
Coming Soon
```

### Swagger

```
Coming Soon
```

---

# Screenshots

Screenshots will be added after deployment.

- Landing Page
- Login Page
- Register Page
- Client Dashboard
- Freelancer Dashboard
- Admin Dashboard
- Chat Module
- Audio Call
- Video Call
- Contracts
- Payment
- Mobile Responsive View

---

# Demo Video

A complete walkthrough of ORIVEX will be added after deployment.

```
Coming Soon
```

---

# Known Limitations

Current version focuses on the core freelance marketplace workflow.

Planned improvements include:

- AI Recommendation Engine
- Email Verification
- Social Login
- Escrow Payments
- Redis Caching
- Kubernetes Deployment
- CI/CD Pipeline

---

# Repository Statistics

Project Type

```
Enterprise Full Stack Application
```

Architecture

```
Monolithic Backend
Feature-Based Frontend
```

Authentication

```
JWT + Spring Security
```

Communication

```
REST API
WebSocket
LiveKit
```

Deployment

```
Docker
Docker Compose
```

---

# Author

## Anitya Anand

Java Full Stack Developer

GitHub

```
https://github.com/anitya66
```

LinkedIn

```
(Add LinkedIn URL)
```

Portfolio

```
(Add Portfolio URL)
```

---

# License

This project is licensed under the MIT License.

Feel free to use this project for learning and educational purposes.

---

# Acknowledgements

Special thanks to the open-source community and the technologies that made ORIVEX possible.

- Spring Boot
- Spring Security
- Hibernate
- MySQL
- React
- Vite
- Tailwind CSS
- LiveKit
- Razorpay
- Docker
- Nginx

---

<div align="center">

## ⭐ If you like this project, consider giving it a Star!

Thank you for visiting the ORIVEX repository.

Made with ❤️ using Java, Spring Boot, React, Docker and lots of ☕.

</div>