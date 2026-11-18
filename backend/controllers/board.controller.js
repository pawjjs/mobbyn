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

export const skipTurn = (req, res) => {
    const turn = boardService.skipTurn(Number(req.params.index));

    if (turn === null) return res.status(403).json({ error: 'not your turn' });

    res.json(turn);
}

export const discardAndDraw = (req, res) => {
    const discard = boardService.discardAndDraw(Number(req.params.index));

    if (discard === null) return res.status(403).json({ error: 'not your turn' });

    res.json(discard);
}


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