import { TabPanel, TabContext, TabList, DatePicker } from '@mui/lab';
import styles from 'styles/client.module.css';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { http } from 'utils/http';
import { DataGrid } from '@mui/x-data-grid';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { formatPhoneNumber } from 'utils';
import { useRouter } from 'next/router';

const ClientPage = ({ customer: initialCustomer }) => {
  const [userForm, setUser] = useState(initialCustomer);
  const [tabValue, toggleTab] = useState('1');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [confirmToast, setConfirm] = useState(false);
  const [rows, setRows] = useState([]);
  const router = useRouter();

  const columns = [
    { field: 'date', headerName: 'DATE', width: 100 },
    { field: 'time', headerName: 'Time', width: 100 },
    { field: 'plan', headerName: 'Service', width: 200 },
    { field: 'therapist', headerName: 'Employee', width: 100 },
    { field: 'duration', headerName: 'Duration', width: 100 },
  ];

  const editUser = async () => {
    setError(undefined);
    setLoading(true);
    try {
      await http('/api/v1/customer', {
        method: 'PUT',
        body: userForm,
      });
    } catch (err) {
      setError(err);
      console.error(err);
    } finally {
      setLoading(false);
      setConfirm(true);
    }
  };

  return (
    <Box>
      {confirmToast && (
        <Alert
          variant='filled'
          severity='success'
          onClose={() => {
            setConfirm(false);
          }}
        >
          Changes successfully saved!
        </Alert>
      )}
      {error && <Alert severity='error'>Something wrong happened!</Alert>}
      <h3>{`${userForm.firstName} ${userForm.lastName}`}</h3>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList
              onChange={(_event, newValue) => {
                toggleTab(newValue);
              }}
              aria-label='lab API tabs example'
            >
              <Tab label='Information' value='1' />
              <Tab label='Appointment History' value='2' />
            </TabList>
          </Box>
          <TabPanel value='1'>
            <Box style={{ display: 'flex' }}>
              <Box style={{ flex: 1 }}>
                <FormGroup className={styles.userFormGroup}>
                  <Box className={styles.userFormRow}>
                    <InputLabel>First Name</InputLabel>
                  </Box>
                  <TextField
                    className={styles.userTextField}
                    margin='normal'
                    required
                    value={userForm.firstName}
                    onChange={(e) =>
                      setUser((state) => ({
                        ...state,
                        firstName: e.target.value,
                      }))
                    }
                  />
                </FormGroup>
                <FormGroup className={styles.userFormGroup}>
                  <Box className={styles.userFormRow}>
                    <InputLabel>Last Name</InputLabel>
                  </Box>
                  <TextField
                    className={styles.userTextField}
                    margin='normal'
                    required
                    value={userForm.lastName}
                    onChange={(e) =>
                      setUser((state) => ({
                        ...state,
                        lastName: e.target.value,
                      }))
                    }
                  />
                </FormGroup>
                <FormGroup className={styles.userFormGroup}>
                  <Box className={styles.userFormRow}>
                    <InputLabel>Phone Number</InputLabel>
                  </Box>
                  <TextField
                    className={styles.userTextField}
                    margin='normal'
                    required
                    value={formatPhoneNumber(userForm.phone)}
                    onChange={(e) =>
                      setUser((state) => ({
                        ...state,
                        phone: e.target.value
                          .replace(/\D/g, '')
                          .substring(0, 10),
                      }))
                    }
                  />
                </FormGroup>
                <FormGroup className={styles.userFormGroup}>
                  <Box className={styles.userFormRow}>
                    <InputLabel className={styles.userFormRow}>
                      Address
                    </InputLabel>
                  </Box>
                  <TextField
                    className={styles.userTextField}
                    margin='normal'
                    required
                    value={userForm.address}
                    onChange={(e) =>
                      setUser((state) => ({
                        ...state,
                        address: e.target.value,
                      }))
                    }
                  />
                </FormGroup>
                <FormGroup className={styles.userFormGroup}>
                  <Box className={styles.userFormRow}>
                    <InputLabel className={styles.userFormRow}>
                      Email
                    </InputLabel>
                  </Box>
                  <TextField
                    className={styles.userTextField}
                    margin='normal'
                    required
                    value={userForm.email}
                    onChange={(e) =>
                      setUser((state) => ({
                        ...state,
                        email: e.target.value,
                      }))
                    }
                  />
                </FormGroup>
                <FormGroup className={styles.userFormGroup}>
                  <Box className={styles.userFormRow}>
                    <InputLabel className={styles.userFormRow}>
                      Postal Code
                    </InputLabel>
                  </Box>
                  <TextField
                    className={styles.userTextField}
                    margin='normal'
                    required
                    value={userForm.postalCode}
                    onChange={(e) =>
                      setUser((state) => ({
                        ...state,
                        postalCode: e.target.value,
                      }))
                    }
                  />
                </FormGroup>
                <FormGroup row>
                  <FormControlLabel
                    value='F'
                    control={
                      <Checkbox
                        checked={userForm.gender === 'F'}
                        onChange={() =>
                          setUser((state) => ({
                            ...state,
                            gender: 'F',
                          }))
                        }
                      />
                    }
                    label='Female'
                  />
                  <FormControlLabel
                    value='M'
                    control={
                      <Checkbox
                        checked={userForm.gender === 'M'}
                        onChange={() =>
                          setUser((state) => ({
                            ...state,
                            gender: 'M',
                          }))
                        }
                      />
                    }
                    label='Male'
                  />
                  <FormControlLabel
                    value='N/A'
                    control={
                      <Checkbox
                        checked={!userForm.gender}
                        onChange={() =>
                          setUser((state) => ({
                            ...state,
                            gender: null,
                          }))
                        }
                      />
                    }
                    label='Other'
                  />
                </FormGroup>
              </Box>
              <Box style={{ flex: 1 }}>
                <InputLabel>Date of Birth</InputLabel>
                <DatePicker
                  label={userForm.dob ?? 'Date of birth'}
                  value={userForm.dob}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      inputProps={{ placeholder: 'YYYY-MM-DD' }}
                      disabled
                    />
                  )}
                  onChange={(date: Date) =>
                    setUser((state) => ({
                      ...state,
                      dob: Intl.DateTimeFormat('sv-SE').format(date),
                    }))
                  }
                />
                <InputLabel>Confirmation Type</InputLabel>
                <Select
                  placeholder='Sort...'
                  label='Confirmation Type'
                  value={
                    userForm.confirmationType === 'email' ? 'email' : 'SMS'
                  }
                  onChange={(e) =>
                    setUser((state) => ({
                      ...state,
                      confirmationType: e.target.value,
                    }))
                  }
                  sx={{
                    minWidth: '100px',
                  }}
                >
                  <MenuItem value='email'>Email</MenuItem>
                  <MenuItem value='SMS'>SMS</MenuItem>
                </Select>
                <InputLabel>Package</InputLabel>
                <Select
                  placeholder='Select Type'
                  label='Select Type'
                  sx={{
                    minWidth: '100px',
                  }}
                ></Select>
                <FormGroup>
                  <Box>
                    <InputLabel>Available Discount</InputLabel>
                    <Select
                      placeholder={"View client's available discounts"}
                      value={userForm.discount ? userForm.discount : 0}
                      sx={{
                        minWidth: '100px',
                      }}
                      onChange={(e) =>
                        setUser((state) => ({
                          ...state,
                          discount: e.target.value,
                        }))
                      }
                    >
                      <MenuItem value={10}>10%</MenuItem>
                      <MenuItem value={15}>15%</MenuItem>
                      <MenuItem value={20}>20%</MenuItem>
                      <MenuItem value={25}>25%</MenuItem>
                      <MenuItem value={30}>30%</MenuItem>
                      <MenuItem value={50}>50%</MenuItem>
                      <MenuItem value={75}>75%</MenuItem>
                    </Select>
                  </Box>
                </FormGroup>
                <FormGroup>
                  <Box>
                    <InputLabel className={styles.userFormRow}>
                      Balance($):
                    </InputLabel>
                    <TextField
                      className={styles.userTextField}
                      margin='normal'
                      value={userForm.balance}
                      onChange={(e) =>
                        setUser((state) => ({
                          ...state,
                          balance: e.target.value,
                        }))
                      }
                    />
                  </Box>
                </FormGroup>
                <FormGroup>
                  <Box>
                    <InputLabel className={styles.userFormRow}>
                      Notes:
                    </InputLabel>
                    <TextField
                      className={styles.userTextField}
                      margin='normal'
                      style={{ width: '100%' }}
                      value={userForm.notes}
                      onChange={(e) =>
                        setUser((state) => ({
                          ...state,
                          notes: e.target.value,
                        }))
                      }
                    />
                  </Box>
                </FormGroup>
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value='2'>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
              />
            </div>
          </TabPanel>
        </TabContext>
      </Box>
      {tabValue === '1' && (
        <>
          <Button
            variant='outlined'
            style={{ width: '10%' }}
            onClick={editUser}
            disabled={loading}
          >
            {loading ? <CircularProgress /> : 'Save'}
          </Button>
          <Button
            variant='outlined'
            style={{ width: '10%' }}
            onClick={() => {
              router.back();
            }}
          >
            BACK
          </Button>
        </>
      )}
    </Box>
  );
};

export default ClientPage;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return {
    props: {
      customer: await http(`/api/v1/customer/${context.params.pid}`),
    },
  };
};
