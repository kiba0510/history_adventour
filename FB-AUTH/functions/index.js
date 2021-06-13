const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const app = express();
const routes = express();

const serviceAccount = require("./permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fb-api-7cc35.firebaio.com",
});

app. get("/places", (req, res) => {
  return res.status(200).json({message: "Hello World"});
});

app.use(require("./routes/routes_sites.js"));
routes.use(require("./routes/users_routes.js"));

exports.app = functions.https.onRequest(app);
exports.routes = functions.https.onRequest(routes);
