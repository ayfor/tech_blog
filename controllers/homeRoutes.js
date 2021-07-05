const router = require('express').Router();
// const { Project, User } = require('../models');

router.get('/', async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }
  // else
  // {
  //   res.redirect('/login');
  // }
  
});

router.get('/project/:id', async (req, res) => {
 
});

router.get('/signup', async (req, res) => {
  res.render('signup')
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  // if (req.session.logged_in) {
  //   res.redirect('/dashboard');
  //   return;
  // }

  res.render('login');
});

module.exports = router;
