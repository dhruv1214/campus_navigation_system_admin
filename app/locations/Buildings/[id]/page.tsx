'use client';
import React from "react";
import BuildingForm from "@/components/Buildings/BuildingForm";
import {buildings} from "@/components/Locations/LocationsTableData";
import Building from "@/models/Building";
import { BuildingFormValues } from "@/hooks/buildings/useAddBuiling";
import {useRouter} from "next/navigation";


export default function Page({params}: { params: { id: string } }) {

    const router = useRouter();

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

    const handleSubmit = async  (formValues: BuildingFormValues) => {


    }

    return (
        <div>
            <title>Edit Building</title>
            <BuildingForm onSubmit={handleSubmit} building={building} />
        </div>
    );
}