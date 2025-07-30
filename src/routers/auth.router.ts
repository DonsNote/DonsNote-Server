import { Router } from "express";
import { authController } from "../controllers/auth.controller";

const router = Router();


/* -- POST -- */

/* Signup */
router.post('/', authController.handleAuth);

export default router;