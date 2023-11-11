import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue,
    Tooltip,
    Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem
} from "@nextui-org/react";
import {buildings} from "@/components/Locations/LocationsTableData";
import {DeleteIcon, EditIcon, EyeIcon} from "@nextui-org/shared-icons";
import {VerticalDotsIcon} from "@/components/icons";
import {Link} from "@nextui-org/link";

const columns = [
    {key: 'name', label: 'Name'},
    {key: 'description', label: 'Description'},
    {key: 'Action', label: 'Action'}
]

export default function BuildingsTable() {

    const renderCell = (item: any, column: any) => {
        const cellValue = item[column.key];

        const id = getKeyValue(item, '_id');

        switch (column.key) {
            case 'Action':
                return (
                    <TableCell key={column.key} align="center">
                        <div className="relative flex items-center gap-2">
                            <Tooltip content="Edit user">
                                <Link className="text-lg text-default-400 cursor-pointer active:opacity-50" href={`Buildings/${id}`}>
                                    <EditIcon/>
                                </Link>
                            </Tooltip>
                            <Tooltip color="danger" content="Delete user">
                              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon/>
                              </span>
                            </Tooltip>
                        </div>
                    </TableCell>
                );
            default:
                return (
                    <TableCell key={column.key} align="center">
                        {cellValue}
                    </TableCell>
                );
        }

    }

    const handleEdit = (item: any) => {
        console.log(item);


    }

    return (
        <Table aria-label="Buildings table">
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={buildings}>
                {(item) => (
                    <TableRow key={item._id}>
                        {columns.map((column) => renderCell(item, column))}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
