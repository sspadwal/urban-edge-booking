import React, { createContext, useContext, useState, useEffect } from "react";

const ServiceContext = createContext();

export const useServices = () => {
    return useContext(ServiceContext);
};

export const ServiceProvider = ({ children }) => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                // Pre-fetch services immediately on mount
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/services`);
                if (!response.ok) {
                    throw new Error("Failed to fetch services");
                }
                const data = await response.json();
                setServices(data);
            } catch (err) {
                console.error("ServiceContext Error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    return (
        <ServiceContext.Provider value={{ services, loading, error }}>
            {children}
        </ServiceContext.Provider>
    );
};
