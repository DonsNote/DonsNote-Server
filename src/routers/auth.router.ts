import { Router } from "express";
import { authController } from "../controllers/auth.controller";

const router = Router();



// GET
router.get('/', async (req, res) => {
    res.json({ message: 'comming' });
});

// POST
router.post('/', authController.handleAuth);

export default router;