const express = require("express");
const app = express();
const userRoutes = require("./api/routes/userRoutes");
const gameRoutes = require("./api/routes/gameRoutes");
const achievementRoutes = require("./api/routes/achievementRoutes");
const nftRoutes = require("./api/routes/nftRoutes");
const profile = require("./api/routes/profile");
const setting = require("./api/routes/setting");
const bodyParser = require("body-parser");
const scoreRouter = require("./api/routes/score");
// const scoreRouter2 = require('./api/routes/score2');

const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// Middleware setup
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
// app.use(cors());

// // CORS configuration
const allowedOrigins = [
  "http://localhost:3000",
  "https://zorro-psycho.github.io",
  "https://zorro-psycho.github.io/snake",
  "https://backend-8v17.onrender.com",
  "https://ngz.netlify.app",
];
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests without an Origin header (e.g., from Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Route setup
app.use("/api", scoreRouter);
// app.use('/api', scoreRouter2);

app.use("/api/Users", userRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/nfts", nftRoutes);
app.use("/api/Users", profile);
app.use("/api/Users", setting);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
