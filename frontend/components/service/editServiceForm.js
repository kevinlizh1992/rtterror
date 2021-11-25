import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Close } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import styled from '../../styles/service.module.css';
import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import {
  Checkbox,
  Fab,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useRouter } from 'next/router';

const EditServiceForm = (props) => {
  const router = useRouter();
  const { editHandle, serviceItem, employeeList, open, setOpen } = props;

  const [employeeCheckList, setEmployeeCheckList] = useState([]); //serviceItem.offerBy
  const [name, setName] = useState(serviceItem.name);

  const [barcode, setBarcode] = useState(serviceItem.barcode);
  const [description, setDescription] = useState(serviceItem.description);
  const [duration, setDuration] = useState(serviceItem.duration);
  const [price, setPrice] = useState(serviceItem.price);

  const closeDialog = () => {
    router
      .push('/service/details/' + serviceItem.id)
      .then((r) => console.log(r));
    setOpen(false);
  };
  const processUpdateService = () => {
    if (validationInput()) {
      let data = {
        serviceCode: barcode,
        name: 'service 1',
        description: description,
        treatment_type: 'type 1',
        duration: duration,
        price: price,
        barcode: barcode,
        sms_description: 'sms description 1',
      };
      editHandle(data);
      closeDialog();
    }
  };

  const handleCheck = (e) => {
    if (e.target.checked) {
      setEmployeeCheckList([...employeeCheckList, e.target.value]);
    } else {
      setEmployeeCheckList(
        employeeCheckList.filter((name) => e.target.value != name)
      );
    }
  };
  const durationList = [
    { 30: '30 M' },
    { 60: '1 H' },
    { 90: '1.5 H' },
    { 120: '2 H' },
  ];
  const durationSelect = (hour) => {
    setDuration(hour * 60000);
  };

  const handleSetValue = (e) => {
    let label = e.target.id;
    let value = e.target.value;
    switch (label) {
      case 'name':
        setName(value);
        break;
      case 'code':
        setBarcode(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'price':
        setPrice(value);
        break;
    }
  };

  const validationInput = () => {
    if (name == '' || barcode == '' || price <= 0) {
      return false;
    }
    return true;
  };

  return (
    <div>
      <Dialog open={open} fullWidth={true} maxWidth="lg" scroll="body">
        <DialogTitle>
          Update Service
          <IconButton
            aria-label="close"
            onClick={closeDialog}
            size="medium"
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
          <div className={styled.separateVDiv}></div>
          <TextField
            fullWidth
            required
            id="name"
            label="Service name"
            value={name}
            // variant="outlined"
            // defaultValue="" maybe value when edit
            onChange={(event) => handleSetValue(event)}
          />
          <div className={styled.separateVDiv}></div>
          <TextField
            fullWidth
            required
            id="code"
            label="Service code"
            // defaultValue="Hello World"
            value={barcode}
            // variant="outlined"
            onChange={(event) => handleSetValue(event)}
          />
          <div className={styled.separateVDiv}></div>
          <TextField
            fullWidth
            id="description"
            label="Description"
            multiline
            rows={4}
            // defaultValue="Default Value"
            value={description}
            // variant="outlined"
            onChange={(event) => handleSetValue(event)}
          />

          <div className={styled.separateVDiv}></div>
          <div className={styled.flexAlignContainer}>
            <h3>Duration</h3>
            {durationList.map((item) => (
              <Fab
                key={Object.keys(item)}
                onClick={() => durationSelect(Object.keys(item))}
                color={Object.keys(item) * 60000 == duration ? 'primary' : null}
                variant="extended"
              >
                {Object.values(item)}
              </Fab>
            ))}
          </div>
          <div className={styled.separateVDiv}></div>
          <TextField
            id="price"
            label="price"
            type="number"
            value={price}
            required
            onChange={(event) => handleSetValue(event)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
          <div className={styled.separateVDiv}></div>
          <h1>Employee</h1>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">Employee name</TableCell>
                  <TableCell align="left">Title</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employeeList.map((ename) => (
                  <TableRow
                    key={ename}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <div className={styled.employeeRowDiv}>
                        <Checkbox
                          key={ename}
                          aria-label={ename}
                          value={ename}
                          checked={employeeCheckList.includes(ename)}
                          onChange={(event) => {
                            handleCheck(event);
                          }}
                        />
                        {ename}
                      </div>
                    </TableCell>
                    <TableCell align="right">title</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={processUpdateService}>Submit</Button>
          <Button onClick={closeDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default EditServiceForm;