const request = require("request");

const geocode = (address, callback) => {
  const url =
    "http://api.positionstack.com/v1/forward?access_key=e2ac87090ebb06dceb19b7973d57c9d9&query=" +
    encodeURIComponent(address);

  request({ url: url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Error! Unable to connect to location services!", undefined);
    } else if (!body.data) {
      callback("Error! Unable to locate your location!", undefined);
    } else {
      callback(undefined, {
        latitude: body.data[0].latitude,
        longitude: body.data[0].longitude,
        location: body.data[0].label,
      });
    }
  });
};

module.exports = geocode;
