import ShowData from "../components/ShowData";
import { useState, useEffect, useRef } from "react";
import { Flex, Stack } from "@chakra-ui/react";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import db from "../components/db/firebase";
import { getDocs, collection } from "firebase/firestore";

const Accueil = () => {
    const [todos, setTodos] = useState([]);

    const fetchPost = async () => {
        await getDocs(collection(db, "/csv"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setTodos(newData);
                console.log("Data from Firebase:", newData);
            })
    }


    useEffect(() => {
        fetchPost();
    }, [])

    return (
        <DndProvider backend={HTML5Backend}>
            <Flex
                width="100%"
                minHeight="20rem"
                minWidth="100%"
                justifyContent="center"
                backgroundColor="gray.200"
                flexWrap="wrap"
                padding={4}
            >
                <Stack
                    height="auto"
                    backgroundColor="white"
                    shadow="lg"
                    borderRadius={10}
                    margin={2}
                    padding={4}
                >
                    <ShowData />
                </Stack>
            </Flex>
        </DndProvider>
    );
}

export default Accueil;
