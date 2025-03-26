# kubernetes.py
from mcp.server.fastmcp import FastMCP
import subprocess


mcp = FastMCP("Kubernetes")

@mcp.tool()
def getk8sPods(namespace: str) -> str:
    """Get the Kubernetes pods in a given namespace"""
    try:
        PREFIX = '/home/developer/code/repo/gaipl-auto-hackerss/code/src/mcp/'
        file_path = "k8slogs.json"

        #This is just a dummy to show the calls can be made to the shell script or other tools
        # Call the shell script with the file path
        result = subprocess.run(
            [PREFIX + "scripts/read_file.sh", PREFIX+ "data/"+file_path],
            capture_output=True,
            text=True,
            check=True
        )

        #print(f"getk8sPods: {result.stdout.strip()}")
        return result.stdout.strip()  # Return file content
    
    except subprocess.CalledProcessError as e:
        # Handle errors (e.g., file not found)
        print(f"Error in getk8sPods: {e.stderr.strip()}")
        return f"Error: {e.stderr.strip()}"




if __name__ == "__main__":
    mcp.run(transport="stdio")