import { Box, useMediaQuery, useTheme } from "@mui/material";
import { LIGHTNING, LIGHTNING2 } from "../config/colors";
import ProfileImage from "./ProfileImage";
import bandNames from '../data/bandNames.json';


function getDayIndex(n) {
  const today = new Date();
  const utcMidnight = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
  const daysSinceEpoch = Math.floor(utcMidnight / (1000 * 60 * 60 * 24));

  return daysSinceEpoch % n;
}


function getTomBandName() {
    return bandNames[getDayIndex(bandNames.length)];
}


function ProfileContent({
    name,
    instrument,
    title,
    date,
    description,
    links=[],
    image,
}) {
    const theme = useTheme();
    const isCompact = useMediaQuery(theme.breakpoints.down('sm'));
    const processedDescription = description.replaceAll('*bandName*', getTomBandName());

    return(
        <>
            <Box sx={{ flex: 0, padding: 2, paddingBottom: isCompact ? 2 : 0 }}>
                <h4 style={{ color: LIGHTNING }}>{name}</h4>
                <h6 style={{ color: LIGHTNING2 }}>{instrument}</h6>
            </Box>
            {image && <ProfileImage image={image}/>}
            <Box sx={{ flex: 0, padding: 2 }}>
                <p style={{ color: LIGHTNING2 }}>{processedDescription}</p>
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
                        <a target="blank" rel="noopener noreferrer" href={link.url} style={{ color: LIGHTNING, fontSize: 18 }}>{link.text}</a>
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
