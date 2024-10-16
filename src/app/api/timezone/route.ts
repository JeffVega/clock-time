import { type NextRequest, NextResponse } from 'next/server';
import Fuse from 'fuse.js';
import {timezoneData} from './timezone'
const fuse = new Fuse(timezoneData, {
   keys: ['city'],
   threshold: 0.3,
   includeScore: true,
});

export async function POST(request: NextRequest) {
   try {
       const { city } = await request.json();

       if (!city) {
           return NextResponse.json({ error: 'City is required' }, { status: 400 });
       }

       // Perform fuzzy search
       const searchResults = fuse.search(city);

       if (searchResults.length === 0) {
           return NextResponse.json({ error: 'No matching cities found' }, { status: 404 });
       }

       // Get the top 5 results
       const topResults = searchResults.slice(0, 5).map(result => ({
           ...result.item
       }));

       // Use the first (best) match
       const bestMatch = topResults[0];

       // You can add any additional processing here if needed
       // For example, you could fetch the current time for the timezone

         return NextResponse.json(bestMatch);

   } catch (error) {
       console.error('Search error:', error);
       return NextResponse.json(
           { error: 'Failed to perform search' }, 
           { status: 500 }
       );
   }
}


export async function GET() {
    try {
        return NextResponse.json(timezoneData);
    } catch (error) {
        console.error('Failed to fetch timezone data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch timezone data' }, 
            { status: 500 }
        );
    }
    }