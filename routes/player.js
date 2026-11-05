import { Router } from 'express';
import *  as player from '../controllers/player.controller.js';

const router = Router({ mergeParams: true })

router.route('/')
    .get(player.list)
    .post(player.newPlayer)
    .delete(player.deletePlayer)

router.delete('/leave', player.leave)


export default router;