(function () {
    const t = document.createElement('link').relList;
    if (t && t.supports && t.supports('modulepreload')) return;
    for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s);
    new MutationObserver(s => {
        for (const o of s)
            if (o.type === 'childList')
                for (const i of o.addedNodes)
                    i.tagName === 'LINK' && i.rel === 'modulepreload' && r(i);
    }).observe(document, { childList: !0, subtree: !0 });
    function n(s) {
        const o = {};
        return (
            s.integrity && (o.integrity = s.integrity),
            s.referrerPolicy && (o.referrerPolicy = s.referrerPolicy),
            s.crossOrigin === 'use-credentials'
                ? (o.credentials = 'include')
                : s.crossOrigin === 'anonymous'
                ? (o.credentials = 'omit')
                : (o.credentials = 'same-origin'),
            o
        );
    }
    function r(s) {
        if (s.ep) return;
        s.ep = !0;
        const o = n(s);
        fetch(s.href, o);
    }
})();
function Ze() {
    const e = document.querySelectorAll('.tabheader__item'),
        t = document.querySelectorAll('.tabcontent'),
        n = document.querySelector('.tabheader__items');
    function r() {
        t.forEach(o => {
            o.classList.add('hide'), o.classList.remove('show', 'fade');
        }),
            e.forEach(o => {
                o.classList.remove('tabheader__item_active');
            });
    }
    function s(o = 0) {
        t[o].classList.add('show', 'fade'),
            t[o].classList.remove('hide'),
            e[o].classList.add('tabheader__item_active');
    }
    r(),
        s(),
        n.addEventListener('click', o => {
            const i = o.target;
            i &&
                i.classList.contains('tabheader__item') &&
                e.forEach((c, d) => {
                    i == c && (r(), s(d));
                });
        });
}
function Qe() {
    const e = '2025-7-10 23:19:20';
    function t(s) {
        let o, i, c, d;
        const u = Date.parse(s) - Date.now();
        return (
            u > 0
                ? ((o = Math.floor(u / (1e3 * 60 * 60 * 24))),
                  (i = Math.floor((u / (1e3 * 60 * 60)) % 24)),
                  (c = Math.floor((u / 1e3 / 60) % 60)),
                  (d = Math.floor((u / 1e3) % 60)))
                : ((o = 0), (i = 0), (c = 0), (d = 0)),
            { total: u, days: o, hours: i, minutes: c, seconds: d }
        );
    }
    function n(s) {
        return s >= 0 && s < 10 ? `0${s}` : s;
    }
    function r(s, o) {
        const i = document.querySelector(s),
            c = i.querySelector('#days'),
            d = i.querySelector('#hours'),
            u = i.querySelector('#minutes'),
            l = i.querySelector('#seconds'),
            h = setInterval(p, 1e3);
        p();
        function p() {
            const g = t(o);
            (c.innerHTML = n(g.days)),
                (d.innerHTML = n(g.hours)),
                (u.innerHTML = n(g.minutes)),
                (l.innerHTML = n(g.seconds)),
                g.total <= 0 && clearInterval(h);
        }
    }
    r('.timer', e);
}
function Ye() {
    const e = document.querySelector('[data-modalMain]'),
        t = document.querySelectorAll('[data-modal]'),
        n = setTimeout(s, 1e11);
    function r() {
        e.classList.remove('show'), (document.body.style.overflowY = '');
    }
    function s() {
        e.classList.add('show'), (document.body.style.overflowY = 'hidden'), clearTimeout(n);
    }
    t.forEach(l => {
        l.addEventListener('click', h => {
            h.target && h.target.matches('[data-modal]') && s();
        });
    }),
        e.addEventListener('click', l => {
            ((l.target && l.target.matches('[data-modalMain]')) ||
                l.target.getAttribute('data-close') == '') &&
                r();
        }),
        document.addEventListener('keydown', l => {
            l.code === 'Escape' && e.classList.contains('show') && r();
        });
    const o = document.querySelectorAll('form'),
        i = {
            loading: '/src/img/form/spinner.svg',
            success: 'Thank you, we will contact you later',
            failure: 'Something went wrong',
        };
    o.forEach(l => {
        d(l);
    });
    const c = async (l, h) =>
        await (
            await fetch(l, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: h,
            })
        ).json();
    function d(l) {
        l.addEventListener('submit', h => {
            h.preventDefault();
            const p = document.createElement('img');
            (p.src = i.loading),
                (p.style.cssText = `
                    display: block;
                    margin: 0 auto;
                    `),
                l.insertAdjacentElement('afterend', p);
            const g = new FormData(l),
                f = JSON.stringify(Object.fromEntries(g.entries()));
            c('http://localhost:3000/requests', f)
                .then(m => {
                    console.log(m), u(i.success), p.remove();
                })
                .catch(() => u(i.failure))
                .finally(() => l.reset());
        });
    }
    function u(l) {
        const h = document.querySelector('.modal__dialog');
        h.classList.add('hide'), s();
        const p = document.createElement('div');
        p.classList.add('modal__dialog'),
            (p.innerHTML = `
                    <div class="modal__content">
                            <div data-close class="modal__close">&times;</div>
                            <div class="modal__title">${l}</div>
                    </div>
                `),
            document.querySelector('.modal').append(p),
            setTimeout(() => {
                p.remove(), h.classList.remove('hide'), r();
            }, 5e3);
    }
}
function Oe(e, t) {
    return function () {
        return e.apply(t, arguments);
    };
}
const { toString: et } = Object.prototype,
    { getPrototypeOf: le } = Object,
    { iterator: W, toStringTag: xe } = Symbol,
    K = (e => t => {
        const n = et.call(t);
        return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
    })(Object.create(null)),
    x = e => ((e = e.toLowerCase()), t => K(t) === e),
    X = e => t => typeof t === e,
    { isArray: U } = Array,
    B = X('undefined');
function tt(e) {
    return (
        e !== null &&
        !B(e) &&
        e.constructor !== null &&
        !B(e.constructor) &&
        A(e.constructor.isBuffer) &&
        e.constructor.isBuffer(e)
    );
}
const Ce = x('ArrayBuffer');
function nt(e) {
    let t;
    return (
        typeof ArrayBuffer < 'u' && ArrayBuffer.isView
            ? (t = ArrayBuffer.isView(e))
            : (t = e && e.buffer && Ce(e.buffer)),
        t
    );
}
const rt = X('string'),
    A = X('function'),
    Le = X('number'),
    G = e => e !== null && typeof e == 'object',
    st = e => e === !0 || e === !1,
    H = e => {
        if (K(e) !== 'object') return !1;
        const t = le(e);
        return (
            (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) &&
            !(xe in e) &&
            !(W in e)
        );
    },
    ot = x('Date'),
    it = x('File'),
    at = x('Blob'),
    ct = x('FileList'),
    lt = e => G(e) && A(e.pipe),
    ut = e => {
        let t;
        return (
            e &&
            ((typeof FormData == 'function' && e instanceof FormData) ||
                (A(e.append) &&
                    ((t = K(e)) === 'formdata' ||
                        (t === 'object' && A(e.toString) && e.toString() === '[object FormData]'))))
        );
    },
    dt = x('URLSearchParams'),
    [ft, ht, pt, mt] = ['ReadableStream', 'Request', 'Response', 'Headers'].map(x),
    yt = e => (e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ''));
function j(e, t, { allOwnKeys: n = !1 } = {}) {
    if (e === null || typeof e > 'u') return;
    let r, s;
    if ((typeof e != 'object' && (e = [e]), U(e)))
        for (r = 0, s = e.length; r < s; r++) t.call(null, e[r], r, e);
    else {
        const o = n ? Object.getOwnPropertyNames(e) : Object.keys(e),
            i = o.length;
        let c;
        for (r = 0; r < i; r++) (c = o[r]), t.call(null, e[c], c, e);
    }
}
function Ne(e, t) {
    t = t.toLowerCase();
    const n = Object.keys(e);
    let r = n.length,
        s;
    for (; r-- > 0; ) if (((s = n[r]), t === s.toLowerCase())) return s;
    return null;
}
const F =
        typeof globalThis < 'u'
            ? globalThis
            : typeof self < 'u'
            ? self
            : typeof window < 'u'
            ? window
            : global,
    Pe = e => !B(e) && e !== F;
