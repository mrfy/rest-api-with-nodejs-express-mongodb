import { User, UserModel } from '../models';
import express, { Request, Response } from 'express';

import jwt from 'jsonwebtoken';

const router = express.Router();
const bcrypt = require('bcrypt');
const checkAuth = require('../middleware/checkAuth');

//GET ALL USERS
router.get('/', checkAuth, async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

//CREATE NEW USER
router.post('/signup', async (req: Request, res: Response) => {
  try {
    const existingUser = await UserModel.find({ email: req.body.email });

    if (existingUser.length !== 0) {
      return res.status(409).json({ message: 'The User does exist ...' });
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const user = new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      profile_picture: req.body.profile_picture,
    });
    const createdUser = await user.save();
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

//UPDATE USER INFO
router.put('/:user_id', checkAuth, (req, res) => {
  UserModel.updateMany({ _id: req.params.user_id }, { $set: req.body })
    .exec()
    .then(() => {
      res.json(req.body);
    })
    .catch((err: any) => {
      res.json({ message: err });
    });
});

//DELETE USER
router.delete('/:userID', checkAuth, async (req, res) => {
  try {
    const deletedUser = await UserModel.deleteOne({ _id: req.params.userID });
    res.status(200).json({
      message: 'User been deleted ...',
      data: deletedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.post('/login', (req, res) => {
  UserModel.findOne({ email: req.body.email })
    .lean()
    .exec()
    .then((user: any) => {
      console.log('🚀 ~ file: user.ts ~ line 71 ~ .then ~ user', user);
      if (user) {
        verifyPassword(user, req, res);
      } else {
        res.json({ message: 'Incorrect email or password...' });
      }
    })
    .catch((error: any) => {
      res.status(500).json({ message: `error : ${error}` });
    });
});
//VERIFY PASSWORD
const verifyPassword = (user: any, req: Request, res: Response) => {
  bcrypt.compare(req.body.password, user.password, (err: any, result: any) => {
    if (err) return res.status(500).json({ message: err });
    else {
      if (result) return getToken(user, res);
      else return res.json({ message: 'Authentication failed ...' });
    }
  });
};

const getToken = (user: any, res: Response) => {
  const token = jwt.sign(
    { email: user.email, userId: user._id },
    process.env.JWT_KEY as string,
    { expiresIn: '1h' },
  );
  const oneDayToSeconds = 24 * 60 * 60;

  res.cookie('access_token', token, {
    maxAge: oneDayToSeconds,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' ? true : false,
  });
  res.json({
    message: 'Auth successful',
    user,
  });
};

export default router;
