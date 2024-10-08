const express = require("express");
const cors = require("cors");
const axios = require("axios");
const dotenv = require("dotenv");
const path = require("path");
const knex = require("knex")(require("./knexfile"));
const leavesRoutes = require("./routes/leaves-routes");
const eventsRoutes = require("./routes/events-routes");

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";
dotenv.config({ path: path.resolve(__dirname, envFile) });

const app = express();
const port = process.env.PORT || 8080;
const API_KEY = process.env.VITE_GOOGLE_MAPS_API_KEY;
const CORS_ORIGINS = (process.env.CORS_ORIGINS || "").split(",");

app.use((req, res, next) => {
  if (
    req.headers["x-forwarded-proto"] !== "https" &&
    process.env.NODE_ENV === "production"
  ) {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
});

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || CORS_ORIGINS.includes(origin)) {
      return callback(null, true);
    }
    const msg =
      "The CORS policy for this site does not allow access from the specified Origin.";
    return callback(new Error(msg), false);
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/leaves", leavesRoutes);
app.use("/events", eventsRoutes);

app.get("/", (req, res) => {
  res.send("newleaf server up and running!");
});

app.get("/api/searchThriftStores", async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: "coordinates required" });
  }

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json`,
      {
        params: {
          key: API_KEY,
          location: `${lat},${lng}`,
          radius: 1000,
          query: "thrift",
        },
      }
    );

    const results = response.data.results;

    const existingPlaceIds = await knex("leaves").pluck("place_id");
    const uniquePlaceIds = results.filter(
      (result) => !existingPlaceIds.includes(result.place_id)
    );

    if (uniquePlaceIds.length > 0) {
      await knex("leaves").insert(
        uniquePlaceIds.map((result) => ({
          type: "thrift",
          address: result.formatted_address,
          lat: result.geometry.location.lat,
          lng: result.geometry.location.lng,
          description: "Thrift Store",
          website: result.website,
          name: result.name,
          place_id: result.place_id,
        }))
      );
    }

    res.json(uniquePlaceIds);
  } catch (error) {
    console.error("error fetching and saving: ", error);
    res.status(500).json({ error: `Error fetching grocery stores` });
  }
});

app.get("/api/searchCommunityGardens", async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: "coordinates required" });
  }

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json`,
      {
        params: {
          key: API_KEY,
          location: `${lat},${lng}`,
          radius: 1000,
          query: "community garden",
        },
      }
    );

    const results = response.data.results;

    const existingPlaceIds = await knex("leaves").pluck("place_id");
    const uniquePlaceIds = results.filter(
      (result) => !existingPlaceIds.includes(result.place_id)
    );

    if (uniquePlaceIds.length > 0) {
      await knex("leaves").insert(
        uniquePlaceIds.map((result) => ({
          type: "garden",
          address: result.formatted_address,
          lat: result.geometry.location.lat,
          lng: result.geometry.location.lng,
          description: "Community Garden",
          website: result.website,
          name: result.name,
          place_id: result.place_id,
        }))
      );
    }

    res.json(uniquePlaceIds);
  } catch (error) {
    console.error("error fetching and saving: ", error);
    res.status(500).json({ error: `Error fetching grocery stores` });
  }
});

app.listen(port, () => {
  console.log(`newleaf server is running on ${port}.`);
});
