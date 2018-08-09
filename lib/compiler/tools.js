module.exports = {
    "esc": str => {
        return str
            .replace(/\\/g, '\\\\')
            .replace(/"/g, '\\"')
            .replace(/\0/g, '\\0')
            .replace(/\t/g, '\\t')
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/[\x00-\x0F]/g, function (ch) {
                return '\\x0' + hex(ch);
            })
            .replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) {
                return '\\x' + hex(ch);
            });
    }
};

