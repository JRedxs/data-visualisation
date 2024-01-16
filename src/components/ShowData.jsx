import React, { useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import Chart from 'chart.js/auto';
import { Card } from "@chakra-ui/react";
import '../styles/ShowData.css'

const ShowData = ({ data }) => {
    console.log("Data received in ShowData:", data);

    const chartRef = useRef(null);
    const radarChartRef = useRef(null);
    const donutsChartRef = useRef(null)
    const lengthData = Object.keys(data.data);
    const labels = [];
    const latValues = [];
    const longValues = [];
    const birthDate = [];
    const grave = [];
    const sexe = []

    for (let i = 0; i < lengthData.length; i++) {
        if (!data || data.data[lengthData[i]].lat === undefined || data.data[lengthData[i]].long === undefined) {
            return <p>Loading data or data is incomplete...</p>;
        }
        labels.push(`Label ${i + 1}`);
        latValues.push(data.data[lengthData[i]].lat);
        longValues.push(data.data[lengthData[i]].long);
        birthDate.push(data.data[lengthData[i]].an_nais)
        grave.push(data.data[lengthData[i]].grav)
        sexe.push(data.data[lengthData[i]].sexe)
        console.log('sexe', sexe)
    }

    useEffect(() => {

        const counts = sexe.reduce((acc, value) => {
            acc[value] = (acc[value] || 0) + 1;
            return acc;
        }, {});

        const donutsData = ['Homme', 'Femme'].map(sex => counts[sex] || 0);

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

        if (radarChartRef.current) {
            const radarCtx = radarChartRef.current.getContext('2d');
            new Chart(radarCtx, {
                type: 'radar',
                data: {
                    labels: birthDate,
                    datasets: [
                        {
                            label: "Gravité",
                            data: grave,
                            backgroundColor: 'red',
                            borderColor: 'darkred',
                            fill: false,
                            borderWidth: 1
                        }
                        , {
                            label: "Année de naissance",
                            data: birthDate,
                            backgroundColor: 'rgba(0, 123, 255, 0.5)',
                            fill: false,
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    onClick: (e, elements) => {
                        if (elements.length > 0) {
                            const index = elements[0].index;
                            const label = birthDate[index]; // Label est la date de naissance
                            const birthDateValue = birthDate[index]; // Valeur de l'année de naissance
                            const graveValue = grave[index]; // Valeur de gravité
                            console.log(`Clic sur le label ${label}, Année de naissance : ${birthDateValue}, Gravité: ${graveValue}`);
                        }
                    },
                }
            });
        }





    }, [latValues, longValues, labels, birthDate, grave]);

    return (
        <>
            <Card style={{ position: 'absolute', top: 0, left: 0, zIndex: 1000 }}>
                <Draggable>
                    <div className='draggable-container'>
                        <canvas ref={chartRef} className='canvas-dash' />
                    </div>
                </Draggable>
            </Card>

            <Card style={{ position: 'absolute', top: 0, left: 970 }}>
                <Draggable>
                    <div className='draggable-container'>
                        <canvas ref={radarChartRef} className='canvas-dash' />
                    </div>
                </Draggable>
            </Card>
        </>

    );
};

export default ShowData;
