'use client';
import React from "react";
import BuildingForm from "@/components/Buildings/BuildingForm";


export default function Page() {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    }

    return (
        <div>
            <title>Add Location</title>
            <BuildingForm onSubmit={handleSubmit} />
        </div>
    );
}