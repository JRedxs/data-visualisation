import ShowData from "../components/ShowData";
import { useState, useEffect } from "react";
import { Flex, Stack } from "@chakra-ui/react";
import axios from "axios";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDrag, useDrop } from "react-dnd";

const Accueil = () => {
    const [data, setData] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/listings/", {
                headers: {
                    // Ajoutez vos en-têtes personnalisés ici si nécessaire
                },
            });
            setData(response.data);
        } catch (error) {
            if (error.response) {
                // Gérer les erreurs de réponse
            } else if (error.request) {
                // Gérer les erreurs de requête
            } else {
                // Gérer les autres erreurs
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const type = "Graph";

    const Graph = ({ image, index }) => {
        const ref = useRef(null); // Initialize the reference

        // useDrop hook is responsible for handling whether any item gets hovered or dropped on the element
        const [, drop] = useDrop({
            // Accept will make sure only these element type can be droppable on this element
            accept: type,
            hover(item) {
            }
        });

        // useDrag will be responsible for making an element draggable. It also expose, isDragging method to add any styles while dragging
        const [{ isDragging }, drag] = useDrag(() => ({
            // what type of item this to determine if a drop target accepts it
            type: type,
            // data of the item to be available to the drop methods
            item: { id: image.id, index },
            // method to collect additional data for drop handling like whether is currently being dragged
            collect: (monitor) => {
                return {
                    isDragging: monitor.isDragging(),
                };
            },
        }));

        drag(drop(ref));

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
    };
}

export default Accueil;
