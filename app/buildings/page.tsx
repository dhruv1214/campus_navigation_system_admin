import {title} from "@/components/primitives";
import React from "react";
import BuildingsTable from "@/components/Buildings/BuildingsTable";


export default function BuildingsPage() {
    return (
        <div>
            <title>Buildings</title>
            <BuildingsTable />
        </div>
    );
}