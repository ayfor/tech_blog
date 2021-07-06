const router = require('express').Router();
// const { Project, User } = require('../models');

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

  res.render('dashboard', { logged_in:isLoggedIn } )
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
