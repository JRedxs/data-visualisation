import React, { useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import Chart from 'chart.js/auto';

const ShowData = ({ data }) => {
    console.log("Data received in ShowData:", data);

    const chartRef = useRef(null);
    const lengthData = Object.keys(data.data);
    const labels = [];
    const latValues = [];
    const longValues = [];

    for (let i = 0; i < lengthData.length; i++) {
        if (!data || data.data[lengthData[i]].lat === undefined || data.data[lengthData[i]].long === undefined) {
            return <p>Loading data or data is incomplete...</p>;
        }
        labels.push(`Label ${i + 1}`);
        latValues.push(data.data[lengthData[i]].lat);
        longValues.push(data.data[lengthData[i]].long);
    }

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Latitude',
                            data: latValues,
                            borderColor: 'blue',
                            fill: false,
                        },
                        {
                            label: 'Longitude',
                            data: longValues,
                            borderColor: 'red',
                            fill: false,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    onClick: (e, elements) => {
                        if (elements.length > 0) {
                            const index = elements[0].index;
                            const label = labels[index];
                            const latValue = latValues[index];
                            const longValue = longValues[index];
                            console.log(`Clic sur le label ${label}, Latitude : ${latValue}, Longitude: ${longValue}`);
                        }
                    },
                },
            });
        }
    }, [latValues, longValues, labels]);

    return (
        <Draggable>
            <canvas ref={chartRef} />
        </Draggable>
    );
};

export default ShowData;
