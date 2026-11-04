import express from "express";
import readline from "readline";
import path from "node:path";
import { fileURLToPath } from "node:url";

import indexRoutes from './routes/index.js'
import boardRoutes from './routes/board.js'
import boardApiRoutes from './routes/board.api.js';

import Duren from "./DurenLogic.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
const PORT = 3000;

app.use('/', indexRoutes)
app.use('/board', boardRoutes)
app.use('/api/board', boardApiRoutes);






const DurenGame = new Duren();

function printHands() {
    console.log("Karty pozostałe w talii:", DurenGame.playDeck.length);
    for (const player of DurenGame.players) {
        const hand = player.hand.map((c) => `${c.r} ${c.s}`).join(", ");
        console.log(`${player.name}: ${hand}`);
    }
}

function printTurn() {
    console.log(`\nRuch: ${DurenGame.getCurrentPlayer().name}`);
}

printHands();
printTurn();
console.log('Komendy: "skip" | "wyrzuc"');

function handleCommand(line) {
    const parts = line.trim().split(/\s+/);
    const command = parts[0]?.toLowerCase();
    let player = DurenGame.getCurrentPlayer();

    if (command === "skip") {
        DurenGame.skipTurn();
        player = DurenGame.getCurrentPlayer();
        printHands();
        printTurn();
        return;
    }

    if (command === "wyrzuc") {
        DurenGame.discardAndDraw();
        if (player.hand.length === 0) {
            DurenGame.playersLeft.splice(DurenGame.currentPlayerIndex,1);
            if (DurenGame.duren()){
                return;
            }
            DurenGame.currentPlayerIndex %= DurenGame.playersLeft.length;
        }
        printHands();
        printTurn();
        return;
    }
    if (command === "wyjeb") {
        for (let i = 0; i < 6; i++) {
            DurenGame.discardAndDraw();
        }
        printHands();
        printTurn();
        return;
    }

    if (line.trim()) {
        console.log('Nieznana komenda. Użyj: "skip" lub "wyrzuc"');
    }

}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.on("line", handleCommand);

app.get("/", (req, res) => {
    res.json({
        currentPlayer: DurenGame.getCurrentPlayer().name,
        remainingInDeck: DurenGame.playDeck.length,
        playerHands: DurenGame.getPlayerHands(),
    });
});

app.listen(PORT, () => {
    console.log(`Server running at
    http://localhost:${PORT}`);
});