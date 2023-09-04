# Data Processing Framework

The Data Processing Framework is a scalable and extensible system for processing large volumes of data. This repository contains the docker-compose file to set up the entire framework including backend core, backend worker input, backend worker, and frontend services.

## Prerequisites

- Docker
- Docker Compose

## Configuration

This application requires several environment variables to be set. You can create a .env file in the root directory of this repository with the content of the template.env:

Fill in the variables with the desired values.

## Quick Start

1. Clone this repository:
```bash
git clone https://github.com/Data-Processing-Framework/Orchestrator
```
2. Change to the repository's directory:
```bash
cd Orchestrator
```
3. Set up the environment variables in the .env file.
4. Build the sevices using Docker Compose:
```bash
docker-compose build
```
4. Start the services using Docker Compose:
```bash
docker-compose up -d
```

## Components

- **Backend Core:** Central service responsible for managing the workers and coordinating the processing tasks.
- **Backend Worker Input:** Worker service that reads and publishes input data for processing.
- **Backend Worker:** Worker service that subscribes to input data, processes it, and publishes the results.
- **Frontend:** User interface for interacting with the data processing framework.

## Repositories

[Backend Core](https://github.com/Data-Processing-Framework/Backend-Core.git#main)

[Backend Worker](https://github.com/Data-Processing-Framework/Backend-Worker.git#master)

[Frontend](https://github.com/Data-Processing-Framework/Backend-Worker.git#master)

## Volumes

This docker-compose file defines a named volume **`data`**. This volume is used to share data between the backend core, backend worker input, and backend worker services. The volume is mounted with read-write permission for the backend core service and read-only permission for the worker services.