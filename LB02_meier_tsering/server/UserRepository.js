const fs = require('fs');
const path = require('path');

module.exports = class UserRepository {

    fileLoc;


    @param fileName

    constructor(fileName) {
        this.fileLoc = path.resolve(fileName);
    }



    @returns

    read() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.fileLoc, 'utf8',
                (error, data) => {
                    if (error) {
                        reject(`Error ${error}`);
                    } else {
                        try {
                            resolve(JSON.parse(data));
                        } catch (e) {
                            console.error('Invalid JSON in file');
                        }
                    }
                })
        });
    }



    @param data
    @returns

    save(data) {
        return new Promise((resolve, reject) => {
            fs.writeFile(this.fileLoc,
                JSON.stringify(data, null, 2),
                (error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve();
                    }
                });
        });
    }
}


