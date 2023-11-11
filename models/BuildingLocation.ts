
class BuildingLocation {

    buildingId: string;
    name: string;
    description: string;
    floor: number;
    roomNumber: string;

    constructor(buildingId: string, name: string, description: string, floor: number, roomNumber: string){
        this.buildingId = buildingId;
        this.name = name;
        this.description = description;
        this.floor = floor;
        this.roomNumber = roomNumber;
    }
}