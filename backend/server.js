require("dotenv").config();
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const path = require("path");
const fs = require("fs");
const Trip = require("./models/Trip");

const connectDB = require("./config/db");
const initChatSocket = require("./sockets/chatSocket");

// Import Route files
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const tripRoutes = require("./routes/tripRoutes");
const requestRoutes = require("./routes/requestRoutes");
const messageRoutes = require("./routes/messageRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

// Connect to database
connectDB();

const app = express();
const server = http.createServer(app);

// Initialize Socket.io
const io = socketio(server, {
  cors: {
    origin: "*", // Allow all origins for dev; specify frontends in production
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  },
});

initChatSocket(io);

// Enable CORS
app.use(cors());

// Body parser
app.use(express.json());

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // Limit each IP to 300 requests per windowMs
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after 15 minutes",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/", limiter);

// Mount API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/reviews", reviewRoutes);

// Robots.txt dynamic handler
app.get("/robots.txt", (req, res) => {
  const protocol = req.secure || req.headers["x-forwarded-proto"] === "https" ? "https" : "http";
  const sitemapUrl = `${protocol}://${req.headers.host}/sitemap.xml`;
  
  res.type("text/plain");
  res.send(`User-agent: *
Allow: /
Allow: /trips
Allow: /about
Allow: /safety
Allow: /support
Allow: /privacy
Allow: /terms
Disallow: /login
Disallow: /register
Disallow: /profile/
Disallow: /edit-profile
Disallow: /create-trip
Disallow: /edit-trip/
Disallow: /my-trips
Disallow: /chat/

Sitemap: ${sitemapUrl}
`);
});

// Sitemap.xml dynamic handler
app.get("/sitemap.xml", async (req, res) => {
  try {
    const protocol = req.secure || req.headers["x-forwarded-proto"] === "https" ? "https" : "http";
    const host = `${protocol}://${req.headers.host}`;
    
    // Fetch all trips to include them in the sitemap
    const trips = await Trip.find({}).select("_id updatedAt");
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${host}/</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${host}/trips</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${host}/about</loc>
    <lastmod>2026-06-25</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${host}/safety</loc>
    <lastmod>2026-06-25</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${host}/support</loc>
    <lastmod>2026-06-25</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${host}/privacy</loc>
    <lastmod>2026-06-25</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${host}/terms</loc>
    <lastmod>2026-06-25</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>`;

    trips.forEach((trip) => {
      const updatedAtStr = (trip.updatedAt || new Date()).toISOString().split("T")[0];
      xml += `
  <url>
    <loc>${host}/trips/${trip._id}</loc>
    <lastmod>${updatedAtStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    xml += `
</urlset>`;

    res.type("application/xml");
    res.send(xml);
  } catch (err) {
    console.error("Sitemap generation error:", err);
    res.status(500).send("Error generating sitemap");
  }
});

// Serve static assets in production & inject SEO metadata
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "../frontend/dist");

  // Serve static assets
  app.use(express.static(distPath));

  // Dynamic SEO metadata injection for trip detail pages
  app.get("/trips/:id", async (req, res, next) => {
    try {
      const trip = await Trip.findById(req.params.id);
      if (!trip) {
        return next();
      }

      const indexPath = path.join(distPath, "index.html");
      if (!fs.existsSync(indexPath)) {
        return next();
      }

      let html = fs.readFileSync(indexPath, "utf8");

      const title = `${trip.destination} Trip - TripConnect`;
      const description = `Join this trip to ${trip.destination}! Budget: $${trip.budget}. Dates: ${new Date(trip.startDate).toLocaleDateString()} to ${new Date(trip.endDate).toLocaleDateString()}. Description: ${trip.description.slice(0, 150)}...`;
      
      html = html
        .replace(/<title>.*?<\/title>/g, `<title>${title}</title>`)
        .replace(/<meta property="og:title" content=".*?" \/>/g, `<meta property="og:title" content="${title}" />`)
        .replace(/<meta name="twitter:title" content=".*?" \/>/g, `<meta name="twitter:title" content="${title}" />`)
        .replace(/<meta name="description" content=".*?" \/>/g, `<meta name="description" content="${description}" />`)
        .replace(/<meta property="og:description" content=".*?" \/>/g, `<meta property="og:description" content="${description}" />`)
        .replace(/<meta name="twitter:description" content=".*?" \/>/g, `<meta name="twitter:description" content="${description}" />`)
        .replace(/<meta property="og:url" content=".*?" \/>/g, `<meta property="og:url" content="https://${req.headers.host}/trips/${trip._id}" />`);

      res.send(html);
    } catch (err) {
      console.error("SEO Metadata Injector Error:", err);
      next();
    }
  });

  // Catch-all to serve index.html for React routing
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
} else {
  // Catch-all 404 Route for Development
  app.use((req, res, next) => {
    res.status(404).json({ success: false, message: "API endpoint not found" });
  });
}

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error occurred",
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || "development"} mode on http://localhost:${PORT}`);
});
