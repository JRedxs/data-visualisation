import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore"; 
import db from './db/firebase';
import { FileUploader } from 'react-drag-drop-files';
import Papa from 'papaparse';

const fileTypes = ["CSV"];

function DragDrop() {
  const [file, setFile] = useState(null);
  const [csvData, setCsvData] = useState([]);

  const handleChange = (file) => {
    console.log(file)
    setFile(file);
  };

  const handleDrop = (files, event) => {
    setFile(files[0]);
    parseCSV(files[0]);
  };

  const parseCSV = (csvFile) => {
    Papa.parse(csvFile, {
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        setCsvData(result.data);
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
      },
    });
  };

  const sendDataToFirestore = async () => {
    try {
        // const jsonFile = JSON.parse(csvData)
        // console.log(jsonFile)
        console.log(csvData)
      const docRef = await addDoc(collection(db, "csv"), { data: csvData });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div>
      <FileUploader handleChange={handleChange} name="file" types={fileTypes} onDrop={handleDrop} />
      <button onClick={sendDataToFirestore}>Envoyer les Données</button>
    </div>
  );
}

export default DragDrop;