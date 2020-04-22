require('dotenv').config();
import express from "express";
import path from "path";
const app = express();
app.use(express.json());

const { UserFacade } = require("./facades/userFacade");



app.get("/api/dummy", (req, res) => {
	res.json({ msg: "Hello" })
})

app.get("/api/users", (req, res) => {
	try {
		res.send(UserFacade.getAllUsers());
	} catch (e) {
		res.status(404).send(e.message);
	}
})

app.get("/api/user/:username", (req, res) => {
	try {
		res.send(UserFacade.getUser(req.params.username));
	} catch (e) {
		res.status(404).send(e.message);
	}
})

app.post('/api/user', (req, res) => {
	try {
		UserFacade.addUser(req.body)
		return res.send(`${req.body.name} has been created!`)
	} catch (e) {
		return res.status(400).send(e.message)
	}
})

app.delete('/api/user/:username', (req, res) => {
	try {
		UserFacade.deleteUser(req.params.username);
		return res.send(`${req.params.username} has been deleted!`)

	} catch (e) {
		res.send(e.message)
	}
})

const PORT = process.env.PORT || 3333;
const server = app.listen(PORT)
console.log(`Server started, listening on port: ${PORT}`)
module.exports.server = server;


