import express, { Request, Response } from "express";
import { saveData } from "../utils/saveData";
import upload from "../utils/saveImage";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  // 사용자 목록 가져오기
});

router.post("/", upload.single('images'), (req: Request, res: Response) => {
  const file = req.file;
  if (!file) {
      return res.status(400).send({ message: "Please upload an image." });
  }

  const artist = req.body;
  artist.artistImageURL = file.path;

  const newId = saveData("artists.json", artist);
  res.send({ message: "Artist saved successfully!", id: newId });
});

router.delete("/:id", (req: Request, res: Response) => {
  // 사용자 삭제하기
});

router.patch("/:id", (req: Request, res: Response) => {
  // 사용자 정보 수정하기
});

export default router;
