import React from 'react';
import Plot from 'react-plotly.js';
import { useDrag, useDrop } from "react-dnd";

const ShowData = () => {
    const testData = {
        x: [1, 2, 3],
        y: [2, 6, 3],
    };

    return (
        <Plot
            data={[
                {
                    x: testData.x,
                    y: testData.y,
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: { color: 'red' },
                },
                { type: 'bar', x: testData.x, y: testData.y },
            ]}
            layout={{ width: "70 rem", height: "50rem", title: 'A Fancy Plot' }}
        />
    );
};

export default ShowData;