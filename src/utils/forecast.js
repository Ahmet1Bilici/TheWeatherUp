const request = require("request");

const forecast = (lat, long, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=abab1218eed6f0789f060b729c440ba1&units=m&query=" +
    encodeURIComponent(lat) +
    "," +
    encodeURIComponent(long);

  request({ url: url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Error! Unable to connect weather service!", undefined);
    } else if (body.error) {
      callback("Error! Unable to locate your location!", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " degrees out. It feels like " +
          body.current.feelslike +
          " degrees out."
      );
    }
  });
};

module.exports = forecast;
