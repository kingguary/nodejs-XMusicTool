const fs = require('fs');
const crypto = require('crypto');

class MD5Util{
    /**
     * Get a file's md5.
     * @param filePath The file's path.
     */
    getMD5(filePath){
        // let start = new Date().getTime();
        let md5sum = crypto.createHash('md5');
        let data = fs.readFileSync(filePath);
        md5sum.update(data);
        let str = md5sum.digest('hex').toLowerCase();
        // console.log('文件:' + path + ',MD5签名为:' + str + '.耗时:' + (new Date().getTime() - start) / 1000.00 + "秒");
        return str;
    }
}

exports.MD5Util = MD5Util;