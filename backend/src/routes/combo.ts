import express from 'express';
import comboService from '../services/combo-service';
import { sendBackErrorMessage } from 'src/routes/errorProcess';

const router = express.Router();

router.use(function (_req, _res, next) {
  next();
});

router.get('/', (req, res, _next) => {
  comboService
    .getAllItems()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => sendBackErrorMessage(req, res, error));
});

router.get('/:id', (req, res, _next) => {
  const { params } = req;
  const { id } = params;
  comboService
    .getItemById(id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => sendBackErrorMessage(req, res, error));
});

router.post('/', (req, res, _next) => {
  const { body } = req;
  comboService
    .createItem(body)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => sendBackErrorMessage(req, res, error));
});

router.put('/', (req, res, _next) => {
  const { body } = req;
  comboService
    .updateItem(body)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => sendBackErrorMessage(req, res, error));
});

router.delete('/:id', (req, res, _next) => {
  const { params } = req;
  const { id } = params;
  comboService
    .deleteItemById(id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => sendBackErrorMessage(req, res, error));
});

router.put('/:id/block', (req, res, _next) => {
  const { params } = req;
  const { id } = params;
  comboService
    .updateItemById(id, { blocked: true })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => sendBackErrorMessage(req, res, error));
});

router.put('/:id/unblock', (req, res, _next) => {
  const { params } = req;
  const { id } = params;
  comboService
    .updateItemById(id, { blocked: false })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => sendBackErrorMessage(req, res, error));
});

export default router;
