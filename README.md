# 🚀 Project Name

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
This is an Integrated Platform Management Portal. The Platform is a one stop solution for any Platform team to Manage their Platform. The portal provides below different functionalities for the platform user:
- Incident Management, Troubleshooting and Resolution
   Details of incidents - Open/Ongoing
   Details of application facing the incident
   System dependencies
   Troubleshooting Assistant to help with troubleshooting steps
   Capability to run commands from bot
- Configuration Management
   Automation capabilities to perform configuration management such as Patching, platform updates etc.
- Monitoring 
   Monitor aifferent systems and provide an aggregated view
- Reporting
- Change Management
- MCP Servers
   
   There is a platform assistant which can support at different stages in the application to provide context specific informationa nd guide accordingly. For example - When in the Incident Details section, the goal of the Assistant is to help the platform user to troubleshoot and resolve the incident.
   Similarly when the user is Reporting section, the Assistant tries to answer any reporting queries and so on.

   The platform integrates MCP Servers which the LLMs can use to perform specific actions. There is a Kubernetes MCP Server which at the moment can query and get the pod related information. The MCP servers can be easily extended to add any functionalities as needed by the platform.
    

## 🎥 Demo
🔗 [Live Demo](#) (if applicable)  
📹 [Video Demo](#) (if applicable)  
🖼️ Screenshots:

![Screenshot 1](link-to-image)

## 💡 Inspiration
What inspired you to create this project? Describe the problem you're solving.

## ⚙️ What It Does
This is an Integrated Platform Management Portal. The Platform is a one stop solution for any Platform team to Manage their Platform. The portal provides below different functionalities for the platform user:
- Incident Management, Troubleshooting and Resolution
   Details of incidents - Open/Ongoing
   Details of application facing the incident
   System dependencies
   Troubleshooting Assistant to help with troubleshooting steps
   Capability to run commands from bot
- Configuration Management
   Automation capabilities to perform configuration management such as Patching, platform updates etc.
- Monitoring 
   Monitor aifferent systems and provide an aggregated view
- Reporting
- Change Management
- MCP Servers
   
   There is a platform assistant which can support at different stages in the application to provide context specific informationa nd guide accordingly. For example - When in the Incident Details section, the goal of the Assistant is to help the platform user to troubleshoot and resolve the incident.
   Similarly when the user is Reporting section, the Assistant tries to answer any reporting queries and so on.

   The platform integrates MCP Servers which the LLMs can use to perform specific actions. There is a Kubernetes MCP Server which at the moment can query and get the pod related information. The MCP servers can be easily extended to add any functionalities as needed by the platform.

## 🛠️ How We Built It
The Frontend is based on React. The backend is built using Python FastAPI. It uses langchain to interact with LLMs. The current LLM integration is with Google Gemini. The backend also has integration with MCP Servers exposed.

## 🚧 Challenges We Faced
1. Finding the right LLM free for personal use
2. Integrating with MCP servers
3. Persisting chat history

## 🏃 How to Run
1. Clone the repository  
   ```sh
   git clone https://github.com/your-repo.git
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
- **Kishor S D** - [GitHub](#) | [LinkedIn](#)
- **Muskan** - [GitHub](#) | [LinkedIn](#)
- **Revanth T** - [GitHub](#) | [LinkedIn](#)
- **Nagarajan Srinivasan** - [GitHub](#) | [LinkedIn](#)