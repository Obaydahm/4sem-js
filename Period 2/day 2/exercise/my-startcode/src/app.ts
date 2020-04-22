require('dotenv').config();
import express from "express";
import path from "path";
const app = express();
const userAPIRouter = require("./routes/userApi")
app.use(express.json());

const { UserFacade } = require("./facades/userFacade");



app.get("/api/dummy", (req, res) => {
	res.json({ msg: "Hello" })
})

app.use("/api/users", userAPIRouter)

const PORT = process.env.PORT || 3333;
const server = app.listen(PORT)
console.log(`Server started, listening on port: ${PORT}`)
module.exports.server = server;


