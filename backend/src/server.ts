import express from 'express';
import sequelize from './modules/sequelize';
import config from './config';
import router from './routes';
import cors from 'cors';

const startServer = async () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use('/api/v1', router);

  sequelize
    .authenticate()
    .then(() => {
      console.log(
        'Sequelize successfully connected to MySQL database on port:  ' +
          config.database.mysql.port
      );
    })
    .catch((error) => {
      console.error('ERROR - connection failed: ', error);
    });

  sequelize
    .sync({
      alter: true,
    })
    .then(() => {
      console.log('All database tables have been synchronized');
    })
    .catch((error) => {
      console.error('ERROR - database table synchronization failed: ', error);
    });

  const PORT = config.port || 5000;

  app.listen(PORT, () => {
    console.log('server starts on port: ', PORT);
  });
};

startServer();