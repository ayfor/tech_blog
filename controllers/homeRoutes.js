const router = require('express').Router();
const { Post, Comment, User } = require('../models');

router.get('/', async (req, res) => {
  
  let isLoggedIn = req.session.logged_in;

  if (!isLoggedIn) {
    res.redirect('/login');
    return;
  }
  else
  {
    res.redirect('/dashboard');
    return;
  }
  
});

router.get('/dashboard', async (req, res) => {
  let isLoggedIn = req.session.logged_in;
  if(!isLoggedIn){
    res.redirect('/login');
  }else{
    try {
      // Find the posts for the current user
      const postsData = await Post.findAll();      
      
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
      console.log(err);
    }
  }

  
})

router.get('/project/:id', async (req, res) => {
 
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

module.exports = router;
