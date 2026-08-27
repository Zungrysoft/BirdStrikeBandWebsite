import { Box } from "@mui/material";
import React, { useEffect, useState } from 'react';
import discography from '../data/discography.json';
import Release from "../components/Release";
import { resolveDiscography } from "../helpers/songText";

function DiscographyPage() {
    const [discographyResolved, setDiscographyResolved] = useState([]);

    useEffect(() => {
        resolveDiscography(discography).then(setDiscographyResolved);
    }, []);

    const discographySorted = discographyResolved.filter(d => !(d.isHidden));

    return(
        <Box sx={{ margin: 'auto', width: 'min(100%, 1600px)' }}>
            {discographySorted.map((d) => (
                <Release {...d} key={d.title}/>
            ))}

            <Box sx={{ height: '1px' }}/>
        </Box>
    )
}

export default DiscographyPage;
