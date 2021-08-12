import express, { Request, Response } from 'express';

import PostModel from '../models/Post';
const router = express.Router();
// const PostModel = require('../models/Post');

router.get('/', async (req: Request, res: Response) => {
  try {
    const posts = await PostModel.find();
    res.json(posts);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    let post = new PostModel({ title: req.body.title });
    let data = await post.save();
    res.json(data);
  } catch (error) {
    res.json({ message: error });
  }
});

export default router;
