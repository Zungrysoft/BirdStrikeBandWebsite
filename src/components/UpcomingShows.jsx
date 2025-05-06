import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useMemo } from 'react';
import { LIGHTNING2 } from '../config/colors';

const ESTIMATED_SHOW_LENGTH = 6 * 60 * 60 * 1000;

const UPCOMING_SHOWS = [
    {
        title: "Vecino Lemonade Battle of the Bands",
        venue: "Art Boutiki, San Jose",
        date: new Date("May 02, 2025 19:30:00"),
        price: 20,
    },
]

const DAYS = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
]

export function humanizeDate(dateObject) {
    const pad = (n) => n.toString().padStart(2, '0');

    const year = dateObject.getFullYear();
    const month = pad(dateObject.getMonth() + 1);
    const date = pad(dateObject.getDate());
    const hours = (dateObject.getHours() + 24) % 12 || 12;
    const ampm = dateObject.getHours() >= 12 ? "pm" : "am"
    const minutes = dateObject.getMinutes() ? ':' + pad(dateObject.getMinutes()) : '';
    const day = DAYS[dateObject.getDay()];

    const minutePrecision = `${day} ${month}/${date}/${year} at ${hours}${minutes}${ampm}`;
    return minutePrecision;
}

function UpcomingShows({ displayPastShows=false }) {
    const shows = useMemo(() => {
        const now = new Date();
        return UPCOMING_SHOWS
            .filter((show) => displayPastShows || now.getTime() - show.date.getTime() < ESTIMATED_SHOW_LENGTH)
            .sort((a, b) => a.date < b.date);
    }, [])

    return shows.length === 0 ? 
        <p style={{ color: LIGHTNING2 }}>No shows planned right now. Check back later!</p> :
        <TableContainer component={Paper} sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
            <Table
                sx={{
                    minWidth: 500,
                    '& .MuiTableCell-root': {
                    color: LIGHTNING2,
                    borderBottom: `1px solid ${LIGHTNING2}`
                    },
                }}
                aria-label="simple table"
            >
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Show</TableCell>
                        <TableCell align="center">Venue</TableCell>
                        <TableCell align="center">Date & Time</TableCell>
                        <TableCell align="center">Door</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {shows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center" component="th" scope="row">
                                {row.title}
                            </TableCell>
                            <TableCell align="center">{row.venue}</TableCell>
                            <TableCell align="center">{humanizeDate(row.date)}</TableCell>
                            <TableCell align="center">{row.price ? `$${row.price}` : 'FREE'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
}

export default UpcomingShows;
