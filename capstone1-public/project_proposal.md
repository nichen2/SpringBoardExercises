# Project Proposal: Fullstack Workout Tracker and Planner Application

|            | Description                                                                                                                                                                                                                             | Fill in                                       |
|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------|
| Tech Stack | The tech stack will include Python/Flask for the backend, PostgreSQL for the database, SQLAlchemy for ORM, Heroku for deployment, Jinja for templating, RESTful APIs for data retrieval, JavaScript, HTML, and CSS for the frontend. | Python/Flask, PostgreSQL, SQLAlchemy, Heroku, Jinja, RESTful APIs, JavaScript, HTML, CSS |
| Type       | This will be a web application designed to offer a comprehensive and interactive experience for fitness enthusiasts.                                                                                                                   | Website                                       |
| Goal       | To provide a platform for users to effectively track and plan their gym workouts, monitor progress, and engage with fitness-related activities in a personalized and intuitive manner.                                                  | Fitness Tracking and Planning Web Application |
| Users      | The primary users will be fitness enthusiasts of all levels who are looking for an efficient way to plan and track their gym activities. The app will cater to both beginners and experienced gym-goers.                               | Fitness Enthusiasts                           |
| Data       | The app will use data from an external exercise API (https://api-ninjas.com/api/exercises) to provide a comprehensive list of exercises. User-generated data will be used for custom workout plans and progress tracking.              | Exercise Data from API, User-Generated Data   |

# Breaking down your project

| Task Name                   | Description                                                                                                  |
|-----------------------------|--------------------------------------------------------------------------------------------------------------|
| Initialize Project Environment | Set up the development environment, including Flask, SQLAlchemy, and other dependencies.|
| User Model and Authentication | Develop the User model for the database and implement authentication mechanisms for user registration, login, and session management.|
| Exercise API Integration | Implement functionality to connect with and retrieve data from the external exercise API.|
| Workout Plan Management System | Create the logic and database models for users to create, edit, and store their custom workout plans.| 
| Progress Tracking Implementation |Design and implement the system for users to log and track their workout progress, including data models and UI components.| 
| Frontend Design and Development | Design and develop the user interface for the application, ensuring responsiveness and an engaging user experience.| 
|Interactive Workout Planner UI | Develop a dynamic user interface for creating and modifying workout plans, potentially using drag-and-drop features. |
|Deployment Preparation | Prepare the application for deployment, including configuring Heroku and ensuring all components are production-ready.|
## Labeling of Tasks

### Design Database Schema
- **Difficulty**: Medium – Involves thoughtful design for future scalability and efficient data retrieval.
- **Type**: Backend – Primarily involves database design.

### Source Your Data
- **Difficulty**: Easy – Using an external API is straightforward, but proper handling of data and errors is needed.
- **Type**: Backend – Backend API integration.

### User Flows
- **Difficulty**: Medium – Requires a good understanding of user experience and application flow.
- **Type**: Fullstack – Involves both frontend (UI/UX design) and backend interactions.

### Set up Backend and Database
- **Difficulty**: Hard – Setting up the server, database, and ensuring efficient integration.
- **Type**: Backend – Server-side programming and database setup.

### Set up Frontend
- **Difficulty**: Medium – Implementing the design, ensuring responsiveness and user-friendliness.
- **Type**: Frontend – Client-side development.

### User Authentication
- **Difficulty**: Medium – Implementing secure login and signup.
- **Type**: Fullstack – Both frontend (interface) and backend (logic).

## Stretch Goals

### AI Workout Suggestions
- **Difficulty**: Hard – Building and integrating a machine learning model.
- **Type**: Fullstack – Backend (AI model) and frontend (user interface).

### Social Networking Features
- **Difficulty**: Hard – Adding friends, sharing workouts, and viewing progress.
- **Type**: Fullstack – Changes and additions to both frontend and backend.
