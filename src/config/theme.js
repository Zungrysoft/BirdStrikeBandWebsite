import { createTheme } from "@mui/material";

export const THEME = createTheme({
    palette: {
        primary: {
            main: '#f0f8c1',
        },
        secondary: {
            main: '#f0f8c1',
        },
    },
    breakpoints: {
        values: {
            xxs: 0,
            xs: 768,
            sm: 1024,
            md: 1280,
            lg: 1440,
            xl: 1920,
            xxl: 2560,
        },
    },
});