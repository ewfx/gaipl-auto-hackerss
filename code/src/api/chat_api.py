import os
from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from langchain_core.prompts import ChatPromptTemplate
from langchain.schema import HumanMessage, SystemMessage, AIMessage
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client
import asyncio
from typing import Optional, Dict
from datetime import datetime, timedelta
import json
import time
from pydantic import BaseModel
from contextlib import AsyncExitStack
from langchain_google_genai import ChatGoogleGenerativeAI


#prompts used

MCP_AUTOMATION_EXECUTOR_PROMPT = """
You are an MCP (Master Control Program) automation executor based on data {automationdata} which is in json format. Additionally, Your role is also to understand and execute automation commands provided by the user. For each command received, you will process it and provide an appropriate response based on the command being passed indicating whether the execution was successful or failed and appropriate logs based on the command. The success or failure of the execution should be determined randomly to simulate real-world scenarios. Ensure that your responses are clear and concise, providing any necessary details about the execution outcome. If the input is a general message, respond accordingly without indicating success or failure. The response should be realistic and human understandable format and response should be brief, not exceeding 3 or 4 lines.
"""

SYSTEM_TROUBLESHOOTER_PROMPT = """
You are a System Troubleshooter who knows how to identify issues related to Distributed Systems, Microservices, Kafka, Databases such as Oracle, Mongo, SQL Server, Redis and other technologies available. The user will provide the System architecture and the architecture details would contain the dependent systems and also the dependencies for the given system. The user also will provide system logs containing errors. Based on the details provided, provide troubleshooting steps and suggest corrective actions to be taken to resolve the issue. Feel free to ask further information as needed for incident resolution. Keep the instructions short to less than a paragraph so the user can resolve the issue faster. Try to limit the response to 100 words or less when possible. Goal is to resolve the error as soon as possible with least manual steps. The logs are {logs} and the system dependencies {dependencies}
"""

CHAT_PROMPT_TEXT = """You are a System Administrator who knows how to identify issues related to Distributed Systems, Microservices, Kafka, Databases such as Oracle, Mongo, SQL Server, Redis and other technologies available. 
The user will provide the System architecture and the architecture details would contain the dependent systems and also the dependencies for the given system. 
The user also will provide system logs containing errors. 
Based on the details provided, provide troubleshooting steps and suggest corrective actions to be taken to resolve the issue. 
Feel free to ask further information as needed for incident resolution. 
Keep the instructions short to less than a paragraph so the user can resolve the issue faster. 
Try to limit the response to 100 words or less when possible. Goal is to resolve the error as soon as possible with least manual steps. 
You will be provided with conversation history. Device the diagnostics keeping past executions in mind.
Do not stop the conversation once the issue is diagnosed. Continue to prompt the user for any further assistance needed. The previous conversations in the chat is {history}
The logs are {logs} and the system dependencies {dependencies}"""

SUMMARIZE_PROMPT_TEXT = """You are a System Administrator who knows how to identify issues related to Distributed Systems, Microservices, Kafka, Databases such as Oracle, Mongo, SQL Server, Redis and other technologies available. 
The user will provide system logs which may contain errors or failures. By looking at the logs summarize your findings and the cause if any.
The logs are {logs} and the system dependencies {dependencies}"""

REPORTING_CHATBOT_HELPER_PROMPT = """
You are a reporting chatbot helper. Your role is to analyze the incidents passed and respond to the queries based on the data available in the incidents. Understand the incoming message and process it to respond with an appropriate response based on the input. User can ask questions on individual incidents or get a summary of all incidents. The incidents are {incidents} and reporting data {reportingdata} which is in json format that we can use to learn and respond. The response should be realistic and human understandable format and response should be brief, not exceeding 3 or 4 lines.
"""

