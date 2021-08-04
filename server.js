const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const saltRounds = 10;
const knex = require('knex');
const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/' , (req, res) => {res.send('It is working!')});

app.post('/signIn' , (req, res) => {signIn.handleSignIn(req, res, db, bcrypt)});

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt, saltRounds)});

app.get('/profile/:id' ,(req, res) => {profile.handleProfileGet(req, res, db)});

app.put('/image' ,(req, res) => {image.handleImage(req, res, db)});

app.post('/imageurl' ,(req, res) => {image.handleAPICall(req, res)});

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});

// bcrypt.hash("bacon", saltRounds, function(err, hash) {
//   // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, result) {
//   // result == true
// });
// bcrypt.compare("veggies", hash, function(err, result) {
//   // result == false
// });

/* plan
/ --> res = this is working
/signin --> post = success/fail
/register --> post = user
/profile/:userId --> get = user
/image --> put = user
*/ 