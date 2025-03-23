import axios from 'axios';
import { PlaceDetails } from '@/utils/types';

export const fetchPlaceDetails = async (placeId: string | string[]): Promise<PlaceDetails> => {
    try {
        const res = await axios.get(`http://localhost:8000/api/discover-place-details/?dest_id=${placeId}`);
        return res.data as PlaceDetails;
    } catch (error) {
        console.error('Failed to fetch place details', error);
        throw new Error('Failed to fetch place details');
    }
};