function re() {
    const { caseless: e } = (Pe(this) && this) || {},
        t = {},
        n = (r, s) => {
            const o = (e && Ne(t, s)) || s;
            H(t[o]) && H(r)
                ? (t[o] = re(t[o], r))
                : H(r)
                ? (t[o] = re({}, r))
                : U(r)
                ? (t[o] = r.slice())
                : (t[o] = r);
        };
    for (let r = 0, s = arguments.length; r < s; r++) arguments[r] && j(arguments[r], n);
    return t;
}
const gt = (e, t, n, { allOwnKeys: r } = {}) => (
        j(
            t,
            (s, o) => {
                n && A(s) ? (e[o] = Oe(s, n)) : (e[o] = s);
            },
            { allOwnKeys: r }
        ),
        e
    ),
    bt = e => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
    wt = (e, t, n, r) => {
        (e.prototype = Object.create(t.prototype, r)),
            (e.prototype.constructor = e),
            Object.defineProperty(e, 'super', { value: t.prototype }),
            n && Object.assign(e.prototype, n);
    },
    Et = (e, t, n, r) => {
        let s, o, i;
        const c = {};
        if (((t = t || {}), e == null)) return t;
        do {
            for (s = Object.getOwnPropertyNames(e), o = s.length; o-- > 0; )
                (i = s[o]), (!r || r(i, e, t)) && !c[i] && ((t[i] = e[i]), (c[i] = !0));
            e = n !== !1 && le(e);
        } while (e && (!n || n(e, t)) && e !== Object.prototype);
        return t;
    },
    St = (e, t, n) => {
        (e = String(e)), (n === void 0 || n > e.length) && (n = e.length), (n -= t.length);
        const r = e.indexOf(t, n);
        return r !== -1 && r === n;
    },
    _t = e => {
        if (!e) return null;
        if (U(e)) return e;
        let t = e.length;
        if (!Le(t)) return null;
        const n = new Array(t);
        for (; t-- > 0; ) n[t] = e[t];
        return n;
    },
    Rt = (
        e => t =>
            e && t instanceof e
    )(typeof Uint8Array < 'u' && le(Uint8Array)),
    Tt = (e, t) => {
        const r = (e && e[W]).call(e);
        let s;
        for (; (s = r.next()) && !s.done; ) {
            const o = s.value;
            t.call(e, o[0], o[1]);
        }
    },
    At = (e, t) => {
        let n;
        const r = [];
        for (; (n = e.exec(t)) !== null; ) r.push(n);
        return r;
    },
    Ot = x('HTMLFormElement'),
    xt = e =>
        e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (n, r, s) {
            return r.toUpperCase() + s;
        }),
    he = (
        ({ hasOwnProperty: e }) =>
        (t, n) =>
            e.call(t, n)
    )(Object.prototype),
    Ct = x('RegExp'),
    Fe = (e, t) => {
        const n = Object.getOwnPropertyDescriptors(e),
            r = {};
        j(n, (s, o) => {
            let i;
            (i = t(s, o, e)) !== !1 && (r[o] = i || s);
        }),
            Object.defineProperties(e, r);
    },
    Lt = e => {
        Fe(e, (t, n) => {
            if (A(e) && ['arguments', 'caller', 'callee'].indexOf(n) !== -1) return !1;
            const r = e[n];
            if (A(r)) {
                if (((t.enumerable = !1), 'writable' in t)) {
                    t.writable = !1;
                    return;
                }
                t.set ||
                    (t.set = () => {
                        throw Error("Can not rewrite read-only method '" + n + "'");
                    });
            }
        });
    },
    Nt = (e, t) => {
        const n = {},
            r = s => {
                s.forEach(o => {
                    n[o] = !0;
                });
            };
        return U(e) ? r(e) : r(String(e).split(t)), n;
    },
    Pt = () => {},
    Ft = (e, t) => (e != null && Number.isFinite((e = +e)) ? e : t);
function vt(e) {
    return !!(e && A(e.append) && e[xe] === 'FormData' && e[W]);
}
const qt = e => {
        const t = new Array(10),
            n = (r, s) => {
                if (G(r)) {
                    if (t.indexOf(r) >= 0) return;
                    if (!('toJSON' in r)) {
                        t[s] = r;
                        const o = U(r) ? [] : {};
                        return (
                            j(r, (i, c) => {
                                const d = n(i, s + 1);
                                !B(d) && (o[c] = d);
                            }),
                            (t[s] = void 0),
                            o
                        );
                    }
                }
                return r;
            };
        return n(e, 0);
    },
    Ut = x('AsyncFunction'),
    kt = e => e && (G(e) || A(e)) && A(e.then) && A(e.catch),
    ve = ((e, t) =>
        e
            ? setImmediate
            : t
            ? ((n, r) => (
                  F.addEventListener(
                      'message',
                      ({ source: s, data: o }) => {
                          s === F && o === n && r.length && r.shift()();
                      },
                      !1
                  ),
                  s => {
                      r.push(s), F.postMessage(n, '*');
                  }
              ))(`axios@${Math.random()}`, [])
            : n => setTimeout(n))(typeof setImmediate == 'function', A(F.postMessage)),
    Dt =
        typeof queueMicrotask < 'u'
            ? queueMicrotask.bind(F)
            : (typeof process < 'u' && process.nextTick) || ve,
    Bt = e => e != null && A(e[W]),
    a = {
        isArray: U,
        isArrayBuffer: Ce,
        isBuffer: tt,
        isFormData: ut,
        isArrayBufferView: nt,
        isString: rt,
        isNumber: Le,
        isBoolean: st,
        isObject: G,
        isPlainObject: H,
        isReadableStream: ft,
        isRequest: ht,
        isResponse: pt,
        isHeaders: mt,
        isUndefined: B,
        isDate: ot,
        isFile: it,
        isBlob: at,
        isRegExp: Ct,
        isFunction: A,
        isStream: lt,
        isURLSearchParams: dt,
        isTypedArray: Rt,
        isFileList: ct,
        forEach: j,
        merge: re,
        extend: gt,
        trim: yt,
        stripBOM: bt,
        inherits: wt,
        toFlatObject: Et,
        kindOf: K,
        kindOfTest: x,
        endsWith: St,
        toArray: _t,
        forEachEntry: Tt,
        matchAll: At,
        isHTMLForm: Ot,
        hasOwnProperty: he,
        hasOwnProp: he,
        reduceDescriptors: Fe,
        freezeMethods: Lt,
        toObjectSet: Nt,
        toCamelCase: xt,
        noop: Pt,
        toFiniteNumber: Ft,
        findKey: Ne,
        global: F,
        isContextDefined: Pe,
        isSpecCompliantForm: vt,
        toJSONObject: qt,
        isAsyncFn: Ut,
        isThenable: kt,
        setImmediate: ve,
        asap: Dt,
        isIterable: Bt,
    };
function b(e, t, n, r, s) {
    Error.call(this),
        Error.captureStackTrace
            ? Error.captureStackTrace(this, this.constructor)
            : (this.stack = new Error().stack),
        (this.message = e),
        (this.name = 'AxiosError'),
        t && (this.code = t),
        n && (this.config = n),
        r && (this.request = r),
        s && ((this.response = s), (this.status = s.status ? s.status : null));
}
a.inherits(b, Error, {
    toJSON: function () {
        return {
            message: this.message,
            name: this.name,
            description: this.description,
            number: this.number,
            fileName: this.fileName,
            lineNumber: this.lineNumber,
            columnNumber: this.columnNumber,
            stack: this.stack,
            config: a.toJSONObject(this.config),
            code: this.code,
            status: this.status,
        };
    },
});
const qe = b.prototype,
    Ue = {};
