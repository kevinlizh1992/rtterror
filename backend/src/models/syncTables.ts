import { Customer as CustomerModel } from './customer.model';
import ServiceModel from './service';
import ComboModel from './combo';
import ServiceComboModel from './service-combo';
import EmployeeModel from 'src/models/employee';
import EmployeeServiceModel from 'src/models/employee-service';
import AppointmentModel from 'src/models/appointment';
import AppointmentEmployeeModel from 'src/models/appointment-employee';
import AppointmentServiceModel from 'src/models/appointment-service';
import { Schedule } from './schedule.model';

const syncTables = async () => {
  try {
    await Promise.all([
      ServiceModel.sync({ alter: true }),
      ComboModel.sync({ alter: true }),
      EmployeeModel.sync({ alter: true }),
      CustomerModel.sync({ alter: true }),
    ]);
    await AppointmentModel.sync({ alter: true });
    await ServiceComboModel.sync({ alter: true });
    await EmployeeServiceModel.sync({ alter: true });
    await AppointmentEmployeeModel.sync({ alter: true });
    await AppointmentServiceModel.sync({ alter: true });
    await Schedule.sync({ alter: true });
  } catch (error) {
    throw error;
  }
};
export default syncTables;
