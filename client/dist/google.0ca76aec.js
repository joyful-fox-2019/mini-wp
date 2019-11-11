// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/google.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var gapi = window.gapi = window.gapi || {};
gapi._bs = new Date().getTime();
(function () {
  var g = function g() {
    this.g = "";
  };

  g.prototype.toString = function () {
    return "SafeScript{" + this.g + "}";
  };

  g.prototype.a = function (a) {
    this.g = a;
  };

  new g().a("");

  var h = function h() {
    this.j = "";
  };

  h.prototype.toString = function () {
    return "SafeStyle{" + this.j + "}";
  };

  h.prototype.a = function (a) {
    this.j = a;
  };

  new h().a("");

  var m = function m() {
    this.i = "";
  };

  m.prototype.toString = function () {
    return "SafeStyleSheet{" + this.i + "}";
  };

  m.prototype.a = function (a) {
    this.i = a;
  };

  new m().a("");

  var n = function n() {
    this.f = "";
  };

  n.prototype.toString = function () {
    return "SafeHtml{" + this.f + "}";
  };

  n.prototype.a = function (a) {
    this.f = a;
  };

  new n().a("<!DOCTYPE html>");
  new n().a("");
  new n().a("<br>");
  /*
  gapi.loader.OBJECT_CREATE_TEST_OVERRIDE &&*/

  var q = window,
      v = document,
      aa = q.location,
      ba = function ba() {},
      ca = /\[native code\]/,
      x = function x(a, b, c) {
    return a[b] = a[b] || c;
  },
      da = function da(a) {
    a = a.sort();

    for (var b = [], c = void 0, d = 0; d < a.length; d++) {
      var e = a[d];
      e != c && b.push(e);
      c = e;
    }

    return b;
  },
      y = function y() {
    var a;
    if ((a = Object.create) && ca.test(a)) a = a(null);else {
      a = {};

      for (var b in a) {
        a[b] = void 0;
      }
    }
    return a;
  },
      D = x(q, "gapi", {});

  var E;
  E = x(q, "___jsl", y());
  x(E, "I", 0);
  x(E, "hel", 10);

  var F = function F() {
    var a = aa.href;
    if (E.dpo) var b = E.h;else {
      b = E.h;
      var c = /([#].*&|[#])jsh=([^&#]*)/g,
          d = /([?#].*&|[?#])jsh=([^&#]*)/g;
      if (a = a && (c.exec(a) || d.exec(a))) try {
        b = decodeURIComponent(a[2]);
      } catch (e) {}
    }
    return b;
  },
      fa = function fa(a) {
    var b = x(E, "PQ", []);
    E.PQ = [];
    var c = b.length;
    if (0 === c) a();else for (var d = 0, e = function e() {
      ++d === c && a();
    }, f = 0; f < c; f++) {
      b[f](e);
    }
  },
      G = function G(a) {
    return x(x(E, "H", y()), a, y());
  };

  var H = x(E, "perf", y()),
      K = x(H, "g", y()),
      ha = x(H, "i", y());
  x(H, "r", []);
  y();
  y();

  var L = function L(a, b, c) {
    var d = H.r;
    "function" === typeof d ? d(a, b, c) : d.push([a, b, c]);
  },
      N = function N(a, b, c) {
    b && 0 < b.length && (b = M(b), c && 0 < c.length && (b += "___" + M(c)), 28 < b.length && (b = b.substr(0, 28) + (b.length - 28)), c = b, b = x(ha, "_p", y()), x(b, c, y())[a] = new Date().getTime(), L(a, "_p", c));
  },
      M = function M(a) {
    return a.join("__").replace(/\./g, "_").replace(/\-/g, "_").replace(/,/g, "_");
  };

  var O = y(),
      R = [],
      S = function S(a) {
    throw Error("Bad hint" + (a ? ": " + a : ""));
  };

  R.push(["jsl", function (a) {
    for (var b in a) {
      if (Object.prototype.hasOwnProperty.call(a, b)) {
        var c = a[b];
        "object" == _typeof(c) ? E[b] = x(E, b, []).concat(c) : x(E, b, c);
      }
    }

    if (b = a.u) a = x(E, "us", []), a.push(b), (b = /^https:(.*)$/.exec(b)) && a.push("http:" + b[1]);
  }]);

  var ia = /^(\/[a-zA-Z0-9_\-]+)+$/,
      T = [/\/amp\//, /\/amp$/, /^\/amp$/],
      ja = /^[a-zA-Z0-9\-_\.,!]+$/,
      ka = /^gapi\.loaded_[0-9]+$/,
      la = /^[a-zA-Z0-9,._-]+$/,
      pa = function pa(a, b, c, d) {
    var e = a.split(";"),
        f = e.shift(),
        l = O[f],
        k = null;
    l ? k = l(e, b, c, d) : S("no hint processor for: " + f);
    k || S("failed to generate load url");
    b = k;
    c = b.match(ma);
    (d = b.match(na)) && 1 === d.length && oa.test(b) && c && 1 === c.length || S("failed sanity: " + a);
    return k;
  },
      ra = function ra(a, b, c, d) {
    a = qa(a);
    ka.test(c) || S("invalid_callback");
    b = U(b);
    d = d && d.length ? U(d) : null;

    var e = function e(f) {
      return encodeURIComponent(f).replace(/%2C/g, ",");
    };

    return [encodeURIComponent(a.pathPrefix).replace(/%2C/g, ",").replace(/%2F/g, "/"), "/k=", e(a.version), "/m=", e(b), d ? "/exm=" + e(d) : "", "/rt=j/sv=1/d=1/ed=1", a.b ? "/am=" + e(a.b) : "", a.l ? "/rs=" + e(a.l) : "", a.o ? "/t=" + e(a.o) : "", "/cb=", e(c)].join("");
  },
      qa = function qa(a) {
    "/" !== a.charAt(0) && S("relative path");

    for (var b = a.substring(1).split("/"), c = []; b.length;) {
      a = b.shift();
      if (!a.length || 0 == a.indexOf(".")) S("empty/relative directory");else if (0 < a.indexOf("=")) {
        b.unshift(a);
        break;
      }
      c.push(a);
    }

    a = {};

    for (var d = 0, e = b.length; d < e; ++d) {
      var f = b[d].split("="),
          l = decodeURIComponent(f[0]),
          k = decodeURIComponent(f[1]);
      2 == f.length && l && k && (a[l] = a[l] || k);
    }

    b = "/" + c.join("/");
    ia.test(b) || S("invalid_prefix");
    c = 0;

    for (d = T.length; c < d; ++c) {
      T[c].test(b) && S("invalid_prefix");
    }

    c = V(a, "k", !0);
    d = V(a, "am");
    e = V(a, "rs");
    a = V(a, "t");
    return {
      pathPrefix: b,
      version: c,
      b: d,
      l: e,
      o: a
    };
  },
      U = function U(a) {
    for (var b = [], c = 0, d = a.length; c < d; ++c) {
      var e = a[c].replace(/\./g, "_").replace(/-/g, "_");
      la.test(e) && b.push(e);
    }

    return b.join(",");
  },
      V = function V(a, b, c) {
    a = a[b];
    !a && c && S("missing: " + b);

    if (a) {
      if (ja.test(a)) return a;
      S("invalid: " + b);
    }

    return null;
  },
      oa = /^https?:\/\/[a-z0-9_.-]+\.google(rs)?\.com(:\d+)?\/[a-zA-Z0-9_.,!=\-\/]+$/,
      na = /\/cb=/g,
      ma = /\/\//g,
      sa = function sa() {
    var a = F();
    if (!a) throw Error("Bad hint");
    return a;
  };

  O.m = function (a, b, c, d) {
    (a = a[0]) || S("missing_hint");
    return "https://apis.google.com" + ra(a, b, c, d);
  };

  var W = decodeURI("%73cript"),
      X = /^[-+_0-9\/A-Za-z]+={0,2}$/,
      Y = function Y(a, b) {
    for (var c = [], d = 0; d < a.length; ++d) {
      var e = a[d],
          f;

      if (f = e) {
        a: {
          for (f = 0; f < b.length; f++) {
            if (b[f] === e) break a;
          }

          f = -1;
        }

        f = 0 > f;
      }

      f && c.push(e);
    }

    return c;
  },
      Z = function Z() {
    var a = E.nonce;
    return void 0 !== a ? a && a === String(a) && a.match(X) ? a : E.nonce = null : v.querySelector ? (a = v.querySelector("script[nonce]")) ? (a = a.nonce || a.getAttribute("nonce") || "", a && a === String(a) && a.match(X) ? E.nonce = a : E.nonce = null) : null : null;
  },
      ua = function ua(a) {
    if ("loading" != v.readyState) ta(a);else {
      var b = Z(),
          c = "";
      null !== b && (c = ' nonce="' + b + '"');
      a = "<" + W + ' src="' + encodeURI(a) + '"' + c + "></" + W + ">";
      v.write(a);
    }
  },
      ta = function ta(a) {
    var b = v.createElement(W);
    b.setAttribute("src", a);
    a = Z();
    null !== a && b.setAttribute("nonce", a);
    b.async = "true";
    (a = v.getElementsByTagName(W)[0]) ? a.parentNode.insertBefore(b, a) : (v.head || v.body || v.documentElement).appendChild(b);
  },
      va = function va(a, b) {
    var c = b && b._c;
    if (c) for (var d = 0; d < R.length; d++) {
      var e = R[d][0],
          f = R[d][1];
      f && Object.prototype.hasOwnProperty.call(c, e) && f(c[e], a, b);
    }
  },
      xa = function xa(a, b, c) {
    wa(function () {
      var d = b === F() ? x(D, "_", y()) : y();
      d = x(G(b), "_", d);
      a(d);
    }, c);
  },
      za = function za(a, b) {
    var c = b || {};
    "function" == typeof b && (c = {}, c.callback = b);
    va(a, c);
    b = a ? a.split(":") : [];
    var d = c.h || sa(),
        e = x(E, "ah", y());

    if (e["::"] && b.length) {
      a = [];

      for (var f = null; f = b.shift();) {
        var l = f.split(".");
        l = e[f] || e[l[1] && "ns:" + l[0] || ""] || d;
        var k = a.length && a[a.length - 1] || null,
            w = k;
        k && k.hint == l || (w = {
          hint: l,
          c: []
        }, a.push(w));
        w.c.push(f);
      }

      var z = a.length;

      if (1 < z) {
        var A = c.callback;
        A && (c.callback = function () {
          0 == --z && A();
        });
      }

      for (; b = a.shift();) {
        ya(b.c, c, b.hint);
      }
    } else ya(b || [], c, d);
  },
      ya = function ya(a, b, c) {
    a = da(a) || [];
    var d = b.callback,
        e = b.config,
        f = b.timeout,
        l = b.ontimeout,
        k = b.onerror,
        w = void 0;
    "function" == typeof k && (w = k);
    var z = null,
        A = !1;
    if (f && !l || !f && l) throw "Timeout requires both the timeout parameter and ontimeout parameter to be set";
    k = x(G(c), "r", []).sort();

    var P = x(G(c), "L", []).sort(),
        I = [].concat(k),
        ea = function ea(u, B) {
      if (A) return 0;
      q.clearTimeout(z);
      P.push.apply(P, p);
      var C = ((D || {}).config || {}).update;
      C ? C(e) : e && x(E, "cu", []).push(e);

      if (B) {
        N("me0", u, I);

        try {
          xa(B, c, w);
        } finally {
          N("me1", u, I);
        }
      }

      return 1;
    };

    0 < f && (z = q.setTimeout(function () {
      A = !0;
      l();
    }, f));
    var p = Y(a, P);

    if (p.length) {
      p = Y(a, k);
      var r = x(E, "CP", []),
          t = r.length;

      r[t] = function (u) {
        if (!u) return 0;
        N("ml1", p, I);

        var B = function B(J) {
          r[t] = null;
          ea(p, u) && fa(function () {
            d && d();
            J();
          });
        },
            C = function C() {
          var J = r[t + 1];
          J && J();
        };

        0 < t && r[t - 1] ? r[t] = function () {
          B(C);
        } : B(C);
      };

      if (p.length) {
        var Q = "loaded_" + E.I++;

        D[Q] = function (u) {
          r[t](u);
          D[Q] = null;
        };

        a = pa(c, p, "gapi." + Q, k);
        k.push.apply(k, p);
        N("ml0", p, I);
        b.sync || q.___gapisync ? ua(a) : ta(a);
      } else r[t](ba);
    } else ea(p) && d && d();
  };

  var wa = function wa(a, b) {
    if (E.hee && 0 < E.hel) try {
      return a();
    } catch (c) {
      b && b(c), E.hel--, za("debug_error", function () {
        try {
          window.___jsl.hefn(c);
        } catch (d) {
          throw c;
        }
      });
    } else try {
      return a();
    } catch (c) {
      throw b && b(c), c;
    }
  };

  D.load = function (a, b) {
    return wa(function () {
      return za(a, b);
    });
  };

  K.bs0 = window.gapi._bs || new Date().getTime();
  L("bs0");
  K.bs1 = new Date().getTime();
  L("bs1");
  delete window.gapi._bs;
}).call(this);
gapi.load("client", {
  callback: window["gapi_onload"],
  _c: {
    "jsl": {
      "ci": {
        "deviceType": "desktop",
        "oauth-flow": {
          "authUrl": "https://accounts.google.com/o/oauth2/auth",
          "proxyUrl": "https://accounts.google.com/o/oauth2/postmessageRelay",
          "disableOpt": true,
          "idpIframeUrl": "https://accounts.google.com/o/oauth2/iframe",
          "usegapi": false
        },
        "debug": {
          "reportExceptionRate": 0.05,
          "forceIm": false,
          "rethrowException": false,
          "host": "https://apis.google.com"
        },
        "enableMultilogin": true,
        "googleapis.config": {
          "auth": {
            "useFirstPartyAuthV2": true
          }
        },
        "isPlusUser": false,
        "inline": {
          "css": 1
        },
        "disableRealtimeCallback": false,
        "drive_share": {
          "skipInitCommand": true
        },
        "csi": {
          "rate": 0.01
        },
        "client": {
          "cors": false
        },
        "isLoggedIn": true,
        "signInDeprecation": {
          "rate": 0.0
        },
        "include_granted_scopes": true,
        "llang": "en",
        "iframes": {
          "youtube": {
            "params": {
              "location": ["search", "hash"]
            },
            "url": ":socialhost:/:session_prefix:_/widget/render/youtube?usegapi=1",
            "methods": ["scroll", "openwindow"]
          },
          "ytsubscribe": {
            "url": "https://www.youtube.com/subscribe_embed?usegapi=1"
          },
          "plus_circle": {
            "params": {
              "url": ""
            },
            "url": ":socialhost:/:session_prefix::se:_/widget/plus/circle?usegapi=1"
          },
          "plus_share": {
            "params": {
              "url": ""
            },
            "url": ":socialhost:/:session_prefix::se:_/+1/sharebutton?plusShare=true&usegapi=1"
          },
          "rbr_s": {
            "params": {
              "url": ""
            },
            "url": ":socialhost:/:session_prefix::se:_/widget/render/recobarsimplescroller"
          },
          ":source:": "3p",
          "playemm": {
            "url": "https://play.google.com/work/embedded/search?usegapi=1&usegapi=1"
          },
          "savetoandroidpay": {
            "url": "https://pay.google.com/gp/v/widget/save"
          },
          "blogger": {
            "params": {
              "location": ["search", "hash"]
            },
            "url": ":socialhost:/:session_prefix:_/widget/render/blogger?usegapi=1",
            "methods": ["scroll", "openwindow"]
          },
          "evwidget": {
            "params": {
              "url": ""
            },
            "url": ":socialhost:/:session_prefix:_/events/widget?usegapi=1"
          },
          "partnersbadge": {
            "url": "https://www.gstatic.com/partners/badge/templates/badge.html?usegapi=1"
          },
          "dataconnector": {
            "url": "https://dataconnector.corp.google.com/:session_prefix:ui/widgetview?usegapi=1"
          },
          "surveyoptin": {
            "url": "https://www.google.com/shopping/customerreviews/optin?usegapi=1"
          },
          ":socialhost:": "https://apis.google.com",
          "shortlists": {
            "url": ""
          },
          "hangout": {
            "url": "https://talkgadget.google.com/:session_prefix:talkgadget/_/widget"
          },
          "plus_followers": {
            "params": {
              "url": ""
            },
            "url": ":socialhost:/_/im/_/widget/render/plus/followers?usegapi=1"
          },
          "post": {
            "params": {
              "url": ""
            },
            "url": ":socialhost:/:session_prefix::im_prefix:_/widget/render/post?usegapi=1"
          },
          ":gplus_url:": "https://plus.google.com",
          "signin": {
            "params": {
              "url": ""
            },
            "url": ":socialhost:/:session_prefix:_/widget/render/signin?usegapi=1",
            "methods": ["onauth"]
          },
          "rbr_i": {
            "params": {
              "url": ""
            },
            "url": ":socialhost:/:session_prefix::se:_/widget/render/recobarinvitation"
          },
          "donation": {
            "url": "https://onetoday.google.com/home/donationWidget?usegapi=1"
          },
          "share": {
            "url": ":socialhost:/:session_prefix::im_prefix:_/widget/render/share?usegapi=1"
          },
          "plusone": {
            "params": {
              "count": "",
              "size": "",
              "url": ""
            },
            "url": ":socialhost:/:session_prefix::se:_/+1/fastbutton?usegapi=1"
          },
          "comments": {
            "params": {
              "location": ["search", "hash"]
            },
            "url": ":socialhost:/:session_prefix:_/widget/render/comments?usegapi=1",
            "methods": ["scroll", "openwindow"]
          },
          ":im_socialhost:": "https://plus.googleapis.com",
          "backdrop": {
            "url": "https://clients3.google.com/cast/chromecast/home/widget/backdrop?usegapi=1"
          },
          "visibility": {
            "params": {
              "url": ""
            },
            "url": ":socialhost:/:session_prefix:_/widget/render/visibility?usegapi=1"
          },
          "autocomplete": {
            "params": {
              "url": ""
            },
            "url": ":socialhost:/:session_prefix:_/widget/render/autocomplete"
          },
          "additnow": {
            "url": "https://apis.google.com/marketplace/button?usegapi=1",
            "methods": ["launchurl"]
          },
          ":signuphost:": "https://plus.google.com",
          "ratingbadge": {
            "url": "https://www.google.com/shopping/customerreviews/badge?usegapi=1"
          },
          "appcirclepicker": {
            "url": ":socialhost:/:session_prefix:_/widget/render/appcirclepicker"
          },
          "follow": {
            "url": ":socialhost:/:session_prefix:_/widget/render/follow?usegapi=1"
          },
          "community": {
            "url": ":ctx_socialhost:/:session_prefix::im_prefix:_/widget/render/community?usegapi=1"
          },
          "sharetoclassroom": {
            "url": "https://www.gstatic.com/classroom/sharewidget/widget_stable.html?usegapi=1"
          },
          "ytshare": {
            "params": {
              "url": ""
            },
            "url": ":socialhost:/:session_prefix:_/widget/render/ytshare?usegapi=1"
          },
          "plus": {
            "url": ":socialhost:/:session_prefix:_/widget/render/badge?usegapi=1"
          },
          "family_creation": {
            "params": {
              "url": ""
            },
            "url": "https://families.google.com/webcreation?usegapi=1&usegapi=1"
          },
          "commentcount": {
            "url": ":socialhost:/:session_prefix:_/widget/render/commentcount?usegapi=1"
          },
          "configurator": {
            "url": ":socialhost:/:session_prefix:_/plusbuttonconfigurator?usegapi=1"
          },
          "zoomableimage": {
            "url": "https://ssl.gstatic.com/microscope/embed/"
          },
          "appfinder": {
            "url": "https://gsuite.google.com/:session_prefix:marketplace/appfinder?usegapi=1"
          },
          "savetowallet": {
            "url": "https://pay.google.com/gp/v/widget/save"
          },
          "person": {
            "url": ":socialhost:/:session_prefix:_/widget/render/person?usegapi=1"
          },
          "savetodrive": {
            "url": "https://drive.google.com/savetodrivebutton?usegapi=1",
            "methods": ["save"]
          },
          "page": {
            "url": ":socialhost:/:session_prefix:_/widget/render/page?usegapi=1"
          },
          "card": {
            "url": ":socialhost:/:session_prefix:_/hovercard/card"
          }
        }
      },
      "h": "m;/_/scs/apps-static/_/js/k=oz.gapi.en.7kWSr24wXFc.O/am=wQE/d=1/ct=zgms/rs=AGLTcCN-4ZptW5UzimRFZRBm6izu5h2ZaQ/m=__features__",
      "u": "https://apis.google.com/js/api:client.js",
      "hee": true,
      "fp": "099e179eeab1be8c339ac2c410efb4ef6f9b33b7",
      "dpo": false
    },
    "fp": "099e179eeab1be8c339ac2c410efb4ef6f9b33b7",
    "annotation": ["interactivepost", "recobar", "signin2", "autocomplete", "profile"],
    "bimodal": ["signin", "share"]
  }
});
},{}],"../../../../../../.nvm/versions/node/v10.16.3/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "38787" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../.nvm/versions/node/v10.16.3/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/google.js"], null)
//# sourceMappingURL=/google.0ca76aec.js.map