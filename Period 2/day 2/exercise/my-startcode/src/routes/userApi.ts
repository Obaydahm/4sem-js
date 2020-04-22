import express from "express";
import UserFacade from "../facades/userFacade";

const router = express.Router();


router.get("/", async (req, res) => {
    try {
        res.send(UserFacade.getAllUsers());
    } catch (e) {
        res.status(404).send(e.message);
    }
})

router.get("/:username", async (req, res) => {
    try {
        res.send(UserFacade.getUser(req.params.username));
    } catch (e) {
        res.status(404).send(e.message);
    }
})

router.post('/', async (req, res, next) => {
    try {
        UserFacade.addUser(req.body)
        return res.send(`${req.body.name} has been created!`)
    } catch (e) {
        next(e)
    }
})

router.delete('/:username', async (req, res) => {
    try {
        UserFacade.deleteUser(req.params.username);
        return res.send(`${req.params.username} has been deleted!`)

    } catch (e) {
        res.send(e.message)
    }
})

module.exports = router;