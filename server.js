import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { MongoClient, ServerApiVersion } from 'mongodb'
import bcrypt from "bcrypt"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//DATABASE STUFF
const uri = "mongodb+srv://326:timothy326@cluster0.vgrrblc.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    return client
  }
  catch (err) {
    console.log(err)
  }
}

//BCRYPT STUFF
const saltRounds = 10; // Number of salt rounds for bcrypt

//EXPRESS STUFF
const app = express();
const port = 3000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: '*'
}));

app.use('/', express.static('./'));

app.get('/results', (req, res) => {
  res.send('This is a results page!')
});

app.get('/search', (req, res) => {
  res.sendFile('/src/html/search.html', { root: __dirname })
});

app.get('/track', (req, res) => {
  res.sendFile('src/html/track-page.html', { root: __dirname })
});

app.get('/', async (req, res) => {
  res.sendFile('src/html/home-page.html', { root: __dirname })
});

// adding a friend to a list
app.post('/', async (req, res) => {
  run();
  const db = client.db('etalerts');
  const users = db.collection('users');
  const data = req.body;

  const filter = { username: data['username'] };

  let updatefriends = data['friends'];
  const query = { username: data['friendusername'] };
  const frienduser = await users.findOne(query);

  updatefriends.push(frienduser);
  const update = {
    $set: {
      friends: updatefriends,
    }
  }

  const result = await users.updateOne(filter, update);
  const query2 = { username: data['username'] };
  const currentuser = await users.findOne(query2);
  console.log(currentuser);
  res.json(currentuser);
});

app.get('/login', function (req, res) {
  console.log("redirected to login page")
  res.redirect('./src/html/loginPage.html');
});

app.post('/login', async function (req, res) {
  run();
  const db = client.db('etalerts');
  const users = db.collection('users');
  const data = req.body
  const query = { email: data['email'] };
  // Find the document in the collection
  const user = await users.findOne(query);
  if (user == null) {
    res.json(null)
  }
  else {
    if (bcrypt.compareSync(data['password'], user['password'])) {
      console.log("success")
      res.json(user)
    }
    else {
      res.json(null)
    }
  }
});

app.get('/signup', function (req, res) {
  console.log("redirected to signup page")
  res.redirect('./src/html/signupPage.html');
});

app.post('/signup', async function (req, res) {
  run();
  const db = client.db('etalerts');
  const collection = db.collection('users');
  console.log(req)
  const data = req.body

  let user = {
    _id: new Date().toISOString(),
    username: data['username'],
    firstname: data['fname'],
    lastname: data['lname'],
    email: data['email'],
    password: bcrypt.hashSync(data["password"], saltRounds),
    flightCode: "",
    friends: [],
    arrival_gate: "",
    arrival_terminal: "",
    departure_time: "",
    arrival_airport: "",
    arrival_time: "",
    departure_airport: ""
  };

  // Perform database operations
  collection.insertOne(user, (error, result) => {
    if (error) {
      console.error('Error inserting document', error);
      return;
    }
    console.log('Document inserted successfully');
  });
  res.sendStatus(200)
});

app.post('/search', async function (req, res) {
  run();
  const db = client.db('etalerts');
  const collection = db.collection('users');
  console.log(req)
  const data = req.body

  const filter = { username: data['username'] };

  const update = {
    $set: {
      flightCode: data['flightCode'],
      arrival_gate: data['arrival_gate'],
      arrival_terminal: data['arrival_terminal'],
      arrival_time: data['arrival_time'],
      departure_time: data['departure_time'],
      arrival_airport: data['arrival_airport'],
      departure_airport: data['departure_airport']
    }
  }

  let user = {
    username: data['username'],
    flightCode: data['flightCode'],
    arrival_gate: data['arrival_gate'],
    arrival_terminal: data['arrival_terminal'],
    arrival_time: data['arrival_time'],
    departure_time: data['departure_time'],
    arrival_airport: data['arrival_airport'],
    departure_airport: data['departure_airport']
  }

  const result = await collection.updateOne(filter, update);

  if(typeof window !== 'undefined') {
    sessionStorage.setItem('User', JSON.stringify(user));
  }

  res.json(user);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});