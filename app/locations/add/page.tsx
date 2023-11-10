'use client';
import React from "react";
import LocationForm from "@/components/Locations/LocationForm";


export default function Page() {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    }

    return (
        <div>
            <title>Add Location</title>
            <LocationForm onSubmit={handleSubmit} />
        </div>
    );
}