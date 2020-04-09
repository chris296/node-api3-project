const express = require('express');

const Users = require('./userDb');

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
  const userPost = { ...req.body, user_id };

  Users.insert(userPost)
  .then(post => {
    res.status(210).json(post);
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

router.get('/:id', (req, res) => {
  // do your magic!
  Users.getById(req.params.id)
  .then(user => {
    res.status(200).json(users);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      message: 'error getting user'
    })
  })
});

router.get('/:id/posts', (req, res) => {
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

router.put('/:id', (req, res) => {
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
}

function validateUser(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({message: "missing user data"})
  } else if (!req.body.name) {
    res.status(400).json({message: "missing required name field"})
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({message: 'missing post data'})
  } else if (!req.body.text) {
    res.status(400).json({ message: 'missing required text field'})
  } else {
    next();
  }
}

module.exports = router;
