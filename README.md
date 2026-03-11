# WaterSports Shop
### E-Commerce Platform for Water Sports Equipment

**WaterSports Shop** is a full-stack e-commerce web application for selling water sports products. The platform includes both a customer-facing storefront and a dedicated admin panel, simulating a real-world commercial online store experience.

---

## Overview

WaterSports Shop demonstrates the development of a modern, scalable e-commerce system using contemporary web technologies. The project focuses on state management, client-side routing, and a clean separation between customer and admin workflows — all deployed to the cloud with an automated CI/CD pipeline.

---

## Live Demo

🌐 The application is deployed and accessible via **AWS**.
> _(Add your live URL here)_

---

## Features

### 🛒 Client Side
- Product listing and detailed product pages
- Shopping cart management — add and remove items
- Client-side navigation using React Router
- Global state management for cart and user data

### 🛠️ Admin Side
- Dedicated admin dashboard
- Full product management — add, update, and remove products
- Centralized control over store inventory and data

---

## Technologies Used

### Frontend
| Technology | Purpose |
|---|---|
| React | UI component framework |
| React Router | Client-side routing and navigation |
| Redux | Global state management |
| React Context API | Lightweight state sharing |
| JavaScript (ES6+) | Core programming language |
| HTML & CSS | Structure and styling |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Server-side runtime |
| RESTful API | Client-server communication |

### Cloud & DevOps
| Technology | Purpose |
|---|---|
| AWS | Cloud hosting and deployment |
| CI/CD Pipeline | Automated build and deployment via GitHub Actions (branch: `test`) |

---

## Architecture

- **Client & Admin interfaces** with role-based routing and access control
- **Centralized state management** combining Redux and Context API
- **Modular, component-based** frontend design for maintainability and scalability
- **REST API communication** between frontend and backend
- **Cloud deployment** on AWS with automated CI/CD integration

---

## CI/CD Pipeline

This project includes an automated CI/CD pipeline configured on the `test` branch. On every push to `test`, the pipeline automatically builds and deploys the application to AWS — ensuring fast, reliable, and consistent delivery.

---

## Development Goals

- ✅ Build a realistic, end-to-end e-commerce workflow
- ✅ Practice advanced React concepts and patterns
- ✅ Combine multiple state management approaches (Redux + Context API)
- ✅ Implement role-based flows for Admin and Client users
- ✅ Deploy a production-ready app to the cloud (AWS)
- ✅ Automate deployments using a CI/CD pipeline

---

## License

Developed for **educational and portfolio purposes**. Feel free to explore the codebase, and reach out if you're interested in collaborating.
