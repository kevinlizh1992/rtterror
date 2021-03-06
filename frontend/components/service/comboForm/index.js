import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { http } from '/utils/http';
import { InputTextField } from '../../form/formComponent';
import _isEmpty from 'lodash/isEmpty';
import _findIndex from 'lodash/findIndex';
import _pullAt from 'lodash/pullAt';
import { ComboItem } from './ComboItem';
import { EditCombo } from './EditCombo';

export default function ComboForm({
  openDialog,
  handleCloseComboDialog,
  serviceCheckList,
  handleServiceCheck,
  type,
  setServiceCheckList,
  comboDetail,
  refresh,
  setRefresh,
  serviceListData,
}) {
  const initValue = {
    service_code: '',
    name: '',
    total_duration: '',
    total_price: '',
    service_ids: [],
  };

  const [editDialog, setEditDialog] = useState(false);
  const [comboValue, setComboValue] = useState(
    !_isEmpty(comboDetail) ? comboDetail : initValue
  );
  const [autoPopulate, setAutoPopulate] = useState(type == 'add'? true: false);

  const [errorMessage, setErrorMessage] = useState({});
  const [serviceListAddable, setServiceListAddable] = useState([]);

  const isEdit = () => type == 'edit';
  const handleSave = (serviceToAdd) => {
    setServiceCheckList(serviceToAdd.concat(serviceCheckList));
    setAutoPopulate(true);
  };
  const changeDurationOfService = (
    serviceCode,
    durationPrice,
    servCheckList
  ) => {
    let index = _findIndex(serviceCheckList, ['service_code', serviceCode]);
    let services = servCheckList[index];
    let durationsPriceList = services.durations_prices;
    let durationsPriceIndex = _findIndex(durationsPriceList, [
      'id',
      durationPrice.id,
    ]);
    _pullAt(durationsPriceList, [durationsPriceIndex]);
    durationsPriceList.splice(0, 0, durationPrice);
    services.durations_prices = durationsPriceList;
    servCheckList.splice(index, 1, services);
    setServiceCheckList([...servCheckList]);
    setAutoPopulate(true);
  };

  useEffect(() => {
    let name = '';
    let price = 0;
    let duration = 0;
    for (let serviceItem of serviceCheckList) {
      name += serviceItem.service_code.split("-")[0] + ' + ';
      price += serviceItem.durations_prices[0].price * 1;
      duration += serviceItem.durations_prices[0].duration * 1;
    }
    let value = { ...comboValue };
    value.name = name.slice(0, -2);
    value.total_price = price;
    value.total_duration = duration;
    if (autoPopulate) {
      setComboValue(value);
    }
  }, [serviceCheckList]);

  const closeClearValue = () => {
    setComboValue(initValue);
    handleCloseComboDialog();
    setServiceCheckList([]);
  };

  const handleSetValue = (obj) => {
    const { name, value } = obj.target;
    setComboValue({ ...comboValue, [name]: value });
  };
  const removeService = (item) => {
    handleServiceCheck(false, item);
    if (serviceCheckList.length === 1) {
      closeClearValue();
    }
  };

  const MS_H_CONVERSION_RATE = 60000;
  const handleCreateCombo = () => {
    if (validate()) {
      let serviceId = serviceCheckList.map(
        (service) => service.durations_prices[0].id
      );
      comboValue.service_ids = serviceId;
      comboValue.service_code = comboValue.name;
      comboValue.total_duration =
        comboValue.total_duration * MS_H_CONVERSION_RATE;
      http(`/api/v1/combos`, {
        method: 'POST',
        body: comboValue,
      }).then();
      closeClearValue();
      setRefresh(!refresh);
    }
  };

  const handleEditSubmit = () => {
    let serviceId = serviceCheckList.map(
      (service) => service.durations_prices[0].id
    );
    comboValue.service_ids = serviceId;
    comboValue.service_code = comboValue.name;
    comboValue.total_duration =
      comboValue.total_duration * MS_H_CONVERSION_RATE;
    http(`/api/v1/combos`, {
      method: 'PUT',
      body: comboValue,
    }).then();
    closeClearValue();
    setRefresh(!refresh);
  };
  const validate = () => {
    let error = {};
    setErrorMessage(error);
    return Object.values(error).every((x) => x == '');
  };
  const extractAddServiceEdit = () => {
    let serviceCode = serviceCheckList.map((service) => service.service_code);
    let addableList = serviceListData.filter(
      (item) =>
        !serviceCode.includes(item.service_code) &&
        !item.hasOwnProperty('services')
    );
    setServiceListAddable(addableList);
    setEditDialog(true);
  };

  return (
    <div>
      <Dialog open={openDialog} fullWidth={true} maxWidth='lg' scroll='body'>
        <DialogTitle>
          {isEdit() ? 'Edit Combo' : 'New Combo'}
          <IconButton
            aria-label='close'
            onClick={closeClearValue}
            size='medium'
            sx={{
              position: 'absolute',
              right: 10,
              top: 10,
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box display='flex' flexDirection='column' gap={2}>
            <Box display='flex' gap={1}>
              <InputTextField
                label='Name'
                name='name'
                value={comboValue.name}
                onChange={handleSetValue}
                error={errorMessage.name}
              />
              <InputTextField
                label='Total Duration (minutes)'
                name='total_duration'
                value={comboValue.total_duration}
                onChange={handleSetValue}
                error={errorMessage.total_duration}
              />
              <InputTextField
                label='Total Price ($)'
                name='total_price'
                value={comboValue.total_price}
                onChange={handleSetValue}
                error={errorMessage.total_price}
              />
            </Box>
            {serviceCheckList &&
              serviceCheckList.map((item) => (
                <ComboItem
                  key={item.id}
                  item={item}
                  handleServiceCheck={handleServiceCheck}
                  removeService={removeService}
                  isEdit={false}
                  choosenTime={true}
                  changeDurationOfService={changeDurationOfService}
                  serviceCheckList={serviceCheckList}
                />
              ))}
            {isEdit() ? (
              <EditCombo
                editDialog={editDialog}
                setEditDialog={setEditDialog}
                handleServiceCheck={handleServiceCheck}
                removeService={removeService}
                serviceCheckList={serviceCheckList}
                handleSave={handleSave}
                serviceListData={serviceListData}
                extractAddServiceEdit={extractAddServiceEdit}
                serviceListAddable={serviceListAddable}
                changeDurationOfService={changeDurationOfService}
              />
            ) : null}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={isEdit() ? handleEditSubmit : handleCreateCombo}
            variant='contained'
            color='success'
          >
            Submit
          </Button>
          <Button onClick={closeClearValue} color='inherit'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
