import React from 'react';
import { incidents } from './feed/data';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Typography, Chip, Divider } from '@mui/material';

const IncidentDashboard = () => {
  const navigate = useNavigate();
  const { status } = useParams();

  const handleIncidentClick = (id) => {
    navigate(`/incidentdetails/${id}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'yellow';
      case 'closed':
        return 'green';
      case 'inprogress':
        return 'orange';
      default:
        return 'gray';
    }
  };

  const filteredIncidents = status === 'all' || status === undefined
    ? incidents
    : incidents.filter((incident) => incident.status === status);

  const groupedIncidents = filteredIncidents.reduce((acc, incident) => {
    if (!acc[incident.status]) {
      acc[incident.status] = [];
    }
    acc[incident.status].push(incident);
    return acc;
  }, {});

  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Incidents Dashboard
      </Typography>
      {Object.keys(groupedIncidents).length === 0 ? (
        <Typography variant="body1">No active incidents</Typography>
      ) : (
        Object.keys(groupedIncidents).map((status) => (
          <div key={status}>
            <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
              {status.charAt(0).toUpperCase() + status.slice(1)} Incidents
            </Typography>
            <Divider />
            <Grid container spacing={3} style={{ marginTop: '10px' }}>
              {groupedIncidents[status].map((incident) => (
                <Grid item xs={12} sm={6} md={4} key={incident.id}>
                  <Card
                    className="incident-card"
                    onClick={() => handleIncidentClick(incident.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {incident.name}
                      </Typography>
                      <Chip
                        label={incident.status}
                        style={{
                          backgroundColor: getStatusColor(incident.status),
                          color: 'black',
                          marginTop: '8px'
                        }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        ))
      )}
    </Container>
  );
};

export default IncidentDashboard;