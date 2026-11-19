import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as boardService from '../services/boardService.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const showBoard = (req, res) => {
  res.sendFile(path.join(__dirname, '../views/board.html'));
};

export const getCards = (req, res) => {
    res.json(boardService.gettAll());
}

export const getPlayers = (req, res) => {
    res.json(boardService.getPlayers());
}

export const getTurn = (req, res) => {
    res.json(boardService.getTurn());
}

export const getInfo = (req, res) => {
    res.json(boardService.getInfo());
}

export const resetGame = (req, res) => {
    res.json(boardService.resetGame());
}

export const attackCard = (req, res) => {
    const playerIndex = Number(req.body?.playerIndex);
    const card = req.body?.card;
    if (!card?.s || !card?.r) {
        return res.status(400).json({ error: "Brak karty" });
    }
    const info = boardService.attackCard(playerIndex, card);
    if (info === null) return res.status(403).json({ error: "Nie można zaatakować" });
    res.json(info);
};

export const defendCard = (req, res) => {
    const playerIndex = Number(req.body?.playerIndex);
    const card = req.body?.card;
    if (!card?.s || !card?.r) {
        return res.status(400).json({ error: "Brak karty" });
    }
    const info = boardService.defendCard(playerIndex, card);
    if (info === null) {
        return res.status(403).json({ error: "Nie można obronić (tura lub karta)" });
    }
    res.json(info);
};

export const endDefense = (req, res) => {
    const playerIndex = Number(req.body?.playerIndex);
    const info = boardService.endDefense(playerIndex);
    if (info === null) {
        return res.status(403).json({ error: "Nie można zakończyć obrony" });
    }
    res.json(info);
};

export const surrenderDefense = (req, res) => {
    const playerIndex = Number(req.body?.playerIndex);
    const info = boardService.surrenderDefense(playerIndex);
    if (info === null) {
        return res.status(403).json({ error: "Nie można się poddać" });
    }
    res.json(info);
};

export function availableBoards(req, res) {

}

export function newBoard(req, res) {

}

export function editBoard(req, res) {
    
}

export function deleteBoard(req, res) {
    
}

export function getBoardById(req, res) {
    
}

export function startGame(req, res) {
    
}