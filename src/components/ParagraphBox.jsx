import { Box, useMediaQuery, useTheme } from "@mui/material";
import { BACKGROUND_1, LIGHTNING2 } from "../config/colors";

function ParagraphBox({ text, children }) {
    return(
        <Box sx={{
            backgroundColor: BACKGROUND_1,
            marginBottom: '16px',
            marginLeft: '16px',
            marginRight: '16px',
            height: '100%',
            padding: 2,
        }}>
            <p style={{ color: LIGHTNING2 }}>{text}</p>
            {children}
        </Box>  
    )
}

export default ParagraphBox;
