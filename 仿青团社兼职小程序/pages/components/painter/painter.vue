<template>
    <view :style="'position: relative;' + customStyle + painterStyle">
        <canvas canvasId="photo" :style="photoStyle + ';'"></canvas>
        <canvas canvasId="bottom" :style="painterStyle + ';position: absolute;'"></canvas>
        <canvas canvasId="k-canvas" :style="painterStyle + ';position: absolute;'"></canvas>
        <canvas canvasId="top" :style="painterStyle + ';position: absolute;'"></canvas>
        <canvas
            @touchcancel="onTouchCancel"
            @touchend="onTouchEnd"
            @touchmove="onTouchMove"
            @touchstart="onTouchStart"
            canvasId="front"
            :disableScroll="true"
            :style="painterStyle + ';position: absolute;'"
        ></canvas>
    </view>
</template>

<script>
function t(t) {
    return t && t.__esModule
        ? t
        : {
              default: t
          };
}

function e(t) {
    if (Array.isArray(t)) {
        for (var e = 0, i = Array(t.length); e < t.length; e++) {
            i[e] = t[e];
        }

        return i;
    }

    return Array.from(t);
}

function i(t, e) {
    String.prototype.toPx = function (i, s) {
        if ('0' === this) {
            return 0;
        }

        var n = void 0;
        var r = (i ? (n = /^-?[0-9]+([.]{1}[0-9]+){0,1}(rpx|px|%)$/g) : (n = /^[0-9]+([.]{1}[0-9]+){0,1}(rpx|px|%)$/g)).exec(this);
        if (!this || !r) {
            console.error('The size: ' + this + ' is illegal');
            return 0;
        }

        var o = r[2];
        var h = parseFloat(this);
        var a = 0;
        if ('rpx' === o) {
            a = Math.round(h * (t || 0.5) * (e || 1));
        } else {
            if ('px' === o) {
                a = Math.round(h * (e || 1));
            } else {
                if ('%' === o) {
                    a = Math.round((h * s) / 100);
                }
            }
        }

        return a;
    };
}

var s = t(require('./lib/pen'));
var n = t(require('./lib/downloader'));

var r = require('./lib/util');

