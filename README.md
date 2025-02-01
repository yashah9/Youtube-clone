# YouTube Clone

## Overview
YouTube Clone is a web application inspired by YouTube, allowing users to upload, process, and stream videos seamlessly. The platform leverages modern cloud technologies for scalable and efficient performance.

## Table of Contents
1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Objectives](#objectives)
4. [System Architecture](#system-architecture)
   - [1. Frontend](#1-frontend)
   - [2. Backend](#2-backend)
   - [3. Deployment](#3-deployment)
5. [User Benefits](#user-benefits)
6. [Limitations](#limitations)
7. [Live Demo](#live-demo)

## Features
- **Video Upload & Streaming**: Users can upload and watch videos.
- **Cloud-Based Storage**: Efficiently stores videos using Firebase and Google Cloud.
- **Format Conversion**: Ensures compatibility across different devices and resolutions.
- **Scalable Infrastructure**: Uses containerized services for optimized resource allocation.

## Technologies Used
- **Frontend**: Next.js for a modern, fast, and responsive UI.
- **Backend**:
  - **Node.js & Express.js**: Handles API requests.
  - **Google Cloud Functions**: Processes video uploads and transformations.
- **Database & Storage**:
  - **Firebase**: Manages authentication and video metadata.
  - **Google Cloud Storage**: Stores video files efficiently.
- **Deployment**:
  - **Docker**: Containerizes services for scalability.
  - **Google Cloud Run**: Deploys and manages serverless workloads.

## Objectives
- Provide a seamless video-sharing experience with minimal latency.
- Implement scalable backend solutions to handle video processing.
- Optimize cloud resource usage with serverless and containerized services.

## System Architecture

### 1. Frontend
- **Next.js**: Enables SSR and static generation for better performance.
- **React.js**: Provides a dynamic and interactive UI.
- **Tailwind CSS**: Ensures a modern, responsive design.

### 2. Backend
- **Node.js & Express.js**: Manages API endpoints.
- **Google Cloud Functions**: Handles video processing asynchronously.
- **Firebase Authentication**: Ensures secure user access and identity management.

### 3. Deployment
- **Docker**: Containerized services for better scalability and deployment.
- **Google Cloud Run**: Provides a fully managed, serverless environment.
- **Google Cloud Storage**: Stores and serves video files efficiently.

## User Benefits
1. **Smooth Video Experience**: Optimized streaming and processing.
2. **Cloud-Powered Scalability**: Ensures consistent performance with dynamic workloads.
3. **Secure Authentication**: Firebase ensures a secure and reliable login experience.
4. **Modern UI**: Clean and user-friendly interface built with Next.js.

## Limitations
- No real-time chat or comment functionality (planned for future updates).
- Limited video editing features compared to YouTube.
- Currently supports only a few video formats (expanding in future versions).

## Live Demo
Check out the deployed version: [YouTube Clone](https://yt-web-client-798270022868.us-central1.run.app/)

