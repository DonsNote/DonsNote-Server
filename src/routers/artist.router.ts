import { Router } from "express";

const router = Router();



// GET
router.get('/', async (req, res) => {
    res.json({ message: '모든 아티스트 목록입니다.' });
});

// POST
router.post('/', async (req, res) => {
    const { name, email } = req.body;
    res.json({ message: `아티스트 ${name}(${email})이(가) 생성되었습니다.` });
});

export default router;