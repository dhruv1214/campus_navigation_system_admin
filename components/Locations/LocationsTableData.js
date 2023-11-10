import React from "react";
// Columns for Location data with reference to Building
const columns = [
    {name: "ID", id: "_id", sortable: true},
    {name: "Building Name", id: "building.name", sortable: true},
    {name: "Location Name", id: "name", sortable: true},
    {name: "Floor", id: "floor", sortable: true},
    {name: "Room Number", id: "roomNumber", sortable: true},
    {name: "ACTIONS", id: "actions"},
];


// Example data array for Buildings
const buildings = [
    {
        _id: 'Doon',
        name: 'Liberty Tower',
        description: 'A modern office skyscraper in the heart of downtown.',
        location: {
            coordinates: [-74.0060, 40.7128] // Example coordinates for New York City
        },
        imageURL: '/images/liberty-tower.jpg'
    },
    {
        _id: 'Empire State Building',
        name: 'Empire State Building',
        description: 'A 102-story skyscraper located in Midtown Manhattan.',
        location: {
            coordinates: [-73.9857, 40.7484] // Example coordinates for New York City
        },
        imageURL: '/images/empire-state-building.jpg'
    },
    {
        _id: 'DownTown',
        name: 'downtown',
        description: 'A 102-story skyscraper located in Midtown Manhattan.',
        location: {
            coordinates: [-73.9857, 40.7484] // Example coordinates for New York City
        },
        imageURL: '/images/empire-state-building.jpg'
    },
    {
        _id: 'The White House',
        name: 'The White House',
        description: 'The official residence and workplace of the president of the United States.',
        location: {
            coordinates: [-77.0365, 38.8977] // Example coordinates for Washington, D.C.
        },
        imageURL: '/images/white-house.jpg'
    }
];


// Page all locations to the status options at the top of the page and only add unique locations
const statusOptions =[
    {
        value: 'all',
        label: 'All Buildings',
    },
    ...buildings.map(building => ({
        value: building._id,
        label: building.name,
    }))
];

const locations = [
    {
        _id: '2G18',
        building: buildings[0],
        name: 'Conference Room A',
        description: 'Spacious room suitable for large meetings and presentations.',
        floor: 2,
        roomNumber: '1001',
        location: {
            coordinates: [-74.0061, 40.7129] // Slightly different from the building coordinates
        }
    },
    {
        _id: '2G19',
        building: buildings[1],
        name: 'Conference Room B',
        description: 'Spacious room suitable for large meetings and presentations.',
        floor: 2,
        roomNumber: '1002',
        location: {
            coordinates: [-74.0061, 40.7129] // Slightly different from the building coordinates
        }
    },
    {
        _id: '2G20',
        building: buildings[2],
        name: 'Conference Room C',
        description: 'Spacious room suitable for large meetings and presentations.',
        floor: 2,
        roomNumber: '1003',
        location: {
            coordinates: [-74.0061, 40.7129] // Slightly different from the building coordinates
        }
    },
    {
        _id: '2G21',
        building: buildings[3],
        name: 'Conference Room D',
        description: 'Spacious room suitable for large meetings and presentations.',
        floor: 2,
        roomNumber: '1004',
        location: {
            coordinates: [-74.0061, 40.7129] // Slightly different from the building coordinates
        }
    },
    {
        _id: '2G22',
        building: buildings[1],
        name: 'Conference Room E',
        description: 'Spacious room suitable for large meetings and presentations.',
        floor: 2,
        roomNumber: '1005',
        location: {
            coordinates: [-74.0061, 40.7129] // Slightly different from the building coordinates
        }
    },
    {
        _id: '2G23',
        building: buildings[0],
        name: 'Conference Room F',
        description: 'Spacious room suitable for large meetings and presentations.',
        floor: 2,
        roomNumber: '1006',
        location: {
            coordinates: [-74.0061, 40.7129] // Slightly different from the building
        }
    }
];

const buildingsNames = buildings.map(building => building.name);


export {columns, locations, statusOptions, buildingsNames};
