import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist';

const PolarGraph = () => {
  const containerRef = useRef(null);
  useEffect(() => {
    const data = [{
      type: 'scatter3d',
      mode: 'lines',
      x: [],
      y: [],
      z: [],
      line: {
        color: 'blue',
        width: 2
      }
    }];
    
    const r = 5;
    const steps = 32;
    for (let i = 0; i < steps; i++) {
        const theta = (i / steps) * 2 * Math.PI;
        const x = r * Math.sin(theta);
        const y = r * Math.cos(theta);
        data[0].x.push(x);
        data[0].y.push(y);
        data[0].z.push(0);
    }

    Plotly.newPlot(containerRef.current, data, {
      margin: { t: 0 },
      scene: {
        xaxis: { visible: false },
        yaxis: { visible: false },
        zaxis: { visible: false },
      }
    });
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};

export default PolarGraph;