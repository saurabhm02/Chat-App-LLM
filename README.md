# Chat Application using LLM 

## client -- frontend
## server -- backend


This is a RESTful API for a chat application using LLM model built with Express.js and MongoDB, providing functionalities for user authentication, messaging, and chat management.

## Setup and Run Instructions

1. Clone the repository:

   ```
   git clone https://github.com/saurabhm02/Chat-App-LLM.git

   ```
1. Install dependencies:

  ```
  cd server 
  npm install or npm i
  ```

  if do changes in client side then
  ```
  cd client
  npm install or npm i
  ```
  do changes and then
  ```
  npm run dev
  ```

## API Route Descriptions

### 1.Authentication Routes

#### Register User
- Route: POST /api/auth/register
- Description: Registers a new user. 
- logic:
```
 i. Validates incoming user data.
ii. Checks if the user already exists in the database.
iii. Hashes the user's password before storing it.
```
- Input: JSON object with fullName, email, and password.
- Output: Success message or error message.

#### Login User
- Route: POST /api/auth/login
- Description: Logs in a user.
- logic:
```
 i. Validates login credentials.
ii. Checks if the user exists and if the provided password matches the hashed password in the database.
iii. Generates a JWT token for authentication.
```
- Input: JSON object with email and password.
- Output: User data and authentication token.

#### Logout User
- Route: GET /api/auth/logout
- Description: Logs out the user.
- logic: ```Clears the user's authentication token stored in a cookie ```
- Output: Success message.

#### Set User Status
- Route: POST /api/auth/setstatus
- Description: Sets the status of the user.
- logic: ``` Updates the status of the authenticated user in the database ```
- Input: JSON object with status.
- Output: Success message.

### 2.User Routes

#### Get User by ID
- Route: GET /api/user/get-user/:userId
- Description: Retrieves user details by user ID.
- logic: ``` Retrieves user details based on the provided user ID  ```
- Output: User data.

#### Update User Profile
- Route: POST /api/user/update-profile/:id
- Description: Updates user profile.
- logic:
```
  i. Validates the request to update the user's profile.
  ii. Updates the user's profile information in the databas
```
- Input: JSON object with fullName.
- Output: Success message and updated user data.
#### Update User Profile Photo
- Route: POST /api/user/update-profile-photo/:id
- Description: Updates user profile photo.
- logic:
```
    i. Validates the request to update the user's profile photo.
    ii. Updates the user's profile photo in the database.
```
- Input: JSON object with avatar.
- Output: Success message and updated user data.

#### Get User by Email
- Route: GET /api/user/get-user-email/:email
- Description: Retrieves user details by email.
- logic: ``` Retrieves user details based on the provided email ```
- Output: User data.

#### Search Users
- Route: GET /api/user/search-users/:query
- Description: Searches users by query.
- logic: ``` Searches for users based on the provided query ```
- Output: List of users matching the query.

### 3.Chat Routes

#### Create Chat
- Route: POST /api/chat/
- Description: Creates a new chat.
- logic:
```
  i Validates the presence of both sender and receiver IDs.
  ii. Creates a new chat with the provided sender and receiver IDs.
```
- Input: JSON object with senderId and receiverId.
- Output: Success message.

#### Get User Chats
- Route: GET /api/chat/:userId
- Description: Retrieves chats of a user.
- logic: ``` Retrieves chats of a specific user based on their ID ```
- Output: List of user chats.

#### Find Chat
- Route: GET /api/chat/find/:firstId/:secondId
- Description: Finds a chat between two users.
- logic: ``` Finds a chat between two users based on their IDs```
- Output: Chat data.

### 4.Message Routes

#### Add Message
- Route: POST /api/message/
- Description: Adds a new message to a chat.
- logic:
```
    i. Validates incoming message data.
    ii. Checks if the receiver is busy; if so, generates an AI response.
    iii. Saves the message to the database.
```
- Input: JSON object with chatId, senderId, and text.
- Output: Success message.

#### Get Messages
- Route: GET /api/message/:chatId
- Description: Retrieves messages of a chat.
- logic: ``` Retrieves all messages associated with a specific chat ID.```
- Output: List of messages.

## Middlewares

### auth
- Middleware function for user authentication.
- Verifies the JWT token provided in the request cookies.

### isAdmin
- Middleware function to check if the user has admin privileges.
- Checks if the authenticated user has admin role permission


## Environment Configurations
```
- PORT: Port number for the server.
- DB_URL: MongoDB database connection URL.
- JWT_SECRET: Secret key for JWT token.
- GOOGLE_API_KEY: API key for Google Generative 
```


