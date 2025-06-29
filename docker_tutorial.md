# Complete Docker Setup Tutorial

## Table of Contents
1. [Understanding Docker Basics](#understanding-docker-basics)
2. [Project Structure Setup](#project-structure-setup)
3. [MySQL Database Setup](#mysql-database-setup)
4. [Backend (Node.js) Dockerization](#backend-nodejs-dockerization)
5. [Frontend (React Native) Considerations](#frontend-react-native-considerations)
6. [Docker Compose Configuration](#docker-compose-configuration)
7. [Development Workflow](#development-workflow)
8. [Sharing with Other Developers](#sharing-with-other-developers)
9. [Common Issues and Troubleshooting](#common-issues-and-troubleshooting)

## Understanding Docker Basics

### What is Docker?
Docker is a platform that packages your application and its dependencies into containers. Think of containers as lightweight, portable boxes that contain everything needed to run your application.

**Key Concepts:**
- **Container**: A running instance of your application
- **Image**: A blueprint for creating containers
- **Dockerfile**: Instructions for building an image
- **Docker Compose**: Tool for defining multi-container applications

## Project Structure Setup

First, let's organize your project structure in the `docker` branch:

```
habichew/
├── backend/
│   ├── src/
│   ├── package.json
│   ├── Dockerfile
│   └── .dockerignore
├── frontend/
│   ├── src/
│   ├── package.json
│   ├── Dockerfile
│   └── .dockerignore
├── database/
│   ├── init/
│   │   └── init.sql
│   └── data/
├── docker-compose.yml
├── .env
└── README.md
```
## Docker Commands

#### First Time Setup
```bash
# Build and start all services
docker-compose up --build

# Run in background (detached mode)
docker-compose up -d --build
```

#### Daily Development Commands
```bash
# Start existing containers
docker-compose up

# Stop all containers
docker-compose down

# View logs
docker-compose logs backend
docker-compose logs mysql-db

# Restart a specific service
docker-compose restart backend

# Execute commands in running container
docker-compose exec backend npm install new-package
docker-compose exec mysql-db mysql -u root -p
```

#### Database Management
```bash
# Access MySQL shell
docker-compose exec mysql-db mysql -u root -p

# Backup database
docker-compose exec mysql-db mysqldump -u root -p myapp_db > backup.sql

# Restore database
docker-compose exec -T mysql-db mysql -u root -p myapp_db < backup.sql
```

### Step 12: Frontend Development Setup

For React Native development, you have two options:

#### Option A: Use Docker for Metro Bundler
```bash
# Start the frontend container
docker-compose up frontend

# Your Expo app will be available at exp://localhost:19000
```

#### Option B: Run Frontend Locally (Recommended)
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start Expo
npx expo start

# Scan QR code with Expo Go app on your phone
```

### Step 13: Backend API Configuration

Update your frontend to connect to the dockerized backend:

```javascript
// frontend/src/config/api.js
const API_BASE_URL = __DEV__ 
  ? 'http://localhost:3000/api'  // Development
  : 'https://your-production-url.com/api'; // Production

export default API_BASE_URL;
```

## Sharing with Other Developers

### Step 14: Repository Setup

Create a comprehensive README.md:

```markdown
# Project Setup Guide

## Prerequisites
- Docker Desktop installed
- Git installed
- Expo Go app on your mobile device

## Quick Start
1. Clone the repository
2. Switch to docker branch: `git checkout docker`
3. Copy environment file: `cp .env.example .env`
4. Start services: `docker-compose up --build`
5. Install frontend dependencies: `cd frontend && npm install`
6. Start Expo: `npx expo start`

## Services
- Backend API: http://localhost:3000
- Database Admin: http://localhost:8080
- Metro Bundler: http://localhost:8081
```

### Step 15: Git Configuration

Create `.gitignore` updates:

```gitignore
# Docker
database/data/*
!database/data/.gitkeep

# Environment
.env

# Logs
*.log

# Dependencies
node_modules/
```

Create `database/data/.gitkeep` to preserve the directory structure.

### Step 16: Sharing Instructions

**For New Developers:**

```bash
# 1. Clone repository
git clone <your-repo-url>
cd your-project

# 2. Switch to docker branch
git checkout docker

# 3. Create environment file
cp .env.example .env
# Edit .env if needed

# 4. Start Docker services
docker-compose up --build

# 5. Set up frontend (in new terminal)
cd frontend
npm install
npx expo start

# 6. Access services
# - Backend: http://localhost:3000
# - Database Admin: http://localhost:8080
# - Scan QR code for mobile app
```

## Common Issues and Troubleshooting

### Database Connection Issues
```bash
# Check if MySQL is ready
docker-compose logs mysql-db

# Reset database
docker-compose down -v
docker-compose up --build
```

### Port Conflicts
```bash
# Find processes using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Container Build Issues
```bash
# Rebuild without cache
docker-compose build --no-cache backend

# Remove all containers and rebuild
docker-compose down --volumes --remove-orphans
docker-compose up --build
```

### Permission Issues (macOS/Linux)
```bash
# Fix file permissions
sudo chown -R $USER:$USER database/data
```

### Frontend Metro Bundler Issues
```bash
# Clear Expo cache
npx expo start --clear

# Reset Metro cache
npx react-native start --reset-cache
```

## Database Management with Navicat

### Connecting Navicat to Docker MySQL

1. **Open Navicat**
2. **Create New Connection:**
   - Connection Name: `MyApp Local Docker`
   - Host: `localhost`
   - Port: `3306`
   - User Name: `root`
   - Password: `rootpassword` (from your .env file)
3. **Test Connection** and **Save**

### Sharing Database Schema

**Export Schema:**
```sql
-- In Navicat, right-click database → Dump SQL File
-- Or use command line:
docker-compose exec mysql-db mysqldump -u root -p --no-data myapp_db > schema.sql
```

**Import Schema:**
```sql
-- Place schema.sql in database/init/ folder
-- It will automatically run when containers start fresh
```

## Next Steps

1. **Set up CI/CD pipeline** for automated testing
2. **Configure production environment** with Docker Swarm or Kubernetes
3. **Add monitoring** with tools like Prometheus and Grafana
4. **Implement database migrations** for schema changes
5. **Set up automated backups** for production data

## Useful Commands Reference

```bash
# View running containers
docker ps

# View all containers (including stopped)
docker ps -a

# Remove unused containers and images
docker system prune

# View Docker disk usage
docker system df

# Follow logs in real-time
docker-compose logs -f backend

# Scale services (run multiple instances)
docker-compose up --scale backend=3
```

This setup provides a complete, shareable development environment that any developer can spin up with just a few commands!