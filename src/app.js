const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();

// Define paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "fname lname",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "fname lname",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    text: "Welcome to help page where you can find help",
    name: "fname lname",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Must provide address" });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error: "Failed in geocode!" });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error: "Failed in forecast" });
        }
        res.send([
          {
            forecast: forecastData,
            location: location,
            address: req.query.address,
          },
        ]);
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "Must provide search term(s)" });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "fname lname",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "fname lname",
    errorMessage: "Page not found.",
  });
});

app.listen(3000, () => {
  console.log("server is up on port 3000");
});
