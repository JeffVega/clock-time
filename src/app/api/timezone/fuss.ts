// timezone/fuzzySearch.js
import Fuse, { type IFuseOptions } from 'fuse.js';

// Create a function to perform the fuzzy search
interface CityData {
    city: string;
    [key: string]: string | number | boolean | object; // Allow other properties with specific types
}

interface FuzzySearchResult<T> {
    item: T;
}

export const fuzzySearchCity = (query: string, data: CityData[]): CityData[] => {
    // Set up Fuse.js options
    const options: IFuseOptions<CityData> = {
        keys: ['city'], // Keys to search in your data
        threshold: 0.3, // Lower values means more strict matching
    };

    const fuse = new Fuse(data, options);

    // Perform the search
    return fuse.search(query).map((result: FuzzySearchResult<CityData>) => result.item);
};
