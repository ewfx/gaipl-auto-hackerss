import React, { useState, useEffect } from "react";

const RunBook = ({ runBookContent }) => {
  const [currentrunBookContent, setCurrentRunBook] = useState(runBookContent); // Maintain internal state for logs
  const [isExpanded, setIsExpanded] = useState(false);
  //const [loading, setLoading] = useState(true);
  //const [error, setError] = useState(null);

  // Use effect to detect changes in systemLogs prop and update the state
  useEffect(() => {
    setCurrentRunBook(runBookContent);
    //setLoading(false); // Update loading state when logs are received
    //setError(null); // Clear errors if logs are successfully updated
  }, [runBookContent]);

  const toggleRunbook = () => setIsExpanded((prev) => !prev);

  return (
    <div style={styles.container}>
      <h2 onClick={toggleRunbook} style={styles.header}>
        System Logs {isExpanded ? "[-]" : "[+]"}
      </h2>

      {isExpanded && currentrunBookContent && (
        <ul style={styles.logList}>
          {currentLogs.map((log, index) => (
            <li key={index} style={styles.logItem}>
              <strong>{log.timestamp}</strong> [{log.severity}] - {log.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    margin: "20px 0",
  },
  header: {
    background: "#eee",
    padding: "10px",
    cursor: "pointer",
  },
  logList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    border: "1px solid #ddd",
    borderTop: "none",
    maxHeight: "300px", // Set the height of the scrollable section
    overflowY: "auto", // Enable vertical scrolling
  },
  /*logItem: {
    padding: "8px 12px",
    borderBottom: "1px solid #ddd",
  },*/
};

export default LogDisplay;