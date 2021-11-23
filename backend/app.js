const express = require('express');
const cors = require('cors');
const config = require('./config');
const { sequelize } = require('./modules/sequelize');
const router = require('./router');
const syncAllTables = require('./models/syncTables');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1', router);

const PORT = config.port || 5000;

sequelize
  .authenticate()
  .then(() => {
    console.log(
      'Sequelize successfully connected to MySQL database on port:  ' +
        config.databases.mysql.port
    );
  })
  .catch((error) => console.log(error));

syncAllTables();

app.listen(PORT, () => {
  console.log('server starts on port ', PORT);
});