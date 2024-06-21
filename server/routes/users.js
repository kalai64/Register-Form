const express = require('express')
const router = express.Router()
const multer = require('multer')
const User = require('../models/user')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  },
})

const upload = multer({ storage })

// Create new user
router.post('/', upload.single('file'), async (req, res) => {
  const { firstname, lastname, email, gender, city, state, zipcode } = req.body
  const file = req.file.path

  const newUser = new User({ firstname, lastname, email, gender, city, state, zipcode, file })
  await newUser.save()
  res.json(newUser)
});

// Get all users
router.get('/', async (req, res) => {
  const users = await User.find()
  res.json(users)
});

module.exports = router;
