import { Select, MenuItem, InputLabel } from '@mui/material';

export const AppointmentDropdown = ({
  therapists,
  services,
  setAppointment,
}) => {
  return (
    <>
      <Select
        id='services'
        defaultValue=''
        style={{ width: '100%' }}
        onChange={(e) => {
          setAppointment((state) => ({
            ...state,
            service_ids: [...state.service_ids, e.target.value],
          }));
        }}
      >
        {services.map((service) => (
          <MenuItem key={service.id} value={service.id}>
            {service.name}
          </MenuItem>
        ))}
      </Select>
      <InputLabel>Therapists</InputLabel>
      <Select
        id='therapists'
        defaultValue=''
        style={{ width: '100%' }}
        onChange={(e) => {
          setAppointment((state) => ({
            ...state,
            employee_ids: [...state.employee_ids, e.target.value],
          }));
        }}
      >
        {therapists.map((therapist) => (
          <MenuItem key={therapist.id} value={therapist.id}>
            {therapist.first_name + ' ' + therapist.last_name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};
