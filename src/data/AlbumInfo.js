class AlbumInfo {

    /**
     * Constructor for album info.
     * @param title The title of
     * @param path
     * @param cover
     * @param cds
     */
    constructor(title, path, cover, cds) {
        this.title = title;
        this.path = path;
        this.cover = cover;
        this.cd_num = cds.length;
        this.cd_list = [];
        for (let cd of cds) {
            this.cd_list.push(cd);
        }
    }

    toString() {
        return JSON.stringify(this);
    }
}

exports.AlbumInfo = AlbumInfo;