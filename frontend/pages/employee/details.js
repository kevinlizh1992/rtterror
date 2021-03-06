import Employeedetailcomponent from "../../components/employee/employeedetailcomponent";
import _groupBy from "lodash/groupBy";
import {http} from "../../utils/http";
import {useRouter} from 'next/router';
import groupService from "../../utils/groupService";

export async function getServerSideProps(context) {
    const employeeList = await http(`/api/v1/employees`);
    const employee = await http(`/api/v1/employees/${context.query.empid}`);
    const serviceListResponse = await http(`/api/v1/services`);
    const serviceList = groupService(serviceListResponse);
    let serviceEmployeeCode = Object.keys(_groupBy(employee.services, 'service_code'));
    let serviceEmployeeList = serviceList.filter((itemService) => serviceEmployeeCode.includes(itemService.service_code))
    employee.services = serviceEmployeeList;
    return {
        props: {employee: employee, serviceList: serviceList , employeeList:employeeList},
    };
}

const EmployeeDetails = ({employee, serviceList, employeeList}) => {
    const router = useRouter();
    const editEmployee = async (empData) => {
        await http('/api/v1/employees', {
            method: 'PUT',
            body: empData,
        });
        await router.push('/employee');
    }
    const validateEmployeeId = (id)=>{
        return employeeList.some(emp => emp.id == id);
    }
    return (
        <Employeedetailcomponent
            employee={employee}
            editEmployee={editEmployee}
            serviceList={serviceList}
            validateEmployeeId={validateEmployeeId}
        />
    );
}
export default EmployeeDetails;