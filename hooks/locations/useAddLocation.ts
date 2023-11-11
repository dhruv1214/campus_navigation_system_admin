import axios from "axios";
import {useState} from "react";

export interface LocationFormValues {
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    floor: number;
    roomNumber: string;
}

const useAddLocation = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const addLocation = async (values: LocationFormValues) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:8898/api/v1/locations', {
                name: values.name,
                description: values.description,
                location: {
                    coordinates: [values.latitude, values.longitude],
                },
                floor: values.floor,
                roomNumber: values.roomNumber,
            });

            setIsLoading(false);
            return response.data;
        } catch (error) {
            setIsLoading(false);
            if (axios.isAxiosError(error)) {
                setError(error);
                console.error('Failed to add location:', error.message);
            } else {
                setError(new Error('An unknown error occurred'));
                console.error('Failed to add location:', error);
            }
        }
    };

    return { addLocation, isLoading, error };
};
