const path = require("path");
const fs = require('fs');

class TracksParser {
    constructor(){
    }

    static parseTracks(folderPath){
        let result = [];
        fs.readdir(folderPath, function (err, files) {
            "use strict";
            if (err) {
                console.log(err);
                return;
            }

            files.forEach(function (filename) {
                let filePath = path.join(folderPath, filename);
                fs.stat(filePath, function (err, stats) {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    if (stats.isFile()) {
                        if (!type) {
                            result.push(filename);
                        }
                    }
                });
            });
        });
        return result;
    }
}

exports.TracksParser = TracksParser;