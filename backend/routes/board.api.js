import { Router } from 'express';
import * as controller from '../controllers/board.controller.js';

const router = Router();

router.get('/cards', controller.getCards);

router.get('/players', controller.getPlayers);

router.get('/turn', controller.getTurn);

router.get('/info', controller.getInfo);

router.post('/turn/skip/:index', controller.skipTurn);

router.post('/turn/discar/:index', controller.discardAndDraw);

router.post('/reset', controller.resetGame);

export default router;