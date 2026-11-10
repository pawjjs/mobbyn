import { Router } from 'express';
import authRouter from './auth.js'
import boardRouter from './board.js'
import * as controller from '../controllers/index.controller.js'


const router = Router()
router.get('/', controller.showIndex)


// router.use('/auth', authRouter)
// router.use('/board', boardRouter)




export default router;