"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
// GET
router.get('/', async (req, res) => {
    res.json({ message: 'comming' });
});
// POST
router.post('/', auth_controller_1.authController.handleAuth);
exports.default = router;
