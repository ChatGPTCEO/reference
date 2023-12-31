!(function (n, t) {
    'object' == typeof exports && 'undefined' != typeof module ? (module.exports = t()) : 'function' == typeof define && define.amd ? define(t) : (n.Ald = t());
})(this, function () {
    function n() {
        return new Promise(function (n) {
            uni.getSetting({
                success(t) {
                    t.authSetting['scope.userInfo']
                        ? uni.getUserInfo({
                              success(t) {
                                  n(t);
                              },

                              fail() {
                                  n('');
                              }
                          })
                        : n('');
                },

                fail() {
                    n('');
                }
            });
        });
    }

    function t() {
        return new Promise(function (n) {
            uni.getNetworkType({
                success(t) {
                    n(t);
                },

                fail() {
                    n('');
                }
            });
        });
    }

    function e() {
        return new Promise(function (n) {
            uni.getSetting({
                success(t) {
                    t.authSetting['scope.userLocation']
                        ? uni.getLocation({
                              type: 'wgs84',

                              success(t) {
                                  n(t);
                              },

                              fail(t) {
                                  n('');
                              }
                          })
                        : n('');
                },

                fail(t) {
                    n('');
                }
            });
        });
    }

    function o(o) {
        Promise.all([n(), t(), e()]).then(function (n) {
            (J.user_info = Q = n[0].userInfo || {}), (J.nt = X = n[1].networkType || ''), (J.lc = Y = n[2] || {}), o && o();
        });
    }

    function i(n, t) {
        var e = p('page', 'methonds', t.eventId);
        e.ti = t.eventId;
        var o = h();
        (o['content-type'] = 'application/json'),
            uni.requestSubscribeMessage({
                tmplIds: n,

                success(n) {
                    let i = [];

                    for (let t in n) 'accept' === n[t] && i.push(t);

                    if (!i.length) return (E = !1), v('未订阅模版'), void (w(t.fail) && t.fail('未订阅模版'));
                    (e.tlis = i),
                        uni.request({
                            url: b() + 'psi/v1/trigger/sub',
                            data: e,
                            header: o,
                            method: 'POST',
                            success: function (n) {
                                (E = !1), v('订阅成功'), w(t.success) && t.success('订阅成功');
                            },

                            fail(n) {
                                (E = !1), v('订阅成功模版上报失败'), w(t.fail) && t.fail('订阅成功模版上报失败', n);
                            }
                        });
                },

                fail(n) {
                    (E = !1), v('订阅失败'), w(t.fail) && t.fail('订阅失败', n);
                }
            });
    }

    function u(t) {
        function e() {
            o(function () {
                var n = p('page', 'methonds', t.query.xst_tki);
                n.tki = t.query.xst_tki;
                var e = h();
                (e['content-type'] = 'application/json'),
                    uni.request({
                        url: b() + 'psi/v1/trigger/rtn',
                        data: n,
                        header: e,
                        method: 'POST',
                        success: function (n) {}
                    });
            });
        }

        (Z = t),
            ($ = I()),
            Q ||
                n().then(function (n) {
                    Q = n;
                }),
            (1107 != t.scene && 1014 != t.scene) || !t.query.xst_tki || (x() ? e() : nn.push(e));
    }

    function r() {}

    function a(n) {}

    function c() {}

    function f(n) {
        var t = {};

        for (var e in n) 'onShow' !== e && 'onHide' !== e && (t[e] = n[e]);

        return (
            (t.onShow = function (t) {
                u.call(this, t), n.onShow && 'function' == typeof n.onShow && n.onShow.call(this, t);
            }),
            (t.onHide = function () {
                r.call(this), n.onHide && 'function' == typeof n.onHide && n.onHide.call(this);
            }),
            t
        );
    }

    function s(n) {
        var t = {};

        for (var e in n) 'onLoad' !== e && 'onShow' !== e && (t[e] = n[e]);

        return (
            (t.onLoad = function (t) {
                a.call(this, t), 'function' == typeof n.onLoad && n.onLoad.call(this, t);
            }),
            (t.onShow = function (t) {
                c.call(this, t), 'function' == typeof n.onLoad && n.onShow.call(this, t);
            }),
            t
        );
    }

    function l(n) {
        return App(f(n));
    }

    function d(n) {
        return Page(s(n));
    }

    function p(n, t, e) {
        var o = y();
        return (o.ev = n), (o.life = t), (o.st = Date.now()), (o.wsr = Z), (o.v = N), (o.ak = U), (o.ifo = B), (o.reqid = g(e)), o;
    }

    function h() {
        return (
            G || x(),
            {
                M_openid: G || '',
                M_name: W,
                M_appid: z,
                M_icon: V
            }
        );
    }

    function g(n) {
        return C(Date.now() + U + F + n);
    }

    function v(n) {
        K.debug &&
            uni.showModal({
                title: '小神推提示',
                content: n
            });
    }

    function w(n) {
        return 'function' == typeof n;
    }

    function S() {
        if (void 0 !== J.sdv) {
            let n = parseInt(J.sdv.split('.').join(''));
            return n >= 282;
        }

        return !1;
    }

    function y() {
        var n = {};

        for (var t in J) n[t] = J[t];

        return n;
    }

    function _(n, t) {
        Object.defineProperty(wx, n, {
            value: t,
            writable: !1,
            enumerable: !0,
            configurable: !0
        });
    }

    function x() {
        var n = '';

        try {
            G = n = uni.getStorageSync('ald_push_openid');
        } catch (t) {
            G = n = uni.getStorageSync('ald_push_openid');
        }

        return n;
    }

    function m() {
        function n() {
            return Math.floor(65536 * (1 + Math.random()))
                .toString(16)
                .substring(1);
        }

        return n() + n() + n() + n() + n() + n() + n() + n();
    }

    function I() {
        return '' + Date.now() + Math.floor(1e7 * Math.random());
    }

    function b() {
        return 1 === R ? 'https://plogtest.xiaoshentui.com/' : 'https://plog.xiaoshentui.com/';
    }

    function P(n, t, e) {
        if (n[t]) {
            var o = n[t];

            n[t] = function (n) {
                e.call(this, n, t), o.call(this, n);
            };
        } else
            n[t] = function (n) {
                e.call(this, n, t);
            };
    }

    function k(n, t) {
        var e = (65535 & n) + (65535 & t);
        return (((n >> 16) + (t >> 16) + (e >> 16)) << 16) | (65535 & e);
    }

    function M(n, t) {
        return (n << t) | (n >>> (32 - t));
    }

    function D(n, t, e, o, i, u) {
        return k(M(k(k(t, n), k(o, u)), i), e);
    }

    function q(n, t, e, o, i, u, r) {
        return D((t & e) | (~t & o), n, t, i, u, r);
    }

    function A(n, t, e, o, i, u, r) {
        return D((t & o) | (e & ~o), n, t, i, u, r);
    }

    function L(n, t, e, o, i, u, r) {
        return D(t ^ e ^ o, n, t, i, u, r);
    }

    function H(n, t, e, o, i, u, r) {
        return D(e ^ (t | ~o), n, t, i, u, r);
    }

    function j(n) {
        for (var t = 1732584193, e = -271733879, o = -1732584194, i = 271733878, u = 0; u < n.length; u += 16) {
            var r = t,
                a = e,
                c = o,
                f = i;
            (t = q(t, e, o, i, n[u + 0], 7, -680876936)),
                (i = q(i, t, e, o, n[u + 1], 12, -389564586)),
                (o = q(o, i, t, e, n[u + 2], 17, 606105819)),
                (e = q(e, o, i, t, n[u + 3], 22, -1044525330)),
                (t = q(t, e, o, i, n[u + 4], 7, -176418897)),
                (i = q(i, t, e, o, n[u + 5], 12, 1200080426)),
                (o = q(o, i, t, e, n[u + 6], 17, -1473231341)),
                (e = q(e, o, i, t, n[u + 7], 22, -45705983)),
                (t = q(t, e, o, i, n[u + 8], 7, 1770035416)),
                (i = q(i, t, e, o, n[u + 9], 12, -1958414417)),
                (o = q(o, i, t, e, n[u + 10], 17, -42063)),
                (e = q(e, o, i, t, n[u + 11], 22, -1990404162)),
                (t = q(t, e, o, i, n[u + 12], 7, 1804603682)),
                (i = q(i, t, e, o, n[u + 13], 12, -40341101)),
                (o = q(o, i, t, e, n[u + 14], 17, -1502002290)),
                (e = q(e, o, i, t, n[u + 15], 22, 1236535329)),
                (t = A(t, e, o, i, n[u + 1], 5, -165796510)),
                (i = A(i, t, e, o, n[u + 6], 9, -1069501632)),
                (o = A(o, i, t, e, n[u + 11], 14, 643717713)),
                (e = A(e, o, i, t, n[u + 0], 20, -373897302)),
                (t = A(t, e, o, i, n[u + 5], 5, -701558691)),
                (i = A(i, t, e, o, n[u + 10], 9, 38016083)),
                (o = A(o, i, t, e, n[u + 15], 14, -660478335)),
                (e = A(e, o, i, t, n[u + 4], 20, -405537848)),
                (t = A(t, e, o, i, n[u + 9], 5, 568446438)),
                (i = A(i, t, e, o, n[u + 14], 9, -1019803690)),
                (o = A(o, i, t, e, n[u + 3], 14, -187363961)),
                (e = A(e, o, i, t, n[u + 8], 20, 1163531501)),
                (t = A(t, e, o, i, n[u + 13], 5, -1444681467)),
                (i = A(i, t, e, o, n[u + 2], 9, -51403784)),
                (o = A(o, i, t, e, n[u + 7], 14, 1735328473)),
                (e = A(e, o, i, t, n[u + 12], 20, -1926607734)),
                (t = L(t, e, o, i, n[u + 5], 4, -378558)),
                (i = L(i, t, e, o, n[u + 8], 11, -2022574463)),
                (o = L(o, i, t, e, n[u + 11], 16, 1839030562)),
                (e = L(e, o, i, t, n[u + 14], 23, -35309556)),
                (t = L(t, e, o, i, n[u + 1], 4, -1530992060)),
                (i = L(i, t, e, o, n[u + 4], 11, 1272893353)),
                (o = L(o, i, t, e, n[u + 7], 16, -155497632)),
                (e = L(e, o, i, t, n[u + 10], 23, -1094730640)),
                (t = L(t, e, o, i, n[u + 13], 4, 681279174)),
                (i = L(i, t, e, o, n[u + 0], 11, -358537222)),
                (o = L(o, i, t, e, n[u + 3], 16, -722521979)),
                (e = L(e, o, i, t, n[u + 6], 23, 76029189)),
                (t = L(t, e, o, i, n[u + 9], 4, -640364487)),
                (i = L(i, t, e, o, n[u + 12], 11, -421815835)),
                (o = L(o, i, t, e, n[u + 15], 16, 530742520)),
                (e = L(e, o, i, t, n[u + 2], 23, -995338651)),
                (t = H(t, e, o, i, n[u + 0], 6, -198630844)),
                (i = H(i, t, e, o, n[u + 7], 10, 1126891415)),
                (o = H(o, i, t, e, n[u + 14], 15, -1416354905)),
                (e = H(e, o, i, t, n[u + 5], 21, -57434055)),
                (t = H(t, e, o, i, n[u + 12], 6, 1700485571)),
                (i = H(i, t, e, o, n[u + 3], 10, -1894986606)),
                (o = H(o, i, t, e, n[u + 10], 15, -1051523)),
                (e = H(e, o, i, t, n[u + 1], 21, -2054922799)),
                (t = H(t, e, o, i, n[u + 8], 6, 1873313359)),
                (i = H(i, t, e, o, n[u + 15], 10, -30611744)),
                (o = H(o, i, t, e, n[u + 6], 15, -1560198380)),
                (e = H(e, o, i, t, n[u + 13], 21, 1309151649)),
                (t = H(t, e, o, i, n[u + 4], 6, -145523070)),
                (i = H(i, t, e, o, n[u + 11], 10, -1120210379)),
                (o = H(o, i, t, e, n[u + 2], 15, 718787259)),
                (e = H(e, o, i, t, n[u + 9], 21, -343485551)),
                (t = k(t, r)),
                (e = k(e, a)),
                (o = k(o, c)),
                (i = k(i, f));
        }

        return [t, e, o, i];
    }

    function O(n) {
        for (var t = '0123456789abcdef', e = '', o = 0; o < 4 * n.length; o++) e += t.charAt(15 & (n[o >> 2] >> ((o % 4) * 8 + 4))) + t.charAt(15 & (n[o >> 2] >> ((o % 4) * 8)));

        return e;
    }

    function T(n) {
        for (var t = 1 + ((n.length + 8) >> 6), e = Array(16 * t), o = 0; o < 16 * t; o++) e[o] = 0;

        for (var o = 0; o < n.length; o++) e[o >> 2] |= (255 & n.charCodeAt(o)) << ((o % 4) * 8);

        return (e[o >> 2] |= 128 << ((o % 4) * 8)), (e[16 * t - 2] = 8 * n.length), e;
    }

    function C(n) {
        return O(j(T(n)));
    }

    var K = require('./push_conf');

    v('SDK引入成功'), (K.app_key && 32 === K.app_key.length) || v('app_key配置有误');

    var N = '4.2.0',
        R = 0,
        U = K.app_key,
        V = __wxConfig.accountInfo.icon,
        W = escape(__wxConfig.accountInfo.nickname),
        z = __wxConfig.accountInfo.appId,
        B = !1,
        E = !1,
        F = (function () {
            var n = '';

            try {
                n = uni.getStorageSync('ald_push_uuid');
            } catch (t) {
                n = 'ald_push_uuid';
            }

            if (n) B = !1;
            else {
                n = m();

                try {
                    uni.setStorageSync('ald_push_uuid', n), (B = !0);
                } catch (n) {
                    uni.setStorageSync('ald_push_uuid', 'ald_push_uuid');
                }
            }
            return n;
        })(),
        G = x(),
        J = {},
        Q = {},
        X = '',
        Y = '',
        Z = {},
        $ = '',
        nn = [];

    try {
        var tn = uni.getSystemInfoSync();
        (J.wv = tn.version),
            (J.pb = tn.brand),
            (J.pm = tn.model),
            (J.pr = tn.pixelRatio),
            (J.ww = tn.screenWidth),
            (J.wh = tn.screenHeight),
            (J.lang = tn.language),
            (J.sv = tn.system),
            (J.pv = tn.platform),
            (J.sdv = tn.SDKVersion);
    } catch (n) {}

    o();
    var en = ['aldPushSendOpenid', 'aldPushSubscribeMessage'],
        on = {
            aldPushSendOpenid: function (n) {
                if ('' === n || !n || 28 !== n.length) return v('openId不合法');

                if ((v('openId上报成功'), uni.getStorageSync('ald_push_openid') || 28 === n.length)) {
                    try {
                        uni.setStorageSync('ald_push_openid', n);
                    } catch (t) {
                        uni.setStorageSync('ald_push_openid', n);
                    }

                    for (var t = 0; t < nn.length; t++) nn[t]();

                    nn = [];
                }
            },
            aldPushSubscribeMessage: function (n) {
                function t() {
                    var t = p('page', 'methonds', n.eventId);
                    t.ti = n.eventId;
                    var e = h();
                    (e['content-type'] = 'application/json'),
                        uni.request({
                            url: b() + 'psi/v1/trigger/clk',
                            data: t,
                            header: e,
                            method: 'POST',

                            success(t) {
                                0 === t.data.code
                                    ? t.data.data.tlis.length
                                        ? i(t.data.data.tlis, n)
                                        : ((E = !1), v('获取的模版ID为空'), w(n.fail) && n.fail('获取的模版ID为空'))
                                    : ((E = !1), v('模版ID获取失败'), w(n.fail) && n.fail('模版ID获取失败', t.data.code));
                            },

                            fail(t) {
                                (E = !1), v('获取模版ID请求失败'), w(n.fail) && n.fail('获取模版ID请求失败', t);
                            }
                        });
                }

                if (!E) {
                    if (((E = !0), !S())) return (E = !1), v('基础库版本不支持订阅消息'), void (w(n.fail) && n.fail('基础库版本不支持订阅消息'));
                    x() ? t() : nn.push(t);
                }
            }
        };
    if (
        ((function () {
            for (var n = 0; n < en.length; n++) _(en[n], on[en[n]]);
        })(),
        K.plugin)
    )
        return {
            App: l,
            Page: d
        };
    !(function () {
        !(function () {
            var n = App,
                t = Page;
            (App = function (t) {
                P(t, 'onShow', u), P(t, 'onHide', r), n(t);
            }),
                (Page = function (n) {
                    P(n, 'onLoad', a), P(n, 'onShow', c), t(n);
                });
        })();
    })();
});
