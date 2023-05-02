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

  router.get('/:id', async (req, res) => {
    try {
      const userData = await User.findOne({
        attributes: { exclude: ['password'] },
        where: { id: req.params.id },
        include: [
          {
            model: Post,
            attributes: ['id', 'title', 'content', 'created_at'],
          },
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'created_at'],
            include: {
              model: Post,
              attributes: ['title'],
            },
          },
          {
            model: Post,
            attributes: ['title'],
          },
        ],
      });
      console.log(userData);
      if (!userData) {
        res.status(404).json({ message: `No such user id ${req.params.id}` });
        return;
      }
      res.status(200).json(userData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  