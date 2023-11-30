import React, { useState, useEffect } from 'react'; // Ajout de useEffect
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

  const handleDrop = (files) => {
    console.log('files[0]', files)
    setFile(files);
    
    parseCSV(files);
  };

  useEffect(() => {
    console.log('csvData updated:', file);
  }, [file]);


  const parseCSV = (csvFile) => {
    console.log('Debut du processus parseCSV')
    Papa.parse(csvFile, {
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        console.log("Résultat du parsage CSV:", result.data);
        setCsvData(result.data);
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
      },
    });
  };


  const sendDataToFirestore = async () => {
    console.log('csvData Firestore', csvData)
    if (csvData.length === 0) {
      console.log('Pas de données à envoyer');
      return;
    }

    try {
      console.log(csvData);
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
