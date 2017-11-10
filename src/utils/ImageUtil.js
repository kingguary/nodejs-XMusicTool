const gm = require('gm');

class ImageUtil {
    /**
     * resize a image file.
     * @param source The source file's path.
     * @param target The target file's path.
     */
    resizeImage(source, target) {
        gm(source)
            .resize(240, 240, '!')
            .write(target, function (err) {
                if (! err)
                    console.log('resize image ok');
                else
                    console.log('reisze failed:' + err);
            });
    }
}

exports.ImageUtil = ImageUtil;