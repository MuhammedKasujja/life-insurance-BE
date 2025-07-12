# Life Insurance Recommendation MVP

## Tech Stack

- **Framework**: [NestJS](https://nestjs.com/)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Config**: dotenv + `@nestjs/config`
- **Containerization**: Docker & Docker Compose
- **Deployment**: AWS ECS (Fargate) + RDS + ECR + GitHub Actions CI/CD

## 🧑‍💻 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/MuhammedKasujja/life-insurance-BE.git
cd life-insurance-BE
```

## Install Dependences

```bash
$ npm install
```

## Copy Environment variables and change the neccesary credentials
```bash
$ cp .env.example .env
```

### To use/ simulate ML recommendations, set `USE_ML_PREDICTION=true` in `.env`

## Start dev server (Locally)

```bash
$ npm run start:dev
```

## or using Docker
```bash
docker-compose up --build
```

#### Access server http://localhost:3000/api/v1

#### API documentation

http://localhost:3000/api/v1/docs

Build for Production

```bash
$ npm run build
```

#### Docker setup

```bash
docker build -t insurance-app .
docker run -p 3000:3000 --env-file .env insurance-app
```

## Docker compose
```bash
docker-compose up --build
```

## Deployment (AWS ECS)
#### 1. Push Docker image to ECR
```bash
docker build -t insurance-app .
docker tag insurance-app <aws_account_id>.dkr.ecr.<region>.amazonaws.com/insurance-app
docker push <aws_account_id>.dkr.ecr.<region>.amazonaws.com/insurance-app
```
#### 2. Deploy with ECS Task Definition + Fargate
#### 3. Configure Secrets via AWS Secrets Manager or SSM.

- Author - [Muhammed Kasujja](https://github.com/MuhammedKasujja)
- Website - [https://muhammedkasujja.github.io/portfolio/](https://muhammedkasujja.github.io/portfolio/)
