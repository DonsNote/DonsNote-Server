"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// GET
router.get('/', async (req, res) => {
    res.json({ message: '모든 유저 목록입니다.' });
});
// POST
router.post('/', async (req, res) => {
    const { name, email } = req.body;
    res.json({ message: `유저 ${name}(${email})이(가) 생성되었습니다.` });
});
exports.default = router;