MONITORING_CHATBOT_HELPER_PROMPT = """
You are a monitoring chatbot helper which will learn and respond based on monitoring data {monitoringdata} which is in json format. Additionally, your role is to analyze the underlying infrastructure of Kubernetes, databases, CPU, space, request throttling, memory usage, etc. Respond to the queries assuming relevant data and display the response back accordingly. The response should be realistic and human understandable format and response should be brief, not exceeding 3 or 4 lines.
"""

CONFIG_MANAGEMENT_ASSISTANT_PROMPT = """
You are a Configuration and Change Management Assistant based on data {configdata} which is in json format designed to assist software and infrastructure industries by automating configuration tracking, change request workflows, impact analysis, deployment, monitoring, compliance, and reporting while ensuring efficiency, accuracy, and actionable responses tailored to user queries based on retrieved RAG data. The response should be realistic and human understandable format and response should be brief, not exceeding 3 or 4 lines
"""

RUNBOOK_PROMPT = """
Please provide a detailed runbook for a component based on the {dependencies}. The runbook should include the following information: 
1. Component Information: 
   - Component Name: The name of the component. 
   - Component Description: A brief description of the component and its functionality. 
2. Dependencies: 
   - Upstream Dependencies: List of components or services that this component depends on. 
   - Downstream Dependencies: List of components or services that depend on this component. 
3. Logs and Monitoring: 
   - Logs to Monitor: List of logs that need to be monitored for this component. 
   - Log File Path: Path to the log file. 
   - Log Level: The level of logs to monitor (e.g., ERROR, WARN, INFO). 
   - Alerting Criteria: Criteria for triggering alerts based on log entries. 
4. Alert Information: 
   - Alert Name: Name of the alert. 
   - Alert Description: Description of the alert and its significance. 
   - Alert Severity: Severity level of the alert (e.g., Critical, High, Medium, Low). 
5. Troubleshooting Steps: 
   - Step 1: Description of the first troubleshooting step. 
   - Step 2: Description of the second troubleshooting step. 
   - Step 3: Description of the third troubleshooting step. 
   - ...: Additional steps as needed. 
6. Platform Information: 
   - Platform Name: Name of the platform. 
   - Platform Version: Version of the platform. 
   - Platform Description: Description of the platform and its purpose. 
7. System Information: 
   - System Name: Name of the system. 
   - System Version: Version of the system. 
   - System Description: Description of the system and its purpose. 
   - System Health: Current health status of the system (e.g., Healthy, Degraded, Unhealthy)
"""



# Expect the client to send a JSON payload containing a list of messages.
class ChatRequest(BaseModel):
    chatid: str
    messages: str  # Each message is typically a dict with keys "role" and "content"
    logs: list
    dependencies: str

class AutomationChatRequest(BaseModel):
    chatid: str
    messages: list  # Each message is typically a dict with keys "role" and "content"
    automationdata: str

class ReportingChatRequest(BaseModel):
    chatid: str
    messages: list  # Each message is typically a dict with keys "role" and "content"
    incidents: list  # Incident details
    reportingdata: str

class MonitoringChatRequest(BaseModel):
    chatid: str
    messages: list  # Each message is typically a dict with keys "role" and "content"
    monitoringdata: str

class ConfigManagementChatRequest(BaseModel):
    chatid: str
    messages: list
    configdata: str  # Each message is typically a dict with keys "role" and "content"

class RunBookRequest(BaseModel):
    dependencies: str

class LogsRequest(BaseModel):
    name: str  # Each message is typically a dict with keys "role" and "content"
    platform: str
    deps: str
    start: str
    end: str

class SystemsRequest(BaseModel):
    name: str  # Each message is typically a dict with keys "role" and "content"
    platform: str
    deps: str
    start: str
    end: str


GEMINI_API_KEY = os.getenv("GOOGLE_GEMINI_API_KEY")

troubleshooting_prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                CHAT_PROMPT_TEXT,
            ),
            ("user", "{input}"),
        ])

