import {useState, useEffect} from "react";
import axios from "axios";

const useGetLocations = () => {
    const [locations, setLocations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                // Use your API endpoint here
                const response = await axios.get('http://localhost:8898/api/v1/locations');
                setLocations(response.data);
                setIsLoading(false);
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
        fetchLocations();
    }, []);

    return {locations, isLoading, error};
};