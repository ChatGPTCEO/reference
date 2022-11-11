function t(t) {
    return /(ht|f)tp(s?):\/\/([^ \\/]*\.)+[^ \\/]*(:[0-9]+)?\/?/.test(t);
}

function r(t) {
    return /data:image\/(\w+);base64,(.*)/.test(t);
}

function e(t, r) {
    if (t === r) {
        return true;
    }

    if (t && r && 'object' == (void 0 === t ? 'undefined' : n(t)) && 'object' == (void 0 === r ? 'undefined' : n(r))) {
        var i;
        var o;
        var f;
        var u = Array.isArray(t);
        var a = Array.isArray(r);
        if (u && a) {
            if ((o = t.length) != r.length) {
                return false;
            }

            for (i = o; 0 != i--; ) {
                if (!e(t[i], r[i])) {
                    return false;
                }
            }

            return true;
        }

        if (u != a) {
            return false;
        }

        var s = t instanceof Date;
        var c = r instanceof Date;
        if (s != c) {
            return false;
        }

        if (s && c) {
            return t.getTime() == r.getTime();
        }

        var y = t instanceof RegExp;
        var l = r instanceof RegExp;
        if (y != l) {
            return false;
        }

        if (y && l) {
            return t.toString() == r.toString();
        }

        var p = Object.keys(t);

        if ((o = p.length) !== Object.keys(r).length) {
            return false;
        }

        for (i = o; 0 != i--; ) {
            if (!Object.prototype.hasOwnProperty.call(r, p[i])) {
                return false;
            }
        }

        for (i = o; 0 != i--; ) {
            f = p[i];

            if (!e(t[f], r[f])) {
                return false;
            }
        }

        return true;
    }

    return t !== t && r !== r;
}

var n =
    'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (t) {
              return typeof t;
          }
        : function (t) {
              return t && 'function' == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? 'symbol' : typeof t;
          };
module.exports = {
    isValidUrl: function (e) {
        return t(e) || r(e);
    },
    isOnlineUrl: t,
    isDataUrl: r,
    equal: e
};
