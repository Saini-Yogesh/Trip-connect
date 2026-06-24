# TripConnect Frontend &mdash; React 19 + Vite

This is the frontend client for the TripConnect travel companion application. It is built using **React 19**, **Vite**, **React Router DOM v6**, **Axios**, and **Socket.io Client**.

---

## Folder Structure

```txt
frontend/
  ├── public/             # Static files
  ├── src/
  │    ├── assets/        # Media assets
  │    ├── components/    # Reusable UI components (CSS Modules)
  │    │    ├── Button/
  │    │    ├── Input/
  │    │    ├── Navbar/
  │    │    ├── Footer/
  │    │    ├── TripCard/
  │    │    ├── ProfileCard/
  │    │    ├── Modal/
  │    │    └── ChatBox/
  │    ├── context/       # Auth and Socket state providers
  │    │    ├── AuthContext.jsx
  │    │    └── SocketContext.jsx
  │    ├── pages/         # Page Views
  │    │    ├── LandingPage/
  │    │    ├── LoginPage/
  │    │    ├── RegisterPage/
  │    │    ├── TripsPage/
  │    │    ├── TripDetailsPage/
  │    │    ├── CreateTripPage/
  │    │    ├── EditTripPage/
  │    │    ├── MyTripsPage/
  │    │    ├── ProfilePage/
  │    │    ├── EditProfilePage/
  │    │    └── ChatPage/
  │    ├── App.jsx        # Routing and layout structure
  │    ├── index.css      # Core styles & variables
  │    └── main.jsx       # React entry point
  ├── vite.config.js      # Vite dev configuration (Proxies API)
  ├── vercel.json         # Vercel SPA routing rules
  └── package.json        # Frontend scripts & dependencies
```

---

## Core Technologies & Design Patterns

1. **Vite Development Engine**: Fast builds and hot module replacement (HMR) with configured proxying of API and Socket requests to the backend server.
2. **Context Providers**:
   - `AuthContext`: Tracks session JWTs, handles Axios authentication header bindings, loads the user profile, and processes registrations/logins.
   - `SocketContext`: Connects client-side socket instances to the backend node server when a user token is verified.
3. **CSS Modules**: Standardized styling isolation using local class scopes. Prevents class collisions and ensures modularity.
4. **Single Page Application (SPA) Routing**: Handles dynamic page loading. Uses a custom `<ProtectedRoute>` component to guard session pages.

---

## Environment Configuration

Create a `.env` file in the root of `/frontend` directory:

```env
VITE_API_URL=http://localhost:5000
```
*Note: In development, Vite uses the proxy configured in `vite.config.js`. Setting `VITE_API_URL` overrides this proxy and routes requests directly to the backend URL, which is required for production builds.*

---

## Scripts & Operations

Inside the `/frontend` directory, you can run:

### Development server
Starts Vite server on `http://localhost:5173`:
```bash
npm run dev
```

### Production Build
Compiles all modules, checks routes, and builds artifacts to `dist/` directory:
```bash
npm run build
```

### Local Preview
Runs production build output locally:
```bash
npm run preview
```

---

## Vercel Deployment

This frontend is fully configured for deployment on Vercel:
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Root Directory**: `frontend`
- **Environment Variables**: Add `VITE_API_URL` pointing to your deployed backend URL.
- **SPA Routing**: Handled by `vercel.json` which maps all virtual paths back to `index.html`.
