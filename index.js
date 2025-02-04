const express = require('express');
require('dotenv').config()

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));   
//! cors
const cors = require('cors')
app.use(cors());
// ! Routes
const routes = require('./routes/index.route');
app.use('/', routes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
