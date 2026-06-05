import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useMemo } from 'react';
import { LIGHTNING2 } from '../config/colors';
import shows from '../data/shows.json';

const ESTIMATED_SHOW_LENGTH = 6 * 60 * 60 * 1000;

const UPCOMING_SHOWS = Object.values(shows).map((show) => ({
    ...show,
    date: new Date(show.date)
}))

const DAYS = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
]

export function humanizeDate(dateObject, includeDay = true, includeTime = true) {
    const pad = (n) => n.toString().padStart(2, '0');

    const year = dateObject.getFullYear();
    const month = pad(dateObject.getMonth() + 1);
    const date = pad(dateObject.getDate());
    const hours = (dateObject.getHours() + 24) % 12 || 12;
    const ampm = dateObject.getHours() >= 12 ? "pm" : "am"
    const minutes = dateObject.getMinutes() ? ':' + pad(dateObject.getMinutes()) : '';
    const day = DAYS[dateObject.getDay()];

    let dateStr = `${month}/${date}/${year}`;
    if (includeDay) {
        dateStr = `${day} ${dateStr}`;
    }
    if (hours !== 0 && minutes !== 0 && ampm !== 'am' && includeTime) {
        dateStr += ` at ${hours}${minutes}${ampm}`;
    }
    return dateStr;
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

function UpcomingShowTitle({ title, bands=[] }) {
    const bandsStr = ["Bird Strike", ...bands].join(", ");

    if (title) {
        if (bands.length > 0) {
            return <>
                {title} <i>{`(${bandsStr})`}</i>
            </>;
        }
        return title;
    }

    if (bands.length > 0) {
        return `${bandsStr}`;
    }

    return "";
}

function UpcomingShowVenue({ venue, dmForAddress=false }) {
    if (venue) {
        if (dmForAddress) {
            return <>
                {venue} <i>{"(DM for address)"}</i>
            </>;
        }
        return venue;
    }

    if (dmForAddress) {
        return "DM for address";
    }

    return "-";
}

function UpcomingShows({ displayPreviousShows=false }) {
    const shows = useMemo(() => {
        const now = new Date();
        return UPCOMING_SHOWS
            .filter((show) => {
                if (show.isHidden) {
                    return false;
                }

                const isUpcoming = now.getTime() - show.date.getTime() < ESTIMATED_SHOW_LENGTH;
                return displayPreviousShows ? !isUpcoming : isUpcoming;
            })
            .toSorted((a, b) => displayPreviousShows ? b.date.getTime() - a.date.getTime() : a.date.getTime() - b.date.getTime());
    }, [displayPreviousShows])

    return shows.length === 0 ? 
        <p style={{ color: LIGHTNING2 }}>No shows planned right now. Follow us on Instagram for show announcements!</p> :
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
                                <UpcomingShowTitle title={row.title} bands={row.bands} />
                            </TableCell>
                            <TableCell align="center">
                                <UpcomingShowVenue venue={row.venue} dmForAddress={row.dmForAddress && !displayPreviousShows} />
                            </TableCell>
                            <TableCell align="center">{row.dateIsTbd ? 'TBD' : humanizeDate(row.date, true, !displayPreviousShows)}</TableCell>
                            <TableCell align="center">{humanizePrice(row.price)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
}

export default UpcomingShows;
