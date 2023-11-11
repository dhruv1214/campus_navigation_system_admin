'use client';
import React from "react";
import BuildingForm from "@/components/Buildings/BuildingForm";
import useAddBuilding, {BuildingFormValues} from "@/hooks/buildings/useAddBuiling";
import {Spinner} from "@nextui-org/react";
import {useRouter} from "next/navigation";


export default function Page() {
    const { addBuilding, isLoading, error } = useAddBuilding();
    const router = useRouter();

    const handleSubmit = async (formValues: BuildingFormValues) => {
        const result = await addBuilding(formValues);
        if (result) {
            console.log('Building added:', result);
            router.push('/locations');
        }
    }

    if (isLoading) {
        return (
            <div>
                <Spinner color="secondary" label="Loading..." labelColor="secondary" />
            </div>
        );
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div>
            <title>Add Building</title>
            <BuildingForm onSubmit={handleSubmit} />
        </div>
    );
}