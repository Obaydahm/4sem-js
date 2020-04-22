const express = require("express")
const app = express();
const logger = require("./middleware")

app.use(logger)

app.get("/", (req, res, next) => {
    let status = {}
    status.host = req.hostname;
    status.headers = req.headers;
    status.time = new Date();
    console.log(status)
    req.role = "admin"
    next();
})
app.get("/", (req, res) => {
    res.send("hello world, you're " + req.role);
})

app.get("/api/user", (req, res) => {
    const user = { name: "Kurt Wonn" }
    res.json(user);
})

app.get("/api/user2", (req, res) => {
    throw new Error("ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ");
    res.json(user);
})

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(2345, () => {
    console.log("Server started.")
})