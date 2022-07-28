const routes = require("express").Router();

const electricityRoutes = require("./src/modules/electricity");

module.exports = () =>
    routes
        .get("/healthcheck", (req, res) =>
            res.status(200).json({
                message: "Yee! Server is running",
                status: 200,
            }),
        )
        .use(electricityRoutes())
        .all("*", (req, res) => {
            res.status(404).json({
                message: "Not found",
                status: 404,
            });
        });
