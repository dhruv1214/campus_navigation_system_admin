"use client";
import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    Pagination,
    Selection,
    ChipProps,
    SortDescriptor, Tooltip
} from "@nextui-org/react";
import {buildingsNames, columns, locations, statusOptions} from "./BuildingsTableData";
import {capitalize} from "./BuildingsTableUtils";
import {VerticalDotsIcon, ChevronDownIcon, PlusIcon, SearchIcon} from "@/components/Buildings/BuildingsTableIcons";
import {DeleteIcon, EditIcon, EyeIcon} from "@nextui-org/shared-icons";
import AddButton from "@/components/Buildings/AddButton";


const INITIAL_VISIBLE_COLUMNS = ["name", "building.name", "floor", "roomNumber", "actions"];


const colors = [
    "default",
    "primary",
    "secondary",
    "success",
    "warning",
    "error",
    "info",
];

const statusColorMap: Record<string, ChipProps["color"]> = buildingsNames.reduce(
    (acc, name, index) => ({
        ...acc,
        [name]: colors[index % colors.length],
    }),
    {},
);
type Location = typeof locations[0];

export default function BuildingsTable() {
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
    const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
    const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "age",
        direction: "ascending",
    });
    const [page, setPage] = React.useState(1);

    const pages = Math.ceil(locations.length / rowsPerPage);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.id));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredLocations = [...locations];

        if (hasSearchFilter) {
            filteredLocations = filteredLocations.filter((user) =>
                user.name.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }
        if (statusFilter !== "all") {
            filteredLocations = filteredLocations.filter((location) =>
                statusFilter.has(location.building.name)
            );
        }

        return filteredLocations;
    }, [filterValue, statusFilter, hasSearchFilter]);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a: Location, b: Location) => {
            const first = a[sortDescriptor.column as keyof Location] as number;
            const second = b[sortDescriptor.column as keyof Location] as number;
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [items, sortDescriptor.column, sortDescriptor.direction]);

    const renderCell = React.useCallback((location: any, columnKey: any) => {
        let cellValue;


        if (columnKey.includes('.')) {
            // Handle nested properties, e.g. building.name
            const keys = columnKey.split('.');
            cellValue = location[keys[0]][keys[1]];
        } else {
            cellValue = location[columnKey];
        }

        console.log({location, columnKey, cellValue});

        switch (columnKey) {
            case "_id":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{cellValue}</p>
                        <p className="text-bold text-tiny capitalize text-default-500">{location._id}</p>
                    </div>
                );
            case "building.name":
                return (
                    <Chip
                        className="capitalize border-none gap-1 text-default-600"
                        color={statusColorMap[location.building.name]}
                        size="sm"
                        variant="dot">
                        {cellValue}
                    </Chip>
                );
            case "name":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{cellValue}</p>
                    </div>
                );
            case "roomNumber":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{cellValue}</p>
                    </div>
                );
            case "floor":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{cellValue}</p>
                    </div>
                );
            case "actions":
                return (
                    <div>
                        <div className="hidden relative md:flex items-center gap-2">
                            <Tooltip content="Details">
                              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EyeIcon/>
                              </span>
                            </Tooltip>
                            <Tooltip content="Edit user">
                              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EditIcon/>
                              </span>
                            </Tooltip>
                            <Tooltip color="danger" content="Delete user">
                              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon/>
                              </span>
                            </Tooltip>
                        </div>
                        <div className="relative flex md:hidden justify-end items-center gap-2">
                            <Dropdown className="bg-background border-1 border-default-200">
                                <DropdownTrigger>
                                    <Button isIconOnly radius="full" size="sm" variant="light">
                                        <VerticalDotsIcon className="text-default-400"/>
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu>
                                    <DropdownItem>View</DropdownItem>
                                    <DropdownItem>Edit</DropdownItem>
                                    <DropdownItem>Delete</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);


    const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, [setRowsPerPage, setPage]);

    const onSearchChange = React.useCallback((value?: string) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, [setFilterValue, setPage]);

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        classNames={{
                            base: "w-full sm:max-w-[44%]",
                            inputWrapper: "border-1",
                        }}
                        placeholder="Search by name..."
                        size="sm"
                        startContent={<SearchIcon className="text-default-300"/>}
                        value={filterValue}
                        variant="bordered"
                        onClear={() => setFilterValue("")}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button
                                    endContent={<ChevronDownIcon className="text-small"/>}
                                    variant="flat">
                                    Status
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={statusFilter}
                                selectionMode="multiple"
                                onSelectionChange={setStatusFilter}>
                                {statusOptions.map((status) => (
                                    <DropdownItem key={status.label} className="capitalize">
                                        {capitalize(status.value)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button
                                    endContent={<ChevronDownIcon className="text-small"/>}
                                    variant="flat">
                                    Columns
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={setVisibleColumns}>
                                {columns.map((column) => (
                                    <DropdownItem key={column.id} className="capitalize">
                                        {capitalize(column.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                       <AddButton />
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Total {34} locations</span>
                    <label className="flex items-center text-default-400 text-small">
                        Rows per page:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [filterValue, statusFilter, visibleColumns, onRowsPerPageChange, onSearchChange, setFilterValue, setStatusFilter, setVisibleColumns]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <Pagination
                    showControls
                    classNames={{
                        cursor: "bg-foreground text-background",
                    }}
                    color="default"
                    isDisabled={hasSearchFilter}
                    page={page}
                    total={pages}
                    variant="light"
                    onChange={setPage}
                />
                <span className="text-small text-default-400">
          {selectedKeys === "all"
              ? "All items selected"
              : `${selectedKeys.size} of ${items.length} selected`}
        </span>
            </div>
        );
    }, [selectedKeys, items.length, page, hasSearchFilter, setPage]);

    const classNames = React.useMemo(
        () => ({
            wrapper: ["max-h-[382px]", "max-w-3xl"],
            th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
            td: [
                // changing the rows border radius
                // first
                "group-data-[first=true]:first:before:rounded-none",
                "group-data-[first=true]:last:before:rounded-none",
                // middle
                "group-data-[middle=true]:before:rounded-none",
                // last
                "group-data-[last=true]:first:before:rounded-none",
                "group-data-[last=true]:last:before:rounded-none",
            ],
        }),
        [],
    );

    return (
        <Table
            isCompact
            removeWrapper
            aria-label="Example table with custom cells, pagination and sorting"
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            checkboxesProps={{
                classNames: {
                    wrapper: "after:bg-foreground after:text-background text-background",
                },
            }}
            classNames={classNames}
            selectedKeys={selectedKeys}
            selectionMode="multiple"
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}>
            <TableHeader columns={headerColumns}>
                {(column) => (
                    <TableColumn
                        key={column.id}
                        align={column.id === "actions" ? "end" : "start"}
                        allowsSorting={column.sortable}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={"No locations found"} items={sortedItems}>
                {(item) => (
                        <TableRow key={item.name}>
                            {(columnKey) => {
                                return (<TableCell>{renderCell(item, columnKey)}</TableCell>)
                            }}
                        </TableRow>
                    )
                }
            </TableBody>
        </Table>
    );
}
