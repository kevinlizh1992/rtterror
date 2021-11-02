const express = require('express');
const Customer = require('../models/customer');

const router = express.Router();
const customerModel = Customer();

router.use(function (req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});

router.get('/', (req, res, next) => {
  customerModel.findAll({ raw: true })
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => console.log(err));
});

router.get('/:id', (req, res, next) => {
  // const id = req.path;
  const { params } = req;
  const { id } = params;
  console.log(id);
  customerModel.findByPk(id)
    .then((data) => {
      console.log('the return value of findByPk() is: ', data.dataValues);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/', (req, res, next) => {
  const { body } = req;
  customerModel.create(body)
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put('/:id', (req, res, next) => {
  const { params, body } = req;
  const { id } = params;
  customerModel.update(body, {
    where: {
      id: id,
    },
  })
    .then(([numberOfUpdate]) => {
      console.log(`${numberOfUpdate} customer(s) information has been updated`);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete('/:id', (req, res, next) => {
  const { params } = req;
  const { id } = params;
  customerModel.destroy({
    where: {
      id: id,
    },
  })
    .then((data) => {
      console.log(`${data} customer(s) has been deleted`);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