[
    'ERR_BAD_OPTION_VALUE',
    'ERR_BAD_OPTION',
    'ECONNABORTED',
    'ETIMEDOUT',
    'ERR_NETWORK',
    'ERR_FR_TOO_MANY_REDIRECTS',
    'ERR_DEPRECATED',
    'ERR_BAD_RESPONSE',
    'ERR_BAD_REQUEST',
    'ERR_CANCELED',
    'ERR_NOT_SUPPORT',
    'ERR_INVALID_URL',
].forEach(e => {
    Ue[e] = { value: e };
});
Object.defineProperties(b, Ue);
Object.defineProperty(qe, 'isAxiosError', { value: !0 });
b.from = (e, t, n, r, s, o) => {
    const i = Object.create(qe);
    return (
        a.toFlatObject(
            e,
            i,
            function (d) {
                return d !== Error.prototype;
            },
            c => c !== 'isAxiosError'
        ),
        b.call(i, e.message, t, n, r, s),
        (i.cause = e),
        (i.name = e.name),
        o && Object.assign(i, o),
        i
    );
};
const jt = null;
function se(e) {
    return a.isPlainObject(e) || a.isArray(e);
}
function ke(e) {
    return a.endsWith(e, '[]') ? e.slice(0, -2) : e;
}
function pe(e, t, n) {
    return e
        ? e
              .concat(t)
              .map(function (s, o) {
                  return (s = ke(s)), !n && o ? '[' + s + ']' : s;
              })
              .join(n ? '.' : '')
        : t;
}
function Mt(e) {
    return a.isArray(e) && !e.some(se);
}
const It = a.toFlatObject(a, {}, null, function (t) {
    return /^is[A-Z]/.test(t);
});
function Z(e, t, n) {
    if (!a.isObject(e)) throw new TypeError('target must be an object');
    (t = t || new FormData()),
        (n = a.toFlatObject(n, { metaTokens: !0, dots: !1, indexes: !1 }, !1, function (m, y) {
            return !a.isUndefined(y[m]);
        }));
    const r = n.metaTokens,
        s = n.visitor || l,
        o = n.dots,
        i = n.indexes,
        d = (n.Blob || (typeof Blob < 'u' && Blob)) && a.isSpecCompliantForm(t);
    if (!a.isFunction(s)) throw new TypeError('visitor must be a function');
    function u(f) {
        if (f === null) return '';
        if (a.isDate(f)) return f.toISOString();
        if (a.isBoolean(f)) return f.toString();
        if (!d && a.isBlob(f)) throw new b('Blob is not supported. Use a Buffer instead.');
        return a.isArrayBuffer(f) || a.isTypedArray(f)
            ? d && typeof Blob == 'function'
                ? new Blob([f])
                : Buffer.from(f)
            : f;
    }
    function l(f, m, y) {
        let w = f;
        if (f && !y && typeof f == 'object') {
            if (a.endsWith(m, '{}')) (m = r ? m : m.slice(0, -2)), (f = JSON.stringify(f));
            else if (
                (a.isArray(f) && Mt(f)) ||
                ((a.isFileList(f) || a.endsWith(m, '[]')) && (w = a.toArray(f)))
            )
                return (
                    (m = ke(m)),
                    w.forEach(function (_, L) {
                        !(a.isUndefined(_) || _ === null) &&
                            t.append(i === !0 ? pe([m], L, o) : i === null ? m : m + '[]', u(_));
                    }),
                    !1
                );
        }
        return se(f) ? !0 : (t.append(pe(y, m, o), u(f)), !1);
    }
    const h = [],
        p = Object.assign(It, { defaultVisitor: l, convertValue: u, isVisitable: se });
    function g(f, m) {
        if (!a.isUndefined(f)) {
            if (h.indexOf(f) !== -1) throw Error('Circular reference detected in ' + m.join('.'));
            h.push(f),
                a.forEach(f, function (w, S) {
                    (!(a.isUndefined(w) || w === null) &&
                        s.call(t, w, a.isString(S) ? S.trim() : S, m, p)) === !0 &&
                        g(w, m ? m.concat(S) : [S]);
                }),
                h.pop();
        }
    }
    if (!a.isObject(e)) throw new TypeError('data must be an object');
    return g(e), t;
}
function me(e) {
    const t = {
        '!': '%21',
        "'": '%27',
        '(': '%28',
        ')': '%29',
        '~': '%7E',
        '%20': '+',
        '%00': '\0',
    };
    return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (r) {
        return t[r];
    });
}
function ue(e, t) {
    (this._pairs = []), e && Z(e, this, t);
}
const De = ue.prototype;
De.append = function (t, n) {
    this._pairs.push([t, n]);
};
De.toString = function (t) {
    const n = t
        ? function (r) {
              return t.call(this, r, me);
          }
        : me;
    return this._pairs
        .map(function (s) {
            return n(s[0]) + '=' + n(s[1]);
        }, '')
        .join('&');
};
function Ht(e) {
    return encodeURIComponent(e)
        .replace(/%3A/gi, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/gi, ',')
        .replace(/%20/g, '+')
        .replace(/%5B/gi, '[')
        .replace(/%5D/gi, ']');
}
function Be(e, t, n) {
    if (!t) return e;
    const r = (n && n.encode) || Ht;
    a.isFunction(n) && (n = { serialize: n });
    const s = n && n.serialize;
    let o;
    if (
        (s ? (o = s(t, n)) : (o = a.isURLSearchParams(t) ? t.toString() : new ue(t, n).toString(r)),
        o)
    ) {
        const i = e.indexOf('#');
        i !== -1 && (e = e.slice(0, i)), (e += (e.indexOf('?') === -1 ? '?' : '&') + o);
    }
    return e;
}
class ye {
    constructor() {
        this.handlers = [];
    }
    use(t, n, r) {
        return (
            this.handlers.push({
                fulfilled: t,
                rejected: n,
                synchronous: r ? r.synchronous : !1,
                runWhen: r ? r.runWhen : null,
            }),
            this.handlers.length - 1
        );
    }
    eject(t) {
        this.handlers[t] && (this.handlers[t] = null);
    }
    clear() {
        this.handlers && (this.handlers = []);
    }
    forEach(t) {
        a.forEach(this.handlers, function (r) {
            r !== null && t(r);
        });
    }
}
const je = { silentJSONParsing: !0, forcedJSONParsing: !0, clarifyTimeoutError: !1 },
    $t = typeof URLSearchParams < 'u' ? URLSearchParams : ue,
    zt = typeof FormData < 'u' ? FormData : null,
    Jt = typeof Blob < 'u' ? Blob : null,
    Vt = {
        isBrowser: !0,
        classes: { URLSearchParams: $t, FormData: zt, Blob: Jt },
        protocols: ['http', 'https', 'file', 'blob', 'url', 'data'],
    },
    de = typeof window < 'u' && typeof document < 'u',
    oe = (typeof navigator == 'object' && navigator) || void 0,
    Wt = de && (!oe || ['ReactNative', 'NativeScript', 'NS'].indexOf(oe.product) < 0),
    Kt =
        typeof WorkerGlobalScope < 'u' &&
        self instanceof WorkerGlobalScope &&
        typeof self.importScripts == 'function',
    Xt = (de && window.location.href) || 'http://localhost',
    Gt = Object.freeze(
        Object.defineProperty(
            {
                __proto__: null,
                hasBrowserEnv: de,
                hasStandardBrowserEnv: Wt,
                hasStandardBrowserWebWorkerEnv: Kt,
                navigator: oe,
                origin: Xt,
            },
            Symbol.toStringTag,
            { value: 'Module' }
        )
    ),
    R = { ...Gt, ...Vt };
function Zt(e, t) {
    return Z(
        e,
        new R.classes.URLSearchParams(),
        Object.assign(
            {
                visitor: function (n, r, s, o) {
                    return R.isNode && a.isBuffer(n)
                        ? (this.append(r, n.toString('base64')), !1)
                        : o.defaultVisitor.apply(this, arguments);
                },
            },
            t
        )
    );
}
function Qt(e) {
    return a.matchAll(/\w+|\[(\w*)]/g, e).map(t => (t[0] === '[]' ? '' : t[1] || t[0]));
}
function Yt(e) {
    const t = {},
        n = Object.keys(e);
    let r;
    const s = n.length;
    let o;
    for (r = 0; r < s; r++) (o = n[r]), (t[o] = e[o]);
    return t;
}
function Me(e) {
    function t(n, r, s, o) {
        let i = n[o++];
        if (i === '__proto__') return !0;
        const c = Number.isFinite(+i),
            d = o >= n.length;
        return (
            (i = !i && a.isArray(s) ? s.length : i),
            d
                ? (a.hasOwnProp(s, i) ? (s[i] = [s[i], r]) : (s[i] = r), !c)
                : ((!s[i] || !a.isObject(s[i])) && (s[i] = []),
                  t(n, r, s[i], o) && a.isArray(s[i]) && (s[i] = Yt(s[i])),
                  !c)
        );
    }
    if (a.isFormData(e) && a.isFunction(e.entries)) {
        const n = {};
        return (
            a.forEachEntry(e, (r, s) => {
                t(Qt(r), s, n, 0);
            }),
            n
        );
    }
    return null;
}
function en(e, t, n) {
    if (a.isString(e))
        try {
            return (t || JSON.parse)(e), a.trim(e);
        } catch (r) {
            if (r.name !== 'SyntaxError') throw r;
        }
    return (n || JSON.stringify)(e);
}
const M = {
    transitional: je,
    adapter: ['xhr', 'http', 'fetch'],
    transformRequest: [
        function (t, n) {
            const r = n.getContentType() || '',
                s = r.indexOf('application/json') > -1,
                o = a.isObject(t);
            if ((o && a.isHTMLForm(t) && (t = new FormData(t)), a.isFormData(t)))
                return s ? JSON.stringify(Me(t)) : t;
            if (
                a.isArrayBuffer(t) ||
                a.isBuffer(t) ||
                a.isStream(t) ||
                a.isFile(t) ||
                a.isBlob(t) ||
                a.isReadableStream(t)
            )
                return t;
            if (a.isArrayBufferView(t)) return t.buffer;
            if (a.isURLSearchParams(t))
                return (
                    n.setContentType('application/x-www-form-urlencoded;charset=utf-8', !1),
                    t.toString()
                );
            let c;
            if (o) {
                if (r.indexOf('application/x-www-form-urlencoded') > -1)
                    return Zt(t, this.formSerializer).toString();
                if ((c = a.isFileList(t)) || r.indexOf('multipart/form-data') > -1) {
                    const d = this.env && this.env.FormData;
                    return Z(c ? { 'files[]': t } : t, d && new d(), this.formSerializer);
                }
            }
            return o || s ? (n.setContentType('application/json', !1), en(t)) : t;
        },
    ],
    transformResponse: [
        function (t) {
            const n = this.transitional || M.transitional,
                r = n && n.forcedJSONParsing,
                s = this.responseType === 'json';
            if (a.isResponse(t) || a.isReadableStream(t)) return t;
            if (t && a.isString(t) && ((r && !this.responseType) || s)) {
                const i = !(n && n.silentJSONParsing) && s;
                try {
                    return JSON.parse(t);
                } catch (c) {
                    if (i)
                        throw c.name === 'SyntaxError'
                            ? b.from(c, b.ERR_BAD_RESPONSE, this, null, this.response)
                            : c;
                }
            }
            return t;
        },
    ],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    env: { FormData: R.classes.FormData, Blob: R.classes.Blob },
    validateStatus: function (t) {
        return t >= 200 && t < 300;
    },
    headers: { common: { Accept: 'application/json, text/plain, */*', 'Content-Type': void 0 } },
};
a.forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], e => {
    M.headers[e] = {};
});
const tn = a.toObjectSet([
        'age',
        'authorization',
        'content-length',
        'content-type',
        'etag',
        'expires',
        'from',
        'host',
        'if-modified-since',
        'if-unmodified-since',
        'last-modified',
        'location',
        'max-forwards',
        'proxy-authorization',
        'referer',
        'retry-after',
        'user-agent',
    ]),
    nn = e => {
        const t = {};
        let n, r, s;
        return (
            e &&
                e
                    .split(
                        `
`
                    )
                    .forEach(function (i) {
                        (s = i.indexOf(':')),
                            (n = i.substring(0, s).trim().toLowerCase()),
                            (r = i.substring(s + 1).trim()),
                            !(!n || (t[n] && tn[n])) &&
                                (n === 'set-cookie'
                                    ? t[n]
                                        ? t[n].push(r)
                                        : (t[n] = [r])
                                    : (t[n] = t[n] ? t[n] + ', ' + r : r));
                    }),
            t
        );
    },
    ge = Symbol('internals');
