const router = require('express').Router();
const { Project, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  res.redirect('/login');
});

router.get('/project/:id', async (req, res) => {
 
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  // if (req.session.logged_in) {
  //   res.redirect('/profile');
  //   return;
  // }

  res.render('login');
});

module.exports = router;
