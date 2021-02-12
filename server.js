// server.js
// where your node app starts

// init project
const {
    isValid: dIsValid,
    parseRouteParam: dParseRouteParam,
    today: dToday,
} = require("./date");
const express = require("express");

const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/timestamp/:date?", (req, res) => {
    const params = req.params;

    let date = dToday();
    if (params.date != null) {
        date = new Date(dParseRouteParam(params.date));
    }

    if (dIsValid(date) === false) {
        // HTTP 400 Bad Request
        res.status(400).json({ error: "Invalid Date" });
        return;
    }

    const timestamp = {
        unix: date.getTime(),
        utc: date.toUTCString(),
    };

    res.json(timestamp);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
    console.log("Your app is listening on port " + listener.address().port);
});