function D(e) {
    return e && String(e).trim().toLowerCase();
}
function $(e) {
    return e === !1 || e == null ? e : a.isArray(e) ? e.map($) : String(e);
}
function rn(e) {
    const t = Object.create(null),
        n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
    let r;
    for (; (r = n.exec(e)); ) t[r[1]] = r[2];
    return t;
}
const sn = e => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function ee(e, t, n, r, s) {
    if (a.isFunction(r)) return r.call(this, t, n);
    if ((s && (t = n), !!a.isString(t))) {
        if (a.isString(r)) return t.indexOf(r) !== -1;
        if (a.isRegExp(r)) return r.test(t);
    }
}
function on(e) {
    return e
        .trim()
        .toLowerCase()
        .replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function an(e, t) {
    const n = a.toCamelCase(' ' + t);
    ['get', 'set', 'has'].forEach(r => {
        Object.defineProperty(e, r + n, {
            value: function (s, o, i) {
                return this[r].call(this, t, s, o, i);
            },
            configurable: !0,
        });
    });
}
let O = class {
    constructor(t) {
        t && this.set(t);
    }
    set(t, n, r) {
        const s = this;
        function o(c, d, u) {
            const l = D(d);
            if (!l) throw new Error('header name must be a non-empty string');
            const h = a.findKey(s, l);
            (!h || s[h] === void 0 || u === !0 || (u === void 0 && s[h] !== !1)) &&
                (s[h || d] = $(c));
        }
        const i = (c, d) => a.forEach(c, (u, l) => o(u, l, d));
        if (a.isPlainObject(t) || t instanceof this.constructor) i(t, n);
        else if (a.isString(t) && (t = t.trim()) && !sn(t)) i(nn(t), n);
        else if (a.isObject(t) && a.isIterable(t)) {
            let c = {},
                d,
                u;
            for (const l of t) {
                if (!a.isArray(l)) throw TypeError('Object iterator must return a key-value pair');
                c[(u = l[0])] = (d = c[u]) ? (a.isArray(d) ? [...d, l[1]] : [d, l[1]]) : l[1];
            }
            i(c, n);
        } else t != null && o(n, t, r);
        return this;
    }
    get(t, n) {
        if (((t = D(t)), t)) {
            const r = a.findKey(this, t);
            if (r) {
                const s = this[r];
                if (!n) return s;
                if (n === !0) return rn(s);
                if (a.isFunction(n)) return n.call(this, s, r);
                if (a.isRegExp(n)) return n.exec(s);
                throw new TypeError('parser must be boolean|regexp|function');
            }
        }
    }
    has(t, n) {
        if (((t = D(t)), t)) {
            const r = a.findKey(this, t);
            return !!(r && this[r] !== void 0 && (!n || ee(this, this[r], r, n)));
        }
        return !1;
    }
    delete(t, n) {
        const r = this;
        let s = !1;
        function o(i) {
            if (((i = D(i)), i)) {
                const c = a.findKey(r, i);
                c && (!n || ee(r, r[c], c, n)) && (delete r[c], (s = !0));
            }
        }
        return a.isArray(t) ? t.forEach(o) : o(t), s;
    }
    clear(t) {
        const n = Object.keys(this);
        let r = n.length,
            s = !1;
        for (; r--; ) {
            const o = n[r];
            (!t || ee(this, this[o], o, t, !0)) && (delete this[o], (s = !0));
        }
        return s;
    }
    normalize(t) {
        const n = this,
            r = {};
        return (
            a.forEach(this, (s, o) => {
                const i = a.findKey(r, o);
                if (i) {
                    (n[i] = $(s)), delete n[o];
                    return;
                }
                const c = t ? on(o) : String(o).trim();
                c !== o && delete n[o], (n[c] = $(s)), (r[c] = !0);
            }),
            this
        );
    }
    concat(...t) {
        return this.constructor.concat(this, ...t);
    }
    toJSON(t) {
        const n = Object.create(null);
        return (
            a.forEach(this, (r, s) => {
                r != null && r !== !1 && (n[s] = t && a.isArray(r) ? r.join(', ') : r);
            }),
            n
        );
    }
    [Symbol.iterator]() {
        return Object.entries(this.toJSON())[Symbol.iterator]();
    }
    toString() {
        return Object.entries(this.toJSON()).map(([t, n]) => t + ': ' + n).join(`
`);
    }
    getSetCookie() {
        return this.get('set-cookie') || [];
    }
    get [Symbol.toStringTag]() {
        return 'AxiosHeaders';
    }
    static from(t) {
        return t instanceof this ? t : new this(t);
    }
    static concat(t, ...n) {
        const r = new this(t);
        return n.forEach(s => r.set(s)), r;
    }
    static accessor(t) {
        const r = (this[ge] = this[ge] = { accessors: {} }).accessors,
            s = this.prototype;
        function o(i) {
            const c = D(i);
            r[c] || (an(s, i), (r[c] = !0));
        }
        return a.isArray(t) ? t.forEach(o) : o(t), this;
    }
};
O.accessor([
    'Content-Type',
    'Content-Length',
    'Accept',
    'Accept-Encoding',
    'User-Agent',
    'Authorization',
]);
a.reduceDescriptors(O.prototype, ({ value: e }, t) => {
    let n = t[0].toUpperCase() + t.slice(1);
    return {
        get: () => e,
        set(r) {
            this[n] = r;
        },
    };
});
a.freezeMethods(O);
function te(e, t) {
    const n = this || M,
        r = t || n,
        s = O.from(r.headers);
    let o = r.data;
    return (
        a.forEach(e, function (c) {
            o = c.call(n, o, s.normalize(), t ? t.status : void 0);
        }),
        s.normalize(),
        o
    );
}
function Ie(e) {
    return !!(e && e.__CANCEL__);
}
function k(e, t, n) {
    b.call(this, e ?? 'canceled', b.ERR_CANCELED, t, n), (this.name = 'CanceledError');
}
a.inherits(k, b, { __CANCEL__: !0 });
function He(e, t, n) {
    const r = n.config.validateStatus;
    !n.status || !r || r(n.status)
        ? e(n)
        : t(
              new b(
                  'Request failed with status code ' + n.status,
                  [b.ERR_BAD_REQUEST, b.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
                  n.config,
                  n.request,
                  n
              )
          );
}
function cn(e) {
    const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
    return (t && t[1]) || '';
}
function ln(e, t) {
    e = e || 10;
    const n = new Array(e),
        r = new Array(e);
    let s = 0,
        o = 0,
        i;
    return (
        (t = t !== void 0 ? t : 1e3),
        function (d) {
            const u = Date.now(),
                l = r[o];
            i || (i = u), (n[s] = d), (r[s] = u);
            let h = o,
                p = 0;
            for (; h !== s; ) (p += n[h++]), (h = h % e);
            if (((s = (s + 1) % e), s === o && (o = (o + 1) % e), u - i < t)) return;
            const g = l && u - l;
            return g ? Math.round((p * 1e3) / g) : void 0;
        }
    );
}
function un(e, t) {
    let n = 0,
        r = 1e3 / t,
        s,
        o;
    const i = (u, l = Date.now()) => {
        (n = l), (s = null), o && (clearTimeout(o), (o = null)), e.apply(null, u);
    };
    return [
        (...u) => {
            const l = Date.now(),
                h = l - n;
            h >= r
                ? i(u, l)
                : ((s = u),
                  o ||
                      (o = setTimeout(() => {
                          (o = null), i(s);
                      }, r - h)));
        },
        () => s && i(s),
    ];
}
const J = (e, t, n = 3) => {
        let r = 0;
        const s = ln(50, 250);
        return un(o => {
            const i = o.loaded,
                c = o.lengthComputable ? o.total : void 0,
                d = i - r,
                u = s(d),
                l = i <= c;
            r = i;
            const h = {
                loaded: i,
                total: c,
                progress: c ? i / c : void 0,
                bytes: d,
                rate: u || void 0,
                estimated: u && c && l ? (c - i) / u : void 0,
                event: o,
                lengthComputable: c != null,
                [t ? 'download' : 'upload']: !0,
            };
            e(h);
        }, n);
    },
    be = (e, t) => {
        const n = e != null;
        return [r => t[0]({ lengthComputable: n, total: e, loaded: r }), t[1]];
    },
    we =
        e =>
        (...t) =>
            a.asap(() => e(...t)),
    dn = R.hasStandardBrowserEnv
        ? ((e, t) => n => (
              (n = new URL(n, R.origin)),
              e.protocol === n.protocol && e.host === n.host && (t || e.port === n.port)
          ))(new URL(R.origin), R.navigator && /(msie|trident)/i.test(R.navigator.userAgent))
        : () => !0,
    fn = R.hasStandardBrowserEnv
        ? {
              write(e, t, n, r, s, o) {
                  const i = [e + '=' + encodeURIComponent(t)];
                  a.isNumber(n) && i.push('expires=' + new Date(n).toGMTString()),
                      a.isString(r) && i.push('path=' + r),
                      a.isString(s) && i.push('domain=' + s),
                      o === !0 && i.push('secure'),
                      (document.cookie = i.join('; '));
              },
              read(e) {
                  const t = document.cookie.match(new RegExp('(^|;\\s*)(' + e + ')=([^;]*)'));
                  return t ? decodeURIComponent(t[3]) : null;
              },
              remove(e) {
                  this.write(e, '', Date.now() - 864e5);
              },
          }
        : {
              write() {},
              read() {
                  return null;
              },
              remove() {},
          };
function hn(e) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function pn(e, t) {
    return t ? e.replace(/\/?\/$/, '') + '/' + t.replace(/^\/+/, '') : e;
}
function $e(e, t, n) {
    let r = !hn(t);
    return e && (r || n == !1) ? pn(e, t) : t;
}
const Ee = e => (e instanceof O ? { ...e } : e);
function q(e, t) {
    t = t || {};
    const n = {};
    function r(u, l, h, p) {
        return a.isPlainObject(u) && a.isPlainObject(l)
            ? a.merge.call({ caseless: p }, u, l)
            : a.isPlainObject(l)
            ? a.merge({}, l)
            : a.isArray(l)
            ? l.slice()
            : l;
    }
    function s(u, l, h, p) {
        if (a.isUndefined(l)) {
            if (!a.isUndefined(u)) return r(void 0, u, h, p);
        } else return r(u, l, h, p);
    }
    function o(u, l) {
        if (!a.isUndefined(l)) return r(void 0, l);
    }
    function i(u, l) {
        if (a.isUndefined(l)) {
            if (!a.isUndefined(u)) return r(void 0, u);
        } else return r(void 0, l);
    }
    function c(u, l, h) {
        if (h in t) return r(u, l);
        if (h in e) return r(void 0, u);
    }
    const d = {
        url: o,
        method: o,
        data: o,
        baseURL: i,
        transformRequest: i,
        transformResponse: i,
        paramsSerializer: i,
        timeout: i,
        timeoutMessage: i,
        withCredentials: i,
        withXSRFToken: i,
        adapter: i,
        responseType: i,
        xsrfCookieName: i,
        xsrfHeaderName: i,
        onUploadProgress: i,
        onDownloadProgress: i,
        decompress: i,
        maxContentLength: i,
        maxBodyLength: i,
        beforeRedirect: i,
        transport: i,
        httpAgent: i,
        httpsAgent: i,
        cancelToken: i,
        socketPath: i,
        responseEncoding: i,
        validateStatus: c,
        headers: (u, l, h) => s(Ee(u), Ee(l), h, !0),
    };
    return (
        a.forEach(Object.keys(Object.assign({}, e, t)), function (l) {
            const h = d[l] || s,
                p = h(e[l], t[l], l);
            (a.isUndefined(p) && h !== c) || (n[l] = p);
        }),
        n
    );
}
const ze = e => {
        const t = q({}, e);
        let {
            data: n,
            withXSRFToken: r,
            xsrfHeaderName: s,
            xsrfCookieName: o,
            headers: i,
            auth: c,
        } = t;
        (t.headers = i = O.from(i)),
            (t.url = Be($e(t.baseURL, t.url, t.allowAbsoluteUrls), e.params, e.paramsSerializer)),
            c &&
                i.set(
                    'Authorization',
                    'Basic ' +
                        btoa(
                            (c.username || '') +
                                ':' +
                                (c.password ? unescape(encodeURIComponent(c.password)) : '')
                        )
                );
        let d;
        if (a.isFormData(n)) {
            if (R.hasStandardBrowserEnv || R.hasStandardBrowserWebWorkerEnv)
                i.setContentType(void 0);
            else if ((d = i.getContentType()) !== !1) {
                const [u, ...l] = d
                    ? d
                          .split(';')
                          .map(h => h.trim())
                          .filter(Boolean)
                    : [];
                i.setContentType([u || 'multipart/form-data', ...l].join('; '));
            }
        }
        if (
            R.hasStandardBrowserEnv &&
            (r && a.isFunction(r) && (r = r(t)), r || (r !== !1 && dn(t.url)))
        ) {
            const u = s && o && fn.read(o);
            u && i.set(s, u);
        }
        return t;
    },
    mn = typeof XMLHttpRequest < 'u',
    yn =
        mn &&
        function (e) {
            return new Promise(function (n, r) {
                const s = ze(e);
                let o = s.data;
                const i = O.from(s.headers).normalize();
                let { responseType: c, onUploadProgress: d, onDownloadProgress: u } = s,
                    l,
                    h,
                    p,
                    g,
                    f;
                function m() {
                    g && g(),
                        f && f(),
                        s.cancelToken && s.cancelToken.unsubscribe(l),
                        s.signal && s.signal.removeEventListener('abort', l);
                }
                let y = new XMLHttpRequest();
                y.open(s.method.toUpperCase(), s.url, !0), (y.timeout = s.timeout);
                function w() {
                    if (!y) return;
                    const _ = O.from('getAllResponseHeaders' in y && y.getAllResponseHeaders()),
                        T = {
                            data: !c || c === 'text' || c === 'json' ? y.responseText : y.response,
                            status: y.status,
                            statusText: y.statusText,
                            headers: _,
                            config: e,
                            request: y,
                        };
                    He(
                        function (P) {
                            n(P), m();
                        },
                        function (P) {
                            r(P), m();
                        },
                        T
                    ),
                        (y = null);
                }
                'onloadend' in y
                    ? (y.onloadend = w)
                    : (y.onreadystatechange = function () {
                          !y ||
                              y.readyState !== 4 ||
                              (y.status === 0 &&
                                  !(y.responseURL && y.responseURL.indexOf('file:') === 0)) ||
                              setTimeout(w);
                      }),
                    (y.onabort = function () {
                        y && (r(new b('Request aborted', b.ECONNABORTED, e, y)), (y = null));
                    }),
                    (y.onerror = function () {
                        r(new b('Network Error', b.ERR_NETWORK, e, y)), (y = null);
                    }),
                    (y.ontimeout = function () {
                        let L = s.timeout
                            ? 'timeout of ' + s.timeout + 'ms exceeded'
                            : 'timeout exceeded';
                        const T = s.transitional || je;
                        s.timeoutErrorMessage && (L = s.timeoutErrorMessage),
                            r(new b(L, T.clarifyTimeoutError ? b.ETIMEDOUT : b.ECONNABORTED, e, y)),
                            (y = null);
                    }),
                    o === void 0 && i.setContentType(null),
                    'setRequestHeader' in y &&
                        a.forEach(i.toJSON(), function (L, T) {
                            y.setRequestHeader(T, L);
                        }),
                    a.isUndefined(s.withCredentials) || (y.withCredentials = !!s.withCredentials),
                    c && c !== 'json' && (y.responseType = s.responseType),
                    u && (([p, f] = J(u, !0)), y.addEventListener('progress', p)),
                    d &&
                        y.upload &&
                        (([h, g] = J(d)),
                        y.upload.addEventListener('progress', h),
                        y.upload.addEventListener('loadend', g)),
                    (s.cancelToken || s.signal) &&
                        ((l = _ => {
                            y && (r(!_ || _.type ? new k(null, e, y) : _), y.abort(), (y = null));
                        }),
                        s.cancelToken && s.cancelToken.subscribe(l),
                        s.signal &&
                            (s.signal.aborted ? l() : s.signal.addEventListener('abort', l)));
                const S = cn(s.url);
                if (S && R.protocols.indexOf(S) === -1) {
                    r(new b('Unsupported protocol ' + S + ':', b.ERR_BAD_REQUEST, e));
                    return;
                }
                y.send(o || null);
            });
        },
    gn = (e, t) => {
        const { length: n } = (e = e ? e.filter(Boolean) : []);
        if (t || n) {
            let r = new AbortController(),
                s;
            const o = function (u) {
                if (!s) {
                    (s = !0), c();
                    const l = u instanceof Error ? u : this.reason;
                    r.abort(l instanceof b ? l : new k(l instanceof Error ? l.message : l));
                }
            };
            let i =
                t &&
                setTimeout(() => {
                    (i = null), o(new b(`timeout ${t} of ms exceeded`, b.ETIMEDOUT));
                }, t);
            const c = () => {
                e &&
                    (i && clearTimeout(i),
                    (i = null),
                    e.forEach(u => {
                        u.unsubscribe ? u.unsubscribe(o) : u.removeEventListener('abort', o);
                    }),
                    (e = null));
            };
            e.forEach(u => u.addEventListener('abort', o));
            const { signal: d } = r;
            return (d.unsubscribe = () => a.asap(c)), d;
        }
    },
    bn = function* (e, t) {
        let n = e.byteLength;
        if (n < t) {
            yield e;
            return;
        }
        let r = 0,
            s;
        for (; r < n; ) (s = r + t), yield e.slice(r, s), (r = s);
    },
    wn = async function* (e, t) {
        for await (const n of En(e)) yield* bn(n, t);
    },
    En = async function* (e) {
        if (e[Symbol.asyncIterator]) {
            yield* e;
            return;
        }
        const t = e.getReader();
        try {
            for (;;) {
                const { done: n, value: r } = await t.read();
                if (n) break;
                yield r;
            }
        } finally {
            await t.cancel();
        }
    },
    Se = (e, t, n, r) => {
        const s = wn(e, t);
        let o = 0,
            i,
            c = d => {
                i || ((i = !0), r && r(d));
            };
        return new ReadableStream(
            {
                async pull(d) {
                    try {
                        const { done: u, value: l } = await s.next();
                        if (u) {
                            c(), d.close();
                            return;
                        }
                        let h = l.byteLength;
                        if (n) {
                            let p = (o += h);
                            n(p);
                        }
                        d.enqueue(new Uint8Array(l));
                    } catch (u) {
                        throw (c(u), u);
                    }
                },
                cancel(d) {
                    return c(d), s.return();
                },
            },
            { highWaterMark: 2 }
        );
    },
    Q = typeof fetch == 'function' && typeof Request == 'function' && typeof Response == 'function',
    Je = Q && typeof ReadableStream == 'function',
    Sn =
        Q &&
        (typeof TextEncoder == 'function'
            ? (
                  e => t =>
                      e.encode(t)
              )(new TextEncoder())
            : async e => new Uint8Array(await new Response(e).arrayBuffer())),
    Ve = (e, ...t) => {
        try {
            return !!e(...t);
        } catch {
            return !1;
        }
    },
    _n =
        Je &&
        Ve(() => {
            let e = !1;
            const t = new Request(R.origin, {
                body: new ReadableStream(),
                method: 'POST',
                get duplex() {
                    return (e = !0), 'half';
                },
            }).headers.has('Content-Type');
            return e && !t;
        }),
    _e = 64 * 1024,
    ie = Je && Ve(() => a.isReadableStream(new Response('').body)),
    V = { stream: ie && (e => e.body) };
Q &&
    (e => {
        ['text', 'arrayBuffer', 'blob', 'formData', 'stream'].forEach(t => {
            !V[t] &&
                (V[t] = a.isFunction(e[t])
                    ? n => n[t]()
                    : (n, r) => {
                          throw new b(
                              `Response type '${t}' is not supported`,
                              b.ERR_NOT_SUPPORT,
                              r
                          );
                      });
        });
    })(new Response());
const Rn = async e => {
        if (e == null) return 0;
        if (a.isBlob(e)) return e.size;
        if (a.isSpecCompliantForm(e))
            return (await new Request(R.origin, { method: 'POST', body: e }).arrayBuffer())
                .byteLength;
        if (a.isArrayBufferView(e) || a.isArrayBuffer(e)) return e.byteLength;
        if ((a.isURLSearchParams(e) && (e = e + ''), a.isString(e)))
            return (await Sn(e)).byteLength;
    },
    Tn = async (e, t) => {
        const n = a.toFiniteNumber(e.getContentLength());
        return n ?? Rn(t);
    },
    An =
        Q &&
        (async e => {
            let {
                url: t,
                method: n,
                data: r,
                signal: s,
                cancelToken: o,
                timeout: i,
                onDownloadProgress: c,
                onUploadProgress: d,
                responseType: u,
                headers: l,
                withCredentials: h = 'same-origin',
                fetchOptions: p,
            } = ze(e);
            u = u ? (u + '').toLowerCase() : 'text';
            let g = gn([s, o && o.toAbortSignal()], i),
                f;
            const m =
                g &&
                g.unsubscribe &&
                (() => {
                    g.unsubscribe();
                });
            let y;
            try {
                if (d && _n && n !== 'get' && n !== 'head' && (y = await Tn(l, r)) !== 0) {
                    let T = new Request(t, { method: 'POST', body: r, duplex: 'half' }),
                        N;
                    if (
                        (a.isFormData(r) &&
                            (N = T.headers.get('content-type')) &&
                            l.setContentType(N),
                        T.body)
                    ) {
                        const [P, I] = be(y, J(we(d)));
                        r = Se(T.body, _e, P, I);
                    }
                }
                a.isString(h) || (h = h ? 'include' : 'omit');
                const w = 'credentials' in Request.prototype;
                f = new Request(t, {
                    ...p,
                    signal: g,
                    method: n.toUpperCase(),
                    headers: l.normalize().toJSON(),
                    body: r,
                    duplex: 'half',
                    credentials: w ? h : void 0,
                });
                let S = await fetch(f, p);
                const _ = ie && (u === 'stream' || u === 'response');
                if (ie && (c || (_ && m))) {
                    const T = {};
                    ['status', 'statusText', 'headers'].forEach(fe => {
                        T[fe] = S[fe];
                    });
                    const N = a.toFiniteNumber(S.headers.get('content-length')),
                        [P, I] = (c && be(N, J(we(c), !0))) || [];
                    S = new Response(
                        Se(S.body, _e, P, () => {
                            I && I(), m && m();
                        }),
                        T
                    );
                }
                u = u || 'text';
                let L = await V[a.findKey(V, u) || 'text'](S, e);
                return (
                    !_ && m && m(),
                    await new Promise((T, N) => {
                        He(T, N, {
                            data: L,
                            headers: O.from(S.headers),
                            status: S.status,
                            statusText: S.statusText,
                            config: e,
                            request: f,
                        });
                    })
                );
            } catch (w) {
                throw (
                    (m && m(),
                    w && w.name === 'TypeError' && /Load failed|fetch/i.test(w.message)
                        ? Object.assign(new b('Network Error', b.ERR_NETWORK, e, f), {
                              cause: w.cause || w,
                          })
                        : b.from(w, w && w.code, e, f))
                );
            }
        }),
    ae = { http: jt, xhr: yn, fetch: An };
a.forEach(ae, (e, t) => {
    if (e) {
        try {
            Object.defineProperty(e, 'name', { value: t });
        } catch {}
        Object.defineProperty(e, 'adapterName', { value: t });
    }
});
const Re = e => `- ${e}`,
    On = e => a.isFunction(e) || e === null || e === !1,
    We = {
        getAdapter: e => {
            e = a.isArray(e) ? e : [e];
            const { length: t } = e;
            let n, r;
            const s = {};
            for (let o = 0; o < t; o++) {
                n = e[o];
                let i;
                if (((r = n), !On(n) && ((r = ae[(i = String(n)).toLowerCase()]), r === void 0)))
                    throw new b(`Unknown adapter '${i}'`);
                if (r) break;
                s[i || '#' + o] = r;
            }
            if (!r) {
                const o = Object.entries(s).map(
                    ([c, d]) =>
                        `adapter ${c} ` +
                        (d === !1
                            ? 'is not supported by the environment'
                            : 'is not available in the build')
                );
                let i = t
                    ? o.length > 1
                        ? `since :
` +
                          o.map(Re).join(`
`)
                        : ' ' + Re(o[0])
                    : 'as no adapter specified';
                throw new b(
                    'There is no suitable adapter to dispatch the request ' + i,
                    'ERR_NOT_SUPPORT'
                );
            }
            return r;
        },
        adapters: ae,
    };
function ne(e) {
    if ((e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted))
        throw new k(null, e);
}
function Te(e) {
    return (
        ne(e),
        (e.headers = O.from(e.headers)),
        (e.data = te.call(e, e.transformRequest)),
        ['post', 'put', 'patch'].indexOf(e.method) !== -1 &&
            e.headers.setContentType('application/x-www-form-urlencoded', !1),
        We.getAdapter(e.adapter || M.adapter)(e).then(
            function (r) {
                return (
                    ne(e),
                    (r.data = te.call(e, e.transformResponse, r)),
                    (r.headers = O.from(r.headers)),
                    r
                );
            },
            function (r) {
                return (
                    Ie(r) ||
                        (ne(e),
                        r &&
                            r.response &&
                            ((r.response.data = te.call(e, e.transformResponse, r.response)),
                            (r.response.headers = O.from(r.response.headers)))),
                    Promise.reject(r)
                );
            }
        )
    );
}
const Ke = '1.10.0',
    Y = {};
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((e, t) => {
    Y[e] = function (r) {
        return typeof r === e || 'a' + (t < 1 ? 'n ' : ' ') + e;
    };
});
const Ae = {};
Y.transitional = function (t, n, r) {
    function s(o, i) {
        return '[Axios v' + Ke + "] Transitional option '" + o + "'" + i + (r ? '. ' + r : '');
    }
    return (o, i, c) => {
        if (t === !1)
            throw new b(s(i, ' has been removed' + (n ? ' in ' + n : '')), b.ERR_DEPRECATED);
        return (
            n &&
                !Ae[i] &&
                ((Ae[i] = !0),
                console.warn(
                    s(
                        i,
                        ' has been deprecated since v' +
                            n +
                            ' and will be removed in the near future'
                    )
                )),
            t ? t(o, i, c) : !0
        );
    };
};
Y.spelling = function (t) {
    return (n, r) => (console.warn(`${r} is likely a misspelling of ${t}`), !0);
};
function xn(e, t, n) {
    if (typeof e != 'object') throw new b('options must be an object', b.ERR_BAD_OPTION_VALUE);
    const r = Object.keys(e);
    let s = r.length;
    for (; s-- > 0; ) {
        const o = r[s],
            i = t[o];
        if (i) {
            const c = e[o],
                d = c === void 0 || i(c, o, e);
            if (d !== !0) throw new b('option ' + o + ' must be ' + d, b.ERR_BAD_OPTION_VALUE);
            continue;
        }
        if (n !== !0) throw new b('Unknown option ' + o, b.ERR_BAD_OPTION);
    }
}
const z = { assertOptions: xn, validators: Y },
    C = z.validators;
let v = class {
    constructor(t) {
        (this.defaults = t || {}), (this.interceptors = { request: new ye(), response: new ye() });
    }
    async request(t, n) {
        try {
            return await this._request(t, n);
        } catch (r) {
            if (r instanceof Error) {
                let s = {};
                Error.captureStackTrace ? Error.captureStackTrace(s) : (s = new Error());
                const o = s.stack ? s.stack.replace(/^.+\n/, '') : '';
                try {
                    r.stack
                        ? o &&
                          !String(r.stack).endsWith(o.replace(/^.+\n.+\n/, '')) &&
                          (r.stack +=
                              `
` + o)
                        : (r.stack = o);
                } catch {}
            }
            throw r;
        }
    }
    _request(t, n) {
        typeof t == 'string' ? ((n = n || {}), (n.url = t)) : (n = t || {}),
            (n = q(this.defaults, n));
        const { transitional: r, paramsSerializer: s, headers: o } = n;
        r !== void 0 &&
            z.assertOptions(
                r,
                {
                    silentJSONParsing: C.transitional(C.boolean),
                    forcedJSONParsing: C.transitional(C.boolean),
                    clarifyTimeoutError: C.transitional(C.boolean),
                },
                !1
            ),
            s != null &&
                (a.isFunction(s)
                    ? (n.paramsSerializer = { serialize: s })
                    : z.assertOptions(s, { encode: C.function, serialize: C.function }, !0)),
            n.allowAbsoluteUrls !== void 0 ||
                (this.defaults.allowAbsoluteUrls !== void 0
                    ? (n.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls)
                    : (n.allowAbsoluteUrls = !0)),
            z.assertOptions(
                n,
                { baseUrl: C.spelling('baseURL'), withXsrfToken: C.spelling('withXSRFToken') },
                !0
            ),
            (n.method = (n.method || this.defaults.method || 'get').toLowerCase());
        let i = o && a.merge(o.common, o[n.method]);
        o &&
            a.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], f => {
                delete o[f];
            }),
            (n.headers = O.concat(i, o));
        const c = [];
        let d = !0;
        this.interceptors.request.forEach(function (m) {
            (typeof m.runWhen == 'function' && m.runWhen(n) === !1) ||
                ((d = d && m.synchronous), c.unshift(m.fulfilled, m.rejected));
        });
        const u = [];
        this.interceptors.response.forEach(function (m) {
            u.push(m.fulfilled, m.rejected);
        });
        let l,
            h = 0,
            p;
        if (!d) {
            const f = [Te.bind(this), void 0];
            for (
                f.unshift.apply(f, c), f.push.apply(f, u), p = f.length, l = Promise.resolve(n);
                h < p;

            )
                l = l.then(f[h++], f[h++]);
            return l;
        }
        p = c.length;
        let g = n;
        for (h = 0; h < p; ) {
            const f = c[h++],
                m = c[h++];
            try {
                g = f(g);
            } catch (y) {
                m.call(this, y);
                break;
            }
        }
        try {
            l = Te.call(this, g);
        } catch (f) {
            return Promise.reject(f);
        }
        for (h = 0, p = u.length; h < p; ) l = l.then(u[h++], u[h++]);
        return l;
    }
    getUri(t) {
        t = q(this.defaults, t);
        const n = $e(t.baseURL, t.url, t.allowAbsoluteUrls);
        return Be(n, t.params, t.paramsSerializer);
    }
};
a.forEach(['delete', 'get', 'head', 'options'], function (t) {
    v.prototype[t] = function (n, r) {
        return this.request(q(r || {}, { method: t, url: n, data: (r || {}).data }));
    };
});
a.forEach(['post', 'put', 'patch'], function (t) {
    function n(r) {
        return function (o, i, c) {
            return this.request(
                q(c || {}, {
                    method: t,
                    headers: r ? { 'Content-Type': 'multipart/form-data' } : {},
                    url: o,
                    data: i,
                })
            );
        };
    }
    (v.prototype[t] = n()), (v.prototype[t + 'Form'] = n(!0));
});
let Cn = class Xe {
    constructor(t) {
        if (typeof t != 'function') throw new TypeError('executor must be a function.');
        let n;
        this.promise = new Promise(function (o) {
            n = o;
        });
        const r = this;
        this.promise.then(s => {
            if (!r._listeners) return;
            let o = r._listeners.length;
            for (; o-- > 0; ) r._listeners[o](s);
            r._listeners = null;
        }),
            (this.promise.then = s => {
                let o;
                const i = new Promise(c => {
                    r.subscribe(c), (o = c);
                }).then(s);
                return (
                    (i.cancel = function () {
                        r.unsubscribe(o);
                    }),
                    i
                );
            }),
            t(function (o, i, c) {
                r.reason || ((r.reason = new k(o, i, c)), n(r.reason));
            });
    }
    throwIfRequested() {
        if (this.reason) throw this.reason;
    }
    subscribe(t) {
        if (this.reason) {
            t(this.reason);
            return;
        }
        this._listeners ? this._listeners.push(t) : (this._listeners = [t]);
    }
    unsubscribe(t) {
        if (!this._listeners) return;
        const n = this._listeners.indexOf(t);
        n !== -1 && this._listeners.splice(n, 1);
    }
    toAbortSignal() {
        const t = new AbortController(),
            n = r => {
                t.abort(r);
            };
        return this.subscribe(n), (t.signal.unsubscribe = () => this.unsubscribe(n)), t.signal;
    }
    static source() {
        let t;
        return {
            token: new Xe(function (s) {
                t = s;
            }),
            cancel: t,
        };
    }
};
function Ln(e) {
    return function (n) {
        return e.apply(null, n);
    };
}
function Nn(e) {
    return a.isObject(e) && e.isAxiosError === !0;
}
const ce = {
    Continue: 100,
    SwitchingProtocols: 101,
    Processing: 102,
    EarlyHints: 103,
    Ok: 200,
    Created: 201,
    Accepted: 202,
    NonAuthoritativeInformation: 203,
    NoContent: 204,
    ResetContent: 205,
    PartialContent: 206,
    MultiStatus: 207,
    AlreadyReported: 208,
    ImUsed: 226,
    MultipleChoices: 300,
    MovedPermanently: 301,
    Found: 302,
    SeeOther: 303,
    NotModified: 304,
    UseProxy: 305,
    Unused: 306,
    TemporaryRedirect: 307,
    PermanentRedirect: 308,
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    ProxyAuthenticationRequired: 407,
    RequestTimeout: 408,
    Conflict: 409,
    Gone: 410,
    LengthRequired: 411,
    PreconditionFailed: 412,
    PayloadTooLarge: 413,
    UriTooLong: 414,
    UnsupportedMediaType: 415,
    RangeNotSatisfiable: 416,
    ExpectationFailed: 417,
    ImATeapot: 418,
    MisdirectedRequest: 421,
    UnprocessableEntity: 422,
    Locked: 423,
    FailedDependency: 424,
    TooEarly: 425,
    UpgradeRequired: 426,
    PreconditionRequired: 428,
    TooManyRequests: 429,
    RequestHeaderFieldsTooLarge: 431,
    UnavailableForLegalReasons: 451,
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTimeout: 504,
    HttpVersionNotSupported: 505,
    VariantAlsoNegotiates: 506,
    InsufficientStorage: 507,
    LoopDetected: 508,
    NotExtended: 510,
    NetworkAuthenticationRequired: 511,
};
Object.entries(ce).forEach(([e, t]) => {
    ce[t] = e;
});
function Ge(e) {
    const t = new v(e),
        n = Oe(v.prototype.request, t);
    return (
        a.extend(n, v.prototype, t, { allOwnKeys: !0 }),
        a.extend(n, t, null, { allOwnKeys: !0 }),
        (n.create = function (s) {
            return Ge(q(e, s));
        }),
        n
    );
}
const E = Ge(M);
E.Axios = v;
E.CanceledError = k;
E.CancelToken = Cn;
E.isCancel = Ie;
E.VERSION = Ke;
E.toFormData = Z;
E.AxiosError = b;
E.Cancel = E.CanceledError;
E.all = function (t) {
    return Promise.all(t);
};
E.spread = Ln;
E.isAxiosError = Nn;
E.mergeConfig = q;
E.AxiosHeaders = O;
E.formToJSON = e => Me(a.isHTMLForm(e) ? new FormData(e) : e);
E.getAdapter = We.getAdapter;
E.HttpStatusCode = ce;
E.default = E;
const {
    Axios: kn,
    AxiosError: Dn,
    CanceledError: Bn,
    isCancel: jn,
    CancelToken: Mn,
    VERSION: In,
    all: Hn,
    Cancel: $n,
    isAxiosError: zn,
    spread: Jn,
    toFormData: Vn,
    AxiosHeaders: Wn,
    HttpStatusCode: Kn,
    formToJSON: Xn,
    getAdapter: Gn,
    mergeConfig: Zn,
} = E;
function Pn() {
    class e {
        constructor(n, r, s, o, i, c, ...d) {
            (this.src = n),
                (this.alt = r),
                (this.title = s),
                (this.descr = o),
                (this.classes = d),
                (this.price = i),
                (this.parent = document.querySelector(c)),
                (this.transfer = 27),
                this.changeToUAH();
        }
        changeToUAH() {
            this.price *= this.transfer;
        }
        render() {
            const n = document.createElement('div');
            !this.classes.length && (this.classes = ['menu__item']),
                n.classList.add(...this.classes),
                (n.innerHTML = `
                        <img src=${this.src} alt=${this.alt} />
                        <h3 class="menu__item-subtitle">${this.title}</h3>
                        <div class="menu__item-descr">${this.descr}</div>
                        <div class="menu__item-divider"></div>
                        <div class="menu__item-price">
                            <div class="menu__item-cost">Цена:</div>
                            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                        </div>
                                `),
                this.parent.append(n);
        }
    }
    E.get('http://localhost:3000/menu').then(({ data: t }) =>
        t.forEach(({ img: n, altimg: r, title: s, descr: o, price: i }) =>
            new e(n, r, s, o, i, '.menu .container', 'menu__item').render()
        )
    );
}
function Fn() {
    function e() {
        const t = document.querySelectorAll('.offer__slide');
        document.querySelector('.offer__slider');
        const n = document.querySelector('.offer__slider-prev'),
            r = document.querySelector('.offer__slider-next'),
            s = document.querySelector('#total'),
            o = document.querySelector('#current'),
            i = document.querySelector('.offer__slider-wrapper'),
            c = document.querySelector('.offer__slider-inner'),
            d = parseInt(window.getComputedStyle(i).width);
        let u = 1,
            l = 0;
        t.length < 10
            ? ((s.textContent = `0${t.length}`), (o.textContent = `0${u}`))
            : ((s.textContent = t.length), (o.textContent = u)),
            (c.style.width = 100 * t.length + '%'),
            t.forEach(g => (g.style.width = d)),
            r.addEventListener('click', () => {
                l >= d * (t.length - 1) ? (l = 0) : (l += d),
                    (c.style.transform = `translateX(-${l}px)`),
                    u >= t.length ? (u = 1) : u++,
                    t.length < 10 ? (o.textContent = `0${u}`) : (o.textContent = u),
                    p.forEach((g, f) => {
                        g.classList.remove('offer__slider-dot_active'),
                            f == u - 1 && g.classList.add('offer__slider-dot_active');
                    });
            }),
            n.addEventListener('click', () => {
                l <= 0 ? (l = d * (t.length - 1)) : (l -= d),
                    (c.style.transform = `translateX(-${l}px)`),
                    u <= 1 ? (u = t.length) : u--,
                    t.length < 10 ? (o.textContent = `0${u}`) : (o.textContent = u),
                    p.forEach((g, f) => {
                        g.classList.remove('offer__slider-dot_active'),
                            f == u - 1 && g.classList.add('offer__slider-dot_active');
                    });
            });
        const h = document.querySelector('.offer__slider-nav');
        t.forEach((g, f) => {
            const m = document.createElement('div');
            m.classList.add('offer__slider-dot'),
                m.setAttribute('data-slide-to', f + 1),
                h.append(m);
        });
        const p = document.querySelectorAll('.offer__slider-dot');
        p.forEach((g, f) => {
            f == u - 1 && g.classList.add('offer__slider-dot_active'),
                g.addEventListener('click', m => {
                    m.target && m.target.matches('div') && (u = f + 1),
                        (o.innerHTML = u < 10 ? `0${u}` : u),
                        (l = d * f),
                        (c.style.transform = `translateX(-${l}px)`),
                        p.forEach(y => y.classList.remove('offer__slider-dot_active')),
                        m.target == g && g.classList.add('offer__slider-dot_active');
                });
        });
    }
    e();
}
function vn() {
    function e() {
        const t = document.querySelector('.calculating__result span');
        let n, r, s, o, i;
        localStorage.getItem('sex')
            ? (n = localStorage.getItem('sex'))
            : ((n = 'female'), localStorage.setItem('sex', 'female')),
            localStorage.getItem('ratio')
                ? (i = localStorage.getItem('ratio', '1.375'))
                : ((i = '1.375'), localStorage.setItem('ratio', '1.375'));
        function c(h, p) {
            document.querySelectorAll(h).forEach(f => {
                f.classList.remove(p),
                    f.id === n && f.classList.add(p),
                    f.getAttribute('data-ratio') === i && f.classList.add(p);
            });
        }
        c('#gender div', 'calculating__choose-item_active'),
            c('.calculating__choose_big div', 'calculating__choose-item_active');
        function d() {
            if (!n || !r || !s || !o || !i) {
                t.textContent = '____';
                return;
            }
            n === 'female'
                ? (t.textContent = Math.round((447.6 + 9.2 * s + 3.1 * r + 4.3 * o) * i))
                : (t.textContent = Math.round((88.36 + 13.4 * s + 4.8 * r + 5.7 * o) * i));
        }
        function u(h, p) {
            const g = document.querySelectorAll(h);
            g.forEach(f => {
                f.addEventListener('click', m => {
                    m.target.getAttribute('data-ratio')
                        ? ((i = +m.target.getAttribute('data-ratio')),
                          localStorage.setItem('ratio', +m.target.getAttribute('data-ratio')))
                        : ((n = m.target.getAttribute('id')),
                          localStorage.setItem('sex', m.target.getAttribute('id'))),
                        g.forEach(y => y.classList.remove(p)),
                        m.target.classList.add(p),
                        d();
                });
            });
        }
        function l(h) {
            const p = document.querySelector(h);
            p.addEventListener('input', () => {
                switch (p.getAttribute('id')) {
                    case 'height':
                        r = +p.value;
                        break;
                    case 'weight':
                        s = +p.value;
                        break;
                    case 'age':
                        o = +p.value;
                        break;
                }
                p.value.match(/\D/gi)
                    ? (p.style.outline = 'solid red medium')
                    : ((p.style.outline = ''), p.removeAttribute('style')),
                    d();
            });
        }
        l('#height'),
            l('#weight'),
            l('#age'),
            u('#gender div', 'calculating__choose-item_active'),
            u('.calculating__choose_big div', 'calculating__choose-item_active'),
            d();
    }
    e();
}
window.addEventListener('DOMContentLoaded', async () => {
    Ze(), Qe(), Pn(), Ye(), Fn(), vn();
});
