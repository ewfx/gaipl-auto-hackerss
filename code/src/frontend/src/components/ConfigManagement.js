import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Chip } from '@mui/material';
import ConfigManagementChatbotWidget from './chatbot/ConfigManagementChatbotWidget';

const ConfigManagement = () => {
  const [open, setOpen] = useState(false);
  const [configurations, setConfigurations] = useState([]);
  const [changeRequests, setChangeRequests] = useState([]);
  const [complianceRecords, setComplianceRecords] = useState([]);
  const [deploymentHistory, setDeploymentHistory] = useState([]);
  const [newConfig, setNewConfig] = useState({ name: '', version: '', status: 'Active' });
  const [configdata, setApiData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/config_management_data');
        const data = await response.json();
        setConfigurations(data.configurations);
        setChangeRequests(data.changeRequests);
        setComplianceRecords(data.complianceRecords);
        setDeploymentHistory(data.deploymentHistory);
        setApiData(data); // Store the entire response data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setConfigurations([...configurations, { ...newConfig, id: configurations.length + 1 }]);
    setOpen(false);
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
      case 'Pending':
        return 'yellow';
      case 'Approved':
        return 'lightgreen';
      case 'Compliant':
        return 'green';
      case 'Non-Compliant':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Config and Change Management
      </Typography>
      <Grid container spacing={3}>
        {/* Configuration Management */}
        <Grid item xs={12}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Configuration Management
            </Typography>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
              Add Configuration
            </Button>
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Version</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {configurations.map((config) => (
                    <TableRow key={config.id}>
                      <TableCell>{config.id}</TableCell>
                      <TableCell>{config.name}</TableCell>
                      <TableCell>{config.version}</TableCell>
                      <TableCell>
                        <Chip
                          label={config.status}
                          style={{
                            backgroundColor: getStatusColor(config.status),
                            color: 'white',
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        {/* Change Management */}
        <Grid item xs={12}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Change Management
            </Typography>
            <Button variant="contained" color="primary">
              Create Change Request
            </Button>
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {changeRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>{request.id}</TableCell>
                      <TableCell>{request.name}</TableCell>
                      <TableCell>
                        <Chip
                          label={request.status}
                          style={{
                            backgroundColor: getStatusColor(request.status),
                            color: 'white',
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        {/* Compliance Tracking */}
        <Grid item xs={12}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Compliance Tracking
            </Typography>
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {complianceRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{record.id}</TableCell>
                      <TableCell>{record.name}</TableCell>
                      <TableCell>
                        <Chip
                          label={record.status}
                          style={{
                            backgroundColor: getStatusColor(record.status),
                            color: 'white',
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        {/* Deployment History */}
        <Grid item xs={12}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Deployment History
            </Typography>
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {deploymentHistory.map((deployment) => (
                    <TableRow key={deployment.id}>
                      <TableCell>{deployment.id}</TableCell>
                      <TableCell>{deployment.name}</TableCell>
                      <TableCell>{deployment.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
      {/* Add Configuration Dialog */}
      <ConfigManagementChatbotWidget configdata={configdata} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Configuration</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new configuration, please enter the configuration name and version here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Configuration Name"
            fullWidth
            value={newConfig.name}
            onChange={(e) => setNewConfig({ ...newConfig, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Version"
            fullWidth
            value={newConfig.version}
            onChange={(e) => setNewConfig({ ...newConfig, version: e.target.value })}
          />
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

export default ConfigManagement;