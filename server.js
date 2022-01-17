const express = require('express');
const fs = require('fs');
const path = require('path');
const { animals } = require('./data/animals');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

// middleware
// parse incoming str or arr data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// serve front end
app.use(express.static('public'));
// when api is endpoint, use the router from apiRoutes
app.use('/api', apiRoutes);
// when / is endpoint, serve html router
app.use('/', htmlRoutes);

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});