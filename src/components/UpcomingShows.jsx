import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useMemo } from 'react';
import { LIGHTNING2 } from '../config/colors';

const ESTIMATED_SHOW_LENGTH = 6 * 60 * 60 * 1000;

const UPCOMING_SHOWS = [
    {
        title: "Live at The Sunnyvale War Machine",
        venue: "DM for address",
        date: new Date("July 13, 2024 3:30"),
        price: 0,
    },
    {
        title: "Bird Strike, The Emergency Broadcast System, The Hello Hellos",
        venue: "The Caravan Lounge, San Jose",
        date: new Date("August 16, 2024 10:00"),
        price: 0,
    },
    {
        title: "Festi-Palooza",
        venue: "Ken Wormhoudt Skate Park, Santa Cruz",
        date: new Date("August 23, 2024 10:00"),
        price: 0,
    },
    {
        title: "Bird Strike, Sonus",
        venue: "The Caravan Lounge, San Jose",
        date: new Date("February 28, 2025 10:00"),
        price: 0,
    },
    {
        title: "Vecino Lemonade Battle of the Bands",
        venue: "Art Boutiki, San Jose",
        date: new Date("May 02, 2025 19:30"),
        price: 20,
    },
    {
        title: "Bird Strike, The Scalps, Eye of Aquila",
        venue: "The Jury Room, Santa Cruz",
        date: new Date("June 27, 2025 21:00"),
        price: 10,
    },
    {
        title: "The Sunnyvale War Machine II",
        venue: "DM for address",
        date: new Date("July 26, 2025"),
        dateIsTbd: true,
        price: 0,
    },
    {
        title: "Bird Strike, Paperface, TBD",
        venue: "Stay Gold Deli, Oakland",
        date: new Date("July 19, 2025"),
        price: 'TBD',
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

    let minutePrecision = `${day} ${month}/${date}/${year}`;
    if (hours !== 0 && minutes !== 0 && ampm !== 'am') {
        minutePrecision += ` at ${hours}${minutes}${ampm}`;
    }
    return minutePrecision;
}

export function humanizePrice(price) {
    if (!price) {
        return 'FREE';
    }

    if (typeof price === 'number') {
        return `$${price}`;
    }

    return price;
}

function UpcomingShows({ displayPreviousShows=false }) {
    const shows = useMemo(() => {
        const now = new Date();
        return UPCOMING_SHOWS
            .filter((show) => {
                const isUpcoming = now.getTime() - show.date.getTime() < ESTIMATED_SHOW_LENGTH;
                return displayPreviousShows ? !isUpcoming : isUpcoming;
            })
            .toSorted((a, b) => displayPreviousShows ? b.date.getTime() - a.date.getTime() : a.date.getTime() - b.date.getTime());
    }, [displayPreviousShows])

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
                        <TableCell align="center">Price</TableCell>
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
                            <TableCell align="center">{row.dateIsTbd ? 'TBD' : humanizeDate(row.date)}</TableCell>
                            <TableCell align="center">{humanizePrice(row.price)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
}

export default UpcomingShows;
