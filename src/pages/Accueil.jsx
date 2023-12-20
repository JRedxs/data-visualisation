import ShowData from "../components/ShowData";
import { useState, useEffect } from "react";
import { Flex, Stack } from "@chakra-ui/react";
import axios from "axios";

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

    return (
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
                {/* {data &&
                    data.map((item) => (
                        <ShowData data={item} key={item.id} />
                    ))} */}
                <ShowData />
            </Stack>
        </Flex>
    );
};

export default Accueil;
