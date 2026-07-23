// core module
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");

const dataDir = path.join(rootDir, "data");
const homeDataPath = path.join(dataDir, "homes.json");

const loadHomes = () => {
    if (!fs.existsSync(homeDataPath)) {
        fs.mkdirSync(dataDir, { recursive: true });
        fs.writeFileSync(homeDataPath, "[]");
        return [];
    }

    const fileData = fs.readFileSync(homeDataPath, "utf8");
    return fileData ? JSON.parse(fileData) : [];
};

let registredHomes = loadHomes();

module.exports = class Home {
    constructor(houseName, price, location) {
        this.houseName = houseName;
        this.price = price;
        this.location = location;
    }

    save() {
        registredHomes.push(this);
        fs.mkdirSync(dataDir, { recursive: true });
        fs.writeFileSync(homeDataPath, JSON.stringify(registredHomes, null, 2));
    }

    static fetchAll() {

        registredHomes = loadHomes();
        
        return registredHomes;
    }
};