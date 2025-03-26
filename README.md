# 🚀 Integrated Platform Environment
## 🧩 Your one-stop solution for managing and monitoring your platform

## 📌 Table of Contents
- [Introduction](#introduction)
- [Demo](#demo)
- [Inspiration](#inspiration)
- [What It Does](#what-it-does)
- [How We Built It](#how-we-built-it)
- [Challenges We Faced](#challenges-we-faced)
- [How to Run](#how-to-run)
- [Tech Stack](#tech-stack)
- [Team](#team)

---

## 🎯 Introduction
This Integrated Platform Management Portal provides a comprehensive, centralized solution for platform teams to efficiently manage and monitor their platforms. Designed to streamline operations and enhance productivity, this portal offers a range of functionalities, all accessible from a single, intuitive interface.

**Key Functionalities:**

- **Incident Management, Troubleshooting, and Resolution:**
    - Provides detailed insights into incidents, including open and ongoing issues.
    - Offers comprehensive information about applications affected by incidents.
    - Maps out system dependencies to facilitate root cause analysis.
    - Features a Troubleshooting Assistant to guide users through effective troubleshooting steps.
    - Enables the execution of commands directly from the chatbot interface for rapid response.

- **Configuration Management:**
    - Includes automation capabilities for configuration management tasks such as patching and platform updates.
    - Simplifies the process of maintaining and updating platform configurations.

- **Monitoring:**
    - Aggregates monitoring data from various systems into a unified view.
    - Provides real-time insights into system health and performance.

- **Reporting:**
    - Generates detailed reports on platform performance, incidents, and other key metrics.
    - Supports data-driven decision-making with customizable reporting options.

- **Change Management:**
    - Facilitates the planning, approval, and execution of changes to the platform.
    - Ensures changes are implemented smoothly and with minimal disruption.

- **MCP Servers:**
    - Integrates with MCP (Model Context Protocol) Servers to extend platform capabilities.
    - Currently includes a Kubernetes MCP Server for querying pod-related information.
    - Designed for easy extensibility, allowing for the addition of new functionalities as needed.

**Platform Assistant:**

A context-aware platform assistant is integrated throughout the portal to provide targeted support and guidance. For example:

- In the **Incident Details** section, the assistant focuses on helping users troubleshoot and resolve incidents efficiently.
- In the **Reporting** section, the assistant is designed to answer reporting queries and provide data insights.

**MCP Server Integration:**

The platform leverages MCP Servers to enable LLMs to perform specific actions and access real-time data. The current Kubernetes MCP Server allows for querying and retrieving pod-related information. This architecture is designed to be highly extensible, allowing for the seamless integration of new MCP Servers and functionalities to meet evolving platform needs.
    

## 🎥 Demo
🔗 [Presentation](https://github.com/ewfx/gaipl-auto-hackerss/blob/main/artifacts/arch/Integrated%20Platform%20Management-3.pptx)
📹 [Video Demo](https://github.com/ewfx/gaipl-auto-hackerss/blob/main/artifacts/demo/Hackathon-Platform-vlc.mp4)

🖼️ Screenshots:
### Dashboard
![image](https://github.com/user-attachments/assets/48f1a89f-fb2c-43ea-b3ce-9c2c0d321a43)
### SlideBar- Menu Options / Navigations
![image](https://github.com/user-attachments/assets/1c5a0c40-2146-40bb-9ad4-420448a6c6c0)
### Monitoring
![image](https://github.com/user-attachments/assets/f736db0a-e07f-47b6-8042-5043cc924f2c)
### Incident Management
![image](https://github.com/user-attachments/assets/1a121554-7a40-464c-8f6a-ac68a31e55da)
### Config / Change Management
![image](https://github.com/user-attachments/assets/69bb6e6b-7ff9-4359-9ccc-ffe127bbbb3b)
### Reporting
![image](https://github.com/user-attachments/assets/aafc9fca-380c-4840-9d9e-8b595cb7bbd1)
### Automation
![image](https://github.com/user-attachments/assets/f5c198fc-f657-4252-8ba7-6b64ae11c8c5)
### Chat Bot (Incident Troubleshooting)
![image](https://github.com/user-attachments/assets/f53ceb2f-32d9-4a21-9d29-4427231f7cb1)

## 💡 Inspiration
We were inspired to create this project after witnessing the challenges faced by platform teams and the fragmented nature of information sources during troubleshooting. Our goal was to create a centralized platform to streamline incident management and provide a unified view of critical system data.

## ⚙️ What It Does
This Integrated Platform Management Portal provides a comprehensive, centralized solution for platform teams to efficiently manage and monitor their platforms. Designed to streamline operations and enhance productivity, this portal offers a range of functionalities, all accessible from a single, intuitive interface.

**Key Functionalities:**

- **Incident Management, Troubleshooting, and Resolution:**
    - **What it does:** Provides a unified view of all incidents, categorized by status (open, ongoing, resolved, etc.), enabling platform teams to quickly identify and prioritize critical issues.
    - **Elaboration:** Delivers detailed insights into each incident, including affected applications, underlying system dependencies, and historical data, empowering users to understand the scope and impact of the problem.
    - **Meaningful Action:** Integrates a troubleshooting assistant that offers step-by-step guidance and automated command execution, accelerating the resolution process and minimizing downtime.

- **Configuration Management:**
    - **What it does:** Automates configuration tasks, such as patching, platform updates, and configuration changes, ensuring consistency and compliance across the platform.
    - **Elaboration:** Offers a centralized repository for managing configuration files, policies, and templates, providing a single source of truth for platform configurations.
    - **Meaningful Action:** Reduces manual effort, minimizes configuration drift, and enhances overall platform stability.

- **Monitoring:**
    - **What it does:** Aggregates monitoring data from diverse systems and applications into a single, customizable dashboard, providing a holistic view of platform health and performance.
    - **Elaboration:** Enables proactive identification of potential issues through real-time alerts, anomaly detection, and performance trend analysis.
    - **Meaningful Action:** Empowers platform teams to optimize resource utilization, improve application performance, and prevent service disruptions.

- **Reporting:**
    - **What it does:** Generates comprehensive reports on key platform metrics, such as incident resolution times, configuration compliance, and resource utilization.
    - **Elaboration:** Offers customizable reporting templates and data visualization tools, enabling users to gain actionable insights into platform performance and identify areas for improvement.
    - **Meaningful Action:** Supports data-driven decision-making, facilitates performance tracking, and enables effective communication with stakeholders.

- **Change Management:**
    - **What it does:** Streamlines the process of planning, approving, and implementing changes to the platform, ensuring minimal disruption to services.
    - **Elaboration:** Provides a centralized workflow for managing change requests, approvals, and deployments, with built-in risk assessment and rollback capabilities.
    - **Meaningful Action:** Reduces the risk of errors, minimizes downtime, and ensures that changes are implemented in a controlled and auditable manner.

- **MCP Servers:**
    - **What it does:** Integrates with MCP (Model Context Protocol) Servers to extend platform capabilities and enable seamless communication with external systems.
    - **Elaboration:** Provides a flexible and extensible framework for integrating with diverse data sources and services, enabling the platform to adapt to evolving business needs.
    - **Meaningful Action:** Enables the platform to leverage real-time data and insights from external systems, enhancing its ability to automate tasks, resolve incidents, and optimize performance.

**Platform Assistant:**
A context-aware platform assistant is integrated throughout the portal to provide targeted support and guidance. For example:
- In the **Incident Details** section, the assistant focuses on helping users troubleshoot and resolve incidents efficiently.
- In the **Reporting** section, the assistant is designed to answer reporting queries and provide data insights.

**MCP Server Integration:**
The platform leverages MCP Servers to enable LLMs to perform specific actions and access real-time data. The current Kubernetes MCP Server allows for querying and retrieving pod-related information. This architecture is designed to be highly extensible, allowing for the seamless integration of new MCP Servers and functionalities to meet evolving platform needs.

## 🛠️ How We Built It
- **Frontend:** Built using React for a dynamic and responsive user interface.
- **Backend:** Developed with Python FastAPI, ensuring high performance and scalability.
- **LLM Integration:** Leverages Langchain to seamlessly interact with Large Language Models, currently integrated with Google Gemini for intelligent assistance.
- **MCP Servers:** Integrates with Model Context Protocol (MCP) Servers to extend platform capabilities and enable seamless communication with external systems.

## 🚧 Challenges We Faced
-  Finding the right LLM free for personal use
-  Integrating with MCP servers
-  Persisting chat history
-  Designing UI to make it more interactive and user friendly

## 🏃 How to Run
1. Clone the repository  
   ```sh
   git clone https://github.com/ewfx/gaipl-auto-hackerss.git
   ```
2. Switch to /api folder
3. Install dependencies  
   ```sh
   uv pip install -r requirements.txt
   ```
4. Provide execute privileges for MCP Scripts (The MCP server for simplicity runs a bash script to show the working)
   ```
   chmod +x code/src/mcp/scripts/read_file.sh
   ```
5. Create a environment variable 
   ```
   GOOGLE_API_KEY=ABC
   MCP_SERVER_PATH=/code/src/mcp/kubernetes.py (Point to kubernetes.py)
   ```
6. Run the project  
   ```sh
   uvicorn api:app --reload  # or python app.py
   ```
7. Switch to Frotend folder
   ```
   cd frontend
   ```
8. Install dependencies  for React Frontend
   ```sh
   npm install  # or pip install -r requirements.txt (for Python)
   ```
9. Run the project  
   ```sh
   npm start  # or python app.py
   ```

## 🏗️ Tech Stack
- 🔹 Frontend: React
- 🔹 Backend:  FastAPI 
- 🔹 Database: None (yet)
- 🔹 Other: Langchain / Google Gemini API

## 👥 Team
- **Sandesh Kumar G** - [GitHub](#) | [LinkedIn](#)
- **Kishor Kumar S D** - [GitHub](#) | [LinkedIn](#)
- **Muskan** - [GitHub](#) | [LinkedIn](#)
- **Revanth T** - [GitHub](#) | [LinkedIn](#)
- **Nagarajan Srinivasan** - [GitHub](#) | [LinkedIn](#)
