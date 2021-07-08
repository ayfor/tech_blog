const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/', async (req, res) => {
  try{
    const newComment = await Comment.create({
        description:req.body.description,
        post_id:req.body.id,
        user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  }catch(err){
      res.status(400).json(err);
  }
});

module.exports = router;
