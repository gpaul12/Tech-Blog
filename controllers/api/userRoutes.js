const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', async (req, res) => {
    try {
      const userData = await User.findAll({
        attributes: { exclude: ['password'] },
      });
      res.status(200).json(userData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  