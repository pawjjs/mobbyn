import { Router } from 'express';
import * as controller from '../controllers/board.controller.js';

const router = Router();

router.get('/cards', controller.getCards);

router.get('/players', controller.getPlayers);

router.get('/turn', controller.getTurn);

router.get('/info', controller.getInfo);

router.post('/reset', controller.resetGame);

router.post('/attack', controller.attackCard);

router.post('/defend', controller.defendCard);

router.post('/defense/end', controller.endDefense);

router.post('/defense/surrender', controller.surrenderDefense);

export default router;