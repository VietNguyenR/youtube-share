## Project Overview

Welcome to our Next.js Video Sharing Application! Crafted to provide a streamlined experience, this innovative platform allows users to share and discover captivating YouTube videos effortlessly. With features allowing easy registration and sign-in, users can post YouTube video links that the application automatically processes to retrieve essential video information. The fusion of Next.js's robustness and MongoDB's flexibility ensures a high-performance, user-centric application.

### Key Features

- **User Authentication:** Offers a fortified registration and sign-in process, safeguarding data privacy and security.
- **Video Sharing:** Empowers users to share YouTube video links directly on the platform with ease.
- **Automated Video Information Retrieval:** Equipped with an automatic extraction feature that displays video information from YouTube, amplifying the user experience.
- **MongoDB Integration:** Assures efficient and secure storage of user and video data, underlining data integrity and easy accessibility.

## Prerequisites

To harness the full capacity of our application, ensure the installation of the following software and tools:

- **Git:** A potent, open-source, distributed version control system adept at managing projects of varied scales efficiently. Follow [this guide](https://github.com/git-guides/install-git) to install Git.

- **Node.js:** Our application, built on Next.js, mandates the installation of Node.js. Ensure it’s version 16 or later. [Download here](https://nodejs.org/).

- **pnpm:** A performant alternative to Node.js package managers. To install `pnpm`, adhere to [these instructions](https://pnpm.io/installation).

- **Docker:** An essential open-source platform for containerizing applications. This project specifically requires Docker for rapid MongoDB deployment in the development environment, along with `docker-compose`. Follow [this guide](https://docs.docker.com/compose/install/) for installation.

## Installation & Configuration

Post the installation of the required tools and software, clone the project repository to your local machine using the command:

```bash
git clone https://github.com/VietNguyenR/youtube-share.git
```

Navigate into the project folder and install all necessary dependencies with the command:

```bash
cd youtube-share
pnpm install
```

## Database Setup
With all dependencies installed, activate Docker to initiate MongoDB:
```bash
docker-compose up
```

A successful initiation will display the following message on your terminal:

```bash
[+] Building 0.0s (0/0)
[+] Running 2/0
 ✔ Container youtube-share-mongo-express-1  Running
 ✔ Container youtube-share-mongo-1          Running
```
Manage data via a browser-based GUI by accessing http://localhost:8081/.

## Running the Application

With the Docker container active, execute the following commands to visualize the project:

```bash
# For development 
pnpm dev
# For production build
pnpm build && pnpm start
```

A successful run will yield the message:
```bash
 ▲ Next.js 13.5.3
  - Local:        http://localhost:3000
  - Environments: .env
```

Access the application via a browser at http://localhost:3000.

