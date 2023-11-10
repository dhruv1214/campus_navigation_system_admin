import React, {useState} from "react";
import Building from "@/models/Building";
import {Button, Input, Select, SelectItem, Textarea} from "@nextui-org/react";
import {color} from "framer-motion";
import {primaryButton, subtitle, title} from "@/components/primitives";
import {buildings} from "@/components/Locations/LocationsTableData";

// buildingId: string;
//     name: string;
//     description: string;
//     floor: number;
//     roomNumber: string;
//     location: {
//         coordinates: number[]
//     };

interface LocationFormProps {
    buildingLocation?: BuildingLocation;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const LocationForm = (props: LocationFormProps) => {

    const [name, setName] = useState(props.buildingLocation?.name || "");
    const [description, setDescription] = useState(props.buildingLocation?.description || "");
    const [latitude, setLatitude] = useState(props.buildingLocation?.location.coordinates[0] || 0);
    const [longitude, setLongitude] = useState(props.buildingLocation?.location.coordinates[1] || 0);
    const [floor, setFloor] = useState(props.buildingLocation?.floor || 1);
    const [roomNumber, setRoomNumber] = useState(props.buildingLocation?.roomNumber || "");


    return (
        <div className={"flex flex-col max-w-md mx-auto"}>

            <h1 className={title({color: 'yellow'})}>{props.buildingLocation ? "Edit Location" : "Add Location"}</h1>
            <span className={subtitle({fullWidth: true})}>Fill in the form below to {props.buildingLocation ? "edit" : "add"} a building.</span>

            <form onSubmit={props.onSubmit} className={"flex flex-col gap-4 mt-5"}>
                <Select
                    isRequired
                    label="Building"
                    placeholder="Select a building">
                    {buildings.map((building) => (
                        <SelectItem key={building._id} value={building._id}>
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


                <div className={"flex flex-row gap-4"}>
                    <Input
                        label="Latitude"
                        labelPlacement="outside"
                        placeholder="Enter the latitude of the building"
                        value={latitude.toString()}
                        onValueChange={(value) => setLatitude(Number(value))}/>
                    <Input
                        label="Longitude"
                        labelPlacement="outside"
                        placeholder="Enter the longitude of the building"
                        value={longitude.toString()}
                        onValueChange={(value) => setLongitude(Number(value))}/>
                </div>

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

