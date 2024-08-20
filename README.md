# Payments App

A secure and efficient payments application built with the MERN stack.

## Features

### Backend
- **User Authentication**: JWT-based authentication with tokens stored in local storage for persistent login.
- **Signup & Signin**: Secure user registration and login with password hashing and salting.
- **Dashboard**: View user details and transaction history.
- **Send Money**: Transfer funds between users, with validation to ensure sufficient balance and cancellation of concurrent requests.
- **Validation**: All inputs are validated using Zod.

### Frontend
- **Landing Page**: User-friendly introduction to the app.
- **Login & Signup**: Error-handled forms for user registration and login.
- **Dashboard**: Display of user information and available actions.
- **Send Money Page**: Transfer funds and view recent transactions.
- **Private Routing**: Restricted access to pages based on user authentication status.
- **State Management**: Managed using Recoil.
- **UI Components**: Styled using Daisy UI Premade Components.

## Technologies Used
- **Frontend**: React, Recoil, Daisy UI
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, Zod, JWT
- **Database**: MongoDB
- **Authentication**: JWT
- **Validation**: Zod

## Installation & Setup
1. Clone the repository.
```
git clone https://github.com/ronit-ghosh/Payments-App.git
```
2. Go to Server Directory
```
cd server
```
2. Rename the of `.env.sample` file to `.env` and fill the necessary fields
3. Install Dependencies 
```
npm install
```
4. Run the Server
```
node index.js
```
5. Go to App Directory
```
cd..
```
```
cd app
```
6. Rename the of `.env.sample` file to `.env.local` and fill the necessary fields
7. Install Dependencies 
```
npm install
```
9. Run the App
```
npm run dev
```