var o = new n.default();
export default {
    data() {
        return {
            picURL: '',
            showCanvas: true,
            painterStyle: '',
            photoStyle: ''
        };
    },
    canvasWidthInPx: 0,
    canvasHeightInPx: 0,
    paintCount: 0,
    currentPalette: {},
    movingCache: {},
    outterDisabled: false,
    isDisabled: false,
    needClear: false,
    props: {
        customStyle: {
            type: String
        },
        customActionStyle: {
            type: Object
        },
        palette: {
            type: Object
        },
        dancePalette: {
            type: Object
        },
        scaleRatio: {
            type: Number,
            default: 1
        },
        widthPixels: {
            type: Number,
            default: 0
        },
        dirty: {
            type: Boolean,
            default: false
        },
        LRU: {
            type: Boolean,
            default: true
        },
        action: {
            type: Object
        },
        disableAction: {
            type: Boolean
        },
        clearActionBox: {
            type: Boolean
        }
    },
    methods: {
        isEmpty: function (t) {
            for (var e in t) {
                return false;
            }

            return true;
        },
        isNeedRefresh: function (t, e) {
            return !(!t || this.isEmpty(t) || (this.dirty && r.equal(t, e)));
        },
        getBox: function (t, e) {
            var i = {
                type: 'rect',
                css: {
                    height: t.bottom - t.top + 'px',
                    width: t.right - t.left + 'px',
                    left: t.left + 'px',
                    top: t.top + 'px',
                    borderWidth: '4rpx',
                    borderColor: '#1A7AF8',
                    color: 'transparent'
                }
            };

            if ('text' === e) {
                i.css = Object.assign({}, i.css, {
                    borderStyle: 'dashed'
                });
            }

            if (this.customActionStyle && this.customActionStyle.border) {
                i.css = Object.assign({}, i.css, this.customActionStyle.border);
            }

            Object.assign(i, {
                id: 'box'
            });
            return i;
        },
        getScaleIcon: function (t, e) {
            var i = {};
            var s = this.customActionStyle;
            return {};
        },
        getDeleteIcon: function (t) {
            var e = {};
            var i = this.customActionStyle;
            return {};
        },
        doAction: function (t, i, s, n) {
            var that = this;
            var h = null;
            if (t) {
                h = t.view;
            }

            if (h && h.id && this.touchedView.id !== h.id) {
                for (var a = this.currentPalette.views, c = 0; c < a.length; c++) {
                    if (a[c].id === h.id) {
                        this.touchedView = a[c];
                        this.findedIndex = c;
                        this.sliceLayers();
                        break;
                    }
                }
            }

            var d = this.touchedView;

            if (d && !this.isEmpty(d)) {
                if (h && h.css) {
                    if (n) {
                        d.css = h.css;
                    } else {
                        if (Array.isArray(d.css) && Array.isArray(h.css)) {
                            d.css = Object.assign.apply(Object, [{}].concat(e(d.css), e(h.css)));
                        } else {
                            if (Array.isArray(d.css)) {
                                d.css = Object.assign.apply(Object, [{}].concat(e(d.css), [h.css]));
                            } else {
                                if (Array.isArray(h.css)) {
                                    d.css = Object.assign.apply(Object, [{}, d.css].concat(e(h.css)));
                                } else {
                                    d.css = Object.assign({}, d.css, h.css);
                                }
                            }
                        }
                    }
                }

                if (h && h.rect) {
                    d.rect = h.rect;
                }

                if (h && h.url && d.url && h.url !== d.url) {
                    o.download(h.url, this.LRU)
                        .then(function (t) {
                            if (h.url.startsWith('https')) {
                                d.originUrl = h.url;
                            }

                            d.url = t;
                            uni.getImageInfo({
                                src: t,
                                success: function (t) {
                                    d.sHeight = t.height;
                                    d.sWidth = t.width;
                                    that.reDraw(d, i, s);
                                },
                                fail: function () {
                                    that.reDraw(d, i, s);
                                }
                            });
                        })
                        .catch(function (t) {
                            console.error(t);
                            that.reDraw(d, i, s);
                        });
                } else {
                    if (h && h.text && d.text && h.text !== d.text) {
                        d.text = h.text;
                    }

                    if (h && h.content && d.content && h.content !== d.content) {
                        d.content = h.content;
                    }

                    this.reDraw(d, i, s);
                }
            }
        },
        reDraw: function (t, e, i) {
            var that = this;
            var r = {
                width: this.currentPalette.width,
                height: this.currentPalette.height,
                views: this.isEmpty(t) ? [] : [t]
            };
            var o = new s.default(this.globalContext, r);
            if (i && 'text' === t.type) {
                o.paint(
                    function (t) {
                        if (e) {
                            e(t);
                        }

                        that.$emit('viewUpdate', {
                            detail: {
                                view: that.touchedView
                            }
                        });
                    },
                    true,
                    this.movingCache
                );
            } else {
                i || this.isScale || o.paint();
                o.paint(function (t) {
                    if (e) {
                        e(t);
                    }

                    that.$emit('viewUpdate', {
                        detail: {
                            view: that.touchedView
                        }
                    });
                });
            }

            var h = t.rect;
            var a = t.css;
            var c = t.type;
            this.block = {
                width: this.currentPalette.width,
                height: this.currentPalette.height,
                views: this.isEmpty(t) ? [] : [this.getBox(h, t.type)]
            };

            if (a && a.scalable) {
                this.block.views.push(this.getScaleIcon(h, c));
            }

            if (a && a.deletable) {
                this.block.views.push(this.getDeleteIcon(h));
            }

            new s.default(this.frontContext, this.block).paint();
        },
        isInView: function (t, e, i) {
            return t > i.left && e > i.top && t < i.right && e < i.bottom;
        },
        isInDelete: function (t, e) {
            var i = true;
            var s = false;
            var n = void 0;
            try {
                for (var r, o = this.block.views[Symbol.iterator](); !(i = (r = o.next()).done); i = true) {
                    var h = r.value;

                    if ('delete' === h.id) {
                        return t > h.rect.left && e > h.rect.top && t < h.rect.right && e < h.rect.bottom;
                    }
                }
            } catch (t) {
                s = true;
                n = t;
            } finally {
                try {
                    if (!i && o.return) {
                        o.return();
                    }
                } finally {
                    if (s) {
                        throw n;
                    }
                }
            }

            return false;
        },
        isInScale: function (t, e) {
            var i = true;
            var s = false;
            var n = void 0;
            try {
                for (var r, o = this.block.views[Symbol.iterator](); !(i = (r = o.next()).done); i = true) {
                    var h = r.value;

                    if ('scale' === h.id) {
                        return t > h.rect.left && e > h.rect.top && t < h.rect.right && e < h.rect.bottom;
                    }
                }
            } catch (t) {
                s = true;
                n = t;
            } finally {
                try {
                    if (!i && o.return) {
                        o.return();
                    }
                } finally {
                    if (s) {
                        throw n;
                    }
                }
            }

            return false;
        },
        touchedView: {},
        findedIndex: -1,
        onClick: function () {
            for (var t = this.startX, e = this.startY, i = [], s = false, n = -1, r = this.currentPalette.views.length - 1; r >= 0; r--) {
                var o = this.currentPalette.views[r];
                var h = o.rect;
                if (this.touchedView && this.touchedView.id && this.touchedView.id === o.id && this.isInDelete(t, e, h)) {
                    i.length = 0;
                    n = r;
                    s = true;
                    break;
                }

                if (this.isInView(t, e, h)) {
                    i.push({
                        view: o,
                        index: r
                    });
                }
            }

            this.touchedView = {};

            if (0 === i.length) {
                this.findedIndex = -1;
            } else {
                var a = 0;
                var c = i.filter(function (t) {
                    return Boolean(t.view.id);
                });
                if (0 === c.length) {
                    this.findedIndex = i[0].index;
                } else {
                    for (a = 0; a < c.length; a++) {
                        if (this.findedIndex === c[a].index) {
                            a++;
                            break;
                        }
                    }

                    if (a === c.length) {
                        a = 0;
                    }

                    this.touchedView = c[a].view;
                    this.findedIndex = c[a].index;
                    this.$emit('viewClicked', {
                        detail: {
                            view: this.touchedView
                        }
                    });
                }
            }

            if (this.findedIndex < 0 || (this.touchedView && !this.touchedView.id)) {
                this.frontContext.draw();

                if (s) {
                    this.$emit('touchEnd', {
                        detail: {
                            view: this.currentPalette.views[n],
                            index: n,
                            type: 'delete'
                        }
                    }),
                        this.doAction();
                } else {
                    this.findedIndex < 0 &&
                        this.$emit('viewClicked', {
                            detail: {}
                        });
                }

                this.findedIndex = -1;
                this.prevFindedIndex = -1;
            } else {
                if (this.touchedView && this.touchedView.id) {
                    this.sliceLayers();
                }
            }
        },
        sliceLayers: function () {
            var that = this;
            var e = this.currentPalette.views.slice(0, this.findedIndex);
            var i = this.currentPalette.views.slice(this.findedIndex + 1);
            var n = {
                width: this.currentPalette.width,
                height: this.currentPalette.height,
                background: this.currentPalette.background,
                views: e
            };
            var r = {
                width: this.currentPalette.width,
                height: this.currentPalette.height,
                views: i
            };
            if (this.prevFindedIndex < this.findedIndex) {
                new s.default(this.bottomContext, n).paint();
                this.doAction(null, function (e) {
                    that.movingCache = e;
                });
                new s.default(this.topContext, r).paint();
            } else {
                new s.default(this.topContext, r).paint();
                this.doAction(null, function (e) {
                    that.movingCache = e;
                });
                new s.default(this.bottomContext, n).paint();
            }

            this.prevFindedIndex = this.findedIndex;
        },
        startX: 0,
        startY: 0,
        startH: 0,
        startW: 0,
        isScale: false,
        startTimeStamp: 0,
        onTouchStart: function (t) {
            if (!this.isDisabled) {
                var e = t.touches[0];
                var i = e.x;
                var s = e.y;
                this.startX = i;
                this.startY = s;
                this.startTimeStamp = new Date().getTime();

                if (this.touchedView && !this.isEmpty(this.touchedView)) {
                    var n = this.touchedView.rect;

                    if (this.isInScale(i, s, n)) {
                        this.isScale = true;
                        this.movingCache = {};
                        this.startH = n.bottom - n.top;
                        this.startW = n.right - n.left;
                    } else {
                        this.isScale = false;
                    }
                } else {
                    this.isScale = false;
                }
            }
        },
        onTouchEnd: function (t) {
            this.isDisabled ||
                (new Date().getTime() - this.startTimeStamp <= 500 && !this.hasMove
                    ? !this.isScale && this.onClick(t)
                    : this.touchedView &&
                      !this.isEmpty(this.touchedView) &&
                      this.$emit('touchEnd', {
                          detail: {
                              view: this.touchedView
                          }
                      }),
                (this.hasMove = false));
        },
        onTouchCancel: function (t) {
            this.isDisabled || this.onTouchEnd(t);
        },
        hasMove: false,
        onTouchMove: function (t) {
            var that = this;

            if (!this.isDisabled && ((this.hasMove = true), this.touchedView && (!this.touchedView || this.touchedView.id))) {
                var i = t.touches[0];
                var s = i.x;
                var n = i.y;
                var r = s - this.startX;
                var o = n - this.startY;
                var h = this.touchedView;
                var a = h.rect;
                var c = h.type;
                var d = {};
                if (this.isScale) {
                    var l = this.startW + r > 1 ? this.startW + r : 1;

                    if (this.touchedView.css && this.touchedView.css.minWidth && l < this.touchedView.css.minWidth.toPx()) {
                        return;
                    }

                    if (this.touchedView.rect && this.touchedView.rect.minWidth && l < this.touchedView.rect.minWidth) {
                        return;
                    }

                    var u = this.startH + o > 1 ? this.startH + o : 1;
                    d = {
                        width: l + 'px'
                    };

                    if ('text' !== c) {
                        if ('image' === c) {
                            d.height = (l * this.startH) / this.startW + 'px';
                        } else {
                            d.height = u + 'px';
                        }
                    }
                } else {
                    this.startX = s;
                    this.startY = n;
                    d = {
                        left: a.x + r + 'px',
                        top: a.y + o + 'px',
                        right: void 0,
                        bottom: void 0
                    };
                }

                this.doAction(
                    {
                        view: {
                            css: d
                        }
                    },
                    function (t) {
                        if (that.isScale) {
                            that.movingCache = t;
                        }
                    },
                    !this.isScale
                );
            }
        },
        initScreenK: function () {
            if (!(getApp() && getApp().globalData.systemInfo && getApp().globalData.systemInfo.screenWidth)) {
                try {
                    getApp().globalData.systemInfo = uni.getSystemInfoSync();
                } catch (t) {
                    return void console.error('Painter get system info failed, ' + JSON.stringify(t));
                }
            }

            this.screenK = 0.5;

            if (getApp() && getApp().globalData.systemInfo && getApp().globalData.systemInfo.screenWidth) {
                this.screenK = getApp().globalData.systemInfo.screenWidth / 750;
            }

            i(this.screenK, this.scaleRatio);
        },
        initDancePalette: function () {
            var that = this;
            this.isDisabled = true;
            this.initScreenK();
            this.downloadImages(this.dancePalette).then(function (e) {
                that.currentPalette = e;
                var i = e.width;
                var n = e.height;
                if (i && n) {
                    that.setData({
                        painterStyle: 'width:' + i.toPx() + 'px;height:' + n.toPx() + 'px;'
                    });
                    that.frontContext || (that.frontContext = uni.createCanvasContext('front', that));
                    that.bottomContext || (that.bottomContext = uni.createCanvasContext('bottom', that));
                    that.topContext || (that.topContext = uni.createCanvasContext('top', that));
                    that.globalContext || (that.globalContext = uni.createCanvasContext('k-canvas', that));
                    new s.default(that.bottomContext, e).paint(function () {
                        that.isDisabled = false;
                        that.isDisabled = that.outterDisabled;
                        that.$emit('didShow');
                    });
                    that.globalContext.draw();
                    that.frontContext.draw();
                    that.topContext.draw();
                } else {
                    console.error('You should set width and height correctly for painter, width: ' + i + ', height: ' + n);
                }
            });
            this.touchedView = {};
        },
        startPaint: function () {
            var that = this;
            this.initScreenK();
            this.downloadImages(this.palette).then(function (e) {
                var n = e.width;
                var r = e.height;
                if (n && r) {
                    that.canvasWidthInPx = n.toPx();

                    if (that.widthPixels) {
                        i(that.screenK, that.widthPixels / that.canvasWidthInPx);
                        that.canvasWidthInPx = that.widthPixels;
                    }

                    that.canvasHeightInPx = r.toPx();
                    that.setData({
                        photoStyle: 'width:' + that.canvasWidthInPx + 'px;height:' + that.canvasHeightInPx + 'px;'
                    });
                    that.photoContext || (that.photoContext = uni.createCanvasContext('photo', that));
                    new s.default(that.photoContext, e).paint(function () {
                        that.saveImgToLocal();
                    });
                    i(that.screenK, that.scaleRatio);
                } else {
                    console.error('You should set width and height correctly for painter, width: ' + n + ', height: ' + r);
                }
            });
        },
        downloadImages: function (t) {
            var that = this;
            return new Promise(function (i, s) {
                var n = 0;
                var r = 0;
                var h = JSON.parse(JSON.stringify(t));
                if (h.background) {
                    n++;
                    o.download(h.background, that.LRU).then(
                        function (t) {
                            h.background = t;

                            if (n === ++r) {
                                i(h);
                            }
                        },
                        function () {
                            if (n === ++r) {
                                i(h);
                            }
                        }
                    );
                }

                if (h.views) {
                    var a = true;
                    var c = false;
                    var d = void 0;
                    try {
                        for (var l, u = h.views[Symbol.iterator](); !(a = (l = u.next()).done); a = true) {
                            !(function () {
                                var t = l.value;

                                if (t && 'image' === t.type && t.url) {
                                    n++;
                                    o.download(t.url, that.LRU).then(
                                        function (e) {
                                            t.originUrl = t.url;
                                            t.url = e;
                                            uni.getImageInfo({
                                                src: e,
                                                success: function (e) {
                                                    t.sWidth = e.width;
                                                    t.sHeight = e.height;
                                                },
                                                fail: function (e) {
                                                    t.url = '';
                                                    console.error('getImageInfo ' + t.url + ' failed, ' + JSON.stringify(e));
                                                },
                                                complete: function () {
                                                    if (n === ++r) {
                                                        i(h);
                                                    }
                                                }
                                            });
                                        },
                                        function () {
                                            if (n === ++r) {
                                                i(h);
                                            }
                                        }
                                    );
                                }
                            })();
                        }
                    } catch (t) {
                        c = true;
                        d = t;
                    } finally {
                        try {
                            if (!a && u.return) {
                                u.return();
                            }
                        } finally {
                            if (c) {
                                throw d;
                            }
                        }
                    }
                }

                if (0 === n) {
                    i(h);
                }
            });
        },
        saveImgToLocal: function () {
            var that = this;
            var e = this;
            setTimeout(function () {
                uni.canvasToTempFilePath(
                    {
                        canvasId: 'photo',
                        destWidth: e.canvasWidthInPx,
                        destHeight: e.canvasHeightInPx,
                        success: function (t) {
                            e.getImageInfo(t.tempFilePath);
                        },
                        fail: function (t) {
                            console.error('canvasToTempFilePath failed, ' + JSON.stringify(t));
                            e.$emit('imgErr', {
                                detail: {
                                    error: t
                                }
                            });
                        }
                    },
                    that
                );
            }, 300);
        },
        getImageInfo: function (t) {
            var that = this;
            uni.getImageInfo({
                src: t,
                success: function (i) {
                    if (that.paintCount > 5) {
                        var s = 'The result is always fault, even we tried 5 times';
                        console.error(s);
                        return void that.$emit('imgErr', {
                            detail: {
                                error: s
                            }
                        });
                    }

                    if (Math.abs((i.width * that.canvasHeightInPx - that.canvasWidthInPx * i.height) / (i.height * that.canvasHeightInPx)) < 0.01) {
                        that.$emit('imgOK', {
                            detail: {
                                path: t
                            }
                        });
                    } else {
                        that.startPaint();
                    }

                    that.paintCount++;
                },
                fail: function (t) {
                    console.error('getImageInfo failed, ' + JSON.stringify(t));
                    that.$emit('imgErr', {
                        detail: {
                            error: t
                        }
                    });
                }
            });
        }
    },
    watch: {
        palette: {
            handler: function (t, e) {
                if (this.isNeedRefresh(t, e)) {
                    this.paintCount = 0;
                    this.startPaint();
                }
            },

            immediate: true,
            deep: true
        },

        dancePalette: {
            handler: function (t, e) {
                this.isEmpty(t) || this.initDancePalette(t);
            },

            immediate: true,
            deep: true
        },

        action: {
            handler: function (t, e) {
                var that = this;

                if (t && !this.isEmpty(t)) {
                    this.doAction(
                        t,
                        function (t) {
                            that.movingCache = t;
                        },
                        false,
                        true
                    );
                }
            },

            immediate: true,
            deep: true
        },

        disableAction: {
            handler: function (t) {
                this.outterDisabled = t;
                this.isDisabled = t;
            },

            immediate: true
        },

        clearActionBox: {
            handler: function (t) {
                var that = this;

                if (t && !this.needClear && this.frontContext) {
                    setTimeout(function () {
                        that.frontContext.draw();
                    }, 100);
                    this.touchedView = {};
                    this.prevFindedIndex = this.findedIndex;
                    this.findedIndex = -1;
                }

                this.needClear = t;
            },

            immediate: true
        }
    }
};
</script>
<style>
@import './painter.css';
</style>
