# kubernetes.py
from mcp.server.fastmcp import FastMCP
import subprocess


mcp = FastMCP("Elastic")

@mcp.tool()
def find_exceptions(namespace: str) -> str:
    """Get the exception counts from traces logged in Elastic"""
    try:
    
        return "Elastic is not installed"
        #Invoke the elastic client to query elastic
        result = subprocess.run(
            ["elastic", "query", "query", namespace],
            capture_output=True,
            text=True,
            check=True
        )        

        #print(f"getk8sPods: {result.stdout.strip()}")
        return result.stdout.strip()  # Return file content
    
    except subprocess.CalledProcessError as e:
        # Handle errors (e.g., file not found)
        print(f"Error in find_exceptions: {e.stderr.strip()}")
        return f"Error: {e.stderr.strip()}"




if __name__ == "__main__":
    mcp.run(transport="stdio")