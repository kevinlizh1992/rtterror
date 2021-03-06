import * as React from 'react';
import { useState } from 'react';
import {
    Button,
    Select,
    MenuItem,
    InputLabel,
    Typography,
    Box,
    FormControl,
} from '@mui/material';
import Link from 'next/link';
import cssStyled from '/styles/service.module.css';
import SearchInput from './search';
import ServiceCardRow from './serviceCardRow';
import ComboForm from './comboForm';
import _orderBy from 'lodash/orderBy';

const ServiceComponent = (props) => {
    const {
        serviceListData,
        toggleBlocked,
        deleteService,
        refresh,
        setRefresh,
        comboList,
    } = props;
    const [serviceListDisplay, setServiceListDisplay] = useState(serviceListData);
    const comboListDisplay = comboList;
    const sortServiceList = serviceListData;
    const [orderBy, setSelect] = useState('');
    const [serviceCheckList, setServiceCheckList] = useState([]);

    const sortedList = ['name', 'description', 'code'];
    const [comboDialog, setComboDialog] = useState(false);
    const [type, setType] = useState('');
    const [comboDetail, setComboDetail] = useState({});

    const handleCloseComboDialog = () => {
        setComboDialog(false);
        setType('');
    };
    const handleCreateCombo = () => {
        setType('add');
        setComboDialog(true);
    };

    //to create the combo
    const handleServiceCheck = (val, item) => {
        if (val) {
            setServiceCheckList([...serviceCheckList, item]);
        } else {
            setServiceCheckList(
                serviceCheckList.filter(
                    (itemService) => itemService.service_code != item.service_code
                )
            );
        }
        return serviceCheckList.length;
    };

    const handleSelectOrderBy = (val) => {
        let sortResult;
        setSelect(val);
        switch (val) {
            case 'code':
                sortResult = _orderBy(serviceListDisplay, 'service_code');
                setServiceListDisplay(sortResult);
                break;
            case 'name':
                sortResult = _orderBy(serviceListDisplay, 'name');
                setServiceListDisplay(sortResult);
                break;
            case 'description':
                sortResult = _orderBy(serviceListDisplay, 'description');
                setServiceListDisplay(sortResult);
                break;
            default:
                sortResult = _orderBy(serviceListDisplay, 'createdAt');
                setServiceListDisplay(sortResult);
        }
    };
    const handleSearch = (val) => {
        let searchList = orderBy != 'id' ? sortServiceList : serviceListData;
        let searchValue = val.toLowerCase();
        let serviceResultList;
        if (val.trim().length > 0) {
            serviceResultList = searchList.filter(
                (item) =>
                    item.service_code.toLowerCase().includes(searchValue) ||
                    item.name.toLowerCase().includes(searchValue) ||
                    item.description.toLowerCase().includes(searchValue)
            );
            setServiceListDisplay(serviceResultList);
        } else {
            setServiceListDisplay(serviceListData);
        }
    };

    const extractServiceCheckList = (serviceArray) => {
        let serviceCode = serviceArray.map((service) => service.service_code);
        let checkList = serviceListData.filter((item) =>
            serviceCode.includes(item.service_code)
        );
        setServiceCheckList(checkList);
    };

    return (
        <Box display='grid'>
            <SearchInput handleSearch={handleSearch} />
            <Box display='flex' gap={5}>
                <Typography variant='h6'>Select a service</Typography>
                <Link href={'/service/add'} passHref>
                    <Button
                        className={cssStyled.buttonContainer}
                        variant='outlined'
                        color='info'
                    >
                        New Service
                    </Button>
                </Link>
                <Button
                    className={cssStyled.buttonContainer}
                    variant='outlined'
                    color='success'
                    onClick={handleCreateCombo}
                    disabled={serviceCheckList.length < 2}
                >
                    {serviceCheckList.length > 0 ? 'Combine ' + serviceCheckList.length + ' Service(s)' : 'New Combo'}
                </Button>
                <FormControl size='small' sx={{ minWidth: 120 }}>
                    <InputLabel id='order-by-label'>
                        <Typography variant='button'>Order By</Typography>
                    </InputLabel>
                    <Select
                        labelId='order-by-label'
                        id='select-order-by'
                        value={orderBy}
                        label='Order By'
                        onChange={(event) => {
                            handleSelectOrderBy(event.target.value);
                        }}
                    >
                        <MenuItem value=''>none</MenuItem>
                        {sortedList.map((name) => (
                            <MenuItem key={name} value={name}>
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Box
                display='grid'
                gridTemplateColumns='repeat(2, 2fr)'
                gridAutoRows='min-content'
                gap={2}
                width='100%'
            >
                {[serviceListDisplay, comboListDisplay].map((itemList, idx) => <Box key={idx} display='flex' flexDirection='column' gap={2}>{itemList.map((item) => (
                    <ServiceCardRow
                        key={item.id}
                        item={item}
                        toggleBlocked={toggleBlocked}
                        deleteService={deleteService}
                        serviceCheckList={serviceCheckList}
                        handleServiceCheck={handleServiceCheck}
                        type={type}
                        setType={setType}
                        extractServiceCheckList={extractServiceCheckList}
                        setServiceCheckList={setServiceCheckList}
                        setComboDetail={setComboDetail}
                        comboDetail={comboDetail}
                        serviceListData={serviceListData}
                        setRefresh={setRefresh}
                        refresh={refresh}
                    />
                ))}</Box>)}
            </Box>
            {type == 'add' && (
                <ComboForm
                    openDialog={comboDialog}
                    handleCloseComboDialog={handleCloseComboDialog}
                    serviceCheckList={serviceCheckList}
                    handleServiceCheck={handleServiceCheck}
                    type={type}
                    comboDetail={comboDetail}
                    setServiceCheckList={setServiceCheckList}
                    setRefresh={setRefresh}
                    refresh={refresh}
                />
            )}
        </Box>
    );
};

export default ServiceComponent;
