import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  PointElement
} from 'chart.js';
import MonitoringChatbotWidget from './chatbot/MonitoringChatbotWidget';

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);

const Monitoring = () => {
  const [monitoringData, setMonitoringData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/monitoring_data');
        const data = await response.json();
        setMonitoringData(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!monitoringData) {
    return <div>Loading...</div>;
  }

  const { cpuUsageData, memoryUsageData, diskIOData, networkTrafficData, activeUsersData, databasePerformanceData, requestThrottlingData, errorRatesData } = monitoringData;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Monitoring
      </Typography>
      <Grid container spacing={3}>
        {/* CPU Usage */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper style={{ padding: '20px', height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              CPU Usage
            </Typography>
            <div style={{ height: '300px' }}>
              <Line data={cpuUsageData} options={options} />
            </div>
          </Paper>
        </Grid>
        {/* Memory Usage */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper style={{ padding: '20px', height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Memory Usage
            </Typography>
            <div style={{ height: '300px' }}>
              <Doughnut data={memoryUsageData} options={options} />
            </div>
          </Paper>
        </Grid>
        {/* Disk I/O */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper style={{ padding: '20px', height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Disk I/O
            </Typography>
            <div style={{ height: '300px' }}>
              <Line data={diskIOData} options={options} />
            </div>
          </Paper>
        </Grid>
        {/* Network Traffic */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper style={{ padding: '20px', height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Network Traffic
            </Typography>
            <div style={{ height: '300px' }}>
              <Line data={networkTrafficData} options={options} />
            </div>
          </Paper>
        </Grid>
        {/* Active Users */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper style={{ padding: '20px', height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Active Users
            </Typography>
            <div style={{ height: '300px' }}>
              <Doughnut data={activeUsersData} options={options} />
            </div>
          </Paper>
        </Grid>
        {/* Database Performance */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper style={{ padding: '20px', height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Database Performance
            </Typography>
            <div style={{ height: '300px' }}>
              <Bar data={databasePerformanceData} options={options} />
            </div>
          </Paper>
        </Grid>
        {/* Request Throttling */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper style={{ padding: '20px', height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Request Throttling
            </Typography>
            <div style={{ height: '300px' }}>
              <Line data={requestThrottlingData} options={options} />
            </div>
          </Paper>
        </Grid>
        {/* Error Rates */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper style={{ padding: '20px', height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Error Rates
            </Typography>
            <div style={{ height: '300px' }}>
              <Line data={errorRatesData} options={options} />
            </div>
          </Paper>
        </Grid>
        {/* Add more widgets as needed */}
      </Grid>
      <MonitoringChatbotWidget monitoringdata={monitoringData} />
    </Container>
  );
};

export default Monitoring;