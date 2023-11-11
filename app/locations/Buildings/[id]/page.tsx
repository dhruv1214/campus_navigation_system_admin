'use client';
import React from "react";
import BuildingForm from "@/components/Buildings/BuildingForm";
import {buildings} from "@/components/Locations/LocationsTableData";
import Building from "@/models/Building";

export default function Page({params}: { params: { id: string } }) {

    const data = buildings.find(building => building._id === params.id);

    if (!data) {
        return <div>Building not found</div>
    }
    
    const building = new Building(
        data.name,
        data.description,
        [data.location.coordinates[0], data.location.coordinates[0]],
        data.imageURL
    );

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    }

    return (
        <div>
            <title>Edit Building</title>
            <BuildingForm onSubmit={handleSubmit} building={building} />
        </div>
    );
}