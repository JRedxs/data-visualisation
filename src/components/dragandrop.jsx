import React, { useState, useEffect } from 'react'; // Ajout de useEffect
import { collection, addDoc } from "firebase/firestore";
import db from './db/firebase';
import { FileUploader } from 'react-drag-drop-files';
import Papa from 'papaparse';
import 'firebase/firestore';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Card,
  CardBody,
  useToast,
  CircularProgress,
  Progress
} from '@chakra-ui/react'

const fileTypes = ["CSV"];


function DragDrop() {
  const toast = useToast()
  const [csvData, setCsvData] = useState([]);
  const [filter, setFilter] = useState("");
  const [progressVisible, setProgressVisible] = useState(false); // État pour gérer la visibilité de la progression
  const [progressValue, setProgressValue] = useState(0);



  const handleChange = (file) => {
    parseCSV(file);
  };

  const handleDrop = (file) => {
    parseCSV(file);
  };

  useEffect(() => {
    console.log('csvData updated:', csvData);
  }, [csvData]);


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

  const CleanDataFirestore = async () => {
    try {

      const cleanedData = removeDuplicates(csvData, filter);

      const isExistKeys = findKeys(csvData)

      if (csvData.length === 0) {
        toast({ title: 'Veuillez charger un fichier', position: 'top', status: 'error' })
      } else if (filter.length === 0) {
        toast({ title: "Un nom de colonne est obligatoire", position: 'top', status: "error" })
      } else if (!isExistKeys.includes(filter)) {
        toast({ title: "Votre nom de colonne n'existe pas", position: 'top', status: "error" })
      } else {
        sendDataToFirestore(cleanedData)

      }
    } catch (error) {
      console.error('Error while processing', error);
    }
  };


  function removeDuplicates(data, key) {
    return data.filter((obj, index, self) =>
      index === self.findIndex((el) => el[key] === obj[key])
    );
  }



  function findKeys(data) {
    const keysArray = [];
    for (let i = 0; i < data.length; i++) {
      const objectKeys = Object.keys(data[i]);
      for (let j = 0; j < objectKeys.length; j++) {
        const key = objectKeys[j];
        keysArray.push(key);
      }
    }
    return keysArray;
  }


  const sendDataToFirestore = async (data) => {
    if (data.length === 0) {
      return;
    }

    try {
      setProgressVisible(true);
      setProgressValue(0);
      const docRef = await addDoc(collection(db, "csv"), { data });

      const totalSteps = 5;
      for (let step = 1; step <= totalSteps; step++) {
        setProgressValue((step / totalSteps) * 100)
        await new Promise(resolve => setTimeout(resolve, 1000))
      }

      setProgressValue(100);
      setTimeout(() => {
        toast({ title: `Données envoyées & nettoyé sur le champ ${filter}`, position: 'top', status: 'success' });
        setProgressVisible(false)
      }, 1000);

      console.log("Document écrit avec l'ID: ", docRef.id);
    } catch (e) {
      console.error("Erreur lors de l'ajout du document: ", e);
    }
  };


  return (

    <div>
      <h1
        style={{ textAlign: 'center', marginBottom: '10%', fontFamily: 'monospace' }}>
        C.N.V
      </h1>
      <Card size='lg'>
        <CardBody>
          <FileUploader handleChange={handleChange} name="file" types={fileTypes} onDrop={handleDrop} />
        </CardBody>
      </Card>
      <br />
      <FormControl>
        <FormLabel>
          <Input
            type='text'
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder='Champ à nettoyer'
            required
            alignItems='center'
          ></Input>
        </FormLabel>
      </FormControl>
      <Button
        onClick={CleanDataFirestore}
        style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
      >
        Envoyer & Nettoyer les données
      </Button>
      <br />
      {progressVisible && (
        <Progress hasStripe value={progressValue} /> // Afficher la progression avec la valeur actuelle
      )}
    </div>
  );
}

export default DragDrop;
