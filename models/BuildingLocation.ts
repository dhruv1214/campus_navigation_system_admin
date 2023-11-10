
class BuildingLocation {

    buildingId: string;
    name: string;
    description: string;
    floor: number;
    roomNumber: string;
    location: {
        coordinates: number[]
    };

    constructor(buildingId: string, name: string, description: string, floor: number, roomNumber: string, location: {coordinates: number[]}){
        this.buildingId = buildingId;
        this.name = name;
        this.description = description;
        this.floor = floor;
        this.roomNumber = roomNumber;
        this.location = location;
    }
}