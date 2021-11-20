import express from 'express';
import serviceService from '../services/service-service';

const router = express.Router();

router.use(function (req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});

router.get('/', (req, res, next) => {
  serviceService
    .getAllItems()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.error('ERROR - /service/(GET)/error: ', error);
    });
});

router.get('/:id', (req, res, next) => {
  const { params } = req;
  const { id } = params;
  console.log(id);
  serviceService
    .getItemById(id)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.error('ERROR - /service/:id/(GET)/error: ', error);
    });
});

router.post('/', (req, res, next) => {
  const { body } = req;
  serviceService
    .createItem(body)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.error('ERROR - /service/(POST)/error: ', error);
    });
});

router.put('/', (req, res, next) => {
  const { body } = req;
  serviceService
    .updateItem(body)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.error('ERROR - /service/(PUT)/error: ', error);
    });
});

router.delete('/:id', (req, res, next) => {
  const { params } = req;
  const { id } = params;
  serviceService
    .hideItemById(id)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.error('ERROR - /service/(DELETE)/error: ', error);
    });
});

router.put('/block/:id', (req, res, next) => {
  const { params } = req;
  const { id } = params;
  serviceService
    .blockItemById(id)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.error('ERROR - /service/block/:id/(PUT)/error: ', error);
    });
});

router.put('/unblock/:id', (req, res, next) => {
  const { params } = req;
  const { id } = params;
  serviceService
    .unblockItemById(id)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.error('ERROR - /service/unblock/:id/(PUT)/error: ', error);
    });
});

export default router;
