const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const User = require('./models/user')

const app = express()

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/',(req,res)=>{
  res.send('<h1>Server is Live</h1>')
})

// mongoose connection
mongoose.connect('mongodb+srv://kalai6464:kalai6464@cluster0.suros08.mongodb.net/form', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err))


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true)
  } else {
    cb(new Error('Only PDF files are allowed!'), false)
  }
}

const upload = multer({ dest: 'uploads/' })

//upload a user with a PDF file
app.post('/createUser', upload.single('file'), async (req, res) => {
  const { firstname, lastname, email, gender, city, state, zip } = req.body
  const file = req.file ? req.file.filename : null;

  const newUser = new User({ firstname, lastname, email, gender, city, state, zip, file })
  
  try {
    await newUser.save()
    res.json(newUser)
  } catch (error) {
    res.status(500).send(error)
  }
});

// Endpoint to serve PDF files
app.get('/files/:filename', (req, res) => {
  const filename = req.params.filename
  const filePath = path.join(__dirname, 'uploads', filename)

  // Check if the file
  if (fs.existsSync(filePath)) {
    const stat = fs.statSync(filePath)
    const fileSize = stat.size
    
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Length', fileSize)
    res.setHeader('Content-Disposition', `inline; filename=${filename}`)

    const fileStream = fs.createReadStream(filePath)
    fileStream.pipe(res)
  } else {
    res.status(404).send('File not found')
  }
});

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.status(500).send(error)
  }
});

// delete user by id
app.delete('/deleteData/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' })
    }

    // delete the associated file
    if (user.file) {
      const filePath = path.join(__dirname, 'uploads', user.file)
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
    }

    // delete the user
    await User.findByIdAndDelete(id);
    res.status(200).send({ message: 'file deleted successfully' })
  } catch (error) {
    console.error('Error deleting user or file:', error)
    res.status(500).send({ message: 'Internal Server Error' })
  }
});


app.listen(8000, () => console.log('Server running on port 8000'))
