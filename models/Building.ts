class Building {
    name: string;
    description: string;
    location: {
        coordinates: [number, number]
    };
    imageURL: string;

    constructor(name: string, description: string, location: [number, number], imageURL: string) {
        this.name = name;
        this.description = description;
        this.location = {
            coordinates: location
        };
        this.imageURL = imageURL;
    }

}

export default Building;