import ShowData from "../components/ShowData"
import { useState, useEffect } from "react"
import { Stack, Flex, Button } from '@chakra-ui/react'

const Accueil = () => {
    const [data, setData] = useState('')
    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/listings/', {
                headers: {
                }
            });
        } catch (error) {
            if (error.response) {
            } else if (error.request) {
            } else {
            }
        }
    };

    useEffect(() => {
        fetchData();
    })


    return (
        <Flex
            width="100%"
            minHeight="100vh"
            justifyContent="center"
            backgroundColor="gray.200"
            flexWrap="wrap"
            padding={4}
        >
            <Stack
                width={{ base: '100%', sm: '45%', md: '18%' }}
                height="auto"
                backgroundColor="white"
                shadow="lg"
                borderRadius={10}
                margin={2}
                padding={4}
            >
                {/* {data && data.map((data) => (
                    <ShowData data={data} key={data.id} />
                ))} */}
            </Stack>
        </Flex>
    )
}

export default Accueil