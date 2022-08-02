import { useWeb3React } from "@web3-react/core";
import { Grid } from "@chakra-ui/react";
import PunkCard from '../../components/punk-card';
import Loading from '../../components/loading';
import RequestAccess from '../../components/request-access';
import { useAllPlatziPunksData } from '../../hooks/usePlatziPunksData';


const Punks = () => {
    const { active } = useWeb3React();
    const { punks, loading } = useAllPlatziPunksData();

    if(!active) return <RequestAccess/>;

    return (
        <>
        {
            loading ? (
                <Loading/> 
            ) : (
                <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
                    {punks.map(({ name, image, tokenId }) => (
                        <PunkCard key={tokenId} image={image} name={name} />
                    ))}
                </Grid>
            )
        } 
        </>
    );
}

export default Punks;