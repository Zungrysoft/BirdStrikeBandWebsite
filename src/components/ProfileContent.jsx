import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useEscherDownloads } from "../context/EscherDownloadsContext";
import { LIGHTNING, LIGHTNING2 } from "../config/colors";

function ProfileContent({
    name,
    instrument,
    title,
    date,
    description,
    links=[],
}) {
    const theme = useTheme();
    const isCompact = useMediaQuery(theme.breakpoints.down('sm'));

    return(
        <>
            <Box sx={{ flex: 0, padding: 2 }}>
                <h4 style={{ color: LIGHTNING }}>{name}</h4>
                <h6 style={{ color: LIGHTNING2, marginBottom: '16px' }}>{instrument}</h6>
                <p style={{ color: LIGHTNING2 }}>{description}</p>
            </Box>
            <Box sx={{
                flex: 1,
                padding: 2,
                paddingTop: 0,
                paddingBottom: isCompact ? 5 : 2,
                minHeight: '16px',
                position: 'relative',
            }}>
                {links ? links.map((link, index) =>
                    <div key={index}>
                        <a target="blank" rel="noopener noreferrer" href={link.url}>{link.text}</a>
                    </div>
                ):<div/>}
                <p style={{
                    position: 'absolute',
                    bottom: '8px',
                    right: '16px',
                    color: LIGHTNING2,
                    fontStyle: 'italic',
                }}>{date}</p>
            </Box>
        </>
    )
}

export default ProfileContent;
