import {Grid} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import {CustomDatePicker, CustomAutoComplete, InputTextField, DropDownList} from '../form/formComponent';
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";


const EmployeeForm = (props) => {

    const titleList = [
        {id: 0,value:"General Practice"},
        {id: 1,value:"Acupuncture"},
        {id: 2,value:"Manager"}
    ];
    const genderList = [
        {id: '0', value: 'male', title: 'Male'},
        {id: '1', value: 'female', title: 'Female'},
        {id: '2', value: 'na', title: 'N/A'},
    ];
    const {handleClose, mode, initValues, tabValue , editEmployee , addEmployee , serviceList , serviceEmployeeList } = props;
    const [employeeValue, setEmployeeValue] = useState(initValues);
    const [errorMessage, setErrorMessage] = useState([]);


    const addNewEmployee = () => {
        if (validate()) {
            let service_ids = [];
            for( let service of employeeValue.services){
                let idArray = service.durations_prices.map(durationprice=>durationprice.id)
                console.log(idArray);
                service_ids = [...service_ids,...idArray];
            }
            employeeValue.service_ids = service_ids;
            addEmployee(employeeValue);
            handleClose();
        }
    };
    const saveEditEmployee = () => {
        let service_ids = [];
        for( let service of employeeValue.services){
            let idArray = service.durations_prices.map(durationprice=>durationprice.id)
            console.log(idArray);
            service_ids = [...service_ids,...idArray];
        }
        employeeValue.service_ids = service_ids;
        editEmployee(employeeValue);
    }
    const handleSetEmployeeValue = (obj) => {
        const {name, value} = obj.target;
        setEmployeeValue({...employeeValue, [name]: value});
    };




    const validate = () => {
        let temp = {}
        temp.first_name = employeeValue.first_name ? "" : "This field is required."
        temp.last_name = employeeValue.last_name ? "" : "This field is required."
        temp.email = (/$^|.+@.+..+/).test(employeeValue.email) ? "" : "Email is not valid."
        temp.sin = employeeValue.sin.length>=16 ?"":'sin has to have 16 digit'
        temp.phone = (/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/).test(employeeValue.phone) ? "" : "Invalid Phone number."
        setErrorMessage(temp);
        return Object.values(temp).every(x => x == "")
    }

    return (
        <div>
            <Grid
                container
                direction="column"
                alignItems="stretch"
                spacing={1}
            >
                <Grid item xs={12}>
                    <InputTextField
                        label='First Name'
                        name='first_name'
                        value={employeeValue.first_name}
                        onChange={handleSetEmployeeValue}
                        error={errorMessage.first_name}
                    />
                    <InputTextField
                        label='Last Name'
                        name='last_name'
                        value={employeeValue.last_name}
                        onChange={handleSetEmployeeValue}
                        error={errorMessage.last_name}
                    />
                    <InputTextField
                        label='Address'
                        name='address'
                        value={employeeValue.address}
                        onChange={handleSetEmployeeValue}
                        error={errorMessage.address}
                    />
                    <InputTextField
                        label='Address'
                        name='postal_code'
                        value={employeeValue.postal_code}
                        onChange={handleSetEmployeeValue}
                        error={errorMessage.postal_code}
                    />
                    <InputTextField
                        label='Phone'
                        name='phone'
                        value={employeeValue.phone}
                        onChange={handleSetEmployeeValue}
                        error={errorMessage.phone}
                    />
                    <InputTextField
                        label='email'
                        name='email'
                        value={employeeValue.email}
                        onChange={handleSetEmployeeValue}
                        error={errorMessage.email}
                    />
                    <InputTextField
                        label='SIN'
                        name='sin'
                        value={employeeValue.sin}
                        onChange={handleSetEmployeeValue}
                        error={errorMessage.sin}
                    />
                </Grid>
                <Grid item xs={12}>
                    <DropDownList
                        name="title"
                        label="Title"
                        value={employeeValue.title}
                        onChange={handleSetEmployeeValue}
                        list={titleList}
                    />
                    <DropDownList
                        name="gender"
                        label="Gender"
                        value={employeeValue.gender}
                        onChange={handleSetEmployeeValue}
                        list={genderList}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CustomDatePicker
                        name="start_date"
                        label="Start Date"
                        value={employeeValue.start_date}
                        onChange={handleSetEmployeeValue}
                    />
                    <CustomDatePicker
                        name="dob"
                        label="Date of Birth"
                        value={employeeValue.dob}
                        onChange={handleSetEmployeeValue}
                    />

                </Grid>
                <Grid item xs={12}>
                    <CustomAutoComplete
                        name="services"
                        label="Services"
                        value={serviceList}
                        defaultValue={employeeValue.services}
                        onChange={handleSetEmployeeValue}
                    />
                </Grid>
            </Grid>
            <DialogActions>{mode == 'add' ?
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >

                    <Button onClick={addNewEmployee}>Add New Employee</Button>
                    <Button onClick={handleClose}>Close</Button>
                </Grid>:tabValue == 1 ?
                    <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    >

                    <Button onClick={saveEditEmployee}>Save</Button>
                    </Grid>:null
                }
            </DialogActions>

        </div>
    );
}
export default EmployeeForm;