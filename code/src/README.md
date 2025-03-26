# Integrated Platform Environment (IPE) UI

This project provides a comprehensive UI for the Integrated Platform Environment (IPE) designed for platform teams. The UI includes various capabilities such as task automation, incident management, system monitoring, and reporting. The solution leverages Large Language Models (LLMs) like OpenAI's GPT to provide intelligent and context-aware capabilities for incident resolution and platform management.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Future Enhancements](#future-enhancements)
- [License](#license)

## Overview

The IPE UI aims to provide a seamless and efficient platform for managing incidents, automating tasks, and monitoring system health. By integrating LLMs, the solution offers intelligent recommendations, contextual chat capabilities, and proactive incident management.

## Features

### UI Capabilities

- **Integrated Platform Environment (IPE) View**: Provides a comprehensive view of the platform environment, including task automation, workflows, integrations, notifications, and reports.
- **Task Automation**: Allows users to create, manage, and monitor automated tasks.
- **Workflow Management**: Enables the creation and management of workflows to streamline operations.
- **Integration Management**: Facilitates the integration of various systems and services.
- **Notification and Alerts**: Configures notifications and alerts for different events and incidents.
- **Reporting and Analytics**: Generates reports and provides analytics for better decision-making.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/ewfx/gaipl-auto-hackerss.git
    cd ewfx
    ```

2. Install the required dependencies:
    ```sh
    npm install
    ```

3. Start the development server:
    ```sh
    npm start
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000` to access the IPE UI.
2. Use the various components to manage tasks, workflows, integrations, notifications, and reports.
3. Interact with the AI chatbot for incident resolution and recommendations.

## Components

## Components

### `Dashboard.js`

- **Purpose**: Serves as the central hub of the IPE UI, providing an overview of key metrics, recent activities, and quick access to other modules.
- **Features**:
  - **Data Aggregation**: Fetches and aggregates data from various backend APIs (e.g., automation, monitoring, incident management) to provide a holistic view of the platform environment.  The specific API endpoints may vary (e.g., `http://localhost:8000/api/dashboard_data`).
  - **Key Metrics Display**: Showcases critical performance indicators (KPIs) related to system health, task automation progress, incident resolution times, and resource utilization.  Examples include CPU usage, memory consumption, number of active incidents, and automation success rates.
  - **Interactive Charts**:  Presents data visually using interactive charts and graphs to facilitate quick understanding of trends and patterns. Chart types may include line charts for time-series data, pie charts for proportional data, and bar charts for comparative data.
  - **Customizable Layout**: Allows users to customize the layout and widgets displayed on the dashboard to prioritize the information most relevant to their roles and responsibilities.
  - **Real-time Updates**: Implements real-time data updates using technologies like WebSockets to ensure the dashboard reflects the current state of the platform.
  - **Drill-Down Functionality**: Provides drill-down capabilities, allowing users to click on specific metrics or charts to view more detailed information and investigate underlying issues.
  - **Alerting and Notifications**: Displays alerts and notifications related to critical events, such as system outages, security breaches, or performance bottlenecks.
  - **UI Components**: Leverages Material-UI components such as `Grid`, `Card`, `CardContent`, `Typography`, `IconButton`, and `Menu` to create a visually appealing and user-friendly interface.
  - **Theming**: Supports theming to allow users to customize the dashboard's appearance to match their preferences or organizational branding.

### `Monitoring.js`

- **Purpose**: Provides a comprehensive monitoring interface within the IPE UI, visualizing key system metrics and performance indicators.
- **Features**:
  - **Real-time Data Visualization**: Displays real-time data for various system metrics, including CPU usage, memory usage, disk I/O, network traffic, active users, database performance, request throttling, and error rates.
  - **Interactive Charts**: Uses interactive charts and graphs to visualize data, allowing users to quickly understand trends and patterns. Chart types include Line, Doughnut, and Bar charts.
  - **Customizable Layout**: Allows users to customize the layout and widgets displayed on the monitoring dashboard to prioritize the information most relevant to their roles and responsibilities.
  - **Dynamic Data Fetching**: Fetches monitoring data from the backend API (`http://localhost:8000/api/monitoring_data`).
  - **Chatbot Integration**: Integrates with `MonitoringChatbotWidget` for AI-driven assistance.
- **UI Components**: Leverages Material-UI components such as `Container`, `Grid`, `Paper`, and `Typography` for building the UI. It also uses `react-chartjs-2` for creating charts.


### `MonitoringChatbotWidget.js`

- **Purpose**: Provides a chatbot interface for monitoring-related queries and tasks.
- **Features**:
  - **State Management**: Manages state for chat messages, user input, and chat ID.
  - **Chat Interface**: Provides a collapsible chat interface with a fixed position on the screen.
  - **Message Handling**: Handles sending and receiving messages, including interactions with the backend API (`http://localhost:8000/api/monitoringchat`).
  - **UI Components**: Utilizes Material-UI components such as `Dialog`, `DialogContent`, `DialogTitle`, `IconButton`, `Tooltip`, `CloseIcon`, and `OpenInNewIcon` for building the chat interface.
  - **Scroll Management**: Automatically scrolls to the latest message in the chat.

### `IncidentDashboard.js`

- **Purpose**: Provides a comprehensive dashboard for managing and monitoring incidents within the IPE UI. It offers a visual representation of incidents, categorized by their status, and allows users to navigate to detailed views of individual incidents.
- **Features**:
  - **Incident Listing**: Displays a list of incidents, which can be filtered based on their status (open, closed, in progress, or all).
  - **Status-Based Grouping**: Groups incidents by their status, providing a clear overview of the number of incidents in each stage.
  - **Visual Status Indicators**: Uses color-coded chips to visually represent the status of each incident, making it easy to identify the current state at a glance.
  - **Navigation to Details**: Allows users to click on an incident card to navigate to a detailed view of that specific incident, providing more in-depth information and options for action.
  - **Dynamic Filtering**: Supports dynamic filtering of incidents based on the `status` parameter in the URL, enabling users to quickly view incidents of a specific status.
  - **Responsive Layout**: Utilizes Material-UI's Grid component to provide a responsive layout that adapts to different screen sizes, ensuring a consistent user experience across devices.
  - **Empty State Handling**: Displays a message when there are no active incidents, providing a clear indication of the system's current state.
  - **UI Components**: Leverages Material-UI components such as `Container`, `Grid`, `Card`, `CardContent`, `Typography`, `Chip`, and `Divider` to create a visually appealing and user-friendly interface.

### `IncidentDetails.js`

- **Purpose**: Displays detailed information about a specific incident, including its dependencies, logs, and a chatbot widget for assistance.
- **Features**:
  - **Detailed Incident View**: Provides a comprehensive view of an incident, including its ID, application name, description, summary, and status.
  - **Dependency Graph**: Visualizes the dependencies and dependents of the incident using the `DependencyGraph` component.
  - **Log Display**: Displays system logs related to the incident using the `LogDisplay` component.
  - **Chatbot Integration**: Integrates with `IncidentChatbotWidget` to provide AI-driven assistance for incident resolution, using system dependencies and logs as context.
  - **Dynamic Incident Loading**: Loads incident data dynamically based on the `incidentId` parameter in the URL.
  - **Status Indication**: Uses color-coded display to visually represent the status of the incident.
  - **Navigation**: Provides a button to navigate back to the incidents dashboard.
  - **Data Fetching**: Fetches system logs from an external API to provide detailed information about the incident.
- **UI Components**: Leverages React components and Material-UI components for building the UI.

### `ConfigManagement.js`

- **Purpose**: Provides a comprehensive interface for managing configurations, change requests, compliance records, and deployment history within the IPE UI.
- **Features**:
  - **Configuration Management**: Allows users to view and add new configurations.
  - **Change Management**: Enables users to view and create change requests.
  - **Compliance Tracking**: Provides a view of compliance records.
  - **Deployment History**: Displays a history of deployments.
  - **Status Indicators**: Uses color-coded chips to visually represent the status of configurations, change requests, and compliance records.
  - **Add Configuration Dialog**: Provides a dialog for adding new configurations.
  -  **Data Fetching**: Fetches configuration management data from the backend API (`http://localhost:8000/api/config_management_data`).
  - **Chatbot Integration**: Integrates with `ConfigManagementChatbotWidget` for AI-driven assistance.
- **UI Components**: Leverages Material-UI components such as `Container`, `Grid`, `Paper`, `Typography`, `Button`, `TextField`, `Table`, `TableBody`, `TableCell`, `TableContainer`, `TableHead`, `TableRow`, `Dialog`, `DialogActions`, `DialogContent`, `DialogContentText`, `DialogTitle`, and `Chip` for building the UI.

### `ConfigManagementChatbotWidget.js`

- **Purpose**: Provides an AI-powered chatbot widget for assisting users with configuration and change management tasks within the IPE UI.
- **Features**:
  - **AI-Driven Assistance**: Integrates with a backend API to provide intelligent responses and guidance related to configuration management.
  - **Contextual Chat**: Maintains a conversation history to provide context-aware assistance.
  - **Collapsible Widget**: Offers a collapsible design to minimize screen space when not in use.
  - **Popup Mode**: Allows users to open the chatbot in a separate popup window for a larger view.
  - **User Input Handling**: Handles user input and sends it to the backend API for processing.
  - **Dynamic Responses**: Displays dynamic responses from the backend API in the chat window.
  - **Error Handling**: Provides error messages when unable to retrieve a response from the backend API.
  - **UI Components**: Leverages Material-UI components such as `Dialog`, `DialogContent`, `DialogTitle`, `IconButton`, and `Tooltip` for building the UI.

### `Reporting.js`

- **Purpose**: Provides a comprehensive reporting interface within the IPE UI, allowing users to generate and view various reports related to system performance, incidents, and user activity.
- **Features**:
  - **Report Generation**: Allows users to generate new reports with a specified name and date.
  - **Report Viewing**: Displays a list of existing reports with their IDs, names, and dates.
  - **System Performance Report**: Visualizes system performance data using a bar chart.
  - **Incident Report**: Visualizes incident data using a line chart.
  - **Incident Trends**: Visualizes incident trends over time using a line chart.
  - **System Uptime**: Visualizes system uptime data using a line chart.
  - **User Activity**: Visualizes user activity data using a doughnut chart.
  - **Dynamic Data Fetching**: Fetches report data from the backend API (`http://localhost:8000/api/reporting_data`).
  - **Chatbot Integration**: Integrates with `ReportingChatbotWidget` for AI-driven assistance.
- **UI Components**: Leverages Material-UI components such as `Container`, `Grid`, `Paper`, `Typography`, `Button`, `TextField`, `Table`, `TableBody`, `TableCell`, `TableContainer`, `TableHead`, `TableRow`, `Dialog`, `DialogActions`, `DialogContent`, `DialogContentText`, and `DialogTitle` for building the UI. It also uses `react-chartjs-2` for creating charts.

### `ReportingChatbotWidget.js`

- **Purpose**: Provides an AI-powered chatbot widget for assisting users with reporting-related tasks within the IPE UI.
- **Features**:
  - **AI-Driven Assistance**: Integrates with a backend API to provide intelligent responses and guidance related to reporting.
  - **Contextual Chat**: Maintains a conversation history to provide context-aware assistance.
  - **Collapsible Widget**: Offers a collapsible design to minimize screen space when not in use.
  - **Popup Mode**: Allows users to open the chatbot in a separate popup window for a larger view.
  - **User Input Handling**: Handles user input and sends it to the backend API for processing.
  - **Dynamic Responses**: Displays dynamic responses from the backend API in the chat window.
  - **Error Handling**: Provides error messages when unable to retrieve a response from the backend API.
  - **Integration with Reporting Data**: Receives reporting data and incidents as props, providing the chatbot with relevant context.
- **UI Components**: Leverages Material-UI components such as `Dialog`, `DialogContent`, `DialogTitle`, `IconButton`, and `Tooltip` for building the UI.

### `Automation.js`

- **Purpose**: Provides a comprehensive interface for managing task automation, workflow management, system integrations, notifications, and reporting within the IPE UI.
- **Features**:
  - **Task Automation**: Allows users to view and add new automated tasks.
  - **Workflow Management**: Enables users to create and manage workflows.
  - **System Integrations**: Provides a view of integrations with other systems.
  - **Notification and Alerts**: Allows users to configure notifications and alerts.
  - **Reporting and Analytics**: Enables users to generate reports and view analytics.
  - **Status Indicators**: Uses color-coded chips to visually represent the status of tasks, workflows, integrations, notifications, and reports.
  - **Add Task Dialog**: Provides a dialog for adding new tasks.
  - **Create Workflow Dialog**: Provides a dialog for creating new workflows.
  - **Add Integration Dialog**: Provides a dialog for adding new integrations.
  - **Configure Notifications Dialog**: Provides a dialog for configuring notifications.
  - **Generate Report Dialog**: Provides a dialog for generating reports.
  - **Data Fetching**: Fetches automation data from the backend API (`http://localhost:8000/api/automation_data`).
  - **Chatbot Integration**: Integrates with `AutomationChatbotWidget` for AI-driven assistance.
- **UI Components**: Leverages Material-UI components such as `Container`, `Grid`, `Paper`, `Typography`, `Button`, `TextField`, `Table`, `TableBody`, `TableCell`, `TableContainer`, `TableHead`, `TableRow`, `Dialog`, `DialogActions`, `DialogContent`, `DialogContentText`, `DialogTitle`, `LinearProgress`, and `Chip` for building the UI.

### `AutomationChatbotWidget.js`

- **Purpose**: Provides an AI-powered chatbot widget for assisting users with automation-related tasks within the IPE UI.
- **Features**:
  - **AI-Driven Assistance**: Integrates with a backend API to provide intelligent responses and guidance related to automation, workflows, integrations, notifications, and reporting.
  - **Contextual Chat**: Maintains a conversation history to provide context-aware assistance.
  - **Collapsible Widget**: Offers a collapsible design to minimize screen space when not in use.
  - **Popup Mode**: Allows users to open the chatbot in a separate popup window for a larger view.
  - **User Input Handling**: Handles user input and sends it to the backend API for processing.
  - **Dynamic Responses**: Displays dynamic responses from the backend API in the chat window.
  - **Error Handling**: Provides error messages when unable to retrieve a response from the backend API.
   - **Integration with Automation Data**: Receives automation data as props, providing the chatbot with relevant context.
- **UI Components**: Leverages Material-UI components such as `Dialog`, `DialogContent`, `DialogTitle`, `IconButton`, and `Tooltip` for building the UI.

### `DependencyGraph.js`

- **Purpose**: Visualizes the dependencies and dependents of a given application using a directed graph.
- **Features**:
  - **Dynamic Graph Layout**: Automatically arranges nodes representing the application, its dependencies, and its dependents in a clear and organized layout.
  - **Interactive Nodes**: Allows users to drag and reposition nodes within the graph.
  - **Animated Edges**: Uses animated edges to visually represent the relationships between nodes.
  - **Responsive Design**: Adapts to different screen sizes by dynamically adjusting the graph layout.
  - **Customizable Appearance**: Provides options for customizing the appearance of nodes and edges.
  - **React Flow Integration**: Leverages the `react-flow-renderer` library for creating and managing the graph.
- **UI Components**: Utilizes `ReactFlow`, `ReactFlowProvider`, `Controls`, and `Background` components from the `react-flow-renderer` library.

### `Sidebar.js`

- **Purpose**: Provides a navigation sidebar for the IPE UI.
- **Features**:
  - **Navigation**: Provides links to different sections of the IPE UI, including Dashboard, Monitoring, Incident Management, Config Management, Reporting, and Automation.
  - **UI Components**: Utilizes Material-UI components such as `Drawer`, `List`, `ListItem`, `ListItemIcon`, `ListItemText`, and icons like `DashboardIcon`, `MonitorIcon`, `ReportIcon`, `SettingsIcon`, and `BuildIcon`.
  - **Styling**: Uses styled components to customize the appearance of the sidebar.


## Future Enhancements

- **Enhanced AI Capabilities**: Integrate more advanced AI models and improve the contextual understanding of the chatbot.
- **Real-Time Data Integration**: Implement real-time data fetching and updates for monitoring and incident management.
- **Advanced Reporting**: Add more detailed and customizable reporting features.
- **User Management**: Implement user roles and permissions for better access control.
- **Scalability Improvements**: Optimize the solution for better performance and scalability.
- **Customizable Dashboards**: Allow users to create and customize their own dashboards with specific metrics and widgets.
- **Predictive Analytics**: Implement predictive analytics to forecast potential incidents and performance bottlenecks.
- **Automated Remediation**: Develop automated remediation workflows to resolve incidents and issues automatically.
- **Multi-Cloud Support**: Extend the solution to support monitoring and management of multi-cloud environments.
- **Mobile App**: Develop a mobile app for accessing the IPE UI on the go.