summary_prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                CHAT_PROMPT_TEXT,
            ),
            ("user", "{input}"),
        ])

class ChatAPI:
    
    
    def __init__(self):

        self.exit_stack = AsyncExitStack()

        self.session: Optional[ClientSession] = None
        self.chatgoogle = ChatGoogleGenerativeAI(model="gemini-2.0-flash", max_tokens=None,)
        # Initialize an APIRouter instance
        self.router = APIRouter()

        # In-memory store for chat histories
        self.chat_histories: Dict[str, Dict] = {}

        # Declare endpoints within the class
        self.router.get("/hello")(self.hello)
        self.router.post("/incidentchat")(self.chat)
        self.router.post("/automationchat")(self.automationchat)
        self.router.post("/reportingchat")(self.reportingchat)
        self.router.post("/monitoringchat")(self.monitoringchat)
        self.router.post("/config_management_chat")(self.config_management_chat)
        self.router.post("/logs")(self.logs)
        self.router.get("/splunk_logs")(self.splunk_logs)
        self.router.get("/config_management_data")(self.config_management_data)
        self.router.get("/automation_data")(self.automation_data)
        self.router.get("/reporting_data")(self.reporting_data)
        self.router.get("/monitoring_data")(self.monitoring_data)        
        self.router.post("/systems")(self.systems)
        self.router.post("/runbooks")(self.runbooks)



    async def connect_to_server(self, server_script_path: str):
        """Connect to an MCP server
        
        Args:
            server_script_path: Path to the server script (.py or .js)
        """
        is_python = server_script_path.endswith('.py')
        is_js = server_script_path.endswith('.js')
        if not (is_python or is_js):
            raise ValueError("Server script must be a .py or .js file")
            
        command = "python" if is_python else "node"
        server_params = StdioServerParameters(
            command=command,
            args=[server_script_path],
            env=None
        )
        
        stdio_transport = await self.exit_stack.enter_async_context(stdio_client(server_params))
        self.stdio, self.write = stdio_transport
        self.session = await self.exit_stack.enter_async_context(ClientSession(self.stdio, self.write))
        
        await self.session.initialize()
        
        # List available tools
        response = await self.session.list_tools()
        tools = response.tools
        print("\nConnected to server with tools:", [tool.name for tool in tools])

    async def initialize_with_mcp(self, server_script_path: str):        
        try:
            await self.connect_to_server(server_script_path)
            
            response = await self.session.list_tools()
            available_tools = [{ 
                "name": tool.name,
                "description": tool.description,
                "input_schema": tool.inputSchema
            } for tool in response.tools]

            self.chatgoogle = self.chatgoogle.bind_tools(available_tools)
        except Exception as e:
            print(f"Error initializing with MCP: {e}")

    def transform(self, request: ChatRequest):
        contents = [(msg["role"], msg["content"])
                    for msg in request.messages]
        print(contents)
        return contents
    
    def clean_and_parse_json(self,llm_response):
    # Remove the formatting markers like ```json and ```
        cleaned_response = llm_response.strip('```json').strip('```').strip()
        
        try:
            # Parse the cleaned string as JSON
            json_data = json.loads(cleaned_response)
            return json_data
        except json.JSONDecodeError as e:
            print("Failed to parse JSON:", e)
            return None

    async def chat(self, request: ChatRequest):
        """
        POST endpoint to chat with bot.
        """
        try:

            print(request)

            chatid = request.chatid
            logs = request.logs
            deps = request.dependencies

            # Retrieve or initialize chat history
            if chatid not in self.chat_histories:
                self.chat_histories[chatid] = {"messages": [], "timestamp": time.time()}

                # Append new messages to the chat history
            chat_history = self.chat_histories[chatid]

            chat_history["messages"].append(SystemMessage(content=CHAT_PROMPT_TEXT))
            chat_history["messages"].append(HumanMessage(content=request.messages))
            chat_history["timestamp"] = time.time()  # Update the timestamp

            # Transform the chat history for the LLM
            #chats = self.transform(request)            

            chain = troubleshooting_prompt | self.chatgoogle
            result = chain.invoke(
                {
                    "logs": logs,
                    "dependencies": deps,
                    "input": HumanMessage(content=request.messages),
                    "history": str(chat_history["messages"]),
                }
            )

            #print(result)
            #print("type--")
            #print(type(result))

            # Append the LLM's response to the chat history
            if len(result.content) > 0:
                chat_history["messages"].append(result)
            else :
                chat_history["messages"].append(AIMessage(content=str(result.additional_kwargs)))

            
            final_text = []

            for content in result.content:
                if len(content) > 0:
                    #print('Found content ...')
                    final_text.append(content)

            
            for tool_call in result.tool_calls:                
                print('Found tool call ...')
                tool_name = tool_call["name"]
                tool_args = tool_call["args"]
                
                # Execute tool call
                result = await self.session.call_tool(tool_name, tool_args)
                final_text.append(f"[Calling tool {tool_name} with args {tool_args}]")

                print('--after tool exec--')
                #print(type(result))
                chat_history["messages"].append(AIMessage(content=str(final_text)))
                chat_history["messages"].append(AIMessage(content=str(result)))
                #print(result)

                # Continue conversation with tool results
                #if hasattr(result.content, 'text') and len(result.content.text) > 0:
                #    chat_history["messages"].append(AIMessage(content=content.text))
                #else:
                #    chat_history["messages"].append(AIMessage(content=f"[Calling tool {tool_name} with args {tool_args}]"))
                

                #print(chat_history["messages"])
                self.chat_histories[chatid]["messages"] = chat_history["messages"]
                self.chat_histories[chatid]["timestamp"] = time.time()
                #response = self.chatgoogle.invoke(chat_history["messages"])

                #chain = summary_prompt | self.chatgoogle
                #result = chain.invoke(
                #    {
                #        "logs": logs,
                #        "dependencies": deps,
                #        "input": chat_history["messages"],
                #    }
                #)
                print('--')
                print(result)

                final_text.append("The tool was run and above is the output")
            


            return {"reply": str(result.content)}
        
        except Exception as e:
            print(e)
            raise HTTPException(status_code=500, detail=str(e))
    
    async def automationchat(self, request: AutomationChatRequest):
        """
        Receives a conversation (as a list of messages), processes the command if detected,
        and returns the execution result (success or failure) or a general response.
        """

        prompt = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    MCP_AUTOMATION_EXECUTOR_PROMPT
                ),
                ("user", "{input}"),
            ]
        )

        llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash",
                                    temperature=0.7,
                                    max_tokens=None,
                                    timeout=None,
                                    max_retries=2,
                                    # other params...
                                    )

        try:
            print(request)

            chats = self.transform(request)
            user_message = request.messages[-1]["content"].strip().lower()

            # Check if the message is a command
            is_command = any(keyword in user_message for keyword in ["execute", "run", "start", "stop", "deploy"])

            if is_command:
                chain = prompt | llm
                result = chain.invoke(
                    {
                        "input": chats,
                        "automationdata": request.automationdata
                    }
                )
                response_content = f"{result.content}"
            else:
                # Handle general messages
                chain = prompt | llm
                result = chain.invoke(
                    {
                        "input": chats,
                        "automationdata": request.automationdata
                    }
                )
                response_content = result.content

            print(response_content)
            return {"reply": response_content}

        except Exception as e:
            print(e)
            raise HTTPException(status_code=500, detail=str(e))

    async def reportingchat(self, request: ReportingChatRequest):
        """
        Receives a conversation (as a list of messages) and an incident, processes the request,
        and returns an appropriate response based on the data available.
        """

        prompt = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    REPORTING_CHATBOT_HELPER_PROMPT
                ),
                ("user", "{input}"),
            ]
        )

        llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash",
                                    temperature=0.7,
                                    max_tokens=None,
                                    timeout=None,
                                    max_retries=2,
                                    # other params...
                                    )

        try:
            print(request)

            chats = self.transform(request)
            incidents = request.incidents

            chain = prompt | llm
            result = chain.invoke(
                {
                    "input": chats,
                    "incidents": incidents,
                    "reportingdata": request.reportingdata
                }
            )

            response_content = result.content
            print(response_content)
            return {"reply": response_content}

        except Exception as e:
            print(e)
            raise HTTPException(status_code=500, detail=str(e))

    async def monitoringchat(self, request: MonitoringChatRequest):
        """
        Receives a conversation (as a list of messages), processes the request,
        and returns an appropriate response based on the data available.
        """

        prompt = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    MONITORING_CHATBOT_HELPER_PROMPT
                ),
                ("user", "{input}"),
            ]
        )

        llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash",
                                    temperature=0.7,
                                    max_tokens=None,
                                    timeout=None,
                                    max_retries=2,
                                    # other params...
                                    )

        try:
            print(request)

            chats = self.transform(request)

            chain = prompt | llm
            result = chain.invoke(
                {
                    "input": chats,
                    "monitoringdata" : request.monitoringdata
                }
            )

            response_content = result.content
            print(response_content)
            return {"reply": response_content}

        except Exception as e:
            print(e)
            raise HTTPException(status_code=500, detail=str(e))

    async def config_management_chat(self, request: ConfigManagementChatRequest):
        """
        Receives a conversation (as a list of messages), processes the request,
        and returns an appropriate response based on the data available.
        """

        prompt = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    CONFIG_MANAGEMENT_ASSISTANT_PROMPT
                ),
                ("user", "{input}"),
            ]
        )

        llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash",
                                    temperature=0.7,
                                    max_tokens=None,
                                    timeout=None,
                                    max_retries=2,
                                    # other params...
                                    )

        try:
            print(request)

            chats = self.transform(request)

            chain = prompt | llm
            result = chain.invoke(
                {
                    "input": chats,
                    "configdata": request.configdata
                }
            )

            print(result)

            #print(response_content)
            return {"reply": str(result.content)}

        except Exception as e:
            print(e)
            raise HTTPException(status_code=500, detail=str(e))

    async def logs(self, request: LogsRequest):
        """
        Receives a conversation (as a list of messages), calls Google Gemini Chat API,
        and returns the assistant’s reply.
        """

        prompt = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    "You are pretending to be a Log aggregation system such as splunk or elastic search. The user provides the system name, platform details , dependent systems,  start time and end time, generate 50 lines of system logs in the given time duration. Ensure to have a error or two. If the dependent systems are commercial off the shelf software generate some logs including those as well. The system name is {name}, platform details are {platform}, dependencies are {deps}, start time is {start} and end time is {end}. The generated logs should be an array of json objects containing timestamp, severity and message as its property.",
                ),
                ("user", "Generate sample logs"),
            ]
        )

        llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash",
                                    temperature=0.7,
                                    max_tokens=None,
                                    timeout=None,
                                    max_retries=2,
                                    # other params...
                                    )

        try:
            print(request)

            chain = prompt | llm
            result = chain.invoke(
                {
                    "name": request.name,
                    "deps": request.deps,
                    "platform": request.platform,
                    "start": request.start,
                    "end": request.end
                }
            )

            parsed_json = self.clean_and_parse_json(result.content)

            print(parsed_json)

            # Create a JSON response and set cache-control headers
            response = JSONResponse(content=parsed_json)

            # Set Cache-Control header for 60 minutes
            response.headers["Cache-Control"] = "public, max-age=3600"
            # Optionally set Expires header (UTC format)
            expires = (datetime.utcnow() + timedelta(minutes=60)).strftime("%a, %d %b %Y %H:%M:%S GMT")
            response.headers["Expires"] = expires

            return response
        except Exception as e:
            print(e)
            raise HTTPException(status_code=500, detail=str(e))

    async def splunk_logs(self):
        #read the logs from specific folder , the folder is specific in env variable
        #return the json logs as jsonresponse
        try:
            logs = []
            for filename in os.listdir('logs'):
                with open(f'logs/{filename}', 'r') as file:
                    logs = json.load(file)
            return JSONResponse(content=logs)
        except Exception as e:
            print(e)
            raise HTTPException(status_code=500, detail=str(e))

    async def config_management_data(self):
        # Read the config management data from 'feed/configManagementData.json'
        try:
            for filename in os.listdir('feed'):
                with open(f'feed/configManagementData.json', 'r') as file:
                    data = json.load(file)
            return JSONResponse(content=data)
        except Exception as e:
            print(e)
            raise HTTPException(status_code=500, detail=str(e))
    
    async def automation_data(self):
        # Read the automation data from 'feed/automationData.json'
        try:
            for filename in os.listdir('feed'):
                with open(f'feed/automationData.json', 'r') as file:
                    data = json.load(file)
            return JSONResponse(content=data)
        except Exception as e:
            print(e)
            raise HTTPException(status_code=500, detail=str(e))
        
    async def reporting_data(self):
        # Read the automation data from 'feed/reportingData.json'
        try:
            for filename in os.listdir('feed'):
                with open(f'feed/reportingData.json', 'r') as file:
                    data = json.load(file)
            return JSONResponse(content=data)
        except Exception as e:
            print(e)
            raise HTTPException(status_code=500, detail=str(e))       
        
    async def monitoring_data(self):
        # Read the automation data from 'feed/monitoringData.json'
        try:
            for filename in os.listdir('feed'):
                with open(f'feed/monitoringData.json', 'r') as file:
                    data = json.load(file)
            return JSONResponse(content=data)
        except Exception as e:
            print(e)
            raise HTTPException(status_code=500, detail=str(e))          
        
    async def systems(self, request: SystemsRequest):
        """
        Receives a conversation (as a list of messages), calls Google Gemini Chat API,
        and returns the assistant’s reply.
        """

        prompt = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    SYSTEM_TROUBLESHOOTER_PROMPT,
                ),
                ("user", "{input}"),
            ]
        )

        llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash-thinking-exp-01-21",
                                    temperature=0.7,
                                    max_tokens=None,
                                    timeout=None,
                                    max_retries=2,
                                    # other params...
                                    )

        try:
            print(request)

            logs = request.logs
            deps = request.dependencies

            chats = self.transform(request)
            #result = llm.invoke(chats)

            chain = prompt | llm
            result = chain.invoke(
                {
                    "logs": logs,
                    "dependencies": deps,
                    "input": chats,
                }
            )

            print(result.content)
            return {"reply": result.content}

        except Exception as e:
            print(e)
            raise HTTPException(status_code=500, detail=str(e))

    async def runbooks(self, request: RunBookRequest):
        """
        Receives a conversation (as a list of messages), calls Google Gemini Chat API,
        and returns the assistant’s reply.
        """

        prompt = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    RUNBOOK_PROMPT
                ),
                ("user", "Generate runbook logs"),
            ]
        )

        llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash-thinking-exp-01-21",
                                    temperature=0.7,
                                    max_tokens=None,
                                    timeout=None,
                                    max_retries=2,
                                    # other params...
                                    )

        try:
            print(request)

            chain = prompt | llm
            result = chain.invoke(
                {
                    "dependencies": request.dependencies
                }
            )

            print(result.content)
            return {"reply": result.content}

        except Exception as e:
            print(e)
            raise HTTPException(status_code=500, detail=str(e))
            
    async def hello(self):
        """
        GET endpoint to return a greeting message.
        """
        return {"message": "Hello, World!"}