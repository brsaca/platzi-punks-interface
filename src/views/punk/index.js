import {
    Stack,
    Heading,
    Text,
    Table,
    Thead,
    Tr,
    Th,
    Td,
    Tbody,
    Button,
    Tag,
    useToast,
  } from "@chakra-ui/react";
  import { useWeb3React } from "@web3-react/core";
  import RequestAccess from "../../components/request-access";
  import PunkCard from "../../components/punk-card";
  import { usePlatziPunkData } from "../../hooks/usePlatziPunksData";
  import { useParams } from "react-router-dom";
  import Loading from "../../components/loading";
  import { useState } from 'react';
import usePlatziPunks from "../../hooks/usePlatziPunks";
  
  const Punk = () => {
    const { active, account, library } = useWeb3React();
    const { tokenId } = useParams();
    const { loading, punk, update } = usePlatziPunkData(tokenId);
    const toast = useToast();
    const [transfering, setTransfering] = useState(false);
    const platziPunks = usePlatziPunks();

    const transfer = () => {
        setTransfering(true);

        const address = prompt("Ingresa la dirección: ");

        const isAddress = library.utils.isAddress(address);

        if(isAddress){
            platziPunks.methods.safeTransferFrom(
                punk.owner,
                address,
                punk.tokenId,
            ).send({
             from: account,    
            })
            .on("transactionHash", (txHash) => {
                toast({
                  title: 'Transacción enviada',
                  description: txHash,
                  status: 'info',
                })
              })
            .on("receipt", () => {
                setTransfering(false);
                toast({
                    title: 'Transferencia confirmada',
                    description: `El punk ahora pertenece a ${address}`,
                    status: 'success',
                })
                update();
            })
            .on("error", (error) => {
                setTransfering(false);
                toast({
                    title: 'Transferencia fallida',
                    description: error.message,
                    status: 'error',
                })
            });
        } else {
            toast({
                title: 'Dirección inválida',
                description: 'La dirección no es una dirección de Ethereum',
                status: 'error',
            })
            setTransfering(false);
        }
    }
  
    if (!active) return <RequestAccess />;
  
    if (loading) return <Loading />;
  
    return (
      <Stack
        spacing={{ base: 8, md: 10 }}
        py={{ base: 5 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack>
          <PunkCard
            mx={{
              base: "auto",
              md: 0,
            }}
            name={punk.name}
            image={punk.image}
          />
          <Button 
          onClick={transfer}
          isLoading={transfering}
          disabled={account !== punk.owner} 
          colorScheme="green">
            {account !== punk.owner ? "No eres el dueño" : "Transferir"}
          </Button>
        </Stack>
        <Stack width="100%" spacing={5}>
          <Heading>{punk.name}</Heading>
          <Text fontSize="xl">{punk.description}</Text>
          <Text fontWeight={600}>
            DNA:
            <Tag ml={2} colorScheme="green">
              {punk.dna}
            </Tag>
          </Text>
          <Text fontWeight={600}>
            Owner:
            <Tag ml={2} colorScheme="green">
              {punk.owner}
            </Tag>
          </Text>
          <Table size="sm" variant="simple">
            <Thead>
              <Tr>
                <Th>Atributo</Th>
                <Th>Valor</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Object.entries(punk.attributes).map(([key, value]) => (
                <Tr key={key}>
                  <Td>{key}</Td>
                  <Td>
                    <Tag>{value}</Tag>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Stack>
      </Stack>
    );
  };
  
  export default Punk;