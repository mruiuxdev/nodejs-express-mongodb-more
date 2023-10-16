const app = require('./app');
/* eslint-disable import/order */
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');

const mongoDB = process.env.DB_URL;
const port = process.env.PORT;

mongoose.connect(mongoDB).then(() => console.log('Connection successful'));

app.listen(port, () => console.log(`App is running on port ${port}`));
