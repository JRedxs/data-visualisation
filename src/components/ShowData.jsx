import React from 'react';
import Plot from 'react-plotly.js';

const ShowData = ({ data }) => {
    console.log("Data received in ShowData:", data);

    console.log("values lat :", Object.keys(data.data))

    const lengthData = Object.keys(data.data)
    console.log("test : ", lengthData)



    for(let i = 0;i<lengthData.length; i++) {
        const object = Object.keys(lengthData[i])
        console.log("Object : ", object)
            // Vérification de l'existence des données
        if (!data || data.data.lat[lengthData[i]] === undefined || data.data.long[lengthData[i]] === undefined) {
            console.log("rien")
            return <p>Loading data or data is incomplete...</p>;
    }
        const latValues = [data.data.lat[lengthData[i]]];
        const longValues = [data.data.long[lengthData[i]]];
        console.log("inside for : ", longValues)
        
    }

    // Assurez-vous que les valeurs de latitude et longitude sont sous forme de tableaux

    console.log("long : ", longValues)

    return (
        <Plot
            data={[
                {
                    x: longValues, // Longitude
                    y: latValues, // Latitude
                    type: 'scatter',
                    mode: 'markers',
                    marker: { color: 'blue' },
                }
            ]}
            layout={{ 
                width: 700, 
                height: 500, 
                title: 'Localisation des Accidents', 
                xaxis: { title: 'Longitude' },
                yaxis: { title: 'Latitude' }
            }}
        />
    );
};

export default ShowData;