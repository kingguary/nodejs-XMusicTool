class SingleCDInfo {
    /**
     * Constructor for a single CD info.
     * @param title The album's title.
     * @param path The album's path.
     * @param performer The album's performer.
     * @param losslessType The album's lossless type.
     * @param cover The cover image name.
     * @param tracks The tracks including.
     */
    constructor(title, path, performer, losslessType, cover, tracks) {
        this.title = title;
        this.path = path;
        this.performer = performer;
        this.lossless_type = losslessType;
        this.cover = cover;
        this.tracks = tracks;
    }

    /**
     * Get the json string for this data.
     */
    toString() {
        return JSON.stringify(this);
    }
}

exports.SingleCDInfo = SingleCDInfo;