const mongoose = require('mongoose');
const app = require('./app');

const mongoDB = process.env.DB_URL;
const port = process.env.PORT;

mongoose.connect(mongoDB).then(() => console.log('Connection successful'));

const server = app.listen(port || 3000, () =>
  console.log(`App is running on port ${port}`),
);

process.on('unhandledRejection', (err) => {
  console.log(err);
  console.log('Unhandled rejection! Shutting down...');

  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err) => {
  console.log(err);
  console.log('Uncaught rejection! Shutting down...');

  server.close(() => {
    process.exit(1);
  });
});
