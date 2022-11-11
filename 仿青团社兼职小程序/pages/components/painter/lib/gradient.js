!(function () {
    function t(t) {
        var a = t.substring(0, t.length - 1).split('%,');
        var r = [];
        var n = [];
        var e = true;
        var i = false;
        var s = void 0;
        try {
            for (var h, l = a[Symbol.iterator](); !(e = (h = l.next()).done); e = true) {
                var o = h.value;
                r.push(o.substring(0, o.lastIndexOf(' ')).trim());
                n.push(o.substring(o.lastIndexOf(' '), o.length) / 100);
            }
        } catch (t) {
            i = true;
            s = t;
        } finally {
            try {
                if (!e && l.return) {
                    l.return();
                }
            } finally {
                if (i) {
                    throw s;
                }
            }
        }

        return {
            colors: r,
            percents: n
        };
    }

    function a(a, r, n, e) {
        for (var i = t(n.match(/radial-gradient\((.+)\)/)[1]), s = e.createCircularGradient(0, 0, a < r ? r / 2 : a / 2), h = 0; h < i.colors.length; h++) {
            s.addColorStop(i.percents[h], i.colors[h]);
        }

        e.fillStyle = s;
    }

    function r(t, a, r) {
        var n = t.match(/([-]?\d{1,3})deg/);
        var e = void 0;
        switch (n && n[1] ? parseFloat(n[1]) : 0) {
            case 0:
                e = [0, -r / 2, 0, r / 2];
                break;

            case 90:
                e = [a / 2, 0, -a / 2, 0];
                break;

            case -90:
                e = [-a / 2, 0, a / 2, 0];
                break;

            case 180:
                e = [0, r / 2, 0, -r / 2];
                break;

            case -180:
                e = [0, -r / 2, 0, r / 2];
                break;

            default:
                var i = 0;
                var s = 0;
                var h = 0;
                var l = 0;
                if (n[1] > 0 && n[1] < 90) {
                    h = -(i = a / 2 - (((a / 2) * Math.tan(((90 - n[1]) * Math.PI * 2) / 360) - r / 2) * Math.sin((2 * (90 - n[1]) * Math.PI * 2) / 360)) / 2);
                    s = -(l = Math.tan(((90 - n[1]) * Math.PI * 2) / 360) * i);
                } else {
                    if (n[1] > -180 && n[1] < -90) {
                        h = -(i = -a / 2 + (((a / 2) * Math.tan(((90 - n[1]) * Math.PI * 2) / 360) - r / 2) * Math.sin((2 * (90 - n[1]) * Math.PI * 2) / 360)) / 2);
                        s = -(l = Math.tan(((90 - n[1]) * Math.PI * 2) / 360) * i);
                    } else {
                        if (n[1] > 90 && n[1] < 180) {
                            h = -(i = a / 2 + (((-a / 2) * Math.tan(((90 - n[1]) * Math.PI * 2) / 360) - r / 2) * Math.sin((2 * (90 - n[1]) * Math.PI * 2) / 360)) / 2);
                            s = -(l = Math.tan(((90 - n[1]) * Math.PI * 2) / 360) * i);
                        } else {
                            h = -(i = -a / 2 - (((-a / 2) * Math.tan(((90 - n[1]) * Math.PI * 2) / 360) - r / 2) * Math.sin((2 * (90 - n[1]) * Math.PI * 2) / 360)) / 2);
                            s = -(l = Math.tan(((90 - n[1]) * Math.PI * 2) / 360) * i);
                        }
                    }
                }

                e = [i, s, h, l];
        }

        return e;
    }

    function n(a, n, e, i) {
        for (
            var s = r(e, a, n), h = i.createLinearGradient(s[0], s[1], s[2], s[3]), l = e.match(/linear-gradient\((.+)\)/)[1], o = t(l.substring(l.indexOf(',') + 1)), c = 0;
            c < o.colors.length;
            c++
        ) {
            h.addColorStop(o.percents[c], o.colors[c]);
        }

        i.fillStyle = h;
    }

    var e = {
        isGradient: function (t) {
            return !(!t || (!t.startsWith('linear') && !t.startsWith('radial')));
        },
        doGradient: function (t, r, e, i) {
            if (t.startsWith('linear')) {
                n(r, e, t, i);
            } else {
                if (t.startsWith('radial')) {
                    a(r, e, t, i);
                }
            }
        }
    };
    module.exports = {
        api: e
    };
})();
