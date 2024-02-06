const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRoutes);

app.listen(5002, () => {
    console.log('Server listening on port 5002');
})