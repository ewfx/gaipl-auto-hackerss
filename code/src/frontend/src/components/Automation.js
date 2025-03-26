import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, LinearProgress, Chip } from '@mui/material';
import AutomationChatbotWidget from './chatbot/AutomationChatbotWidget';

const Automation = () => {
  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [workflows, setWorkflows] = useState([]);
  const [integrations, setIntegrations] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [reports, setReports] = useState([]);
  const [newTask, setNewTask] = useState({ name: '', schedule: '', status: 'Active', info: '', completion: 0 });
  const [automationdata, setApiData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/automation_data');
        const data = await response.json();
        setTasks(data.tasks);
        setWorkflows(data.workflows);
        setIntegrations(data.integrations);
        setNotifications(data.notifications);
        setReports(data.reports);
        setApiData(data); // Store the entire response data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleClickOpen = (content) => {
    setDialogContent(content);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDialogContent(null);
  };

  const handleSave = () => {
    if (dialogContent === 'Add Task') {
      setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
    }
    setOpen(false);
    setDialogContent(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'green';
      case 'In Progress':
        return 'blue';
      case 'Scheduled':
        return 'orange';
      case 'Cancelled':
        return 'red';
      case 'Error':
        return 'purple';
      default:
        return 'gray';
    }
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Task Automation
      </Typography>
      <Grid container spacing={3}>
        {/* Task Automation */}
        <Grid item xs={12}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Task Automation
            </Typography>
            <Button variant="contained" color="primary" onClick={() => handleClickOpen('Add Task')}>
              Add Task
            </Button>
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Schedule</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Information</TableCell>
                    <TableCell>% of Completion</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>{task.id}</TableCell>
                      <TableCell>{task.name}</TableCell>
                      <TableCell>{task.schedule}</TableCell>
                      <TableCell>
                        <Chip
                          label={task.status}
                          style={{
                            backgroundColor: getStatusColor(task.status),
                            color: 'white',
                          }}
                        />
                      </TableCell>
                      <TableCell>{task.info}</TableCell>
                      <TableCell>
                        <LinearProgress variant="determinate" value={task.completion} />
                        {task.completion}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        {/* Workflow Management */}
        <Grid item xs={12}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Workflow Management
            </Typography>
            <Button variant="contained" color="primary" onClick={() => handleClickOpen('Create Workflow')}>
              Create Workflow
            </Button>
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {workflows.map((workflow) => (
                    <TableRow key={workflow.id}>
                      <TableCell>{workflow.id}</TableCell>
                      <TableCell>{workflow.name}</TableCell>
                      <TableCell>
                        <Chip
                          label={workflow.status}
                          style={{
                            backgroundColor: getStatusColor(workflow.status),
                            color: 'white',
                          }}
                        />
                      </TableCell>
                      <TableCell>{workflow.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        {/* Integration with Other Systems */}
        <Grid item xs={12}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Integration with Other Systems
            </Typography>
            <Button variant="contained" color="primary" onClick={() => handleClickOpen('Add Integration')}>
              Add Integration
            </Button>
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {integrations.map((integration) => (
                    <TableRow key={integration.id}>
                      <TableCell>{integration.id}</TableCell>
                      <TableCell>{integration.name}</TableCell>
                      <TableCell>
                        <Chip
                          label={integration.status}
                          style={{
                            backgroundColor: getStatusColor(integration.status),
                            color: 'white',
                          }}
                        />
                      </TableCell>
                      <TableCell>{integration.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        {/* Notification and Alerts */}
        <Grid item xs={12}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Notification and Alerts
            </Typography>
            <Button variant="contained" color="primary" onClick={() => handleClickOpen('Configure Notifications')}>
              Configure Notifications
            </Button>
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {notifications.map((notification) => (
                    <TableRow key={notification.id}>
                      <TableCell>{notification.id}</TableCell>
                      <TableCell>{notification.name}</TableCell>
                      <TableCell>
                        <Chip
                          label={notification.status}
                          style={{
                            backgroundColor: getStatusColor(notification.status),
                            color: 'white',
                          }}
                        />
                      </TableCell>
                      <TableCell>{notification.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        {/* Reporting and Analytics */}
        <Grid item xs={12}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Reporting and Analytics
            </Typography>
            <Button variant="contained" color="primary" onClick={() => handleClickOpen('Generate Report')}>
              Generate Report
            </Button>
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>{report.id}</TableCell>
                      <TableCell>{report.name}</TableCell>
                      <TableCell>
                        <Chip
                          label={report.status}
                          style={{
                            backgroundColor: getStatusColor(report.status),
                            color: 'white',
                          }}
                        />
                      </TableCell>
                      <TableCell>{report.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
      {/* Add Task Dialog */}
      <AutomationChatbotWidget automationdata={automationdata} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{dialogContent}</DialogTitle>
        <DialogContent>
          {dialogContent === 'Add Task' && (
            <>
              <DialogContentText>
                To add a new task, please enter the task name, schedule, and other details here.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                label="Task Name"
                fullWidth
                value={newTask.name}
                onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Schedule"
                fullWidth
                value={newTask.schedule}
                onChange={(e) => setNewTask({ ...newTask, schedule: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Information"
                fullWidth
                value={newTask.info}
                onChange={(e) => setNewTask({ ...newTask, info: e.target.value })}
              />
              <TextField
                margin="dense"
                label="% of Completion"
                type="number"
                fullWidth
                value={newTask.completion}
                onChange={(e) => setNewTask({ ...newTask, completion: e.target.value })}
              />
            </>
          )}
          {dialogContent === 'Create Workflow' && (
            <>
              <DialogContentText>
                To create a new workflow, please enter the workflow details here.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                label="Workflow Name"
                fullWidth
              />
              <TextField
                margin="dense"
                label="Description"
                fullWidth
              />
            </>
          )}
          {dialogContent === 'Add Integration' && (
            <>
              <DialogContentText>
                To add a new integration, please enter the integration details here.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                label="Integration Name"
                fullWidth
              />
              <TextField
                margin="dense"
                label="Description"
                fullWidth
              />
            </>
          )}
          {dialogContent === 'Configure Notifications' && (
            <>
              <DialogContentText>
                To configure notifications, please enter the notification details here.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                label="Notification Name"
                fullWidth
              />
              <TextField
                margin="dense"
                label="Description"
                fullWidth
              />
            </>
          )}
          {dialogContent === 'Generate Report' && (
            <>
              <DialogContentText>
                To generate a report, please enter the report details here.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                label="Report Name"
                fullWidth
              />
              <TextField
                margin="dense"
                label="Description"
                fullWidth
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Automation;