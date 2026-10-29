import { Router } from 'express';
import *  as board from '../controllers/board.controller.js'
import playerRouter from './player.js'

const router = Router()

router.route('/boards')
    .get(board.availableBoards)
    .post(board.newBoard)
    .put(board.editBoard)
    .delete(board.deleteBoard)


router.get('/boards/:boardId', board.getBoardById)

router.post('/boards/:boardId/start', board.startGame)

router.use('/boards/:boardId/players', playerRouter)


export default router;