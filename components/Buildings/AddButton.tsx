import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import {PlusIcon} from "@/components/Buildings/BuildingsTableIcons";

export default function AddButton() {
    return (
        <Dropdown>
            <DropdownTrigger>
                <Button
                    className="bg-foreground text-background"
                    endContent={<PlusIcon/>}>
                    Add New
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="new">Building</DropdownItem>
                <DropdownItem key="copy">Location</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}
