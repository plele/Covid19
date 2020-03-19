const path = require("path");
const express = require("express");
const app = express();
const request = require("request");
const mockData = require("./mock.js");

app.get("/", function(req, res) {
  res.sendFile(path.resolve(__dirname, "Covid19.html"));
});

app.get("/countries", (req, res) => {
  request("https://corona.lmao.ninja/countries?sort=country", function(
    error,
    response,
    body
  ) {
    let responseData = mockData;

    if (response.statusCode === 200) {
      const parsedBody = JSON.parse(body);
      responseData = parsedBody.length > 0 && parsedBody;
    }

    res.json(responseData);
  });
});

app.use(express.static("public"));

app.listen(8001, () => {
  console.log("Listening on port 8001");
});
