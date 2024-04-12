// app.js

const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ELK',
  password: 'Thegoatlife24',
  port: 5432,
});

app.use(express.static(path.join(__dirname, 'public')));

app.get("/",async(req,res) =>{
  res.sendFile(path.join(__dirname,'public', 'index.html'));

})
// Handle form submission
app.post('/submit-email', async (req, res) => {
  try {
    const { email } = req.body;

    // Insert email into PostgreSQL
    const query = 'INSERT INTO emails (email) VALUES ($1)';
    const values = [email];
    await pool.query(query, values);

    res.status(200).send('Email added successfully');
  } catch (error) {
    console.error('Error adding email:', error);
    res.status(500).send('Internal server error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
