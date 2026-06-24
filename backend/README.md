# TripConnect Backend &mdash; Node.js + Express + Socket.IO

This is the backend server for the TripConnect application. It handles REST API routing, user authentication, database persistence using MongoDB, and real-time group chat communication using Socket.IO.

---

## Folder Structure

```txt
backend/
  ├── config/
  │    └── db.js            # Mongoose MongoDB connection
  ├── controllers/          # Business logic handlers
  │    ├── authController.js
  │    ├── userController.js
  │    ├── tripController.js
  │    ├── requestController.js
  │    ├── messageController.js
  │    └── reviewController.js
  ├── middleware/
  │    └── authMiddleware.js # JWT validation interceptor
  ├── models/               # Mongoose schemas
  │    ├── User.js
  │    ├── Trip.js
  │    ├── JoinRequest.js
  │    ├── Conversation.js
  │    ├── Message.js
  │    └── Review.js
  ├── routes/               # API endpoint routing
  │    ├── authRoutes.js
  │    ├── userRoutes.js
  │    ├── tripRoutes.js
  │    ├── requestRoutes.js
  │    ├── messageRoutes.js
  │    └── reviewRoutes.js
  ├── sockets/
  │    └── chatSocket.js    # Socket.IO connection & event loop
  ├── utils/
  │    └── seed.js          # Mock database seeding utility
  ├── server.js             # Main bootstrapping file
  └── package.json          # Backend scripts & dependencies
```

---

## Database Schemas (MongoDB + Mongoose)

- **User**: Holds login credentials (password hashed via `bcryptjs`), location, age, gender, bios, interests, and computed rating averages.
- **Trip**: Represents travel plans. Restricts members based on `maxMembers` capacity.
- **JoinRequest**: Tracks pending, approved, and rejected application states.
- **Conversation**: Group chat entities tied to a specific `Trip`.
- **Message**: Stores individual messages for a specific conversation with sender associations.
- **Review**: Reviews co-travelers. Features a Mongoose post-save hook to automatically recalculate and cache ratings for reviewed profiles.

---

## Real-Time Sockets Event Contract

- **Namespace connection**: Clients connect passing their JWT token. Sockets are validated before connection is established.
- **Client Emits**:
  - `join_trip` (`{ tripId }`): joins socket to room `tripId` after verifying active membership.
  - `send_message` (`{ tripId, text }`): saves message to database and broadcasts it.
  - `typing` (`{ tripId }`): flags active typing state.
  - `stop_typing` (`{ tripId }`): clears typing state.
- **Server Emits**:
  - `receive_message`: broadcasts new message to the room channel.
  - `online_users`: pushes list of active member IDs online.
  - `user_typing`: broadcasts typing status to co-travelers in the room.

---

## REST API Reference

| Endpoint | Method | Middleware | Description |
| :--- | :--- | :--- | :--- |
| `/api/auth/register` | **POST** | *None* | Register new user profile |
| `/api/auth/login` | **POST** | *None* | Login & receive JWT token |
| `/api/users/:id` | **GET** | *None* | View user profile details |
| `/api/users/profile` | **PUT** | `protect` | Update current user's profile |
| `/api/trips` | **POST** | `protect` | Create a new trip plan |
| `/api/trips` | **GET** | *None* | Browse/search trips (with queries) |
| `/api/trips/:id` | **GET** | *None* | Fetch trip details & crew members |
| `/api/trips/:id` | **PUT** | `protect` | Edit trip plan (owner only) |
| `/api/trips/:id` | **DELETE** | `protect` | Delete trip plan (owner only) |
| `/api/trips/my-trips` | **GET** | `protect` | Load hosting, joined & pending lists |
| `/api/trips/:id/request` | **POST** | `protect` | Request to join a trip crew |
| `/api/trips/:id/requests` | **GET** | `protect` | View pending join requests (host only) |
| `/api/requests/:id/accept` | **PATCH** | `protect` | Accept request & add to chat (host only) |
| `/api/requests/:id/reject` | **PATCH** | `protect` | Reject request (host only) |
| `/api/messages/:tripId` | **GET** | `protect` | Load message log (approved members only) |
| `/api/reviews` | **POST** | `protect` | Rate co-traveler after trip ends |
| `/api/reviews/:userId` | **GET** | *None* | Retrieve user reviews |

---

## Environment Variables

Create a `.env` file in `/backend`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/tripconnect
JWT_SECRET=super_secret_tripconnect_token_key_123
```

---

## Scripts

Execute from the `/backend` folder:

### Start Server (Production)
```bash
npm start
```

### Start Server (Development)
Starts server with Nodemon auto-reloads:
```bash
npm run dev
```

### Seed Database
Clears collection logs and seeds initial travelers, trips, and review metrics:
```bash
npm run seed
```
