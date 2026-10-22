import express from "express";
import Duren from './DurenLogic.js'

const app = express();
const DurenGame = new Duren();
const PORT = 3000;

console.log(DurenGame.playDeck);

app.get("/", (req, res) => {
    res.send("Dureń");
});

app.listen(PORT, () => {
    console.log(`Server running at
    http://localhost:${PORT}`);
});