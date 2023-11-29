import {useState, useEffect} from "react";
import axios from "axios";


const useGetEvents = () => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:8898/api/v1/events');
                setEvents(response.data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                if (axios.isAxiosError(error)) {
                    setError(error);
                    console.error('Failed to add event:', error.message);
                } else {
                    setError(new Error('An unknown error occurred'));
                    console.error('Failed to add event:', error);
                }
            }
        };
        fetchEvents();
    }, []);

    return {events, isLoading, error};
}

const useGetEvent = (eventId: string) => {
    const [event, setEvent] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchEvent = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`http://localhost:8898/api/v1/events/${eventId}`);
                setEvent(response.data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                if (axios.isAxiosError(error)) {
                    setError(error);
                    console.error('Failed to add event:', error.message);
                } else {
                    setError(new Error('An unknown error occurred'));
                    console.error('Failed to add event:', error);
                }
            }
        };
        fetchEvent();
    }, [eventId]);

    return {event, isLoading, error};
}

const useCreateEvent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const createEvent = async (eventData: any) => {
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:8898/api/v1/events', eventData);
            setIsLoading(false);

            return response.data;
        } catch (error) {
            setIsLoading(false);
            if (axios.isAxiosError(error)) {
                setError(error);
                console.error('Failed to add event:', error.message);
            } else {
                setError(new Error('An unknown error occurred'));
                console.error('Failed to add event:', error);
            }
        }
    };

    return {isLoading, error, setError,createEvent};
}

const useUpdateEvent = () => {
    const [event, setEvent] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const updateEvent = async (eventId: string, eventData: any) => {
        setIsLoading(true);
        try {
            const response = await axios.put(`http://localhost:8898/api/v1/events/${eventId}`, eventData);
            setEvent(response.data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            if (axios.isAxiosError(error)) {
                setError(error);
                console.error('Failed to add event:', error.message);
            } else {
                setError(new Error('An unknown error occurred'));
                console.error('Failed to add event:', error);
            }
        }
    };

    return {event, isLoading, error, updateEvent};
}

const useDeleteEvent = () => {
    const [event, setEvent] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const deleteEvent = async (eventId: string) => {
        setIsLoading(true);
        try {
            const response = await axios.delete(`http://localhost:8898/api/v1/events/${eventId}`);
            setEvent(response.data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            if (axios.isAxiosError(error)) {
                setError(error);
                console.error('Failed to add event:', error.message);
            } else {
                setError(new Error('An unknown error occurred'));
                console.error('Failed to add event:', error);
            }
        }
    };

    return {event, isLoading, error, deleteEvent};
}

export {useGetEvents, useGetEvent, useCreateEvent, useUpdateEvent, useDeleteEvent};