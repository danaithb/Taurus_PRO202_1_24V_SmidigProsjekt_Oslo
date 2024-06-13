# Project Name: LOADING

## Introduction
This repository contains the code for our interactive performance project, "LOADING", developed as part of our coursework. The project aims to merge traditional theater with digital interactivity, focusing on audience engagement through real-time voting.

## Important Note for Reviewers
For the purposes of this examination, the code within this repository is intended for review only and not for execution. The examiners will not run the code, and as such, we have presented it in a public repository. It is important to note that the application requires certain environment variables which are not included in this repository due to security reasons. These variables are necessary for the app to function seamlessly and include sensitive information such as database connection strings, stored in `.env` files which are excluded via `.gitignore`.

## Project Structure
- `/client`: This directory contains all React frontend code.
- `/server`: This directory contains the Express backend code.

## Running the Application

Under usual circumstances, to run this React application with its client and server components, you would follow these steps:

1. Navigate to the client directory:
    ```bash
    cd client
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Build the React application:
    ```bash
    npm run build
    ```

4. Navigate back to the root directory:
    ```bash
    cd ..
    ```

5. Navigate to the server directory:
    ```bash
    cd server
    ```
6. Install dependencies:
    ```bash
    npm install
    ```
7. Start the backend server:
    ```bash
    npm run start
    ```

8. To start both the client and server together, use the following command at the top level of the project:
    ```bash
    npm run dev
    ```

This setup will ensure that both the frontend and backend services are up and running, allowing for a seamless development experience.


However, please remember that without the necessary environment variables, the application will not operate as intended.

## Conclusion
Thank you for reviewing our project. We hope this README provides a clear understanding of our setup and the limitations related to the execution of our application in this particular context.
