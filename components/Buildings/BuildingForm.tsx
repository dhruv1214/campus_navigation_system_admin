import React, {useState} from "react";
import Building from "@/models/Building";
import {Button, Input} from "@nextui-org/react";
import {color} from "framer-motion";
import {primaryButton, subtitle, title} from "@/components/primitives";

interface BuildingFormProps {
    building?: Building;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const BuildingForm = (props: BuildingFormProps) => {

    const [name, setName] = useState(props.building?.name || "");
    const [description, setDescription] = useState(props.building?.description || "");
    const [latitude, setLatitude] = useState(props.building?.location.coordinates[0] || 0);
    const [longitude, setLongitude] = useState(props.building?.location.coordinates[1] || 0);
    const [imageURL, setImageURL] = useState(props.building?.imageURL || "");

    return (
        <div className={"flex flex-col max-w-md mx-auto"}>

            <h1 className={title({color: 'pink'})}>{props.building ? "Edit Building" : "Add Building"}</h1>
            <span className={subtitle({fullWidth: true})}>Fill in the form below to {props.building ? "edit" : "add"} a building.</span>
            <form onSubmit={props.onSubmit} className={"flex flex-col gap-4 mt-5"}>


                <Input
                    label="Name"
                    placeholder="Enter the name of the building"
                    value={name}
                    onValueChange={setName}
                />

                <Input
                    label="Description"
                    placeholder="Enter the description of the building"
                    value={description}
                    onValueChange={setDescription}
                />


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
                    label="Image URL"
                    placeholder="Enter the image URL of the building"
                    value={imageURL}
                    onValueChange={setImageURL}/>

                <Button type="submit" className={primaryButton({color: "pink"})} >
                    {props.building ? "Edit" : "Add"}
                </Button>

            </form>
        </div>
    );
};
export default BuildingForm;

