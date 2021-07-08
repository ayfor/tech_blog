const router = require('express').Router();
const { Post, Comment, User } = require('../models');

router.get('/', async (req, res) => {
  
  res.redirect('/home');
  
});

router.get('/dashboard', async (req, res) => {
  let isLoggedIn = req.session.logged_in;
  if(!isLoggedIn){
    res.redirect('/login');
  }else{
    try {
      // Find the posts for the current user
      const postsData = await Post.findAll({
        where:{
          user_id:req.session.user_id
        }
      });      
      
      if(!postsData){
        res.status(200).json({message:"Hoot hoot!"});
        return;
      }
        
      let postsString = JSON.stringify(postsData);
      let postsArray = JSON.parse(postsString)

      let posts = postsArray.map((obj)=>{
        obj.date_created = obj.date_created.split('T')[0];
        return obj;
      })
      
      //console.log(posts);

      res.render('dashboard', {
        posts,
        logged_in: true
      });
    
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

router.get('/home', async (req, res) => {  
  try {
    // Find the posts for the current user
    const postsData = await Post.findAll({
      include:{
        model:User,
        as: 'user'
      }
    });      
    
    if(!postsData){
      res.status(200).json({message:"Hoot hoot!"});
      return;
    }
      
    let postsString = JSON.stringify(postsData);
    let postsArray = JSON.parse(postsString);

    let posts = postsArray.map((obj)=>{
      obj.date_created = obj.date_created.split('T')[0];
      return obj;
    })
    
    res.render('home', {
      posts,
      logged_in:req.session.logged_in
    });
  
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
  
});

router.get('/viewpost/:id', async (req, res) => {

  try {
    const postData = await Post.findByPk(req.params.id, {
      include:{
        model:User,
        as: 'user'
      }
    });

    const commentData = await Comment.findAll({
      where:{
        post_id: req.params.id
      },
      include:{
        model:User,
        as: 'user'
      }
    })

    let comment = {};

    if(!postData){
      res.status(404).json({message:"No post with given id!"});
      return;
    }

    if(commentData.length !== 0){
      let commentString = JSON.stringify(commentData);
      comment = JSON.parse(commentString)[0];
      comment.date_created = comment.date_created.split('T')[0];
    }

    let postString = JSON.stringify(postData);
    let post = JSON.parse(postString);

    post.date_created = post.date_created.split('T')[0];

    res.render('comment', {
    post,
    comment,
    logged_in:req.session.logged_in
    });

  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }

});

router.get('/newpost', async (req, res) => {

  let post = {};

  res.render('post', {
    post,
    logged_in:req.session.logged_in
  });
  
});


router.get('/posts/:id', async (req, res) => {

  try {
    const postData = await Post.findByPk(req.params.id);

    if(!postData){
      res.status(404).json({message:"No post with given id!"});
      return;
    }

    let postString = JSON.stringify(postData);
    let post = JSON.parse(postString);

    res.render('post', {
    post,
    logged_in:req.session.logged_in
    });

  } catch (error) {
    res.status(500).json(err);
    console.log(err);
  }
  
});

router.get('/signup', async (req, res) => {

  res.render('signup', { logged_in:false } )
});

router.get('/login', (req, res) => {

  let isLoggedIn = req.session.logged_in;

  //If the user is already logged in, redirect the request to another route
  // if (req.session.logged_in) {
  //   res.redirect('/dashboard');
  //   return;
  // }

  res.render('login', { logged_in:isLoggedIn } );
});

router.get('*', async (req, res) => {
  
  res.redirect('/home');
  
});

module.exports = router;
