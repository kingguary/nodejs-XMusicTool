const path = require('path');
const fs = require('fs');
const { Mimetypes } = require('./Mimetypes');
const { MD5Util } = require('./MD5Util');
const { ImageUtil } = require('./ImageUtil');

const COVER_IMAGE_DIR = './covers';

class FileUtil {
    constructor(){
        this.mimeType = new Mimetypes();
        this.md5Util = new MD5Util();
        this.imageUtil = new ImageUtil();
    }
    /**
     * Whether a folder is boxset, according to folder name.
     * The matching exp like XCD(s)) or (X CD(s))
     * @param folderPath The folder's path.
     */
    isBoxsetFolder(folderPath) {
        let name = path.basename(folderPath);
        if (null != name.match(/(\d+\s?CDs?)/i)) {
            return this.containAlbum(folderPath);
        }
        return false;
    }

    /**
     * Whether a single folder containing music.
     * @param folderPath The folder's path
     */
    isSingleAlbumFolder(folderPath) {
        let musicFileType = this.getMusicFileType(folderPath);
        if (0 != musicFileType.length) {
            return true;
        }

        return false;
    }

    /**
     * Whether a folder contains albums. If so, we consider it as a boxset.
     * @param folderPath The folder's path.
     */
    containAlbum(folderPath) {
        let result = false;
        let files = fs.readdirSync(folderPath);
        for (let filename of files) {
            let filePath = path.join(folderPath, filename);
            let stats = fs.statSync(filePath);
            if (stats.isDirectory()) {
                let musicFileType = this.getMusicFileType(filePath);
                if (0 != musicFileType.length) {
                    result = true;
                    break;
                }
            }
        }
        return result;
    }

    /**
     * Get a music folder's file type, like wav, ape, flac, dsf, dff, etc.
     * @param folderPath The music folder's path.
     */
     getMusicFileType(folderPath) {
        let result = '';
        let files = fs.readdirSync(folderPath);
        for (let filename of files) {
            let filePath = path.join(folderPath, filename);
            let stats = fs.statSync(filePath);
            if (stats.isFile()) {
                result = this.mimeType.getLosslessType(filename);
                if (0 != result.length) {
                    break;
                }
            }
        }
        return result;
    }

    /**
     * Get all single tracks.
     * @param folderPath The music folder's path.
     */
    getTrackList(folderPath) {
        let fileList = [];
        let files = fs.readdirSync(folderPath);
        for (let filename of files) {
            let filePath = path.join(folderPath, filename);
            let stats = fs.statSync(filePath);
            if (stats.isFile()) {
                let result = this.mimeType.getLosslessType(filename);
                if (0 != result.length) {
                    fileList.push(filename);
                }
            }
        }
        return fileList;
    }

    /**
     * Get album cover image.
     * @param folderPath The music folder's path.
     */
    getCoverImage(folderPath) {
        let folderImage = path.join(folderPath, 'folder.jpg');
        let res = null;
        if (this.fileExists(folderImage)) {
            // assuming the cover image is folder.jpg
            let cover_md5 = this.md5Util.getMD5(folderImage);
            let coverImageName = cover_md5 + '.jpg';
            let coverImagePath = path.join(COVER_IMAGE_DIR, coverImageName);
            res = coverImageName;
            if (! this.fileExists(coverImagePath)) {
                this.imageUtil.resizeImage(folderImage, coverImagePath);
            }
        }
        return res;
    }

    /**
     * Get the playlist file in a folder.
     * @param folderPath The music folder's path.
     */
    getPlayListFile(folderPath) {
        let playlist = {};
        let files = fs.readdirSync(folderPath);
        for (let filename of files) {
            let filePath = path.join(folderPath, filename);
            let stats = fs.statSync(filePath);
            if (stats.isFile()) {
                let result = this.mimeType.isTrackListFile(filename);
                if (result) {
                    if (filename.endsWith('.cue_index')) {
                        playlist['utf8_cue'] = filePath;
                    } else if (filename.endsWith('.cue')) {
                        playlist['cue'] = filePath;
                    } else if (filename.endsWith('m3u8')) {
                        playlist['m3u8'] = filePath;
                    }
                }
            }
        }
        return playlist;
    }

    /**
     * check file exists or not.
     * @param path The file's path.
     */
    fileExists(path) {
        return fs.existsSync(path);
    }
}

exports.FileUtil = FileUtil;