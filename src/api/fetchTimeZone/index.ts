import type { NextApiRequest, NextApiResponse } from 'next';

// /pages/api/fetchTimeZone.ts

const fetchTimeZone = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { city } = req.body;
        const apiKey = process.env.TIMEZONEDB_KEY ?? 'YOUR_API_KEY'; // Replace with your TimeZoneDB API key

        try {
            const response = await fetch(`http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=zone&zone=${city}`);
            const data = await response.json();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch time zone data' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

export default fetchTimeZone;