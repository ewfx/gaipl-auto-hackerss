// src/components/DependencyGraph.js
import React, { useState, useEffect, useCallback, useRef } from 'react';
import ReactFlow, { ReactFlowProvider, Controls, Background } from 'react-flow-renderer';

const DependencyGraph = ({ appName, dependencies, dependents }) => {
  // Reference to the canvas container to obtain its width.
  const containerRef = useRef(null);
  // Set a fixed height (you may adjust this for your design)
  const defaultHeight = 600;
  const [dimensions, setDimensions] = useState({
    width: 500, // initial default value; updated on mount
    height: defaultHeight,
  });

  // Update the dimensions when the window is resized.
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: defaultHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [defaultHeight]);

  const { width: canvasWidth, height: canvasHeight } = dimensions;

  // Define vertical positions for each row.
  const dependentY = 100; // Top row for dependent nodes.
  const mainY = canvasHeight / 2; // Centered vertical position for main node.
  const dependencyY = canvasHeight - 100; // Bottom row for dependency nodes.

  // Define the main node, centering it horizontally.
  const mainNode = {
    id: 'main',
    type: 'default',
    data: { label: <strong>{appName}</strong> },
    position: { x: canvasWidth / 2 - 50, y: mainY - 30 }, // adjust for approximate node width/height
  };

  const margin = 50; // left/right margin for horizontal spacing

  // Arrange dependent nodes (upstream) on the top row.
  const dependentNodes = (dependents || []).map((dep, index) => {
    let x;
    if (dependents.length === 1) {
      x = canvasWidth / 2;
    } else {
      const spacing = (canvasWidth - 2 * margin) / (dependents.length - 1);
      x = margin + index * spacing;
    }
    return {
      id: `up-${dep.id}`,
      type: 'default',
      data: { label: dep.name },
      position: { x, y: dependentY },
    };
  });

  // Arrange dependency nodes (downstream) on the bottom row.
  const dependencyNodes = (dependencies || []).map((dep, index) => {
    let x;
    if (dependencies.length === 1) {
      x = canvasWidth / 2;
    } else {
      const spacing = (canvasWidth - 2 * margin) / (dependencies.length - 1);
      x = margin + index * spacing;
    }
    return {
      id: `dep-${dep.id}`,
      type: 'default',
      data: { label: dep.name },
      position: { x, y: dependencyY },
    };
  });

  // Combine all nodes: main, dependents, and dependencies.
  const nodesInit = [mainNode, ...dependentNodes, ...dependencyNodes];

  // Create edges:
  // For dependencies, draw an edge from the main node to each dependency.
  const dependencyEdges = (dependencies || []).map((dep) => ({
    id: `e-main-dep-${dep.id}`,
    source: 'main',
    target: `dep-${dep.id}`,
    animated: true,
    style: { stroke: '#888' },
  }));

  // For dependents, draw an edge from each dependent node to the main node.
  const dependentEdges = (dependents || []).map((dep) => ({
    id: `e-up-${dep.id}`,
    source: `up-${dep.id}`,
    target: 'main',
    animated: true,
    style: { stroke: '#888', strokeDasharray: '5 5' },
  }));

  const edgesInit = [...dependencyEdges, ...dependentEdges];

  const [nodes, setNodes] = useState(nodesInit);
  const [edges, setEdges] = useState(edgesInit);

  // Update node positions when nodes are dragged.
  const onNodesChange = useCallback((changes) => {
    setNodes((nds) =>
      nds.map((node) => {
        const change = changes.find(
          (ch) => ch.id === node.id && ch.position !== undefined
        );
        if (change) {
          return { ...node, position: change.position };
        }
        return node;
      })
    );
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%', // Occupy full width of the app-container.
        height: `${defaultHeight}px`,
        border: '1px solid #ddd',
        borderRadius: '8px',
        margin: '0 auto',
      }}
    >
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          fitView
          snapToGrid
          snapGrid={[15, 15]}
        >
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default DependencyGraph;