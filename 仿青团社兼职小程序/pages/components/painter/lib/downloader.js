function e(e, n) {
    if (!(e instanceof n)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

function n(e) {
    if (d.isDataUrl(e)) {
        var n = /data:image\/(\w+);base64,(.*)/.exec(e) || [];
        var t = s(n, 3);
        var i = t[1];
        var r = t[2];
        return y.hex_sha1(r) + '.' + i;
    }

    return e;
}

function t(e, n) {
    return new Promise(function (t, i) {
        var o = /data:image\/(\w+);base64,(.*)/.exec(e) || [];
        var f = s(o, 3);
        var l = f[1];
        var u = f[2];
        if (!l) {
            console.error('base parse failed');
            return void i();
        }

        var c = y.hex_sha1(u) + '.' + l;
        var d = uni.env.USER_DATA_PATH + '/' + c;
        var v = uni.base64ToArrayBuffer(u.replace(/[\r\n]/g, ''));
        uni.getFileSystemManager().writeFile({
            filePath: d,
            data: v,
            encoding: 'binary',
            success: function () {
                uni.getFileInfo({
                    filePath: d,
                    success: function (e) {
                        var i = e.size;

                        if (n) {
                            a(i).then(
                                function () {
                                    r(c, i, d, true).then(function (e) {
                                        t(e);
                                    });
                                },
                                function () {
                                    t(d);
                                }
                            );
                        } else {
                            t(d);
                        }
                    },
                    fail: function (e) {
                        console.error('getFileInfo ' + d + ' failed, ' + JSON.stringify(e));
                        t(d);
                    }
                });
            },
            fail: function (e) {
                console.log(e);
            }
        });
    });
}

function i(e, n) {
    return new Promise(function (t, i) {
        uni.downloadFile({
            url: e,
            success: function (o) {
                if (200 !== o.statusCode) {
                    console.error('downloadFile ' + e + ' failed res.statusCode is not 200');
                    return void i();
                }

                var f = o.tempFilePath;
                uni.getFileInfo({
                    filePath: f,
                    success: function (i) {
                        var o = i.size;

                        if (n) {
                            a(o).then(
                                function () {
                                    r(e, o, f).then(function (e) {
                                        t(e);
                                    });
                                },
                                function () {
                                    t(f);
                                }
                            );
                        } else {
                            t(f);
                        }
                    },
                    fail: function (e) {
                        console.error('getFileInfo ' + o.tempFilePath + ' failed, ' + JSON.stringify(e));
                        t(o.tempFilePath);
                    }
                });
            },
            fail: function (e) {
                console.error('downloadFile failed, ' + JSON.stringify(e) + ' ');
                i();
            }
        });
    });
}

function r(e, n, t) {
    var i = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
    return new Promise(function (r, a) {
        if (i) {
            var f = b[h] ? b[h] : 0;
            b[e] = {};
            b[e][g] = t;
            b[e][w] = new Date().getTime();
            b[e][S] = n;
            b.totalSize = n + f;
            uni.setStorage({
                key: v,
                data: b
            });
            return void r(t);
        }

        uni.saveFile({
            tempFilePath: t,
            success: function (t) {
                var i = b[h] ? b[h] : 0;
                b[e] = {};
                b[e][g] = t.savedFilePath;
                b[e][w] = new Date().getTime();
                b[e][S] = n;
                b.totalSize = n + i;
                uni.setStorage({
                    key: v,
                    data: b
                });
                r(t.savedFilePath);
            },
            fail: function (n) {
                console.error('saveFile ' + e + ' failed, then we delete all files, ' + JSON.stringify(n));
                r(t);
                o();
            }
        });
    });
}

function o() {
    uni.removeStorage({
        key: v,
        success: function () {
            uni.getSavedFileList({
                success: function (e) {
                    f(e.fileList);
                },
                fail: function (e) {
                    console.error('getSavedFileList failed, ' + JSON.stringify(e));
                }
            });
        }
    });
}

function a(e) {
    return e > m
        ? Promise.reject()
        : new Promise(function (n, t) {
              var i = b[h] ? b[h] : 0;

              if (e + i <= m) {
                  n();
              } else {
                  var r = [];
                  var o = JSON.parse(JSON.stringify(b));
                  delete o[h];
                  var a = Object.keys(o).sort(function (e, n) {
                      return o[e][w] - o[n][w];
                  });
                  var l = true;
                  var u = false;
                  var s = void 0;
                  try {
                      for (var c, d = a[Symbol.iterator](); !(l = (c = d.next()).done); l = true) {
                          var y = c.value;
                          i -= b[y].size;
                          r.push(b[y][g]);
                          delete b[y];

                          if (i + e < m) {
                              break;
                          }
                      }
                  } catch (e) {
                      u = true;
                      s = e;
                  } finally {
                      try {
                          if (!l && d.return) {
                              d.return();
                          }
                      } finally {
                          if (u) {
                              throw s;
                          }
                      }
                  }

                  b.totalSize = i;
                  uni.setStorage({
                      key: v,
                      data: b,
                      success: function () {
                          if (r.length > 0) {
                              f(r);
                          }

                          n();
                      },
                      fail: function (e) {
                          console.error('doLru setStorage failed, ' + JSON.stringify(e));
                          t();
                      }
                  });
              }
          });
}

function f(e) {
    var n = true;
    var t = false;
    var i = void 0;
    try {
        for (var r, o = e[Symbol.iterator](); !(n = (r = o.next()).done); n = true) {
            !(function () {
                var e = r.value;
                var n = e;
                if ('object' === (void 0 === e ? 'undefined' : u(e))) {
                    n = e.filePath;
                }

                if (-1 !== n.indexOf('//usr/')) {
                    uni.getFileSystemManager().unlink({
                        filePath: n,
                        fail: function (n) {
                            console.error('removeSavedFile ' + e + ' failed, ' + JSON.stringify(n));
                        }
                    });
                } else {
                    uni.removeSavedFile({
                        filePath: n,
                        fail: function (n) {
                            console.error('removeSavedFile ' + e + ' failed, ' + JSON.stringify(n));
                        }
                    });
                }
            })();
        }
    } catch (e) {
        t = true;
        i = e;
    } finally {
        try {
            if (!n && o.return) {
                o.return();
            }
        } finally {
            if (t) {
                throw i;
            }
        }
    }
}

function l(e) {
    if (b[e]) {
        b[e].time = new Date().getTime();
        uni.setStorage({
            key: v,
            data: b
        });
        return b[e];
    }
}

Object.defineProperty(exports, '__esModule', {
    value: true
});
var u =
    'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (e) {
              return typeof e;
          }
        : function (e) {
              return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
          };

var s = (function () {
    function e(e, n) {
        var t = [];
        var i = true;
        var r = false;
        var o = void 0;
        try {
            for (var a, f = e[Symbol.iterator](); !(i = (a = f.next()).done) && (t.push(a.value), !n || t.length !== n); i = true) {}
        } catch (e) {
            r = true;
            o = e;
        } finally {
            try {
                if (!i && f.return) {
                    f.return();
                }
            } finally {
                if (r) {
                    throw o;
                }
            }
        }

        return t;
    }

    return function (n, t) {
        if (Array.isArray(n)) {
            return n;
        }

        if (Symbol.iterator in Object(n)) {
            return e(n, t);
        }

        throw new TypeError('Invalid attempt to destructure non-iterable instance');
    };
})();

var c = (function () {
    function e(e, n) {
        for (var t = 0; t < n.length; t++) {
            var i = n[t];
            i.enumerable = i.enumerable || false;
            i.configurable = true;

            if ('value' in i) {
                i.writable = true;
            }

            Object.defineProperty(e, i.key, i);
        }
    }

    return function (n, t, i) {
        if (t) {
            e(n.prototype, t);
        }

        if (i) {
            e(n, i);
        }

        return n;
    };
})();

var d = require('./util');

var y = require('./sha1');

var v = 'savedFiles';
var h = 'totalSize';
var g = 'path';
var w = 'time';
var S = 'size';
var m = 6291456;
var b = {};

var p = (function () {
    function r() {
        e(this, r);

        if (getApp().globalData.PAINTER_MAX_LRU_SPACE) {
            m = getApp().globalData.PAINTER_MAX_LRU_SPACE;
        }

        uni.getStorage({
            key: v,
            success: function (e) {
                if (e.data) {
                    b = e.data;
                }
            }
        });
    }

    c(r, [
        {
            key: 'download',
            value: function (e, r) {
                return new Promise(function (o, a) {
                    if (e && d.isValidUrl(e)) {
                        var f = n(e);

                        if (r) {
                            var u = l(f);

                            if (u) {
                                if (-1 !== u[g].indexOf('//usr/')) {
                                    uni.getFileInfo({
                                        filePath: u[g],
                                        success: function () {
                                            o(u[g]);
                                        },
                                        fail: function (n) {
                                            console.error('base64 file broken, ' + JSON.stringify(n));
                                            t(e, r).then(
                                                function (e) {
                                                    o(e);
                                                },
                                                function () {
                                                    a();
                                                }
                                            );
                                        }
                                    });
                                } else {
                                    uni.getSavedFileInfo({
                                        filePath: u[g],
                                        success: function (e) {
                                            o(u[g]);
                                        },
                                        fail: function (n) {
                                            console.error('the file is broken, redownload it, ' + JSON.stringify(n));
                                            i(e, r).then(
                                                function (e) {
                                                    o(e);
                                                },
                                                function () {
                                                    a();
                                                }
                                            );
                                        }
                                    });
                                }
                            } else {
                                if (d.isOnlineUrl(e)) {
                                    i(e, r).then(
                                        function (e) {
                                            o(e);
                                        },
                                        function () {
                                            a();
                                        }
                                    );
                                } else {
                                    if (d.isDataUrl(e)) {
                                        t(e, r).then(
                                            function (e) {
                                                o(e);
                                            },
                                            function () {
                                                a();
                                            }
                                        );
                                    }
                                }
                            }
                        } else {
                            uni.getFileInfo({
                                filePath: f,
                                success: function () {
                                    o(e);
                                },
                                fail: function () {
                                    if (d.isOnlineUrl(e)) {
                                        i(e, r).then(
                                            function (e) {
                                                o(e);
                                            },
                                            function () {
                                                a();
                                            }
                                        );
                                    } else {
                                        if (d.isDataUrl(e)) {
                                            t(e, r).then(
                                                function (e) {
                                                    o(e);
                                                },
                                                function () {
                                                    a();
                                                }
                                            );
                                        }
                                    }
                                }
                            });
                        }
                    } else {
                        o(e);
                    }
                });
            }
        }
    ]);
    return r;
})();

exports.default = p;
