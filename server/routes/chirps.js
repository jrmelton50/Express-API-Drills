const express = require("express");
const chirpstore = require("../chirpstore");
let router = express.Router();

router.get("/", (req, res) => {
    res.send(chirpstore.GetChirps());
});

router.get("/:id", (req, res) => {
    res.send(chirpstore.GetChirp(req.params.id));
});

router.post("/", (req, res) => {
    chirpstore.CreateChirp(req.body);
    res.sendStatus(200);
});

router.put("/:id", (req, res) => {
    chirpstore.UpdateChirp(req.params.id, chirpstore.GetChirp(id));
    res.sendStatus(200);
});

router.delete("/:id", (req, res) => {
    chirpstore.DeleteChirp(req.params.id);
    res.sendStatus(200);
});

module.exports = router;