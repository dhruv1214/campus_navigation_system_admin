import React, {useEffect, useState} from "react";
import {
    Button,
    Input,
    Select,
    SelectItem,
    Textarea
} from "@nextui-org/react";
import {primaryButton, subtitle, title} from "@/components/primitives";
import {LocationFormValues} from "@/hooks/locations/useAddLocation";
import useGetBuildings from "@/hooks/buildings/useGetBuildings";
import BuildingForm from "@/components/Buildings/BuildingForm";
import building from "@/models/Building";

interface LocationFormProps {
    buildingLocation?: BuildingLocation;
    onSubmit: (formValues: LocationFormValues) => void;
}

const LocationForm = (props: LocationFormProps) => {

    const {buildings} = useGetBuildings();

    const [name, setName] = useState(props.buildingLocation?.name || "");
    const [description, setDescription] = useState(props.buildingLocation?.description || "");
    const [latitude, setLatitude] = useState(props.buildingLocation?.location.coordinates[0] || "0");
    const [longitude, setLongitude] = useState(props.buildingLocation?.location.coordinates[1] || "0");
    const [floor, setFloor] = useState(props.buildingLocation?.floor || 1);
    const [roomNumber, setRoomNumber] = useState(props.buildingLocation?.roomNumber || "");
    const [buildingId, setBuildingId] = useState<string>(buildings[0]?.buildingId || "");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const lat = Number(latitude);
        const long = Number(longitude);

        console.log(buildings);
        console.log(buildingId);

        const formValues: LocationFormValues = {
            name,
            description,
            latitude: lat,
            longitude: long,
            floor,
            roomNumber,
            buildingId
        }

        props.onSubmit(formValues);
    }

    useEffect(() => {
        if(buildings.length > 0) {
            setBuildingId(buildings[0].buildingId);
        }
    }, [buildings])

    const handleBuildingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setBuildingId(event.target.value);
    }

    return (
        <div className={"flex flex-col max-w-md mx-auto"}>

            <h1 className={title({color: 'yellow'})}>{props.buildingLocation ? "Edit Location" : "Add Location"}</h1>
            <span className={subtitle({fullWidth: true})}>Fill in the form below to {props.buildingLocation ? "edit" : "add"} a building.</span>

            <form onSubmit={handleSubmit} className={"flex flex-col gap-4 mt-5"}>
                <Select
                    isRequired
                    label="Building"
                    selectedKeys={[buildingId]}
                    onChange={handleBuildingChange}
                    placeholder="Select a building">
                    {buildings.map((building:any) => (
                        <SelectItem key={building.buildingId} value={building.buildingId}>
                            {building.name}
                        </SelectItem>
                    ))}
                </Select>

                <Input
                    isRequired
                    label="Name"
                    placeholder="Enter the name of the building"
                    value={name}
                    onValueChange={setName} />

                <Textarea
                    label="Description"
                    placeholder="Enter the description of the building"
                    value={description}
                    onValueChange={setDescription} />

                <Input
                    isRequired
                    label="Floor"
                    placeholder="Enter the floor of the building"
                    value={floor.toString()}
                    onValueChange={(value) => setFloor(Number(value))}

                />

                <Input
                    label="Room Number"
                    placeholder="Enter the room number of the building"
                    value={roomNumber}
                    onValueChange={setRoomNumber}
                />

                <Button type="submit" className={primaryButton({color: "yellow"})} >
                    {props.buildingLocation ? "Edit" : "Add"}
                </Button>

            </form>
        </div>
    );
};
export default LocationForm;

