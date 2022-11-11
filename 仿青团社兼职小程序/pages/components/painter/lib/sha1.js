function r(r, a) {
    r[a >> 5] |= 128 << (24 - (a % 32));
    r[15 + (((a + 64) >> 9) << 4)] = a;
    for (var o = Array(80), c = 1732584193, f = -271733879, h = -1732584194, i = 271733878, v = -1009589776, A = 0; A < r.length; A += 16) {
        for (var l = c, g = f, s = h, d = i, y = v, x = 0; x < 80; x++) {
            if (x < 16) {
                o[x] = r[A + x];
            } else {
                o[x] = u(o[x - 3] ^ o[x - 8] ^ o[x - 14] ^ o[x - 16], 1);
            }

            var C = e(e(u(c, 5), n(x, f, h, i)), e(e(v, o[x]), t(x)));
            v = i;
            i = h;
            h = u(f, 30);
            f = c;
            c = C;
        }

        c = e(c, l);
        f = e(f, g);
        h = e(h, s);
        i = e(i, d);
        v = e(v, y);
    }

    return Array(c, f, h, i, v);
}

function n(r, n, t, e) {
    return r < 20 ? (n & t) | (~n & e) : r < 40 ? n ^ t ^ e : r < 60 ? (n & t) | (n & e) | (t & e) : n ^ t ^ e;
}

function t(r) {
    return r < 20 ? 1518500249 : r < 40 ? 1859775393 : r < 60 ? -1894007588 : -899497514;
}

function e(r, n) {
    var t = (65535 & r) + (65535 & n);
    return (((r >> 16) + (n >> 16) + (t >> 16)) << 16) | (65535 & t);
}

function u(r, n) {
    return (r << n) | (r >>> (32 - n));
}

function a(r) {
    for (var n = Array(), t = (1 << f) - 1, e = 0; e < r.length * f; e += f) {
        n[e >> 5] |= (r.charCodeAt(e / f) & t) << (24 - (e % 32));
    }

    return n;
}

function o(r) {
    for (var n = c ? '0123456789ABCDEF' : '0123456789abcdef', t = '', e = 0; e < 4 * r.length; e++) {
        t += n.charAt((r[e >> 2] >> (8 * (3 - (e % 4)) + 4)) & 15) + n.charAt((r[e >> 2] >> (8 * (3 - (e % 4)))) & 15);
    }

    return t;
}

var c = 0;
var f = 8;
module.exports = {
    hex_sha1: function (n) {
        return o(r(a(n), n.length * f));
    }
};
