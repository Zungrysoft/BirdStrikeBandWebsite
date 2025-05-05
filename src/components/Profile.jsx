import { Box, useMediaQuery, useTheme } from "@mui/material";
import ProfileImage from "./ProfileImage";
import { BACKGROUND_1 } from "../config/colors";
import ProfileContent from "./ProfileContent";

const images = require.context('../../public/images', true);

function Profile({
    name,
    instrument,
    title,
    date,
    description,
    image,
    links=[],
    imageSide="left",
}) {
    const theme = useTheme();
    const isCompact = useMediaQuery(theme.breakpoints.down('sm'));

    return(
        <Box sx={{
            display: 'flex',
            flexDirection: isCompact ? 'column' : 'row',
            backgroundColor: BACKGROUND_1,
            marginBottom: '16px',
            marginLeft: '16px',
            marginRight: '16px',
            height: '100%',
        }}>
            {image && imageSide === "left" &&
                <Box sx={{ flex: 0.7, minWidth: 0, maxWidth: '100%' }}>
                    <ProfileImage image={image}/>
                </Box>
            }
            <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'start' }}>
                <ProfileContent
                    name={name}
                    instrument={instrument}
                    title={title}
                    date={date}
                    description={description}
                    links={links}
                />
            </Box>
            {image && imageSide === "right" &&
                <Box sx={{ flex: 0.7, minWidth: 0, maxWidth: '100%' }}>
                    <ProfileImage image={image}/>
                </Box>
            }
            
        </Box>  
    )
}

export default Profile;
