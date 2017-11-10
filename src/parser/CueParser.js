const parser = require('cue-parser');

class CueParser {
    /**
     * return the parsed cue file.
     * @param cueFile The cue's file path.
     * @returns {*}
     */
    parseCue(cueFile) {
        try {
            return parser.parse(cueFile);
            //console.log(cuesheet.performer);
            //console.log(cuesheet.files);
            //console.log(cuesheet.files[0].tracks);
        } catch (err) {
            console.log(cueFile + " parse error" + err);
            return null;
        }
    }
}

exports.CueParser = CueParser;