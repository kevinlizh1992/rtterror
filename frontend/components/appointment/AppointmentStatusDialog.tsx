import React, { useState, useEffect } from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  IconButton,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditAppointmentDialog from './EditAppointmentDialog';
import { ConfirmDeleteAlert } from './ConfirmDeleteAlert';

import {
  AppointmentHeader,
  AppointmentServiceList,
  AppointmentStatus,
  AppointmentTime,
} from './summary';
import {
  IAppointmentResponse,
  IStatus,
  blankAppointment,
} from './common/appointmentInterfaces';

const AppointmentStatusDialog = ({
  isOpen,
  onClose,
  target,
  editAppointment,
  deleteAppointment,
}) => {
  const [formContent, setFormContent] = useState<IAppointmentResponse>(
    target ? { ...target } : blankAppointment
  );
  const [editDialog, setEdit] = useState(false);
  const [deleteDialog, setDelete] = useState(false);

  useEffect(() => {
    if (!target) setFormContent(blankAppointment);
    else setFormContent({ ...target });
  }, [target]);

  const onCloseDialog = (e, reason) => {
    if (formContent.notes !== target.notes)
      editAppointment(target, { notes: formContent.notes });
    onClose(e, reason);
  };

  return (
    <Dialog
      fullWidth
      open={isOpen}
      transitionDuration={{ exit: 0 }}
      onClose={onCloseDialog}
    >
      <DialogTitle>
        <Box display='flex' justifyContent='space-evenly'>
          <Button
            variant='contained'
            color='info'
            size='small'
            onClick={() => {
              setEdit(true);
            }}
          >
            Edit
          </Button>
          <Button variant='contained' size='small' disabled>
            Reschedule
          </Button>
          <Button
            variant='contained'
            color='error'
            size='small'
            onClick={() => {
              setDelete(true);
            }}
          >
            Delete
          </Button>
        </Box>
        <IconButton
          aria-label='close'
          onClick={(e) => {
            onCloseDialog(e, 'backdropClick');
          }}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent style={{ width: '100%' }}>
        <Box display='grid'>
          <AppointmentHeader appointmentForm={formContent} />
          <Box
            sx={{
              display: 'grid',
              gap: 1,
              gridTemplateColumns: 'repeat(2, 1fr)',
              gridTemplateRows: 'repeat(1, 50vh)',
            }}
          >
            <Box>
              <AppointmentTime
                date={formContent.datetime}
                duration={formContent.duration}
              />
              <AppointmentStatus
                statuses={formContent.status}
                updateStatus={(name: string, changedBy: string) => {
                  const newStatus: IStatus = {
                    name: name,
                    by: changedBy,
                    at: new Date(),
                  };

                  setFormContent((prevContent) => ({
                    ...prevContent,
                    status: [newStatus, ...prevContent.status],
                  }));

                  editAppointment(formContent, {
                    status: [newStatus, ...formContent.status],
                  });
                }}
                expanded={false}
              />

              <TextField
                label='Memo'
                multiline
                fullWidth
                margin='normal'
                value={formContent.notes}
                onChange={(e) =>
                  setFormContent((state) => ({
                    ...state,
                    notes: e.target.value,
                  }))
                }
                variant='filled'
                color='warning'
              />
            </Box>
            <Box
              sx={{
                overflowY: 'auto',
              }}
            >
              <AppointmentServiceList
                services={formContent.services}
                therapistNames={formContent.employees?.map((emp) =>
                  [emp.first_name, emp.last_name].join(' ')
                )}
              />
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <EditAppointmentDialog
        isOpen={editDialog}
        onClose={({ type }, editContent) => {
          if (type === 'submit') {
            editAppointment(formContent, { ...editContent });
          }
          setEdit(false);
        }}
        appointmentObj={formContent}
        setAppointmentObj={setFormContent}
      />
      <ConfirmDeleteAlert
        open={deleteDialog}
        handleClose={() => setDelete(false)}
        onConfirm={(e) => {
          deleteAppointment({
            schedule: {
              id: formContent.id,
              calendarId: '' + formContent.client_id,
            },
          });
          setDelete(false);
          onClose(e, 'backdropClick');
        }}
      />
    </Dialog>
  );
};

export default AppointmentStatusDialog;
