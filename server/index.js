const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const routes = require("./routes");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(cors());

mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true });

mongoose.connection.on("open", () => {
    app.use("/api", routes());
    console.log("Connected to the database");
    app.listen(process.env.PORT, () => {
        console.log("Server is running on port 8001");
    });
});
