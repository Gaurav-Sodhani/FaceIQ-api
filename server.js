import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import handleRegister from './controllers/register.js';
import handleSignIn from './controllers/signin.js';
import handleProfileGet from './controllers/profile.js';
import { handleImage, handleApiCall } from './controllers/image.js';

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : 'Gaurav@123',
    database : 'FaceIQ-db'
  }
});

const app = express();

app.use(express.json());
app.use(cors());

// app.get('/', (req, res)=>{
//     db.select('*').from('users')
//     .then(data => res.json(data));
// })

app.post('/signin', (req, res) => {handleSignIn(req, res, db, bcrypt)})
app.post('/register', (req, res) => {handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) => {handleProfileGet(req, res, db)})
app.put('/image', (req, res) => {handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {handleApiCall(req, res)})

app.listen(3000, ()=>{
    console.log('app is running on port 3000');
})
