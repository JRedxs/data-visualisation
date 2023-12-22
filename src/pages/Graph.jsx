import ShowData from "../components/ShowData";
import { useState, useEffect } from "react";
import { Flex, Stack } from "@chakra-ui/react";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import db from "../components/db/firebase";
import { query, orderBy, limit, doc, getDocs, collection } from "firebase/firestore";

const Graph = () => {
    const [lastDocument, setLastDocument] = useState(null);

    const fetchLastDocument = async () => {
        const q = query(collection(db, "csv"), orderBy("timestamp", "desc"), limit(1));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const lastDoc = querySnapshot.docs[0].data();
            setLastDocument(lastDoc);
            console.log("Latest data from Firebase:", lastDoc);
        } else {
            console.log("No documents found!");
        }
    }

    useEffect(() => {
        fetchLastDocument();
    }, []);

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
                    {/* Pass the fetched data to ShowData */}
                    {lastDocument && <ShowData data={lastDocument} />}
                </Stack>
            </Flex>
        </DndProvider>
    );
}

export default Graph;
