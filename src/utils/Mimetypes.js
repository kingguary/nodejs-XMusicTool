const MIME_TYPES_POSTFIX = new Set(['wav', 'flac', 'ape', 'wv', 'dff', 'dsf', 'iso', 'alac']);
const TRACK_LIST_POSTFIX = new Set(['cue', 'm3u8']);

class Mimetypes {
    getLosslessType(filename) {
        for (let type of MIME_TYPES_POSTFIX) {
            if (filename.toLowerCase().endsWith(type)) {
                return type;
            }
        }
        return '';
    }

    isTrackListFile(fileName) {
        for (let type of TRACK_LIST_POSTFIX) {
            if (fileName.toLowerCase().endsWith(type)) {
                return true;
            }
        }
        return false;
    }
}

exports.Mimetypes = Mimetypes;