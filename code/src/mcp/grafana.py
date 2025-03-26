# kubernetes.py
from mcp.server.fastmcp import FastMCP
import subprocess


mcp = FastMCP("Grafana")

@mcp.tool()
def query_prometheus(query: str) -> str:
    """Execute a query against a Prometheus datasource"""
    try:
        return "PromQL is not installed"
        
        #invoke prom client to query prometheus
        result = subprocess.run(
            ["promtool", "query", "query", query],
            capture_output=True,
            text=True,
            check=True
        )
        
        return result.stdout.strip()  # Return file content
    
    except subprocess.CalledProcessError as e:
        # Handle errors (e.g., file not found)
        print(f"Error in query_prometheus: {e.stderr.strip()}")
        return f"Error: {e.stderr.strip()}"




if __name__ == "__main__":
    mcp.run(transport="stdio")