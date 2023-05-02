const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
      const commentData = await Comment.findAll({});
      if (commentData.length === 0) {
        res
          .status(404)
          .json({ message: 'would you believe there are NO comments ANYWHERE?' });
        return;
      }
  
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const commentData = await Comment.findAll({
        where: { id: req.params.id },
      });
      if (commentData.length === 0) {
        res
          .status(404)
          .json({ message: `There is no comment with id = ${req.params.id}` });
        return;
      }
      // res.status(200).json(commentData.reverse());
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  