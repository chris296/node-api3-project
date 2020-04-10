const express = require('express');

const Users = require('./userDb');
const Posts = require('../posts/postDb')

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
  Users.insert(req.body)
  .then(user => {
    res.status(201).json(user);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      message: 'error adding user'
    })
  })
});

router.post('/:id/posts', validatePost, (req, res) => {
  // do your magic!
const postinfo = {...req.body, user_id: req.params.id}
  Posts.insert(postinfo)
  .then(post => {
    res.status(210).json({post});
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      message: 'error creating post'
    })
  })
});

router.get('/', (req, res) => {
  // do your magic!
  Users.get()
  .then(users => {
    res.status(200).json(users);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      message: 'error getting users'
    })
  })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  Users.getById(req.params.id)
  .then(user => {
    res.status(200).json(user);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      message: 'error getting user'
    })
  })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  Users.getUserPosts(req.params.id)
  .then(posts => {
    res.status(200).json(posts);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      message: 'error getting user posts'
    })
  })
});

router.delete('/:id', (req, res) => {
  // do your magic!
  Users.remove(req.params.id)
  .then(res.status(200).json({ message: 'user deleted' }))
  .catch(err => {
    console.log(err);
    res.status(500).json({
      message: 'error deleting user'
    })
  })
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
  Users.update(req.params.id, req.body)
  .then(user => {
    res.status(200).json(user);
  })
  .catch(err => {
    console.log(500).json({
      message: 'error updating user'
    })
  })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
 Users.getById(req.params.id)
 .then(user => {
   if (!user) {
     res.status(400).json({ message: 'invalid user id'});
   } else {
     next()
   }
 })
 .catch(err => {
   console.log(err)
 })
  
}

function validateUser(req, res, next) {
  // do your magic!
  console.log(req.body);
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({message: "missing user data"})
  } else if (!req.body.name) {
    res.status(400).json({message: "missing required name field"})
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({message: 'missing post data'})
  } else if (!req.body.text) {
    res.status(400).json({ message: 'missing required text field'})
  } else {
    next();
  }
}

module.exports = router;
