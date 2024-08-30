var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
(function() {
  "use strict";
  const _toolbar = class _toolbar {
    constructor(targets, document2 = document2, window2 = window2) {
      this.events = {};
      this.arr = [];
      this.tEdited;
      this.pApply;
      this.document = document2;
      this.window = window2;
      this.targets = targets;
      this.targets.forEach((element) => {
        const id = Math.random().toString(36).substr(2, 9);
        element.setAttribute("data-id-title", id);
        let dataAttributesString = element.dataset.attributes;
        const attrObject = JSON.parse(dataAttributesString);
        this.arr.push({
          id,
          html: element,
          value: element.innerHTML,
          tag: element.tagName.toLowerCase(),
          classes: element.classList,
          focus: this.getAttributeValue(attrObject, "focus"),
          inside: false,
          // Ici, je suppose que "inside" n'est pas un attribut de données, donc je le laisse inchangé
          bold: this.getAttributeValue(attrObject, "bold"),
          italic: this.getAttributeValue(attrObject, "italic"),
          underline: this.getAttributeValue(attrObject, "underline"),
          size: this.getAttributeValue(attrObject, "size") ? this.getAttributeValue(attrObject, "size") : 32
        });
      });
      for (const t of this.arr) {
        const id = t.id;
        const e = this.document.querySelector('[data-id-title="' + id + '"]');
        e.setAttribute("contenteditable", "true");
        t.size = e.style.fontSize;
      }
      this.toolbar = this.document.createElement("div");
      this.toolbar.id = "toolbar";
      this.document.getElementsByTagName("body")[0].appendChild(this.toolbar);
      this.select = this.document.createElement("select");
      this.select.id = "select";
      this.select.innerHTML = `
      <option value="h1">H1</option>
      <option value="h2">H2</option>
      <option value="h3">H3</option>
      <option value="h4">H4</option>
      <option value="h5">H5</option>
      <option value="h6">H6</option>
      <option value="p">p</option>
      <option value="span">span</option>
      `;
      this.select.selectedIndex = 1;
      this.toolbar.appendChild(this.select);
      this.size = this.document.createElement("input");
      this.size.id = "size";
      this.size.type = "number";
      this.size.value = "32";
      this.size.min = "1";
      this.size.max = "100";
      this.size.step = "1";
      this.toolbar.appendChild(this.size);
      this.sep = this.document.createElement("div");
      this.sep.classList = "sep";
      this.toolbar.appendChild(this.sep);
      this.B = this.document.createElement("button");
      this.Bo = false;
      this.B.id = "Bold";
      this.B.innerHTML = "B";
      this.toolbar.appendChild(this.B);
      this.I = this.document.createElement("button");
      this.Io = false;
      this.I.id = "Italics";
      this.I.innerHTML = "I";
      this.toolbar.appendChild(this.I);
      this.U = this.document.createElement("button");
      this.Uo = false;
      this.U.id = "Underline";
      this.U.innerHTML = "U";
      this.toolbar.appendChild(this.U);
      this.init();
      this.setVisibility();
    }
    init() {
      for (const t of this.arr) {
        let e = this.document.querySelector('[data-id-title="' + t.id + '"]');
        for (const i of this.targets) {
          this.setBinging(i, t, e);
        }
        this.select.addEventListener("change", () => {
          const z = {
            id: t.id,
            focus: t.focus,
            tag: this.select.value,
            classes: Array.from(e.classList),
            inside: t.inside,
            bold: t.bold,
            italic: t.italic,
            underline: t.underline,
            size: t.size
          };
          const lastT = structuredClone(z);
          if (this.tEdited == t.id) {
            let text = e.innerHTML;
            let tag = this.select.value;
            let newElement = this.document.createElement(tag);
            newElement.innerHTML = text;
            newElement.classList = e.classList;
            e.replaceWith(newElement);
            let id_prettyblocks = e.getAttribute("data-block-id_prettyblock");
            newElement.setAttribute("data-block-id_prettyblock", id_prettyblocks);
            let data_field = e.getAttribute("data-field");
            newElement.setAttribute("data-field", data_field);
            e = newElement;
            e.setAttribute("data-id-title", t.id);
            e.setAttribute("contenteditable", "true");
            if (t.bold == true) {
              e.style.fontWeight = "bold";
            }
            if (t.italic == true) {
              e.style.fontStyle = "italic";
            }
            if (t.underline == true) {
              e.style.textDecoration = "underline";
            }
            e.style.fontSize = t.size + "px";
            this.setVisibility();
            t.html = newElement;
            this.change(lastT, t);
            this.setBinging(newElement, t, e);
          }
        });
        this.size.addEventListener("change", () => {
          if (this.tEdited == t.id) {
            const z = {
              id: t.id,
              focus: t.focus,
              tag: this.select.value,
              classes: Array.from(e.classList),
              inside: t.inside,
              bold: t.bold,
              italic: t.italic,
              underline: t.underline,
              size: t.size
            };
            const lastT = structuredClone(z);
            e.style.fontSize = this.size.value + "px";
            t.size = this.size.value;
            this.change(lastT, t);
          }
        });
        this.B.addEventListener("click", () => {
          if (this.tEdited == t.id) {
            const z = {
              id: t.id,
              focus: t.focus,
              tag: this.select.value,
              classes: Array.from(e.classList),
              inside: t.inside,
              bold: t.bold,
              italic: t.italic,
              underline: t.underline,
              size: t.size
            };
            const lastT = structuredClone(z);
            if (t.bold == false) {
              t.bold = true;
              this.B.style.color = "#6ae26a";
              e.style.fontWeight = "bold";
              this.change(lastT, t);
            } else {
              t.bold = false;
              this.B.style.color = "white";
              e.style.fontWeight = "normal";
              this.change(lastT, t);
            }
          }
        });
        this.I.addEventListener("click", () => {
          if (this.tEdited == t.id) {
            const z = {
              id: t.id,
              focus: t.focus,
              tag: this.select.value,
              classes: Array.from(e.classList),
              inside: t.inside,
              bold: t.bold,
              italic: t.italic,
              underline: t.underline,
              size: t.size
            };
            const lastT = structuredClone(z);
            if (t.italic == false) {
              t.italic = true;
              this.I.style.color = "#6ae26a";
              e.style.fontStyle = "italic";
              this.change(lastT, t);
            } else {
              t.italic = false;
              this.I.style.color = "white";
              e.style.fontStyle = "normal";
              this.change(lastT, t);
            }
          }
        });
        this.U.addEventListener("click", () => {
          if (this.tEdited == t.id) {
            let underline = !t.underline;
            this.setAttributeValue(e, "underline", underline);
            t.underline = underline;
            const z = {
              id: t.id,
              focus: t.focus,
              inside: t.inside,
              tag: this.select.value,
              classes: Array.from(e.classList),
              bold: t.bold,
              italic: t.italic,
              underline: t.underline,
              size: t.size
            };
            const lastT = structuredClone(z);
            if (t.underline) {
              this.U.style.color = "#6ae26a";
              e.style.textDecoration = "underline";
            } else {
              this.U.style.color = "white";
              e.style.textDecoration = "none";
            }
            this.change(lastT, t);
          }
        });
      }
    }
    setBinging(i, t, e) {
      if (i.getAttribute("data-id-title") == t.id) {
        i.addEventListener("keydown", (k) => {
          if (k.ctrlKey && k.key == "s" || k.ctrlKey && k.key == "S" || k.metaKey && k.key == "s" || k.metaKey && k.key == "S") {
            k.preventDefault();
            t.value = e.innerHTML;
            this.change(this.pApply, t);
            i.blur();
          }
          if (k.shiftKey && k.key == "Enter") {
            k.preventDefault();
            this.document.execCommand("insertHTML", false, "<br><br>");
          } else if (k.key == "Enter") {
            k.preventDefault();
            t.value = e.innerHTML;
            this.change(this.pApply, t);
            i.blur();
          }
        });
      }
    }
    getAttributeValue(attrObject, attributeName) {
      return attrObject.hasOwnProperty(attributeName) ? attrObject[attributeName] : false;
    }
    setAttributeValue(element, attributeName, newValue) {
      let attrString = element.getAttribute("data-attributes");
      let attrObject = null;
      attrObject = JSON.parse(attrString);
      if (attrObject && attrObject.hasOwnProperty(attributeName)) {
        attrObject[attributeName] = newValue;
      }
      element.setAttribute("data-attributes", JSON.stringify(attrObject || {}));
    }
    setVisibility() {
      for (const t of this.arr) {
        const e = this.document.querySelector('[data-id-title="' + t.id + '"]');
        let inside = false;
        let focus = false;
        e.addEventListener("mousedown", (e2) => {
          focus = true;
          this.toolbar.style.display = "flex";
          const id = e2.target.getAttribute("data-id-title");
          const res = this.arr.filter((item) => item.id == id)[0];
          this.refreshToolbar(res);
          const z = {
            id: t.id,
            focus: t.focus,
            inside: t.inside,
            bold: t.bold,
            tag: this.select.value,
            italic: t.italic,
            underline: t.underline,
            size: t.size,
            value: e2.target.innerHTML
          };
          this.pApply = structuredClone(z);
        });
        e.addEventListener("mouseleave", () => {
          inside = false;
          if (!focus) {
            setTimeout(() => {
              if (!inside && !focus) {
                this.toolbar.style.display = "none";
              }
            }, 1e3);
          }
        });
        e.addEventListener("focus", (e2) => {
          focus = true;
          this.toolbar.style.display = "flex";
          const id = e2.target.getAttribute("data-id-title");
          const res = this.arr.filter((item) => item.id == id)[0];
          this.refreshToolbar(res);
        });
        e.addEventListener("blur", () => {
          focus = false;
          if (!inside) {
            setTimeout(() => {
              if (!inside && !focus) {
                this.toolbar.style.display = "none";
              }
            }, 1e3);
          }
        });
        this.toolbar.addEventListener("mouseenter", (e2) => {
          inside = true;
          this.toolbar.style.display = "flex";
        });
        this.toolbar.addEventListener("mouseleave", (event) => {
          const e2 = event.toElement || event.relatedTarget;
          inside = false;
          setTimeout(() => {
            if (e2 && (e2.parentNode === this || e2 === this || e2.parentNode === this.toolbar)) {
              return;
            } else if (!focus) {
              this.toolbar.style.display = "none";
            }
          }, 1e3);
        });
      }
    }
    refreshToolbar(obj) {
      const id = obj.id;
      const e = this.document.querySelector('[data-id-title="' + id + '"]');
      const tag = e.tagName.toLowerCase();
      const top = this.findTop(e);
      const left = this.findLeft(e);
      const fz = Math.round(
        this.window.getComputedStyle(e, null).getPropertyValue("font-size").split("px")[0]
      );
      const p2 = e.getBoundingClientRect();
      const tp = this.toolbar.getBoundingClientRect();
      this.toolbar.style.top = top - tp.height + 55 + "px";
      this.toolbar.style.left = left + p2.width / 2 - tp.width + "px";
      this.tEdited = obj.id;
      this.size.value = fz;
      obj.size = fz;
      if (tag == "h1") this.select.selectedIndex = 0;
      if (tag == "h2") this.select.selectedIndex = 1;
      if (tag == "h3") this.select.selectedIndex = 2;
      if (tag == "h4") this.select.selectedIndex = 3;
      if (tag == "h5") this.select.selectedIndex = 4;
      if (tag == "h6") this.select.selectedIndex = 5;
      if (tag == "p") this.select.selectedIndex = 6;
      if (tag == "span") this.select.selectedIndex = 7;
      if (obj.bold) {
        this.B.style.color = "#6ae26a";
      } else {
        this.B.style.color = "white";
      }
      if (obj.italic) {
        this.I.style.color = "#6ae26a";
      } else {
        this.I.style.color = "white";
      }
      if (obj.underline) {
        this.U.style.color = "#6ae26a";
      } else {
        this.U.style.color = "white";
      }
    }
    // event with callback
    on(event, callback) {
      if (!this.events[event]) {
        this.events[event] = [];
      }
      this.events[event].push(callback);
    }
    trigger(event, ...args) {
      const callbacks = this.events[event];
      if (callbacks) {
        callbacks.forEach((callback) => {
          callback(...args);
        });
      }
    }
    change(lastValue, newValue) {
      lastValue.html = newValue.html;
      lastValue.value = newValue.value;
      lastValue.classes = newValue.classes;
      lastValue.bold = newValue.bold;
      lastValue.italic = newValue.italic;
      lastValue.underline = newValue.underline;
      lastValue.size = newValue.size;
      this.trigger("change", lastValue, newValue);
    }
    apply(lastValue, newValue) {
      if (!newValue.inside && !newValue.focus) {
        lastValue.html = newValue == null ? void 0 : newValue.html;
        newValue.value = newValue.html.innerHTML;
        this.trigger("apply", lastValue, newValue);
      }
    }
    /**
     * https://stackoverflow.com/questions/442404/retrieve-the-position-x-y-of-an-html-element/44113758#44113758
     * @param {*} element
     * @returns  {number}
     *
     */
    findTop(element) {
      var rec = element.getBoundingClientRect();
      return rec.top + this.window.scrollY;
    }
    //call it like findTop('#header');
    findLeft(element) {
      var rec = element.getBoundingClientRect();
      return rec.left + this.window.scrollX;
    }
    //call it like findLeft('#header');
  };
  __name(_toolbar, "toolbar");
  let toolbar = _toolbar;
  var define_process_env_default$5 = {};
  /**
  * @vue/shared v3.4.34
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
  /*! #__NO_SIDE_EFFECTS__ */
  // @__NO_SIDE_EFFECTS__
  function makeMap(str, expectsLowerCase) {
    const set2 = new Set(str.split(","));
    return (val) => set2.has(val);
  }
  __name(makeMap, "makeMap");
  const EMPTY_OBJ = !!(define_process_env_default$5.NODE_ENV !== "production") ? Object.freeze({}) : {};
  const EMPTY_ARR = !!(define_process_env_default$5.NODE_ENV !== "production") ? Object.freeze([]) : [];
  const NOOP = /* @__PURE__ */ __name(() => {
  }, "NOOP");
  const NO = /* @__PURE__ */ __name(() => false, "NO");
  const isOn = /* @__PURE__ */ __name((key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // uppercase letter
  (key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97), "isOn");
  const isModelListener = /* @__PURE__ */ __name((key) => key.startsWith("onUpdate:"), "isModelListener");
  const extend = Object.assign;
  const remove = /* @__PURE__ */ __name((arr, el) => {
    const i = arr.indexOf(el);
    if (i > -1) {
      arr.splice(i, 1);
    }
  }, "remove");
  const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  const hasOwn = /* @__PURE__ */ __name((val, key) => hasOwnProperty$1.call(val, key), "hasOwn");
  const isArray = Array.isArray;
  const isMap = /* @__PURE__ */ __name((val) => toTypeString(val) === "[object Map]", "isMap");
  const isSet = /* @__PURE__ */ __name((val) => toTypeString(val) === "[object Set]", "isSet");
  const isFunction = /* @__PURE__ */ __name((val) => typeof val === "function", "isFunction");
  const isString = /* @__PURE__ */ __name((val) => typeof val === "string", "isString");
  const isSymbol = /* @__PURE__ */ __name((val) => typeof val === "symbol", "isSymbol");
  const isObject = /* @__PURE__ */ __name((val) => val !== null && typeof val === "object", "isObject");
  const isPromise = /* @__PURE__ */ __name((val) => {
    return (isObject(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
  }, "isPromise");
  const objectToString = Object.prototype.toString;
  const toTypeString = /* @__PURE__ */ __name((value) => objectToString.call(value), "toTypeString");
  const toRawType = /* @__PURE__ */ __name((value) => {
    return toTypeString(value).slice(8, -1);
  }, "toRawType");
  const isPlainObject$1 = /* @__PURE__ */ __name((val) => toTypeString(val) === "[object Object]", "isPlainObject$1");
  const isIntegerKey = /* @__PURE__ */ __name((key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key, "isIntegerKey");
  const isReservedProp = /* @__PURE__ */ makeMap(
    // the leading comma is intentional so empty string "" is also included
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  );
  const isBuiltInDirective = /* @__PURE__ */ makeMap(
    "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
  );
  const cacheStringFunction = /* @__PURE__ */ __name((fn) => {
    const cache = /* @__PURE__ */ Object.create(null);
    return (str) => {
      const hit = cache[str];
      return hit || (cache[str] = fn(str));
    };
  }, "cacheStringFunction");
  const camelizeRE = /-(\w)/g;
  const camelize = cacheStringFunction((str) => {
    return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
  });
  const hyphenateRE = /\B([A-Z])/g;
  const hyphenate = cacheStringFunction(
    (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
  );
  const capitalize = cacheStringFunction((str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  });
  const toHandlerKey = cacheStringFunction((str) => {
    const s = str ? `on${capitalize(str)}` : ``;
    return s;
  });
  const hasChanged = /* @__PURE__ */ __name((value, oldValue) => !Object.is(value, oldValue), "hasChanged");
  const invokeArrayFns = /* @__PURE__ */ __name((fns, ...arg) => {
    for (let i = 0; i < fns.length; i++) {
      fns[i](...arg);
    }
  }, "invokeArrayFns");
  const def = /* @__PURE__ */ __name((obj, key, value, writable = false) => {
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: false,
      writable,
      value
    });
  }, "def");
  const looseToNumber = /* @__PURE__ */ __name((val) => {
    const n = parseFloat(val);
    return isNaN(n) ? val : n;
  }, "looseToNumber");
  const toNumber = /* @__PURE__ */ __name((val) => {
    const n = isString(val) ? Number(val) : NaN;
    return isNaN(n) ? val : n;
  }, "toNumber");
  let _globalThis;
  const getGlobalThis = /* @__PURE__ */ __name(() => {
    return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
  }, "getGlobalThis");
  function normalizeStyle(value) {
    if (isArray(value)) {
      const res = {};
      for (let i = 0; i < value.length; i++) {
        const item = value[i];
        const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
        if (normalized) {
          for (const key in normalized) {
            res[key] = normalized[key];
          }
        }
      }
      return res;
    } else if (isString(value) || isObject(value)) {
      return value;
    }
  }
  __name(normalizeStyle, "normalizeStyle");
  const listDelimiterRE = /;(?![^(]*\))/g;
  const propertyDelimiterRE = /:([^]+)/;
  const styleCommentRE = /\/\*[^]*?\*\//g;
  function parseStringStyle(cssText) {
    const ret = {};
    cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
      if (item) {
        const tmp = item.split(propertyDelimiterRE);
        tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
      }
    });
    return ret;
  }
  __name(parseStringStyle, "parseStringStyle");
  function normalizeClass(value) {
    let res = "";
    if (isString(value)) {
      res = value;
    } else if (isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        const normalized = normalizeClass(value[i]);
        if (normalized) {
          res += normalized + " ";
        }
      }
    } else if (isObject(value)) {
      for (const name in value) {
        if (value[name]) {
          res += name + " ";
        }
      }
    }
    return res.trim();
  }
  __name(normalizeClass, "normalizeClass");
  const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
  const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
  function includeBooleanAttr(value) {
    return !!value || value === "";
  }
  __name(includeBooleanAttr, "includeBooleanAttr");
  var define_process_env_default$4 = {};
  function warn$2(msg, ...args) {
    console.warn(`[Vue warn] ${msg}`, ...args);
  }
  __name(warn$2, "warn$2");
  let activeEffectScope;
  const _EffectScope = class _EffectScope {
    constructor(detached = false) {
      this.detached = detached;
      this._active = true;
      this.effects = [];
      this.cleanups = [];
      this.parent = activeEffectScope;
      if (!detached && activeEffectScope) {
        this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
          this
        ) - 1;
      }
    }
    get active() {
      return this._active;
    }
    run(fn) {
      if (this._active) {
        const currentEffectScope = activeEffectScope;
        try {
          activeEffectScope = this;
          return fn();
        } finally {
          activeEffectScope = currentEffectScope;
        }
      } else if (!!(define_process_env_default$4.NODE_ENV !== "production")) {
        warn$2(`cannot run an inactive effect scope.`);
      }
    }
    /**
     * This should only be called on non-detached scopes
     * @internal
     */
    on() {
      activeEffectScope = this;
    }
    /**
     * This should only be called on non-detached scopes
     * @internal
     */
    off() {
      activeEffectScope = this.parent;
    }
    stop(fromParent) {
      if (this._active) {
        let i, l;
        for (i = 0, l = this.effects.length; i < l; i++) {
          this.effects[i].stop();
        }
        for (i = 0, l = this.cleanups.length; i < l; i++) {
          this.cleanups[i]();
        }
        if (this.scopes) {
          for (i = 0, l = this.scopes.length; i < l; i++) {
            this.scopes[i].stop(true);
          }
        }
        if (!this.detached && this.parent && !fromParent) {
          const last = this.parent.scopes.pop();
          if (last && last !== this) {
            this.parent.scopes[this.index] = last;
            last.index = this.index;
          }
        }
        this.parent = void 0;
        this._active = false;
      }
    }
  };
  __name(_EffectScope, "EffectScope");
  let EffectScope = _EffectScope;
  function effectScope(detached) {
    return new EffectScope(detached);
  }
  __name(effectScope, "effectScope");
  function recordEffectScope(effect2, scope = activeEffectScope) {
    if (scope && scope.active) {
      scope.effects.push(effect2);
    }
  }
  __name(recordEffectScope, "recordEffectScope");
  function getCurrentScope() {
    return activeEffectScope;
  }
  __name(getCurrentScope, "getCurrentScope");
  function onScopeDispose(fn) {
    if (activeEffectScope) {
      activeEffectScope.cleanups.push(fn);
    } else if (!!(define_process_env_default$4.NODE_ENV !== "production")) {
      warn$2(
        `onScopeDispose() is called when there is no active effect scope to be associated with.`
      );
    }
  }
  __name(onScopeDispose, "onScopeDispose");
  let activeEffect;
  const _ReactiveEffect = class _ReactiveEffect {
    constructor(fn, trigger2, scheduler, scope) {
      this.fn = fn;
      this.trigger = trigger2;
      this.scheduler = scheduler;
      this.active = true;
      this.deps = [];
      this._dirtyLevel = 4;
      this._trackId = 0;
      this._runnings = 0;
      this._shouldSchedule = false;
      this._depsLength = 0;
      recordEffectScope(this, scope);
    }
    get dirty() {
      if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
        this._dirtyLevel = 1;
        pauseTracking();
        for (let i = 0; i < this._depsLength; i++) {
          const dep = this.deps[i];
          if (dep.computed) {
            triggerComputed(dep.computed);
            if (this._dirtyLevel >= 4) {
              break;
            }
          }
        }
        if (this._dirtyLevel === 1) {
          this._dirtyLevel = 0;
        }
        resetTracking();
      }
      return this._dirtyLevel >= 4;
    }
    set dirty(v) {
      this._dirtyLevel = v ? 4 : 0;
    }
    run() {
      this._dirtyLevel = 0;
      if (!this.active) {
        return this.fn();
      }
      let lastShouldTrack = shouldTrack;
      let lastEffect = activeEffect;
      try {
        shouldTrack = true;
        activeEffect = this;
        this._runnings++;
        preCleanupEffect(this);
        return this.fn();
      } finally {
        postCleanupEffect(this);
        this._runnings--;
        activeEffect = lastEffect;
        shouldTrack = lastShouldTrack;
      }
    }
    stop() {
      if (this.active) {
        preCleanupEffect(this);
        postCleanupEffect(this);
        this.onStop && this.onStop();
        this.active = false;
      }
    }
  };
  __name(_ReactiveEffect, "ReactiveEffect");
  let ReactiveEffect = _ReactiveEffect;
  function triggerComputed(computed2) {
    return computed2.value;
  }
  __name(triggerComputed, "triggerComputed");
  function preCleanupEffect(effect2) {
    effect2._trackId++;
    effect2._depsLength = 0;
  }
  __name(preCleanupEffect, "preCleanupEffect");
  function postCleanupEffect(effect2) {
    if (effect2.deps.length > effect2._depsLength) {
      for (let i = effect2._depsLength; i < effect2.deps.length; i++) {
        cleanupDepEffect(effect2.deps[i], effect2);
      }
      effect2.deps.length = effect2._depsLength;
    }
  }
  __name(postCleanupEffect, "postCleanupEffect");
  function cleanupDepEffect(dep, effect2) {
    const trackId = dep.get(effect2);
    if (trackId !== void 0 && effect2._trackId !== trackId) {
      dep.delete(effect2);
      if (dep.size === 0) {
        dep.cleanup();
      }
    }
  }
  __name(cleanupDepEffect, "cleanupDepEffect");
  let shouldTrack = true;
  let pauseScheduleStack = 0;
  const trackStack = [];
  function pauseTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = false;
  }
  __name(pauseTracking, "pauseTracking");
  function resetTracking() {
    const last = trackStack.pop();
    shouldTrack = last === void 0 ? true : last;
  }
  __name(resetTracking, "resetTracking");
  function pauseScheduling() {
    pauseScheduleStack++;
  }
  __name(pauseScheduling, "pauseScheduling");
  function resetScheduling() {
    pauseScheduleStack--;
    while (!pauseScheduleStack && queueEffectSchedulers.length) {
      queueEffectSchedulers.shift()();
    }
  }
  __name(resetScheduling, "resetScheduling");
  function trackEffect(effect2, dep, debuggerEventExtraInfo) {
    var _a;
    if (dep.get(effect2) !== effect2._trackId) {
      dep.set(effect2, effect2._trackId);
      const oldDep = effect2.deps[effect2._depsLength];
      if (oldDep !== dep) {
        if (oldDep) {
          cleanupDepEffect(oldDep, effect2);
        }
        effect2.deps[effect2._depsLength++] = dep;
      } else {
        effect2._depsLength++;
      }
      if (!!(define_process_env_default$4.NODE_ENV !== "production")) {
        (_a = effect2.onTrack) == null ? void 0 : _a.call(effect2, extend({ effect: effect2 }, debuggerEventExtraInfo));
      }
    }
  }
  __name(trackEffect, "trackEffect");
  const queueEffectSchedulers = [];
  function triggerEffects(dep, dirtyLevel, debuggerEventExtraInfo) {
    var _a;
    pauseScheduling();
    for (const effect2 of dep.keys()) {
      let tracking;
      if (effect2._dirtyLevel < dirtyLevel && (tracking != null ? tracking : tracking = dep.get(effect2) === effect2._trackId)) {
        effect2._shouldSchedule || (effect2._shouldSchedule = effect2._dirtyLevel === 0);
        effect2._dirtyLevel = dirtyLevel;
      }
      if (effect2._shouldSchedule && (tracking != null ? tracking : tracking = dep.get(effect2) === effect2._trackId)) {
        if (!!(define_process_env_default$4.NODE_ENV !== "production")) {
          (_a = effect2.onTrigger) == null ? void 0 : _a.call(effect2, extend({ effect: effect2 }, debuggerEventExtraInfo));
        }
        effect2.trigger();
        if ((!effect2._runnings || effect2.allowRecurse) && effect2._dirtyLevel !== 2) {
          effect2._shouldSchedule = false;
          if (effect2.scheduler) {
            queueEffectSchedulers.push(effect2.scheduler);
          }
        }
      }
    }
    resetScheduling();
  }
  __name(triggerEffects, "triggerEffects");
  const createDep = /* @__PURE__ */ __name((cleanup, computed2) => {
    const dep = /* @__PURE__ */ new Map();
    dep.cleanup = cleanup;
    dep.computed = computed2;
    return dep;
  }, "createDep");
  const targetMap = /* @__PURE__ */ new WeakMap();
  const ITERATE_KEY = Symbol(!!(define_process_env_default$4.NODE_ENV !== "production") ? "iterate" : "");
  const MAP_KEY_ITERATE_KEY = Symbol(!!(define_process_env_default$4.NODE_ENV !== "production") ? "Map key iterate" : "");
  function track(target, type, key) {
    if (shouldTrack && activeEffect) {
      let depsMap = targetMap.get(target);
      if (!depsMap) {
        targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
      }
      let dep = depsMap.get(key);
      if (!dep) {
        depsMap.set(key, dep = createDep(() => depsMap.delete(key)));
      }
      trackEffect(
        activeEffect,
        dep,
        !!(define_process_env_default$4.NODE_ENV !== "production") ? {
          target,
          type,
          key
        } : void 0
      );
    }
  }
  __name(track, "track");
  function trigger(target, type, key, newValue, oldValue, oldTarget) {
    const depsMap = targetMap.get(target);
    if (!depsMap) {
      return;
    }
    let deps = [];
    if (type === "clear") {
      deps = [...depsMap.values()];
    } else if (key === "length" && isArray(target)) {
      const newLength = Number(newValue);
      depsMap.forEach((dep, key2) => {
        if (key2 === "length" || !isSymbol(key2) && key2 >= newLength) {
          deps.push(dep);
        }
      });
    } else {
      if (key !== void 0) {
        deps.push(depsMap.get(key));
      }
      switch (type) {
        case "add":
          if (!isArray(target)) {
            deps.push(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          } else if (isIntegerKey(key)) {
            deps.push(depsMap.get("length"));
          }
          break;
        case "delete":
          if (!isArray(target)) {
            deps.push(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          }
          break;
        case "set":
          if (isMap(target)) {
            deps.push(depsMap.get(ITERATE_KEY));
          }
          break;
      }
    }
    pauseScheduling();
    for (const dep of deps) {
      if (dep) {
        triggerEffects(
          dep,
          4,
          !!(define_process_env_default$4.NODE_ENV !== "production") ? {
            target,
            type,
            key,
            newValue,
            oldValue,
            oldTarget
          } : void 0
        );
      }
    }
    resetScheduling();
  }
  __name(trigger, "trigger");
  function getDepFromReactive(object, key) {
    const depsMap = targetMap.get(object);
    return depsMap && depsMap.get(key);
  }
  __name(getDepFromReactive, "getDepFromReactive");
  const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
  const builtInSymbols = new Set(
    /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
  );
  const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
  function createArrayInstrumentations() {
    const instrumentations = {};
    ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
      instrumentations[key] = function(...args) {
        const arr = toRaw(this);
        for (let i = 0, l = this.length; i < l; i++) {
          track(arr, "get", i + "");
        }
        const res = arr[key](...args);
        if (res === -1 || res === false) {
          return arr[key](...args.map(toRaw));
        } else {
          return res;
        }
      };
    });
    ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
      instrumentations[key] = function(...args) {
        pauseTracking();
        pauseScheduling();
        const res = toRaw(this)[key].apply(this, args);
        resetScheduling();
        resetTracking();
        return res;
      };
    });
    return instrumentations;
  }
  __name(createArrayInstrumentations, "createArrayInstrumentations");
  function hasOwnProperty(key) {
    if (!isSymbol(key)) key = String(key);
    const obj = toRaw(this);
    track(obj, "has", key);
    return obj.hasOwnProperty(key);
  }
  __name(hasOwnProperty, "hasOwnProperty");
  const _BaseReactiveHandler = class _BaseReactiveHandler {
    constructor(_isReadonly = false, _isShallow = false) {
      this._isReadonly = _isReadonly;
      this._isShallow = _isShallow;
    }
    get(target, key, receiver) {
      const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
      if (key === "__v_isReactive") {
        return !isReadonly2;
      } else if (key === "__v_isReadonly") {
        return isReadonly2;
      } else if (key === "__v_isShallow") {
        return isShallow2;
      } else if (key === "__v_raw") {
        if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
        // this means the reciever is a user proxy of the reactive proxy
        Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
          return target;
        }
        return;
      }
      const targetIsArray = isArray(target);
      if (!isReadonly2) {
        if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
          return Reflect.get(arrayInstrumentations, key, receiver);
        }
        if (key === "hasOwnProperty") {
          return hasOwnProperty;
        }
      }
      const res = Reflect.get(target, key, receiver);
      if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
        return res;
      }
      if (!isReadonly2) {
        track(target, "get", key);
      }
      if (isShallow2) {
        return res;
      }
      if (isRef(res)) {
        return targetIsArray && isIntegerKey(key) ? res : res.value;
      }
      if (isObject(res)) {
        return isReadonly2 ? readonly(res) : reactive(res);
      }
      return res;
    }
  };
  __name(_BaseReactiveHandler, "BaseReactiveHandler");
  let BaseReactiveHandler = _BaseReactiveHandler;
  const _MutableReactiveHandler = class _MutableReactiveHandler extends BaseReactiveHandler {
    constructor(isShallow2 = false) {
      super(false, isShallow2);
    }
    set(target, key, value, receiver) {
      let oldValue = target[key];
      if (!this._isShallow) {
        const isOldValueReadonly = isReadonly(oldValue);
        if (!isShallow(value) && !isReadonly(value)) {
          oldValue = toRaw(oldValue);
          value = toRaw(value);
        }
        if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
          if (isOldValueReadonly) {
            return false;
          } else {
            oldValue.value = value;
            return true;
          }
        }
      }
      const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
      const result = Reflect.set(target, key, value, receiver);
      if (target === toRaw(receiver)) {
        if (!hadKey) {
          trigger(target, "add", key, value);
        } else if (hasChanged(value, oldValue)) {
          trigger(target, "set", key, value, oldValue);
        }
      }
      return result;
    }
    deleteProperty(target, key) {
      const hadKey = hasOwn(target, key);
      const oldValue = target[key];
      const result = Reflect.deleteProperty(target, key);
      if (result && hadKey) {
        trigger(target, "delete", key, void 0, oldValue);
      }
      return result;
    }
    has(target, key) {
      const result = Reflect.has(target, key);
      if (!isSymbol(key) || !builtInSymbols.has(key)) {
        track(target, "has", key);
      }
      return result;
    }
    ownKeys(target) {
      track(
        target,
        "iterate",
        isArray(target) ? "length" : ITERATE_KEY
      );
      return Reflect.ownKeys(target);
    }
  };
  __name(_MutableReactiveHandler, "MutableReactiveHandler");
  let MutableReactiveHandler = _MutableReactiveHandler;
  const _ReadonlyReactiveHandler = class _ReadonlyReactiveHandler extends BaseReactiveHandler {
    constructor(isShallow2 = false) {
      super(true, isShallow2);
    }
    set(target, key) {
      if (!!(define_process_env_default$4.NODE_ENV !== "production")) {
        warn$2(
          `Set operation on key "${String(key)}" failed: target is readonly.`,
          target
        );
      }
      return true;
    }
    deleteProperty(target, key) {
      if (!!(define_process_env_default$4.NODE_ENV !== "production")) {
        warn$2(
          `Delete operation on key "${String(key)}" failed: target is readonly.`,
          target
        );
      }
      return true;
    }
  };
  __name(_ReadonlyReactiveHandler, "ReadonlyReactiveHandler");
  let ReadonlyReactiveHandler = _ReadonlyReactiveHandler;
  const mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
  const readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
  const shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(
    true
  );
  const shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler(true);
  const toShallow = /* @__PURE__ */ __name((value) => value, "toShallow");
  const getProto = /* @__PURE__ */ __name((v) => Reflect.getPrototypeOf(v), "getProto");
  function get(target, key, isReadonly2 = false, isShallow2 = false) {
    target = target["__v_raw"];
    const rawTarget = toRaw(target);
    const rawKey = toRaw(key);
    if (!isReadonly2) {
      if (hasChanged(key, rawKey)) {
        track(rawTarget, "get", key);
      }
      track(rawTarget, "get", rawKey);
    }
    const { has: has2 } = getProto(rawTarget);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    if (has2.call(rawTarget, key)) {
      return wrap(target.get(key));
    } else if (has2.call(rawTarget, rawKey)) {
      return wrap(target.get(rawKey));
    } else if (target !== rawTarget) {
      target.get(key);
    }
  }
  __name(get, "get");
  function has(key, isReadonly2 = false) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const rawKey = toRaw(key);
    if (!isReadonly2) {
      if (hasChanged(key, rawKey)) {
        track(rawTarget, "has", key);
      }
      track(rawTarget, "has", rawKey);
    }
    return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
  }
  __name(has, "has");
  function size(target, isReadonly2 = false) {
    target = target["__v_raw"];
    !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
    return Reflect.get(target, "size", target);
  }
  __name(size, "size");
  function add(value, _isShallow = false) {
    if (!_isShallow && !isShallow(value) && !isReadonly(value)) {
      value = toRaw(value);
    }
    const target = toRaw(this);
    const proto = getProto(target);
    const hadKey = proto.has.call(target, value);
    if (!hadKey) {
      target.add(value);
      trigger(target, "add", value, value);
    }
    return this;
  }
  __name(add, "add");
  function set$1(key, value, _isShallow = false) {
    if (!_isShallow && !isShallow(value) && !isReadonly(value)) {
      value = toRaw(value);
    }
    const target = toRaw(this);
    const { has: has2, get: get2 } = getProto(target);
    let hadKey = has2.call(target, key);
    if (!hadKey) {
      key = toRaw(key);
      hadKey = has2.call(target, key);
    } else if (!!(define_process_env_default$4.NODE_ENV !== "production")) {
      checkIdentityKeys(target, has2, key);
    }
    const oldValue = get2.call(target, key);
    target.set(key, value);
    if (!hadKey) {
      trigger(target, "add", key, value);
    } else if (hasChanged(value, oldValue)) {
      trigger(target, "set", key, value, oldValue);
    }
    return this;
  }
  __name(set$1, "set$1");
  function deleteEntry(key) {
    const target = toRaw(this);
    const { has: has2, get: get2 } = getProto(target);
    let hadKey = has2.call(target, key);
    if (!hadKey) {
      key = toRaw(key);
      hadKey = has2.call(target, key);
    } else if (!!(define_process_env_default$4.NODE_ENV !== "production")) {
      checkIdentityKeys(target, has2, key);
    }
    const oldValue = get2 ? get2.call(target, key) : void 0;
    const result = target.delete(key);
    if (hadKey) {
      trigger(target, "delete", key, void 0, oldValue);
    }
    return result;
  }
  __name(deleteEntry, "deleteEntry");
  function clear() {
    const target = toRaw(this);
    const hadItems = target.size !== 0;
    const oldTarget = !!(define_process_env_default$4.NODE_ENV !== "production") ? isMap(target) ? new Map(target) : new Set(target) : void 0;
    const result = target.clear();
    if (hadItems) {
      trigger(target, "clear", void 0, void 0, oldTarget);
    }
    return result;
  }
  __name(clear, "clear");
  function createForEach(isReadonly2, isShallow2) {
    return /* @__PURE__ */ __name(function forEach(callback, thisArg) {
      const observed = this;
      const target = observed["__v_raw"];
      const rawTarget = toRaw(target);
      const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
      !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
      return target.forEach((value, key) => {
        return callback.call(thisArg, wrap(value), wrap(key), observed);
      });
    }, "forEach");
  }
  __name(createForEach, "createForEach");
  function createIterableMethod(method, isReadonly2, isShallow2) {
    return function(...args) {
      const target = this["__v_raw"];
      const rawTarget = toRaw(target);
      const targetIsMap = isMap(rawTarget);
      const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
      const isKeyOnly = method === "keys" && targetIsMap;
      const innerIterator = target[method](...args);
      const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
      !isReadonly2 && track(
        rawTarget,
        "iterate",
        isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
      );
      return {
        // iterator protocol
        next() {
          const { value, done } = innerIterator.next();
          return done ? { value, done } : {
            value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
            done
          };
        },
        // iterable protocol
        [Symbol.iterator]() {
          return this;
        }
      };
    };
  }
  __name(createIterableMethod, "createIterableMethod");
  function createReadonlyMethod(type) {
    return function(...args) {
      if (!!(define_process_env_default$4.NODE_ENV !== "production")) {
        const key = args[0] ? `on key "${args[0]}" ` : ``;
        warn$2(
          `${capitalize(type)} operation ${key}failed: target is readonly.`,
          toRaw(this)
        );
      }
      return type === "delete" ? false : type === "clear" ? void 0 : this;
    };
  }
  __name(createReadonlyMethod, "createReadonlyMethod");
  function createInstrumentations() {
    const mutableInstrumentations2 = {
      get(key) {
        return get(this, key);
      },
      get size() {
        return size(this);
      },
      has,
      add,
      set: set$1,
      delete: deleteEntry,
      clear,
      forEach: createForEach(false, false)
    };
    const shallowInstrumentations2 = {
      get(key) {
        return get(this, key, false, true);
      },
      get size() {
        return size(this);
      },
      has,
      add(value) {
        return add.call(this, value, true);
      },
      set(key, value) {
        return set$1.call(this, key, value, true);
      },
      delete: deleteEntry,
      clear,
      forEach: createForEach(false, true)
    };
    const readonlyInstrumentations2 = {
      get(key) {
        return get(this, key, true);
      },
      get size() {
        return size(this, true);
      },
      has(key) {
        return has.call(this, key, true);
      },
      add: createReadonlyMethod("add"),
      set: createReadonlyMethod("set"),
      delete: createReadonlyMethod("delete"),
      clear: createReadonlyMethod("clear"),
      forEach: createForEach(true, false)
    };
    const shallowReadonlyInstrumentations2 = {
      get(key) {
        return get(this, key, true, true);
      },
      get size() {
        return size(this, true);
      },
      has(key) {
        return has.call(this, key, true);
      },
      add: createReadonlyMethod("add"),
      set: createReadonlyMethod("set"),
      delete: createReadonlyMethod("delete"),
      clear: createReadonlyMethod("clear"),
      forEach: createForEach(true, true)
    };
    const iteratorMethods = [
      "keys",
      "values",
      "entries",
      Symbol.iterator
    ];
    iteratorMethods.forEach((method) => {
      mutableInstrumentations2[method] = createIterableMethod(method, false, false);
      readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
      shallowInstrumentations2[method] = createIterableMethod(method, false, true);
      shallowReadonlyInstrumentations2[method] = createIterableMethod(
        method,
        true,
        true
      );
    });
    return [
      mutableInstrumentations2,
      readonlyInstrumentations2,
      shallowInstrumentations2,
      shallowReadonlyInstrumentations2
    ];
  }
  __name(createInstrumentations, "createInstrumentations");
  const [
    mutableInstrumentations,
    readonlyInstrumentations,
    shallowInstrumentations,
    shallowReadonlyInstrumentations
  ] = /* @__PURE__ */ createInstrumentations();
  function createInstrumentationGetter(isReadonly2, shallow) {
    const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
    return (target, key, receiver) => {
      if (key === "__v_isReactive") {
        return !isReadonly2;
      } else if (key === "__v_isReadonly") {
        return isReadonly2;
      } else if (key === "__v_raw") {
        return target;
      }
      return Reflect.get(
        hasOwn(instrumentations, key) && key in target ? instrumentations : target,
        key,
        receiver
      );
    };
  }
  __name(createInstrumentationGetter, "createInstrumentationGetter");
  const mutableCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(false, false)
  };
  const shallowCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(false, true)
  };
  const readonlyCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(true, false)
  };
  const shallowReadonlyCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(true, true)
  };
  function checkIdentityKeys(target, has2, key) {
    const rawKey = toRaw(key);
    if (rawKey !== key && has2.call(target, rawKey)) {
      const type = toRawType(target);
      warn$2(
        `Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
      );
    }
  }
  __name(checkIdentityKeys, "checkIdentityKeys");
  const reactiveMap = /* @__PURE__ */ new WeakMap();
  const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
  const readonlyMap = /* @__PURE__ */ new WeakMap();
  const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
  function targetTypeMap(rawType) {
    switch (rawType) {
      case "Object":
      case "Array":
        return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;
      default:
        return 0;
    }
  }
  __name(targetTypeMap, "targetTypeMap");
  function getTargetType(value) {
    return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
  }
  __name(getTargetType, "getTargetType");
  function reactive(target) {
    if (isReadonly(target)) {
      return target;
    }
    return createReactiveObject(
      target,
      false,
      mutableHandlers,
      mutableCollectionHandlers,
      reactiveMap
    );
  }
  __name(reactive, "reactive");
  function shallowReactive(target) {
    return createReactiveObject(
      target,
      false,
      shallowReactiveHandlers,
      shallowCollectionHandlers,
      shallowReactiveMap
    );
  }
  __name(shallowReactive, "shallowReactive");
  function readonly(target) {
    return createReactiveObject(
      target,
      true,
      readonlyHandlers,
      readonlyCollectionHandlers,
      readonlyMap
    );
  }
  __name(readonly, "readonly");
  function shallowReadonly(target) {
    return createReactiveObject(
      target,
      true,
      shallowReadonlyHandlers,
      shallowReadonlyCollectionHandlers,
      shallowReadonlyMap
    );
  }
  __name(shallowReadonly, "shallowReadonly");
  function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
    if (!isObject(target)) {
      if (!!(define_process_env_default$4.NODE_ENV !== "production")) {
        warn$2(
          `value cannot be made ${isReadonly2 ? "readonly" : "reactive"}: ${String(
            target
          )}`
        );
      }
      return target;
    }
    if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
      return target;
    }
    const existingProxy = proxyMap.get(target);
    if (existingProxy) {
      return existingProxy;
    }
    const targetType = getTargetType(target);
    if (targetType === 0) {
      return target;
    }
    const proxy = new Proxy(
      target,
      targetType === 2 ? collectionHandlers : baseHandlers
    );
    proxyMap.set(target, proxy);
    return proxy;
  }
  __name(createReactiveObject, "createReactiveObject");
  function isReactive(value) {
    if (isReadonly(value)) {
      return isReactive(value["__v_raw"]);
    }
    return !!(value && value["__v_isReactive"]);
  }
  __name(isReactive, "isReactive");
  function isReadonly(value) {
    return !!(value && value["__v_isReadonly"]);
  }
  __name(isReadonly, "isReadonly");
  function isShallow(value) {
    return !!(value && value["__v_isShallow"]);
  }
  __name(isShallow, "isShallow");
  function isProxy(value) {
    return value ? !!value["__v_raw"] : false;
  }
  __name(isProxy, "isProxy");
  function toRaw(observed) {
    const raw = observed && observed["__v_raw"];
    return raw ? toRaw(raw) : observed;
  }
  __name(toRaw, "toRaw");
  function markRaw(value) {
    if (Object.isExtensible(value)) {
      def(value, "__v_skip", true);
    }
    return value;
  }
  __name(markRaw, "markRaw");
  const toReactive = /* @__PURE__ */ __name((value) => isObject(value) ? reactive(value) : value, "toReactive");
  const toReadonly = /* @__PURE__ */ __name((value) => isObject(value) ? readonly(value) : value, "toReadonly");
  const COMPUTED_SIDE_EFFECT_WARN = `Computed is still dirty after getter evaluation, likely because a computed is mutating its own dependency in its getter. State mutations in computed getters should be avoided.  Check the docs for more details: https://vuejs.org/guide/essentials/computed.html#getters-should-be-side-effect-free`;
  const _ComputedRefImpl = class _ComputedRefImpl {
    constructor(getter, _setter, isReadonly2, isSSR) {
      this.getter = getter;
      this._setter = _setter;
      this.dep = void 0;
      this.__v_isRef = true;
      this["__v_isReadonly"] = false;
      this.effect = new ReactiveEffect(
        () => getter(this._value),
        () => triggerRefValue(
          this,
          this.effect._dirtyLevel === 2 ? 2 : 3
        )
      );
      this.effect.computed = this;
      this.effect.active = this._cacheable = !isSSR;
      this["__v_isReadonly"] = isReadonly2;
    }
    get value() {
      const self2 = toRaw(this);
      if ((!self2._cacheable || self2.effect.dirty) && hasChanged(self2._value, self2._value = self2.effect.run())) {
        triggerRefValue(self2, 4);
      }
      trackRefValue(self2);
      if (self2.effect._dirtyLevel >= 2) {
        if (!!(define_process_env_default$4.NODE_ENV !== "production") && this._warnRecursive) {
          warn$2(COMPUTED_SIDE_EFFECT_WARN, `

getter: `, this.getter);
        }
        triggerRefValue(self2, 2);
      }
      return self2._value;
    }
    set value(newValue) {
      this._setter(newValue);
    }
    // #region polyfill _dirty for backward compatibility third party code for Vue <= 3.3.x
    get _dirty() {
      return this.effect.dirty;
    }
    set _dirty(v) {
      this.effect.dirty = v;
    }
    // #endregion
  };
  __name(_ComputedRefImpl, "ComputedRefImpl");
  let ComputedRefImpl = _ComputedRefImpl;
  function computed$1(getterOrOptions, debugOptions, isSSR = false) {
    let getter;
    let setter;
    const onlyGetter = isFunction(getterOrOptions);
    if (onlyGetter) {
      getter = getterOrOptions;
      setter = !!(define_process_env_default$4.NODE_ENV !== "production") ? () => {
        warn$2("Write operation failed: computed value is readonly");
      } : NOOP;
    } else {
      getter = getterOrOptions.get;
      setter = getterOrOptions.set;
    }
    const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
    if (!!(define_process_env_default$4.NODE_ENV !== "production") && debugOptions && !isSSR) {
      cRef.effect.onTrack = debugOptions.onTrack;
      cRef.effect.onTrigger = debugOptions.onTrigger;
    }
    return cRef;
  }
  __name(computed$1, "computed$1");
  function trackRefValue(ref2) {
    var _a;
    if (shouldTrack && activeEffect) {
      ref2 = toRaw(ref2);
      trackEffect(
        activeEffect,
        (_a = ref2.dep) != null ? _a : ref2.dep = createDep(
          () => ref2.dep = void 0,
          ref2 instanceof ComputedRefImpl ? ref2 : void 0
        ),
        !!(define_process_env_default$4.NODE_ENV !== "production") ? {
          target: ref2,
          type: "get",
          key: "value"
        } : void 0
      );
    }
  }
  __name(trackRefValue, "trackRefValue");
  function triggerRefValue(ref2, dirtyLevel = 4, newVal, oldVal) {
    ref2 = toRaw(ref2);
    const dep = ref2.dep;
    if (dep) {
      triggerEffects(
        dep,
        dirtyLevel,
        !!(define_process_env_default$4.NODE_ENV !== "production") ? {
          target: ref2,
          type: "set",
          key: "value",
          newValue: newVal,
          oldValue: oldVal
        } : void 0
      );
    }
  }
  __name(triggerRefValue, "triggerRefValue");
  function isRef(r) {
    return !!(r && r.__v_isRef === true);
  }
  __name(isRef, "isRef");
  function ref(value) {
    return createRef(value, false);
  }
  __name(ref, "ref");
  function createRef(rawValue, shallow) {
    if (isRef(rawValue)) {
      return rawValue;
    }
    return new RefImpl(rawValue, shallow);
  }
  __name(createRef, "createRef");
  const _RefImpl = class _RefImpl {
    constructor(value, __v_isShallow) {
      this.__v_isShallow = __v_isShallow;
      this.dep = void 0;
      this.__v_isRef = true;
      this._rawValue = __v_isShallow ? value : toRaw(value);
      this._value = __v_isShallow ? value : toReactive(value);
    }
    get value() {
      trackRefValue(this);
      return this._value;
    }
    set value(newVal) {
      const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal);
      newVal = useDirectValue ? newVal : toRaw(newVal);
      if (hasChanged(newVal, this._rawValue)) {
        const oldVal = this._rawValue;
        this._rawValue = newVal;
        this._value = useDirectValue ? newVal : toReactive(newVal);
        triggerRefValue(this, 4, newVal, oldVal);
      }
    }
  };
  __name(_RefImpl, "RefImpl");
  let RefImpl = _RefImpl;
  function unref(ref2) {
    return isRef(ref2) ? ref2.value : ref2;
  }
  __name(unref, "unref");
  const shallowUnwrapHandlers = {
    get: /* @__PURE__ */ __name((target, key, receiver) => unref(Reflect.get(target, key, receiver)), "get"),
    set: /* @__PURE__ */ __name((target, key, value, receiver) => {
      const oldValue = target[key];
      if (isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      } else {
        return Reflect.set(target, key, value, receiver);
      }
    }, "set")
  };
  function proxyRefs(objectWithRefs) {
    return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
  }
  __name(proxyRefs, "proxyRefs");
  function toRefs(object) {
    if (!!(define_process_env_default$4.NODE_ENV !== "production") && !isProxy(object)) {
      warn$2(`toRefs() expects a reactive object but received a plain one.`);
    }
    const ret = isArray(object) ? new Array(object.length) : {};
    for (const key in object) {
      ret[key] = propertyToRef(object, key);
    }
    return ret;
  }
  __name(toRefs, "toRefs");
  const _ObjectRefImpl = class _ObjectRefImpl {
    constructor(_object, _key, _defaultValue) {
      this._object = _object;
      this._key = _key;
      this._defaultValue = _defaultValue;
      this.__v_isRef = true;
    }
    get value() {
      const val = this._object[this._key];
      return val === void 0 ? this._defaultValue : val;
    }
    set value(newVal) {
      this._object[this._key] = newVal;
    }
    get dep() {
      return getDepFromReactive(toRaw(this._object), this._key);
    }
  };
  __name(_ObjectRefImpl, "ObjectRefImpl");
  let ObjectRefImpl = _ObjectRefImpl;
  const _GetterRefImpl = class _GetterRefImpl {
    constructor(_getter) {
      this._getter = _getter;
      this.__v_isRef = true;
      this.__v_isReadonly = true;
    }
    get value() {
      return this._getter();
    }
  };
  __name(_GetterRefImpl, "GetterRefImpl");
  let GetterRefImpl = _GetterRefImpl;
  function toRef(source, key, defaultValue) {
    if (isRef(source)) {
      return source;
    } else if (isFunction(source)) {
      return new GetterRefImpl(source);
    } else if (isObject(source) && arguments.length > 1) {
      return propertyToRef(source, key, defaultValue);
    } else {
      return ref(source);
    }
  }
  __name(toRef, "toRef");
  function propertyToRef(source, key, defaultValue) {
    const val = source[key];
    return isRef(val) ? val : new ObjectRefImpl(source, key, defaultValue);
  }
  __name(propertyToRef, "propertyToRef");
  var define_process_env_default$3 = {};
  const stack = [];
  function pushWarningContext(vnode) {
    stack.push(vnode);
  }
  __name(pushWarningContext, "pushWarningContext");
  function popWarningContext() {
    stack.pop();
  }
  __name(popWarningContext, "popWarningContext");
  let isWarning = false;
  function warn$1(msg, ...args) {
    if (isWarning) return;
    isWarning = true;
    pauseTracking();
    const instance = stack.length ? stack[stack.length - 1].component : null;
    const appWarnHandler = instance && instance.appContext.config.warnHandler;
    const trace = getComponentTrace();
    if (appWarnHandler) {
      callWithErrorHandling(
        appWarnHandler,
        instance,
        11,
        [
          // eslint-disable-next-line no-restricted-syntax
          msg + args.map((a) => {
            var _a, _b;
            return (_b = (_a = a.toString) == null ? void 0 : _a.call(a)) != null ? _b : JSON.stringify(a);
          }).join(""),
          instance && instance.proxy,
          trace.map(
            ({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`
          ).join("\n"),
          trace
        ]
      );
    } else {
      const warnArgs = [`[Vue warn]: ${msg}`, ...args];
      if (trace.length && // avoid spamming console during tests
      true) {
        warnArgs.push(`
`, ...formatTrace(trace));
      }
      console.warn(...warnArgs);
    }
    resetTracking();
    isWarning = false;
  }
  __name(warn$1, "warn$1");
  function getComponentTrace() {
    let currentVNode = stack[stack.length - 1];
    if (!currentVNode) {
      return [];
    }
    const normalizedStack = [];
    while (currentVNode) {
      const last = normalizedStack[0];
      if (last && last.vnode === currentVNode) {
        last.recurseCount++;
      } else {
        normalizedStack.push({
          vnode: currentVNode,
          recurseCount: 0
        });
      }
      const parentInstance = currentVNode.component && currentVNode.component.parent;
      currentVNode = parentInstance && parentInstance.vnode;
    }
    return normalizedStack;
  }
  __name(getComponentTrace, "getComponentTrace");
  function formatTrace(trace) {
    const logs = [];
    trace.forEach((entry, i) => {
      logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
    });
    return logs;
  }
  __name(formatTrace, "formatTrace");
  function formatTraceEntry({ vnode, recurseCount }) {
    const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
    const isRoot = vnode.component ? vnode.component.parent == null : false;
    const open = ` at <${formatComponentName(
      vnode.component,
      vnode.type,
      isRoot
    )}`;
    const close = `>` + postfix;
    return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
  }
  __name(formatTraceEntry, "formatTraceEntry");
  function formatProps(props) {
    const res = [];
    const keys = Object.keys(props);
    keys.slice(0, 3).forEach((key) => {
      res.push(...formatProp(key, props[key]));
    });
    if (keys.length > 3) {
      res.push(` ...`);
    }
    return res;
  }
  __name(formatProps, "formatProps");
  function formatProp(key, value, raw) {
    if (isString(value)) {
      value = JSON.stringify(value);
      return raw ? value : [`${key}=${value}`];
    } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
      return raw ? value : [`${key}=${value}`];
    } else if (isRef(value)) {
      value = formatProp(key, toRaw(value.value), true);
      return raw ? value : [`${key}=Ref<`, value, `>`];
    } else if (isFunction(value)) {
      return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
    } else {
      value = toRaw(value);
      return raw ? value : [`${key}=`, value];
    }
  }
  __name(formatProp, "formatProp");
  function assertNumber(val, type) {
    if (!!!(define_process_env_default$3.NODE_ENV !== "production")) return;
    if (val === void 0) {
      return;
    } else if (typeof val !== "number") {
      warn$1(`${type} is not a valid number - got ${JSON.stringify(val)}.`);
    } else if (isNaN(val)) {
      warn$1(`${type} is NaN - the duration expression might be incorrect.`);
    }
  }
  __name(assertNumber, "assertNumber");
  const ErrorTypeStrings$1 = {
    ["sp"]: "serverPrefetch hook",
    ["bc"]: "beforeCreate hook",
    ["c"]: "created hook",
    ["bm"]: "beforeMount hook",
    ["m"]: "mounted hook",
    ["bu"]: "beforeUpdate hook",
    ["u"]: "updated",
    ["bum"]: "beforeUnmount hook",
    ["um"]: "unmounted hook",
    ["a"]: "activated hook",
    ["da"]: "deactivated hook",
    ["ec"]: "errorCaptured hook",
    ["rtc"]: "renderTracked hook",
    ["rtg"]: "renderTriggered hook",
    [0]: "setup function",
    [1]: "render function",
    [2]: "watcher getter",
    [3]: "watcher callback",
    [4]: "watcher cleanup function",
    [5]: "native event handler",
    [6]: "component event handler",
    [7]: "vnode hook",
    [8]: "directive hook",
    [9]: "transition hook",
    [10]: "app errorHandler",
    [11]: "app warnHandler",
    [12]: "ref function",
    [13]: "async component loader",
    [14]: "scheduler flush",
    [15]: "component update"
  };
  function callWithErrorHandling(fn, instance, type, args) {
    try {
      return args ? fn(...args) : fn();
    } catch (err) {
      handleError(err, instance, type);
    }
  }
  __name(callWithErrorHandling, "callWithErrorHandling");
  function callWithAsyncErrorHandling(fn, instance, type, args) {
    if (isFunction(fn)) {
      const res = callWithErrorHandling(fn, instance, type, args);
      if (res && isPromise(res)) {
        res.catch((err) => {
          handleError(err, instance, type);
        });
      }
      return res;
    }
    if (isArray(fn)) {
      const values = [];
      for (let i = 0; i < fn.length; i++) {
        values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
      }
      return values;
    } else if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
      warn$1(
        `Invalid value type passed to callWithAsyncErrorHandling(): ${typeof fn}`
      );
    }
  }
  __name(callWithAsyncErrorHandling, "callWithAsyncErrorHandling");
  function handleError(err, instance, type, throwInDev = true) {
    const contextVNode = instance ? instance.vnode : null;
    if (instance) {
      let cur = instance.parent;
      const exposedInstance = instance.proxy;
      const errorInfo = !!(define_process_env_default$3.NODE_ENV !== "production") ? ErrorTypeStrings$1[type] : `https://vuejs.org/error-reference/#runtime-${type}`;
      while (cur) {
        const errorCapturedHooks = cur.ec;
        if (errorCapturedHooks) {
          for (let i = 0; i < errorCapturedHooks.length; i++) {
            if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
              return;
            }
          }
        }
        cur = cur.parent;
      }
      const appErrorHandler = instance.appContext.config.errorHandler;
      if (appErrorHandler) {
        pauseTracking();
        callWithErrorHandling(
          appErrorHandler,
          null,
          10,
          [err, exposedInstance, errorInfo]
        );
        resetTracking();
        return;
      }
    }
    logError(err, type, contextVNode, throwInDev);
  }
  __name(handleError, "handleError");
  function logError(err, type, contextVNode, throwInDev = true) {
    if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
      const info = ErrorTypeStrings$1[type];
      if (contextVNode) {
        pushWarningContext(contextVNode);
      }
      warn$1(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
      if (contextVNode) {
        popWarningContext();
      }
      if (throwInDev) {
        throw err;
      } else {
        console.error(err);
      }
    } else {
      console.error(err);
    }
  }
  __name(logError, "logError");
  let isFlushing = false;
  let isFlushPending = false;
  const queue = [];
  let flushIndex = 0;
  const pendingPostFlushCbs = [];
  let activePostFlushCbs = null;
  let postFlushIndex = 0;
  const resolvedPromise = /* @__PURE__ */ Promise.resolve();
  let currentFlushPromise = null;
  const RECURSION_LIMIT = 100;
  function nextTick(fn) {
    const p2 = currentFlushPromise || resolvedPromise;
    return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
  }
  __name(nextTick, "nextTick");
  function findInsertionIndex(id) {
    let start = flushIndex + 1;
    let end = queue.length;
    while (start < end) {
      const middle = start + end >>> 1;
      const middleJob = queue[middle];
      const middleJobId = getId(middleJob);
      if (middleJobId < id || middleJobId === id && middleJob.pre) {
        start = middle + 1;
      } else {
        end = middle;
      }
    }
    return start;
  }
  __name(findInsertionIndex, "findInsertionIndex");
  function queueJob(job) {
    if (!queue.length || !queue.includes(
      job,
      isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex
    )) {
      if (job.id == null) {
        queue.push(job);
      } else {
        queue.splice(findInsertionIndex(job.id), 0, job);
      }
      queueFlush();
    }
  }
  __name(queueJob, "queueJob");
  function queueFlush() {
    if (!isFlushing && !isFlushPending) {
      isFlushPending = true;
      currentFlushPromise = resolvedPromise.then(flushJobs);
    }
  }
  __name(queueFlush, "queueFlush");
  function invalidateJob(job) {
    const i = queue.indexOf(job);
    if (i > flushIndex) {
      queue.splice(i, 1);
    }
  }
  __name(invalidateJob, "invalidateJob");
  function queuePostFlushCb(cb) {
    if (!isArray(cb)) {
      if (!activePostFlushCbs || !activePostFlushCbs.includes(
        cb,
        cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex
      )) {
        pendingPostFlushCbs.push(cb);
      }
    } else {
      pendingPostFlushCbs.push(...cb);
    }
    queueFlush();
  }
  __name(queuePostFlushCb, "queuePostFlushCb");
  function flushPreFlushCbs(instance, seen, i = isFlushing ? flushIndex + 1 : 0) {
    if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
      seen = seen || /* @__PURE__ */ new Map();
    }
    for (; i < queue.length; i++) {
      const cb = queue[i];
      if (cb && cb.pre) {
        if (instance && cb.id !== instance.uid) {
          continue;
        }
        if (!!(define_process_env_default$3.NODE_ENV !== "production") && checkRecursiveUpdates(seen, cb)) {
          continue;
        }
        queue.splice(i, 1);
        i--;
        cb();
      }
    }
  }
  __name(flushPreFlushCbs, "flushPreFlushCbs");
  function flushPostFlushCbs(seen) {
    if (pendingPostFlushCbs.length) {
      const deduped = [...new Set(pendingPostFlushCbs)].sort(
        (a, b) => getId(a) - getId(b)
      );
      pendingPostFlushCbs.length = 0;
      if (activePostFlushCbs) {
        activePostFlushCbs.push(...deduped);
        return;
      }
      activePostFlushCbs = deduped;
      if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
        seen = seen || /* @__PURE__ */ new Map();
      }
      for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
        const cb = activePostFlushCbs[postFlushIndex];
        if (!!(define_process_env_default$3.NODE_ENV !== "production") && checkRecursiveUpdates(seen, cb)) {
          continue;
        }
        if (cb.active !== false) cb();
      }
      activePostFlushCbs = null;
      postFlushIndex = 0;
    }
  }
  __name(flushPostFlushCbs, "flushPostFlushCbs");
  const getId = /* @__PURE__ */ __name((job) => job.id == null ? Infinity : job.id, "getId");
  const comparator = /* @__PURE__ */ __name((a, b) => {
    const diff = getId(a) - getId(b);
    if (diff === 0) {
      if (a.pre && !b.pre) return -1;
      if (b.pre && !a.pre) return 1;
    }
    return diff;
  }, "comparator");
  function flushJobs(seen) {
    isFlushPending = false;
    isFlushing = true;
    if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
      seen = seen || /* @__PURE__ */ new Map();
    }
    queue.sort(comparator);
    const check = !!(define_process_env_default$3.NODE_ENV !== "production") ? (job) => checkRecursiveUpdates(seen, job) : NOOP;
    try {
      for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
        const job = queue[flushIndex];
        if (job && job.active !== false) {
          if (!!(define_process_env_default$3.NODE_ENV !== "production") && check(job)) {
            continue;
          }
          callWithErrorHandling(
            job,
            job.i,
            job.i ? 15 : 14
          );
        }
      }
    } finally {
      flushIndex = 0;
      queue.length = 0;
      flushPostFlushCbs(seen);
      isFlushing = false;
      currentFlushPromise = null;
      if (queue.length || pendingPostFlushCbs.length) {
        flushJobs(seen);
      }
    }
  }
  __name(flushJobs, "flushJobs");
  function checkRecursiveUpdates(seen, fn) {
    if (!seen.has(fn)) {
      seen.set(fn, 1);
    } else {
      const count = seen.get(fn);
      if (count > RECURSION_LIMIT) {
        const instance = fn.i;
        const componentName = instance && getComponentName(instance.type);
        handleError(
          `Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
          null,
          10
        );
        return true;
      } else {
        seen.set(fn, count + 1);
      }
    }
  }
  __name(checkRecursiveUpdates, "checkRecursiveUpdates");
  let isHmrUpdating = false;
  const hmrDirtyComponents = /* @__PURE__ */ new Map();
  if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
    getGlobalThis().__VUE_HMR_RUNTIME__ = {
      createRecord: tryWrap(createRecord),
      rerender: tryWrap(rerender),
      reload: tryWrap(reload)
    };
  }
  const map = /* @__PURE__ */ new Map();
  function registerHMR(instance) {
    const id = instance.type.__hmrId;
    let record = map.get(id);
    if (!record) {
      createRecord(id, instance.type);
      record = map.get(id);
    }
    record.instances.add(instance);
  }
  __name(registerHMR, "registerHMR");
  function unregisterHMR(instance) {
    map.get(instance.type.__hmrId).instances.delete(instance);
  }
  __name(unregisterHMR, "unregisterHMR");
  function createRecord(id, initialDef) {
    if (map.has(id)) {
      return false;
    }
    map.set(id, {
      initialDef: normalizeClassComponent(initialDef),
      instances: /* @__PURE__ */ new Set()
    });
    return true;
  }
  __name(createRecord, "createRecord");
  function normalizeClassComponent(component) {
    return isClassComponent(component) ? component.__vccOpts : component;
  }
  __name(normalizeClassComponent, "normalizeClassComponent");
  function rerender(id, newRender) {
    const record = map.get(id);
    if (!record) {
      return;
    }
    record.initialDef.render = newRender;
    [...record.instances].forEach((instance) => {
      if (newRender) {
        instance.render = newRender;
        normalizeClassComponent(instance.type).render = newRender;
      }
      instance.renderCache = [];
      isHmrUpdating = true;
      instance.effect.dirty = true;
      instance.update();
      isHmrUpdating = false;
    });
  }
  __name(rerender, "rerender");
  function reload(id, newComp) {
    const record = map.get(id);
    if (!record) return;
    newComp = normalizeClassComponent(newComp);
    updateComponentDef(record.initialDef, newComp);
    const instances = [...record.instances];
    for (let i = 0; i < instances.length; i++) {
      const instance = instances[i];
      const oldComp = normalizeClassComponent(instance.type);
      let dirtyInstances = hmrDirtyComponents.get(oldComp);
      if (!dirtyInstances) {
        if (oldComp !== record.initialDef) {
          updateComponentDef(oldComp, newComp);
        }
        hmrDirtyComponents.set(oldComp, dirtyInstances = /* @__PURE__ */ new Set());
      }
      dirtyInstances.add(instance);
      instance.appContext.propsCache.delete(instance.type);
      instance.appContext.emitsCache.delete(instance.type);
      instance.appContext.optionsCache.delete(instance.type);
      if (instance.ceReload) {
        dirtyInstances.add(instance);
        instance.ceReload(newComp.styles);
        dirtyInstances.delete(instance);
      } else if (instance.parent) {
        instance.parent.effect.dirty = true;
        queueJob(() => {
          instance.parent.update();
          dirtyInstances.delete(instance);
        });
      } else if (instance.appContext.reload) {
        instance.appContext.reload();
      } else if (typeof window !== "undefined") {
        window.location.reload();
      } else {
        console.warn(
          "[HMR] Root or manually mounted instance modified. Full reload required."
        );
      }
    }
    queuePostFlushCb(() => {
      hmrDirtyComponents.clear();
    });
  }
  __name(reload, "reload");
  function updateComponentDef(oldComp, newComp) {
    extend(oldComp, newComp);
    for (const key in oldComp) {
      if (key !== "__file" && !(key in newComp)) {
        delete oldComp[key];
      }
    }
  }
  __name(updateComponentDef, "updateComponentDef");
  function tryWrap(fn) {
    return (id, arg) => {
      try {
        return fn(id, arg);
      } catch (e) {
        console.error(e);
        console.warn(
          `[HMR] Something went wrong during Vue component hot-reload. Full reload required.`
        );
      }
    };
  }
  __name(tryWrap, "tryWrap");
  let devtools$1;
  let buffer = [];
  let devtoolsNotInstalled = false;
  function emit$1(event, ...args) {
    if (devtools$1) {
      devtools$1.emit(event, ...args);
    } else if (!devtoolsNotInstalled) {
      buffer.push({ event, args });
    }
  }
  __name(emit$1, "emit$1");
  function setDevtoolsHook$1(hook, target) {
    var _a, _b;
    devtools$1 = hook;
    if (devtools$1) {
      devtools$1.enabled = true;
      buffer.forEach(({ event, args }) => devtools$1.emit(event, ...args));
      buffer = [];
    } else if (
      // handle late devtools injection - only do this if we are in an actual
      // browser environment to avoid the timer handle stalling test runner exit
      // (#4815)
      typeof window !== "undefined" && // some envs mock window but not fully
      window.HTMLElement && // also exclude jsdom
      // eslint-disable-next-line no-restricted-syntax
      !((_b = (_a = window.navigator) == null ? void 0 : _a.userAgent) == null ? void 0 : _b.includes("jsdom"))
    ) {
      const replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
      replay.push((newHook) => {
        setDevtoolsHook$1(newHook, target);
      });
      setTimeout(() => {
        if (!devtools$1) {
          target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
          devtoolsNotInstalled = true;
          buffer = [];
        }
      }, 3e3);
    } else {
      devtoolsNotInstalled = true;
      buffer = [];
    }
  }
  __name(setDevtoolsHook$1, "setDevtoolsHook$1");
  function devtoolsInitApp(app, version2) {
    emit$1("app:init", app, version2, {
      Fragment,
      Text,
      Comment,
      Static
    });
  }
  __name(devtoolsInitApp, "devtoolsInitApp");
  function devtoolsUnmountApp(app) {
    emit$1("app:unmount", app);
  }
  __name(devtoolsUnmountApp, "devtoolsUnmountApp");
  const devtoolsComponentAdded = /* @__PURE__ */ createDevtoolsComponentHook(
    "component:added"
    /* COMPONENT_ADDED */
  );
  const devtoolsComponentUpdated = /* @__PURE__ */ createDevtoolsComponentHook(
    "component:updated"
    /* COMPONENT_UPDATED */
  );
  const _devtoolsComponentRemoved = /* @__PURE__ */ createDevtoolsComponentHook(
    "component:removed"
    /* COMPONENT_REMOVED */
  );
  const devtoolsComponentRemoved = /* @__PURE__ */ __name((component) => {
    if (devtools$1 && typeof devtools$1.cleanupBuffer === "function" && // remove the component if it wasn't buffered
    !devtools$1.cleanupBuffer(component)) {
      _devtoolsComponentRemoved(component);
    }
  }, "devtoolsComponentRemoved");
  /*! #__NO_SIDE_EFFECTS__ */
  // @__NO_SIDE_EFFECTS__
  function createDevtoolsComponentHook(hook) {
    return (component) => {
      emit$1(
        hook,
        component.appContext.app,
        component.uid,
        component.parent ? component.parent.uid : void 0,
        component
      );
    };
  }
  __name(createDevtoolsComponentHook, "createDevtoolsComponentHook");
  const devtoolsPerfStart = /* @__PURE__ */ createDevtoolsPerformanceHook(
    "perf:start"
    /* PERFORMANCE_START */
  );
  const devtoolsPerfEnd = /* @__PURE__ */ createDevtoolsPerformanceHook(
    "perf:end"
    /* PERFORMANCE_END */
  );
  function createDevtoolsPerformanceHook(hook) {
    return (component, type, time) => {
      emit$1(hook, component.appContext.app, component.uid, component, type, time);
    };
  }
  __name(createDevtoolsPerformanceHook, "createDevtoolsPerformanceHook");
  function devtoolsComponentEmit(component, event, params) {
    emit$1(
      "component:emit",
      component.appContext.app,
      component,
      event,
      params
    );
  }
  __name(devtoolsComponentEmit, "devtoolsComponentEmit");
  let currentRenderingInstance = null;
  let currentScopeId = null;
  function setCurrentRenderingInstance(instance) {
    const prev = currentRenderingInstance;
    currentRenderingInstance = instance;
    currentScopeId = instance && instance.type.__scopeId || null;
    return prev;
  }
  __name(setCurrentRenderingInstance, "setCurrentRenderingInstance");
  function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
    if (!ctx) return fn;
    if (fn._n) {
      return fn;
    }
    const renderFnWithContext = /* @__PURE__ */ __name((...args) => {
      if (renderFnWithContext._d) {
        setBlockTracking(-1);
      }
      const prevInstance = setCurrentRenderingInstance(ctx);
      let res;
      try {
        res = fn(...args);
      } finally {
        setCurrentRenderingInstance(prevInstance);
        if (renderFnWithContext._d) {
          setBlockTracking(1);
        }
      }
      if (!!(define_process_env_default$3.NODE_ENV !== "production") || false) {
        devtoolsComponentUpdated(ctx);
      }
      return res;
    }, "renderFnWithContext");
    renderFnWithContext._n = true;
    renderFnWithContext._c = true;
    renderFnWithContext._d = true;
    return renderFnWithContext;
  }
  __name(withCtx, "withCtx");
  function validateDirectiveName(name) {
    if (isBuiltInDirective(name)) {
      warn$1("Do not use built-in directive ids as custom directive id: " + name);
    }
  }
  __name(validateDirectiveName, "validateDirectiveName");
  function withDirectives(vnode, directives) {
    if (currentRenderingInstance === null) {
      !!(define_process_env_default$3.NODE_ENV !== "production") && warn$1(`withDirectives can only be used inside render functions.`);
      return vnode;
    }
    const instance = getComponentPublicInstance(currentRenderingInstance);
    const bindings = vnode.dirs || (vnode.dirs = []);
    for (let i = 0; i < directives.length; i++) {
      let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
      if (dir) {
        if (isFunction(dir)) {
          dir = {
            mounted: dir,
            updated: dir
          };
        }
        if (dir.deep) {
          traverse(value);
        }
        bindings.push({
          dir,
          instance,
          value,
          oldValue: void 0,
          arg,
          modifiers
        });
      }
    }
    return vnode;
  }
  __name(withDirectives, "withDirectives");
  function invokeDirectiveHook(vnode, prevVNode, instance, name) {
    const bindings = vnode.dirs;
    const oldBindings = prevVNode && prevVNode.dirs;
    for (let i = 0; i < bindings.length; i++) {
      const binding = bindings[i];
      if (oldBindings) {
        binding.oldValue = oldBindings[i].value;
      }
      let hook = binding.dir[name];
      if (hook) {
        pauseTracking();
        callWithAsyncErrorHandling(hook, instance, 8, [
          vnode.el,
          binding,
          vnode,
          prevVNode
        ]);
        resetTracking();
      }
    }
  }
  __name(invokeDirectiveHook, "invokeDirectiveHook");
  const leaveCbKey = Symbol("_leaveCb");
  const enterCbKey = Symbol("_enterCb");
  function useTransitionState() {
    const state = {
      isMounted: false,
      isLeaving: false,
      isUnmounting: false,
      leavingVNodes: /* @__PURE__ */ new Map()
    };
    onMounted(() => {
      state.isMounted = true;
    });
    onBeforeUnmount(() => {
      state.isUnmounting = true;
    });
    return state;
  }
  __name(useTransitionState, "useTransitionState");
  const TransitionHookValidator = [Function, Array];
  const BaseTransitionPropsValidators = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    // enter
    onBeforeEnter: TransitionHookValidator,
    onEnter: TransitionHookValidator,
    onAfterEnter: TransitionHookValidator,
    onEnterCancelled: TransitionHookValidator,
    // leave
    onBeforeLeave: TransitionHookValidator,
    onLeave: TransitionHookValidator,
    onAfterLeave: TransitionHookValidator,
    onLeaveCancelled: TransitionHookValidator,
    // appear
    onBeforeAppear: TransitionHookValidator,
    onAppear: TransitionHookValidator,
    onAfterAppear: TransitionHookValidator,
    onAppearCancelled: TransitionHookValidator
  };
  const recursiveGetSubtree = /* @__PURE__ */ __name((instance) => {
    const subTree = instance.subTree;
    return subTree.component ? recursiveGetSubtree(subTree.component) : subTree;
  }, "recursiveGetSubtree");
  const BaseTransitionImpl = {
    name: `BaseTransition`,
    props: BaseTransitionPropsValidators,
    setup(props, { slots }) {
      const instance = getCurrentInstance();
      const state = useTransitionState();
      return () => {
        const children = slots.default && getTransitionRawChildren(slots.default(), true);
        if (!children || !children.length) {
          return;
        }
        let child = children[0];
        if (children.length > 1) {
          let hasFound = false;
          for (const c of children) {
            if (c.type !== Comment) {
              if (!!(define_process_env_default$3.NODE_ENV !== "production") && hasFound) {
                warn$1(
                  "<transition> can only be used on a single element or component. Use <transition-group> for lists."
                );
                break;
              }
              child = c;
              hasFound = true;
              if (!!!(define_process_env_default$3.NODE_ENV !== "production")) break;
            }
          }
        }
        const rawProps = toRaw(props);
        const { mode } = rawProps;
        if (!!(define_process_env_default$3.NODE_ENV !== "production") && mode && mode !== "in-out" && mode !== "out-in" && mode !== "default") {
          warn$1(`invalid <transition> mode: ${mode}`);
        }
        if (state.isLeaving) {
          return emptyPlaceholder(child);
        }
        const innerChild = getKeepAliveChild(child);
        if (!innerChild) {
          return emptyPlaceholder(child);
        }
        let enterHooks = resolveTransitionHooks(
          innerChild,
          rawProps,
          state,
          instance,
          // #11061, ensure enterHooks is fresh after clone
          (hooks) => enterHooks = hooks
        );
        setTransitionHooks(innerChild, enterHooks);
        const oldChild = instance.subTree;
        const oldInnerChild = oldChild && getKeepAliveChild(oldChild);
        if (oldInnerChild && oldInnerChild.type !== Comment && !isSameVNodeType(innerChild, oldInnerChild) && recursiveGetSubtree(instance).type !== Comment) {
          const leavingHooks = resolveTransitionHooks(
            oldInnerChild,
            rawProps,
            state,
            instance
          );
          setTransitionHooks(oldInnerChild, leavingHooks);
          if (mode === "out-in" && innerChild.type !== Comment) {
            state.isLeaving = true;
            leavingHooks.afterLeave = () => {
              state.isLeaving = false;
              if (instance.update.active !== false) {
                instance.effect.dirty = true;
                instance.update();
              }
            };
            return emptyPlaceholder(child);
          } else if (mode === "in-out" && innerChild.type !== Comment) {
            leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
              const leavingVNodesCache = getLeavingNodesForType(
                state,
                oldInnerChild
              );
              leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
              el[leaveCbKey] = () => {
                earlyRemove();
                el[leaveCbKey] = void 0;
                delete enterHooks.delayedLeave;
              };
              enterHooks.delayedLeave = delayedLeave;
            };
          }
        }
        return child;
      };
    }
  };
  const BaseTransition = BaseTransitionImpl;
  function getLeavingNodesForType(state, vnode) {
    const { leavingVNodes } = state;
    let leavingVNodesCache = leavingVNodes.get(vnode.type);
    if (!leavingVNodesCache) {
      leavingVNodesCache = /* @__PURE__ */ Object.create(null);
      leavingVNodes.set(vnode.type, leavingVNodesCache);
    }
    return leavingVNodesCache;
  }
  __name(getLeavingNodesForType, "getLeavingNodesForType");
  function resolveTransitionHooks(vnode, props, state, instance, postClone) {
    const {
      appear,
      mode,
      persisted = false,
      onBeforeEnter,
      onEnter,
      onAfterEnter,
      onEnterCancelled,
      onBeforeLeave,
      onLeave,
      onAfterLeave,
      onLeaveCancelled,
      onBeforeAppear,
      onAppear,
      onAfterAppear,
      onAppearCancelled
    } = props;
    const key = String(vnode.key);
    const leavingVNodesCache = getLeavingNodesForType(state, vnode);
    const callHook2 = /* @__PURE__ */ __name((hook, args) => {
      hook && callWithAsyncErrorHandling(
        hook,
        instance,
        9,
        args
      );
    }, "callHook2");
    const callAsyncHook = /* @__PURE__ */ __name((hook, args) => {
      const done = args[1];
      callHook2(hook, args);
      if (isArray(hook)) {
        if (hook.every((hook2) => hook2.length <= 1)) done();
      } else if (hook.length <= 1) {
        done();
      }
    }, "callAsyncHook");
    const hooks = {
      mode,
      persisted,
      beforeEnter(el) {
        let hook = onBeforeEnter;
        if (!state.isMounted) {
          if (appear) {
            hook = onBeforeAppear || onBeforeEnter;
          } else {
            return;
          }
        }
        if (el[leaveCbKey]) {
          el[leaveCbKey](
            true
            /* cancelled */
          );
        }
        const leavingVNode = leavingVNodesCache[key];
        if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el[leaveCbKey]) {
          leavingVNode.el[leaveCbKey]();
        }
        callHook2(hook, [el]);
      },
      enter(el) {
        let hook = onEnter;
        let afterHook = onAfterEnter;
        let cancelHook = onEnterCancelled;
        if (!state.isMounted) {
          if (appear) {
            hook = onAppear || onEnter;
            afterHook = onAfterAppear || onAfterEnter;
            cancelHook = onAppearCancelled || onEnterCancelled;
          } else {
            return;
          }
        }
        let called = false;
        const done = el[enterCbKey] = (cancelled) => {
          if (called) return;
          called = true;
          if (cancelled) {
            callHook2(cancelHook, [el]);
          } else {
            callHook2(afterHook, [el]);
          }
          if (hooks.delayedLeave) {
            hooks.delayedLeave();
          }
          el[enterCbKey] = void 0;
        };
        if (hook) {
          callAsyncHook(hook, [el, done]);
        } else {
          done();
        }
      },
      leave(el, remove2) {
        const key2 = String(vnode.key);
        if (el[enterCbKey]) {
          el[enterCbKey](
            true
            /* cancelled */
          );
        }
        if (state.isUnmounting) {
          return remove2();
        }
        callHook2(onBeforeLeave, [el]);
        let called = false;
        const done = el[leaveCbKey] = (cancelled) => {
          if (called) return;
          called = true;
          remove2();
          if (cancelled) {
            callHook2(onLeaveCancelled, [el]);
          } else {
            callHook2(onAfterLeave, [el]);
          }
          el[leaveCbKey] = void 0;
          if (leavingVNodesCache[key2] === vnode) {
            delete leavingVNodesCache[key2];
          }
        };
        leavingVNodesCache[key2] = vnode;
        if (onLeave) {
          callAsyncHook(onLeave, [el, done]);
        } else {
          done();
        }
      },
      clone(vnode2) {
        const hooks2 = resolveTransitionHooks(
          vnode2,
          props,
          state,
          instance,
          postClone
        );
        if (postClone) postClone(hooks2);
        return hooks2;
      }
    };
    return hooks;
  }
  __name(resolveTransitionHooks, "resolveTransitionHooks");
  function emptyPlaceholder(vnode) {
    if (isKeepAlive(vnode)) {
      vnode = cloneVNode(vnode);
      vnode.children = null;
      return vnode;
    }
  }
  __name(emptyPlaceholder, "emptyPlaceholder");
  function getKeepAliveChild(vnode) {
    if (!isKeepAlive(vnode)) {
      return vnode;
    }
    if (!!(define_process_env_default$3.NODE_ENV !== "production") && vnode.component) {
      return vnode.component.subTree;
    }
    const { shapeFlag, children } = vnode;
    if (children) {
      if (shapeFlag & 16) {
        return children[0];
      }
      if (shapeFlag & 32 && isFunction(children.default)) {
        return children.default();
      }
    }
  }
  __name(getKeepAliveChild, "getKeepAliveChild");
  function setTransitionHooks(vnode, hooks) {
    if (vnode.shapeFlag & 6 && vnode.component) {
      setTransitionHooks(vnode.component.subTree, hooks);
    } else if (vnode.shapeFlag & 128) {
      vnode.ssContent.transition = hooks.clone(vnode.ssContent);
      vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
    } else {
      vnode.transition = hooks;
    }
  }
  __name(setTransitionHooks, "setTransitionHooks");
  function getTransitionRawChildren(children, keepComment = false, parentKey) {
    let ret = [];
    let keyedFragmentCount = 0;
    for (let i = 0; i < children.length; i++) {
      let child = children[i];
      const key = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i);
      if (child.type === Fragment) {
        if (child.patchFlag & 128) keyedFragmentCount++;
        ret = ret.concat(
          getTransitionRawChildren(child.children, keepComment, key)
        );
      } else if (keepComment || child.type !== Comment) {
        ret.push(key != null ? cloneVNode(child, { key }) : child);
      }
    }
    if (keyedFragmentCount > 1) {
      for (let i = 0; i < ret.length; i++) {
        ret[i].patchFlag = -2;
      }
    }
    return ret;
  }
  __name(getTransitionRawChildren, "getTransitionRawChildren");
  const isAsyncWrapper = /* @__PURE__ */ __name((i) => !!i.type.__asyncLoader, "isAsyncWrapper");
  const isKeepAlive = /* @__PURE__ */ __name((vnode) => vnode.type.__isKeepAlive, "isKeepAlive");
  function onActivated(hook, target) {
    registerKeepAliveHook(hook, "a", target);
  }
  __name(onActivated, "onActivated");
  function onDeactivated(hook, target) {
    registerKeepAliveHook(hook, "da", target);
  }
  __name(onDeactivated, "onDeactivated");
  function registerKeepAliveHook(hook, type, target = currentInstance) {
    const wrappedHook = hook.__wdc || (hook.__wdc = () => {
      let current = target;
      while (current) {
        if (current.isDeactivated) {
          return;
        }
        current = current.parent;
      }
      return hook();
    });
    injectHook(type, wrappedHook, target);
    if (target) {
      let current = target.parent;
      while (current && current.parent) {
        if (isKeepAlive(current.parent.vnode)) {
          injectToKeepAliveRoot(wrappedHook, type, target, current);
        }
        current = current.parent;
      }
    }
  }
  __name(registerKeepAliveHook, "registerKeepAliveHook");
  function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
    const injected = injectHook(
      type,
      hook,
      keepAliveRoot,
      true
      /* prepend */
    );
    onUnmounted(() => {
      remove(keepAliveRoot[type], injected);
    }, target);
  }
  __name(injectToKeepAliveRoot, "injectToKeepAliveRoot");
  function injectHook(type, hook, target = currentInstance, prepend = false) {
    if (target) {
      const hooks = target[type] || (target[type] = []);
      const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
        pauseTracking();
        const reset = setCurrentInstance(target);
        const res = callWithAsyncErrorHandling(hook, target, type, args);
        reset();
        resetTracking();
        return res;
      });
      if (prepend) {
        hooks.unshift(wrappedHook);
      } else {
        hooks.push(wrappedHook);
      }
      return wrappedHook;
    } else if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
      const apiName = toHandlerKey(ErrorTypeStrings$1[type].replace(/ hook$/, ""));
      warn$1(
        `${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
      );
    }
  }
  __name(injectHook, "injectHook");
  const createHook = /* @__PURE__ */ __name((lifecycle) => (hook, target = currentInstance) => {
    if (!isInSSRComponentSetup || lifecycle === "sp") {
      injectHook(lifecycle, (...args) => hook(...args), target);
    }
  }, "createHook");
  const onBeforeMount = createHook("bm");
  const onMounted = createHook("m");
  const onBeforeUpdate = createHook("bu");
  const onUpdated = createHook("u");
  const onBeforeUnmount = createHook("bum");
  const onUnmounted = createHook("um");
  const onServerPrefetch = createHook("sp");
  const onRenderTriggered = createHook(
    "rtg"
  );
  const onRenderTracked = createHook(
    "rtc"
  );
  function onErrorCaptured(hook, target = currentInstance) {
    injectHook("ec", hook, target);
  }
  __name(onErrorCaptured, "onErrorCaptured");
  const NULL_DYNAMIC_COMPONENT = Symbol.for("v-ndc");
  const getPublicInstance = /* @__PURE__ */ __name((i) => {
    if (!i) return null;
    if (isStatefulComponent(i)) return getComponentPublicInstance(i);
    return getPublicInstance(i.parent);
  }, "getPublicInstance");
  const publicPropertiesMap = (
    // Move PURE marker to new line to workaround compiler discarding it
    // due to type annotation
    /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
      $: /* @__PURE__ */ __name((i) => i, "$"),
      $el: /* @__PURE__ */ __name((i) => i.vnode.el, "$el"),
      $data: /* @__PURE__ */ __name((i) => i.data, "$data"),
      $props: /* @__PURE__ */ __name((i) => !!(define_process_env_default$3.NODE_ENV !== "production") ? shallowReadonly(i.props) : i.props, "$props"),
      $attrs: /* @__PURE__ */ __name((i) => !!(define_process_env_default$3.NODE_ENV !== "production") ? shallowReadonly(i.attrs) : i.attrs, "$attrs"),
      $slots: /* @__PURE__ */ __name((i) => !!(define_process_env_default$3.NODE_ENV !== "production") ? shallowReadonly(i.slots) : i.slots, "$slots"),
      $refs: /* @__PURE__ */ __name((i) => !!(define_process_env_default$3.NODE_ENV !== "production") ? shallowReadonly(i.refs) : i.refs, "$refs"),
      $parent: /* @__PURE__ */ __name((i) => getPublicInstance(i.parent), "$parent"),
      $root: /* @__PURE__ */ __name((i) => getPublicInstance(i.root), "$root"),
      $emit: /* @__PURE__ */ __name((i) => i.emit, "$emit"),
      $options: /* @__PURE__ */ __name((i) => resolveMergedOptions(i), "$options"),
      $forceUpdate: /* @__PURE__ */ __name((i) => i.f || (i.f = () => {
        i.effect.dirty = true;
        queueJob(i.update);
      }), "$forceUpdate"),
      $nextTick: /* @__PURE__ */ __name((i) => i.n || (i.n = nextTick.bind(i.proxy)), "$nextTick"),
      $watch: /* @__PURE__ */ __name((i) => instanceWatch.bind(i), "$watch")
    })
  );
  const isReservedPrefix = /* @__PURE__ */ __name((key) => key === "_" || key === "$", "isReservedPrefix");
  const hasSetupBinding = /* @__PURE__ */ __name((state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key), "hasSetupBinding");
  const PublicInstanceProxyHandlers = {
    get({ _: instance }, key) {
      if (key === "__v_skip") {
        return true;
      }
      const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
      if (!!(define_process_env_default$3.NODE_ENV !== "production") && key === "__isVue") {
        return true;
      }
      let normalizedProps;
      if (key[0] !== "$") {
        const n = accessCache[key];
        if (n !== void 0) {
          switch (n) {
            case 1:
              return setupState[key];
            case 2:
              return data[key];
            case 4:
              return ctx[key];
            case 3:
              return props[key];
          }
        } else if (hasSetupBinding(setupState, key)) {
          accessCache[key] = 1;
          return setupState[key];
        } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
          accessCache[key] = 2;
          return data[key];
        } else if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)
        ) {
          accessCache[key] = 3;
          return props[key];
        } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
          accessCache[key] = 4;
          return ctx[key];
        } else if (shouldCacheAccess) {
          accessCache[key] = 0;
        }
      }
      const publicGetter = publicPropertiesMap[key];
      let cssModule, globalProperties;
      if (publicGetter) {
        if (key === "$attrs") {
          track(instance.attrs, "get", "");
          !!(define_process_env_default$3.NODE_ENV !== "production") && markAttrsAccessed();
        } else if (!!(define_process_env_default$3.NODE_ENV !== "production") && key === "$slots") {
          track(instance, "get", key);
        }
        return publicGetter(instance);
      } else if (
        // css module (injected by vue-loader)
        (cssModule = type.__cssModules) && (cssModule = cssModule[key])
      ) {
        return cssModule;
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (
        // global properties
        globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)
      ) {
        {
          return globalProperties[key];
        }
      } else if (!!(define_process_env_default$3.NODE_ENV !== "production") && currentRenderingInstance && (!isString(key) || // #1091 avoid internal isRef/isVNode checks on component instance leading
      // to infinite warning loop
      key.indexOf("__v") !== 0)) {
        if (data !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn(data, key)) {
          warn$1(
            `Property ${JSON.stringify(
              key
            )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
          );
        } else if (instance === currentRenderingInstance) {
          warn$1(
            `Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`
          );
        }
      }
    },
    set({ _: instance }, key, value) {
      const { data, setupState, ctx } = instance;
      if (hasSetupBinding(setupState, key)) {
        setupState[key] = value;
        return true;
      } else if (!!(define_process_env_default$3.NODE_ENV !== "production") && setupState.__isScriptSetup && hasOwn(setupState, key)) {
        warn$1(`Cannot mutate <script setup> binding "${key}" from Options API.`);
        return false;
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        data[key] = value;
        return true;
      } else if (hasOwn(instance.props, key)) {
        !!(define_process_env_default$3.NODE_ENV !== "production") && warn$1(`Attempting to mutate prop "${key}". Props are readonly.`);
        return false;
      }
      if (key[0] === "$" && key.slice(1) in instance) {
        !!(define_process_env_default$3.NODE_ENV !== "production") && warn$1(
          `Attempting to mutate public property "${key}". Properties starting with $ are reserved and readonly.`
        );
        return false;
      } else {
        if (!!(define_process_env_default$3.NODE_ENV !== "production") && key in instance.appContext.config.globalProperties) {
          Object.defineProperty(ctx, key, {
            enumerable: true,
            configurable: true,
            value
          });
        } else {
          ctx[key] = value;
        }
      }
      return true;
    },
    has({
      _: { data, setupState, accessCache, ctx, appContext, propsOptions }
    }, key) {
      let normalizedProps;
      return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
    },
    defineProperty(target, key, descriptor) {
      if (descriptor.get != null) {
        target._.accessCache[key] = 0;
      } else if (hasOwn(descriptor, "value")) {
        this.set(target, key, descriptor.value, null);
      }
      return Reflect.defineProperty(target, key, descriptor);
    }
  };
  if (!!(define_process_env_default$3.NODE_ENV !== "production") && true) {
    PublicInstanceProxyHandlers.ownKeys = (target) => {
      warn$1(
        `Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`
      );
      return Reflect.ownKeys(target);
    };
  }
  function createDevRenderContext(instance) {
    const target = {};
    Object.defineProperty(target, `_`, {
      configurable: true,
      enumerable: false,
      get: /* @__PURE__ */ __name(() => instance, "get")
    });
    Object.keys(publicPropertiesMap).forEach((key) => {
      Object.defineProperty(target, key, {
        configurable: true,
        enumerable: false,
        get: /* @__PURE__ */ __name(() => publicPropertiesMap[key](instance), "get"),
        // intercepted by the proxy so no need for implementation,
        // but needed to prevent set errors
        set: NOOP
      });
    });
    return target;
  }
  __name(createDevRenderContext, "createDevRenderContext");
  function exposePropsOnRenderContext(instance) {
    const {
      ctx,
      propsOptions: [propsOptions]
    } = instance;
    if (propsOptions) {
      Object.keys(propsOptions).forEach((key) => {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: /* @__PURE__ */ __name(() => instance.props[key], "get"),
          set: NOOP
        });
      });
    }
  }
  __name(exposePropsOnRenderContext, "exposePropsOnRenderContext");
  function exposeSetupStateOnRenderContext(instance) {
    const { ctx, setupState } = instance;
    Object.keys(toRaw(setupState)).forEach((key) => {
      if (!setupState.__isScriptSetup) {
        if (isReservedPrefix(key[0])) {
          warn$1(
            `setup() return property ${JSON.stringify(
              key
            )} should not start with "$" or "_" which are reserved prefixes for Vue internals.`
          );
          return;
        }
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: /* @__PURE__ */ __name(() => setupState[key], "get"),
          set: NOOP
        });
      }
    });
  }
  __name(exposeSetupStateOnRenderContext, "exposeSetupStateOnRenderContext");
  function normalizePropsOrEmits(props) {
    return isArray(props) ? props.reduce(
      (normalized, p2) => (normalized[p2] = null, normalized),
      {}
    ) : props;
  }
  __name(normalizePropsOrEmits, "normalizePropsOrEmits");
  function createDuplicateChecker() {
    const cache = /* @__PURE__ */ Object.create(null);
    return (type, key) => {
      if (cache[key]) {
        warn$1(`${type} property "${key}" is already defined in ${cache[key]}.`);
      } else {
        cache[key] = type;
      }
    };
  }
  __name(createDuplicateChecker, "createDuplicateChecker");
  let shouldCacheAccess = true;
  function applyOptions(instance) {
    const options = resolveMergedOptions(instance);
    const publicThis = instance.proxy;
    const ctx = instance.ctx;
    shouldCacheAccess = false;
    if (options.beforeCreate) {
      callHook$1(options.beforeCreate, instance, "bc");
    }
    const {
      // state
      data: dataOptions,
      computed: computedOptions,
      methods,
      watch: watchOptions,
      provide: provideOptions,
      inject: injectOptions,
      // lifecycle
      created,
      beforeMount,
      mounted,
      beforeUpdate,
      updated,
      activated,
      deactivated,
      beforeDestroy,
      beforeUnmount,
      destroyed,
      unmounted,
      render: render2,
      renderTracked,
      renderTriggered,
      errorCaptured,
      serverPrefetch,
      // public API
      expose,
      inheritAttrs,
      // assets
      components,
      directives,
      filters
    } = options;
    const checkDuplicateProperties = !!(define_process_env_default$3.NODE_ENV !== "production") ? createDuplicateChecker() : null;
    if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
      const [propsOptions] = instance.propsOptions;
      if (propsOptions) {
        for (const key in propsOptions) {
          checkDuplicateProperties("Props", key);
        }
      }
    }
    if (injectOptions) {
      resolveInjections(injectOptions, ctx, checkDuplicateProperties);
    }
    if (methods) {
      for (const key in methods) {
        const methodHandler = methods[key];
        if (isFunction(methodHandler)) {
          if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
            Object.defineProperty(ctx, key, {
              value: methodHandler.bind(publicThis),
              configurable: true,
              enumerable: true,
              writable: true
            });
          } else {
            ctx[key] = methodHandler.bind(publicThis);
          }
          if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
            checkDuplicateProperties("Methods", key);
          }
        } else if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
          warn$1(
            `Method "${key}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`
          );
        }
      }
    }
    if (dataOptions) {
      if (!!(define_process_env_default$3.NODE_ENV !== "production") && !isFunction(dataOptions)) {
        warn$1(
          `The data option must be a function. Plain object usage is no longer supported.`
        );
      }
      const data = dataOptions.call(publicThis, publicThis);
      if (!!(define_process_env_default$3.NODE_ENV !== "production") && isPromise(data)) {
        warn$1(
          `data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`
        );
      }
      if (!isObject(data)) {
        !!(define_process_env_default$3.NODE_ENV !== "production") && warn$1(`data() should return an object.`);
      } else {
        instance.data = reactive(data);
        if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
          for (const key in data) {
            checkDuplicateProperties("Data", key);
            if (!isReservedPrefix(key[0])) {
              Object.defineProperty(ctx, key, {
                configurable: true,
                enumerable: true,
                get: /* @__PURE__ */ __name(() => data[key], "get"),
                set: NOOP
              });
            }
          }
        }
      }
    }
    shouldCacheAccess = true;
    if (computedOptions) {
      for (const key in computedOptions) {
        const opt = computedOptions[key];
        const get2 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
        if (!!(define_process_env_default$3.NODE_ENV !== "production") && get2 === NOOP) {
          warn$1(`Computed property "${key}" has no getter.`);
        }
        const set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : !!(define_process_env_default$3.NODE_ENV !== "production") ? () => {
          warn$1(
            `Write operation failed: computed property "${key}" is readonly.`
          );
        } : NOOP;
        const c = computed({
          get: get2,
          set: set2
        });
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: /* @__PURE__ */ __name(() => c.value, "get"),
          set: /* @__PURE__ */ __name((v) => c.value = v, "set")
        });
        if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
          checkDuplicateProperties("Computed", key);
        }
      }
    }
    if (watchOptions) {
      for (const key in watchOptions) {
        createWatcher(watchOptions[key], ctx, publicThis, key);
      }
    }
    if (provideOptions) {
      const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
      Reflect.ownKeys(provides).forEach((key) => {
        provide(key, provides[key]);
      });
    }
    if (created) {
      callHook$1(created, instance, "c");
    }
    function registerLifecycleHook(register, hook) {
      if (isArray(hook)) {
        hook.forEach((_hook) => register(_hook.bind(publicThis)));
      } else if (hook) {
        register(hook.bind(publicThis));
      }
    }
    __name(registerLifecycleHook, "registerLifecycleHook");
    registerLifecycleHook(onBeforeMount, beforeMount);
    registerLifecycleHook(onMounted, mounted);
    registerLifecycleHook(onBeforeUpdate, beforeUpdate);
    registerLifecycleHook(onUpdated, updated);
    registerLifecycleHook(onActivated, activated);
    registerLifecycleHook(onDeactivated, deactivated);
    registerLifecycleHook(onErrorCaptured, errorCaptured);
    registerLifecycleHook(onRenderTracked, renderTracked);
    registerLifecycleHook(onRenderTriggered, renderTriggered);
    registerLifecycleHook(onBeforeUnmount, beforeUnmount);
    registerLifecycleHook(onUnmounted, unmounted);
    registerLifecycleHook(onServerPrefetch, serverPrefetch);
    if (isArray(expose)) {
      if (expose.length) {
        const exposed = instance.exposed || (instance.exposed = {});
        expose.forEach((key) => {
          Object.defineProperty(exposed, key, {
            get: /* @__PURE__ */ __name(() => publicThis[key], "get"),
            set: /* @__PURE__ */ __name((val) => publicThis[key] = val, "set")
          });
        });
      } else if (!instance.exposed) {
        instance.exposed = {};
      }
    }
    if (render2 && instance.render === NOOP) {
      instance.render = render2;
    }
    if (inheritAttrs != null) {
      instance.inheritAttrs = inheritAttrs;
    }
    if (components) instance.components = components;
    if (directives) instance.directives = directives;
  }
  __name(applyOptions, "applyOptions");
  function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
    if (isArray(injectOptions)) {
      injectOptions = normalizeInject(injectOptions);
    }
    for (const key in injectOptions) {
      const opt = injectOptions[key];
      let injected;
      if (isObject(opt)) {
        if ("default" in opt) {
          injected = inject(
            opt.from || key,
            opt.default,
            true
          );
        } else {
          injected = inject(opt.from || key);
        }
      } else {
        injected = inject(opt);
      }
      if (isRef(injected)) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: /* @__PURE__ */ __name(() => injected.value, "get"),
          set: /* @__PURE__ */ __name((v) => injected.value = v, "set")
        });
      } else {
        ctx[key] = injected;
      }
      if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
        checkDuplicateProperties("Inject", key);
      }
    }
  }
  __name(resolveInjections, "resolveInjections");
  function callHook$1(hook, instance, type) {
    callWithAsyncErrorHandling(
      isArray(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy),
      instance,
      type
    );
  }
  __name(callHook$1, "callHook$1");
  function createWatcher(raw, ctx, publicThis, key) {
    const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
    if (isString(raw)) {
      const handler = ctx[raw];
      if (isFunction(handler)) {
        watch(getter, handler);
      } else if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
        warn$1(`Invalid watch handler specified by key "${raw}"`, handler);
      }
    } else if (isFunction(raw)) {
      watch(getter, raw.bind(publicThis));
    } else if (isObject(raw)) {
      if (isArray(raw)) {
        raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
      } else {
        const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
        if (isFunction(handler)) {
          watch(getter, handler, raw);
        } else if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
          warn$1(`Invalid watch handler specified by key "${raw.handler}"`, handler);
        }
      }
    } else if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
      warn$1(`Invalid watch option: "${key}"`, raw);
    }
  }
  __name(createWatcher, "createWatcher");
  function resolveMergedOptions(instance) {
    const base = instance.type;
    const { mixins, extends: extendsOptions } = base;
    const {
      mixins: globalMixins,
      optionsCache: cache,
      config: { optionMergeStrategies }
    } = instance.appContext;
    const cached = cache.get(base);
    let resolved;
    if (cached) {
      resolved = cached;
    } else if (!globalMixins.length && !mixins && !extendsOptions) {
      {
        resolved = base;
      }
    } else {
      resolved = {};
      if (globalMixins.length) {
        globalMixins.forEach(
          (m) => mergeOptions(resolved, m, optionMergeStrategies, true)
        );
      }
      mergeOptions(resolved, base, optionMergeStrategies);
    }
    if (isObject(base)) {
      cache.set(base, resolved);
    }
    return resolved;
  }
  __name(resolveMergedOptions, "resolveMergedOptions");
  function mergeOptions(to, from, strats, asMixin = false) {
    const { mixins, extends: extendsOptions } = from;
    if (extendsOptions) {
      mergeOptions(to, extendsOptions, strats, true);
    }
    if (mixins) {
      mixins.forEach(
        (m) => mergeOptions(to, m, strats, true)
      );
    }
    for (const key in from) {
      if (asMixin && key === "expose") {
        !!(define_process_env_default$3.NODE_ENV !== "production") && warn$1(
          `"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`
        );
      } else {
        const strat = internalOptionMergeStrats[key] || strats && strats[key];
        to[key] = strat ? strat(to[key], from[key]) : from[key];
      }
    }
    return to;
  }
  __name(mergeOptions, "mergeOptions");
  const internalOptionMergeStrats = {
    data: mergeDataFn,
    props: mergeEmitsOrPropsOptions,
    emits: mergeEmitsOrPropsOptions,
    // objects
    methods: mergeObjectOptions,
    computed: mergeObjectOptions,
    // lifecycle
    beforeCreate: mergeAsArray,
    created: mergeAsArray,
    beforeMount: mergeAsArray,
    mounted: mergeAsArray,
    beforeUpdate: mergeAsArray,
    updated: mergeAsArray,
    beforeDestroy: mergeAsArray,
    beforeUnmount: mergeAsArray,
    destroyed: mergeAsArray,
    unmounted: mergeAsArray,
    activated: mergeAsArray,
    deactivated: mergeAsArray,
    errorCaptured: mergeAsArray,
    serverPrefetch: mergeAsArray,
    // assets
    components: mergeObjectOptions,
    directives: mergeObjectOptions,
    // watch
    watch: mergeWatchOptions,
    // provide / inject
    provide: mergeDataFn,
    inject: mergeInject
  };
  function mergeDataFn(to, from) {
    if (!from) {
      return to;
    }
    if (!to) {
      return from;
    }
    return /* @__PURE__ */ __name(function mergedDataFn() {
      return extend(
        isFunction(to) ? to.call(this, this) : to,
        isFunction(from) ? from.call(this, this) : from
      );
    }, "mergedDataFn");
  }
  __name(mergeDataFn, "mergeDataFn");
  function mergeInject(to, from) {
    return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
  }
  __name(mergeInject, "mergeInject");
  function normalizeInject(raw) {
    if (isArray(raw)) {
      const res = {};
      for (let i = 0; i < raw.length; i++) {
        res[raw[i]] = raw[i];
      }
      return res;
    }
    return raw;
  }
  __name(normalizeInject, "normalizeInject");
  function mergeAsArray(to, from) {
    return to ? [...new Set([].concat(to, from))] : from;
  }
  __name(mergeAsArray, "mergeAsArray");
  function mergeObjectOptions(to, from) {
    return to ? extend(/* @__PURE__ */ Object.create(null), to, from) : from;
  }
  __name(mergeObjectOptions, "mergeObjectOptions");
  function mergeEmitsOrPropsOptions(to, from) {
    if (to) {
      if (isArray(to) && isArray(from)) {
        return [.../* @__PURE__ */ new Set([...to, ...from])];
      }
      return extend(
        /* @__PURE__ */ Object.create(null),
        normalizePropsOrEmits(to),
        normalizePropsOrEmits(from != null ? from : {})
      );
    } else {
      return from;
    }
  }
  __name(mergeEmitsOrPropsOptions, "mergeEmitsOrPropsOptions");
  function mergeWatchOptions(to, from) {
    if (!to) return from;
    if (!from) return to;
    const merged = extend(/* @__PURE__ */ Object.create(null), to);
    for (const key in from) {
      merged[key] = mergeAsArray(to[key], from[key]);
    }
    return merged;
  }
  __name(mergeWatchOptions, "mergeWatchOptions");
  function createAppContext() {
    return {
      app: null,
      config: {
        isNativeTag: NO,
        performance: false,
        globalProperties: {},
        optionMergeStrategies: {},
        errorHandler: void 0,
        warnHandler: void 0,
        compilerOptions: {}
      },
      mixins: [],
      components: {},
      directives: {},
      provides: /* @__PURE__ */ Object.create(null),
      optionsCache: /* @__PURE__ */ new WeakMap(),
      propsCache: /* @__PURE__ */ new WeakMap(),
      emitsCache: /* @__PURE__ */ new WeakMap()
    };
  }
  __name(createAppContext, "createAppContext");
  let uid$1 = 0;
  function createAppAPI(render2, hydrate) {
    return /* @__PURE__ */ __name(function createApp(rootComponent, rootProps = null) {
      if (!isFunction(rootComponent)) {
        rootComponent = extend({}, rootComponent);
      }
      if (rootProps != null && !isObject(rootProps)) {
        !!(define_process_env_default$3.NODE_ENV !== "production") && warn$1(`root props passed to app.mount() must be an object.`);
        rootProps = null;
      }
      const context = createAppContext();
      const installedPlugins = /* @__PURE__ */ new WeakSet();
      let isMounted = false;
      const app = context.app = {
        _uid: uid$1++,
        _component: rootComponent,
        _props: rootProps,
        _container: null,
        _context: context,
        _instance: null,
        version,
        get config() {
          return context.config;
        },
        set config(v) {
          if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
            warn$1(
              `app.config cannot be replaced. Modify individual options instead.`
            );
          }
        },
        use(plugin, ...options) {
          if (installedPlugins.has(plugin)) {
            !!(define_process_env_default$3.NODE_ENV !== "production") && warn$1(`Plugin has already been applied to target app.`);
          } else if (plugin && isFunction(plugin.install)) {
            installedPlugins.add(plugin);
            plugin.install(app, ...options);
          } else if (isFunction(plugin)) {
            installedPlugins.add(plugin);
            plugin(app, ...options);
          } else if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
            warn$1(
              `A plugin must either be a function or an object with an "install" function.`
            );
          }
          return app;
        },
        mixin(mixin) {
          {
            if (!context.mixins.includes(mixin)) {
              context.mixins.push(mixin);
            } else if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
              warn$1(
                "Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : "")
              );
            }
          }
          return app;
        },
        component(name, component) {
          if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
            validateComponentName(name, context.config);
          }
          if (!component) {
            return context.components[name];
          }
          if (!!(define_process_env_default$3.NODE_ENV !== "production") && context.components[name]) {
            warn$1(`Component "${name}" has already been registered in target app.`);
          }
          context.components[name] = component;
          return app;
        },
        directive(name, directive) {
          if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
            validateDirectiveName(name);
          }
          if (!directive) {
            return context.directives[name];
          }
          if (!!(define_process_env_default$3.NODE_ENV !== "production") && context.directives[name]) {
            warn$1(`Directive "${name}" has already been registered in target app.`);
          }
          context.directives[name] = directive;
          return app;
        },
        mount(rootContainer, isHydrate, namespace) {
          if (!isMounted) {
            if (!!(define_process_env_default$3.NODE_ENV !== "production") && rootContainer.__vue_app__) {
              warn$1(
                `There is already an app instance mounted on the host container.
 If you want to mount another app on the same host container, you need to unmount the previous app by calling \`app.unmount()\` first.`
              );
            }
            const vnode = createVNode(rootComponent, rootProps);
            vnode.appContext = context;
            if (namespace === true) {
              namespace = "svg";
            } else if (namespace === false) {
              namespace = void 0;
            }
            if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
              context.reload = () => {
                render2(
                  cloneVNode(vnode),
                  rootContainer,
                  namespace
                );
              };
            }
            if (isHydrate && hydrate) {
              hydrate(vnode, rootContainer);
            } else {
              render2(vnode, rootContainer, namespace);
            }
            isMounted = true;
            app._container = rootContainer;
            rootContainer.__vue_app__ = app;
            if (!!(define_process_env_default$3.NODE_ENV !== "production") || false) {
              app._instance = vnode.component;
              devtoolsInitApp(app, version);
            }
            return getComponentPublicInstance(vnode.component);
          } else if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
            warn$1(
              `App has already been mounted.
If you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. \`const createMyApp = () => createApp(App)\``
            );
          }
        },
        unmount() {
          if (isMounted) {
            render2(null, app._container);
            if (!!(define_process_env_default$3.NODE_ENV !== "production") || false) {
              app._instance = null;
              devtoolsUnmountApp(app);
            }
            delete app._container.__vue_app__;
          } else if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
            warn$1(`Cannot unmount an app that is not mounted.`);
          }
        },
        provide(key, value) {
          if (!!(define_process_env_default$3.NODE_ENV !== "production") && key in context.provides) {
            warn$1(
              `App already provides property with key "${String(key)}". It will be overwritten with the new value.`
            );
          }
          context.provides[key] = value;
          return app;
        },
        runWithContext(fn) {
          const lastApp = currentApp;
          currentApp = app;
          try {
            return fn();
          } finally {
            currentApp = lastApp;
          }
        }
      };
      return app;
    }, "createApp");
  }
  __name(createAppAPI, "createAppAPI");
  let currentApp = null;
  function provide(key, value) {
    if (!currentInstance) {
      if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
        warn$1(`provide() can only be used inside setup().`);
      }
    } else {
      let provides = currentInstance.provides;
      const parentProvides = currentInstance.parent && currentInstance.parent.provides;
      if (parentProvides === provides) {
        provides = currentInstance.provides = Object.create(parentProvides);
      }
      provides[key] = value;
    }
  }
  __name(provide, "provide");
  function inject(key, defaultValue, treatDefaultAsFactory = false) {
    const instance = currentInstance || currentRenderingInstance;
    if (instance || currentApp) {
      const provides = instance ? instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : currentApp._context.provides;
      if (provides && key in provides) {
        return provides[key];
      } else if (arguments.length > 1) {
        return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
      } else if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
        warn$1(`injection "${String(key)}" not found.`);
      }
    } else if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
      warn$1(`inject() can only be used inside setup() or functional components.`);
    }
  }
  __name(inject, "inject");
  function hasInjectionContext() {
    return !!(currentInstance || currentRenderingInstance || currentApp);
  }
  __name(hasInjectionContext, "hasInjectionContext");
  const internalObjectProto = {};
  const createInternalObject = /* @__PURE__ */ __name(() => Object.create(internalObjectProto), "createInternalObject");
  const isInternalObject = /* @__PURE__ */ __name((obj) => Object.getPrototypeOf(obj) === internalObjectProto, "isInternalObject");
  function initProps(instance, rawProps, isStateful, isSSR = false) {
    const props = {};
    const attrs = createInternalObject();
    instance.propsDefaults = /* @__PURE__ */ Object.create(null);
    setFullProps(instance, rawProps, props, attrs);
    for (const key in instance.propsOptions[0]) {
      if (!(key in props)) {
        props[key] = void 0;
      }
    }
    if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
      validateProps(rawProps || {}, props, instance);
    }
    if (isStateful) {
      instance.props = isSSR ? props : shallowReactive(props);
    } else {
      if (!instance.type.props) {
        instance.props = attrs;
      } else {
        instance.props = props;
      }
    }
    instance.attrs = attrs;
  }
  __name(initProps, "initProps");
  function isInHmrContext(instance) {
    while (instance) {
      if (instance.type.__hmrId) return true;
      instance = instance.parent;
    }
  }
  __name(isInHmrContext, "isInHmrContext");
  function updateProps(instance, rawProps, rawPrevProps, optimized) {
    const {
      props,
      attrs,
      vnode: { patchFlag }
    } = instance;
    const rawCurrentProps = toRaw(props);
    const [options] = instance.propsOptions;
    let hasAttrsChanged = false;
    if (
      // always force full diff in dev
      // - #1942 if hmr is enabled with sfc component
      // - vite#872 non-sfc component used by sfc component
      !(!!(define_process_env_default$3.NODE_ENV !== "production") && isInHmrContext(instance)) && (optimized || patchFlag > 0) && !(patchFlag & 16)
    ) {
      if (patchFlag & 8) {
        const propsToUpdate = instance.vnode.dynamicProps;
        for (let i = 0; i < propsToUpdate.length; i++) {
          let key = propsToUpdate[i];
          if (isEmitListener(instance.emitsOptions, key)) {
            continue;
          }
          const value = rawProps[key];
          if (options) {
            if (hasOwn(attrs, key)) {
              if (value !== attrs[key]) {
                attrs[key] = value;
                hasAttrsChanged = true;
              }
            } else {
              const camelizedKey = camelize(key);
              props[camelizedKey] = resolvePropValue(
                options,
                rawCurrentProps,
                camelizedKey,
                value,
                instance,
                false
              );
            }
          } else {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          }
        }
      }
    } else {
      if (setFullProps(instance, rawProps, props, attrs)) {
        hasAttrsChanged = true;
      }
      let kebabKey;
      for (const key in rawCurrentProps) {
        if (!rawProps || // for camelCase
        !hasOwn(rawProps, key) && // it's possible the original props was passed in as kebab-case
        // and converted to camelCase (#955)
        ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
          if (options) {
            if (rawPrevProps && // for camelCase
            (rawPrevProps[key] !== void 0 || // for kebab-case
            rawPrevProps[kebabKey] !== void 0)) {
              props[key] = resolvePropValue(
                options,
                rawCurrentProps,
                key,
                void 0,
                instance,
                true
              );
            }
          } else {
            delete props[key];
          }
        }
      }
      if (attrs !== rawCurrentProps) {
        for (const key in attrs) {
          if (!rawProps || !hasOwn(rawProps, key) && true) {
            delete attrs[key];
            hasAttrsChanged = true;
          }
        }
      }
    }
    if (hasAttrsChanged) {
      trigger(instance.attrs, "set", "");
    }
    if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
      validateProps(rawProps || {}, props, instance);
    }
  }
  __name(updateProps, "updateProps");
  function setFullProps(instance, rawProps, props, attrs) {
    const [options, needCastKeys] = instance.propsOptions;
    let hasAttrsChanged = false;
    let rawCastValues;
    if (rawProps) {
      for (let key in rawProps) {
        if (isReservedProp(key)) {
          continue;
        }
        const value = rawProps[key];
        let camelKey;
        if (options && hasOwn(options, camelKey = camelize(key))) {
          if (!needCastKeys || !needCastKeys.includes(camelKey)) {
            props[camelKey] = value;
          } else {
            (rawCastValues || (rawCastValues = {}))[camelKey] = value;
          }
        } else if (!isEmitListener(instance.emitsOptions, key)) {
          if (!(key in attrs) || value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
    if (needCastKeys) {
      const rawCurrentProps = toRaw(props);
      const castValues = rawCastValues || EMPTY_OBJ;
      for (let i = 0; i < needCastKeys.length; i++) {
        const key = needCastKeys[i];
        props[key] = resolvePropValue(
          options,
          rawCurrentProps,
          key,
          castValues[key],
          instance,
          !hasOwn(castValues, key)
        );
      }
    }
    return hasAttrsChanged;
  }
  __name(setFullProps, "setFullProps");
  function resolvePropValue(options, props, key, value, instance, isAbsent) {
    const opt = options[key];
    if (opt != null) {
      const hasDefault = hasOwn(opt, "default");
      if (hasDefault && value === void 0) {
        const defaultValue = opt.default;
        if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
          const { propsDefaults } = instance;
          if (key in propsDefaults) {
            value = propsDefaults[key];
          } else {
            const reset = setCurrentInstance(instance);
            value = propsDefaults[key] = defaultValue.call(
              null,
              props
            );
            reset();
          }
        } else {
          value = defaultValue;
        }
      }
      if (opt[
        0
        /* shouldCast */
      ]) {
        if (isAbsent && !hasDefault) {
          value = false;
        } else if (opt[
          1
          /* shouldCastTrue */
        ] && (value === "" || value === hyphenate(key))) {
          value = true;
        }
      }
    }
    return value;
  }
  __name(resolvePropValue, "resolvePropValue");
  const mixinPropsCache = /* @__PURE__ */ new WeakMap();
  function normalizePropsOptions(comp, appContext, asMixin = false) {
    const cache = asMixin ? mixinPropsCache : appContext.propsCache;
    const cached = cache.get(comp);
    if (cached) {
      return cached;
    }
    const raw = comp.props;
    const normalized = {};
    const needCastKeys = [];
    let hasExtends = false;
    if (!isFunction(comp)) {
      const extendProps = /* @__PURE__ */ __name((raw2) => {
        hasExtends = true;
        const [props, keys] = normalizePropsOptions(raw2, appContext, true);
        extend(normalized, props);
        if (keys) needCastKeys.push(...keys);
      }, "extendProps");
      if (!asMixin && appContext.mixins.length) {
        appContext.mixins.forEach(extendProps);
      }
      if (comp.extends) {
        extendProps(comp.extends);
      }
      if (comp.mixins) {
        comp.mixins.forEach(extendProps);
      }
    }
    if (!raw && !hasExtends) {
      if (isObject(comp)) {
        cache.set(comp, EMPTY_ARR);
      }
      return EMPTY_ARR;
    }
    if (isArray(raw)) {
      for (let i = 0; i < raw.length; i++) {
        if (!!(define_process_env_default$3.NODE_ENV !== "production") && !isString(raw[i])) {
          warn$1(`props must be strings when using array syntax.`, raw[i]);
        }
        const normalizedKey = camelize(raw[i]);
        if (validatePropName(normalizedKey)) {
          normalized[normalizedKey] = EMPTY_OBJ;
        }
      }
    } else if (raw) {
      if (!!(define_process_env_default$3.NODE_ENV !== "production") && !isObject(raw)) {
        warn$1(`invalid props options`, raw);
      }
      for (const key in raw) {
        const normalizedKey = camelize(key);
        if (validatePropName(normalizedKey)) {
          const opt = raw[key];
          const prop = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : extend({}, opt);
          if (prop) {
            const booleanIndex = getTypeIndex(Boolean, prop.type);
            const stringIndex = getTypeIndex(String, prop.type);
            prop[
              0
              /* shouldCast */
            ] = booleanIndex > -1;
            prop[
              1
              /* shouldCastTrue */
            ] = stringIndex < 0 || booleanIndex < stringIndex;
            if (booleanIndex > -1 || hasOwn(prop, "default")) {
              needCastKeys.push(normalizedKey);
            }
          }
        }
      }
    }
    const res = [normalized, needCastKeys];
    if (isObject(comp)) {
      cache.set(comp, res);
    }
    return res;
  }
  __name(normalizePropsOptions, "normalizePropsOptions");
  function validatePropName(key) {
    if (key[0] !== "$" && !isReservedProp(key)) {
      return true;
    } else if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
      warn$1(`Invalid prop name: "${key}" is a reserved property.`);
    }
    return false;
  }
  __name(validatePropName, "validatePropName");
  function getType(ctor) {
    if (ctor === null) {
      return "null";
    }
    if (typeof ctor === "function") {
      return ctor.name || "";
    } else if (typeof ctor === "object") {
      const name = ctor.constructor && ctor.constructor.name;
      return name || "";
    }
    return "";
  }
  __name(getType, "getType");
  function isSameType(a, b) {
    return getType(a) === getType(b);
  }
  __name(isSameType, "isSameType");
  function getTypeIndex(type, expectedTypes) {
    if (isArray(expectedTypes)) {
      return expectedTypes.findIndex((t) => isSameType(t, type));
    } else if (isFunction(expectedTypes)) {
      return isSameType(expectedTypes, type) ? 0 : -1;
    }
    return -1;
  }
  __name(getTypeIndex, "getTypeIndex");
  function validateProps(rawProps, props, instance) {
    const resolvedValues = toRaw(props);
    const options = instance.propsOptions[0];
    for (const key in options) {
      let opt = options[key];
      if (opt == null) continue;
      validateProp(
        key,
        resolvedValues[key],
        opt,
        !!(define_process_env_default$3.NODE_ENV !== "production") ? shallowReadonly(resolvedValues) : resolvedValues,
        !hasOwn(rawProps, key) && !hasOwn(rawProps, hyphenate(key))
      );
    }
  }
  __name(validateProps, "validateProps");
  function validateProp(name, value, prop, props, isAbsent) {
    const { type, required, validator, skipCheck } = prop;
    if (required && isAbsent) {
      warn$1('Missing required prop: "' + name + '"');
      return;
    }
    if (value == null && !required) {
      return;
    }
    if (type != null && type !== true && !skipCheck) {
      let isValid = false;
      const types = isArray(type) ? type : [type];
      const expectedTypes = [];
      for (let i = 0; i < types.length && !isValid; i++) {
        const { valid, expectedType } = assertType(value, types[i]);
        expectedTypes.push(expectedType || "");
        isValid = valid;
      }
      if (!isValid) {
        warn$1(getInvalidTypeMessage(name, value, expectedTypes));
        return;
      }
    }
    if (validator && !validator(value, props)) {
      warn$1('Invalid prop: custom validator check failed for prop "' + name + '".');
    }
  }
  __name(validateProp, "validateProp");
  const isSimpleType = /* @__PURE__ */ makeMap(
    "String,Number,Boolean,Function,Symbol,BigInt"
  );
  function assertType(value, type) {
    let valid;
    const expectedType = getType(type);
    if (isSimpleType(expectedType)) {
      const t = typeof value;
      valid = t === expectedType.toLowerCase();
      if (!valid && t === "object") {
        valid = value instanceof type;
      }
    } else if (expectedType === "Object") {
      valid = isObject(value);
    } else if (expectedType === "Array") {
      valid = isArray(value);
    } else if (expectedType === "null") {
      valid = value === null;
    } else {
      valid = value instanceof type;
    }
    return {
      valid,
      expectedType
    };
  }
  __name(assertType, "assertType");
  function getInvalidTypeMessage(name, value, expectedTypes) {
    if (expectedTypes.length === 0) {
      return `Prop type [] for prop "${name}" won't match anything. Did you mean to use type Array instead?`;
    }
    let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize).join(" | ")}`;
    const expectedType = expectedTypes[0];
    const receivedType = toRawType(value);
    const expectedValue = styleValue(value, expectedType);
    const receivedValue = styleValue(value, receivedType);
    if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
      message += ` with value ${expectedValue}`;
    }
    message += `, got ${receivedType} `;
    if (isExplicable(receivedType)) {
      message += `with value ${receivedValue}.`;
    }
    return message;
  }
  __name(getInvalidTypeMessage, "getInvalidTypeMessage");
  function styleValue(value, type) {
    if (type === "String") {
      return `"${value}"`;
    } else if (type === "Number") {
      return `${Number(value)}`;
    } else {
      return `${value}`;
    }
  }
  __name(styleValue, "styleValue");
  function isExplicable(type) {
    const explicitTypes = ["string", "number", "boolean"];
    return explicitTypes.some((elem) => type.toLowerCase() === elem);
  }
  __name(isExplicable, "isExplicable");
  function isBoolean(...args) {
    return args.some((elem) => elem.toLowerCase() === "boolean");
  }
  __name(isBoolean, "isBoolean");
  const isInternalKey = /* @__PURE__ */ __name((key) => key[0] === "_" || key === "$stable", "isInternalKey");
  const normalizeSlotValue = /* @__PURE__ */ __name((value) => isArray(value) ? value.map(normalizeVNode) : [normalizeVNode(value)], "normalizeSlotValue");
  const normalizeSlot = /* @__PURE__ */ __name((key, rawSlot, ctx) => {
    if (rawSlot._n) {
      return rawSlot;
    }
    const normalized = withCtx((...args) => {
      if (!!(define_process_env_default$3.NODE_ENV !== "production") && currentInstance && (!ctx || ctx.root === currentInstance.root)) {
        warn$1(
          `Slot "${key}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`
        );
      }
      return normalizeSlotValue(rawSlot(...args));
    }, ctx);
    normalized._c = false;
    return normalized;
  }, "normalizeSlot");
  const normalizeObjectSlots = /* @__PURE__ */ __name((rawSlots, slots, instance) => {
    const ctx = rawSlots._ctx;
    for (const key in rawSlots) {
      if (isInternalKey(key)) continue;
      const value = rawSlots[key];
      if (isFunction(value)) {
        slots[key] = normalizeSlot(key, value, ctx);
      } else if (value != null) {
        if (!!(define_process_env_default$3.NODE_ENV !== "production") && true) {
          warn$1(
            `Non-function value encountered for slot "${key}". Prefer function slots for better performance.`
          );
        }
        const normalized = normalizeSlotValue(value);
        slots[key] = () => normalized;
      }
    }
  }, "normalizeObjectSlots");
  const normalizeVNodeSlots = /* @__PURE__ */ __name((instance, children) => {
    if (!!(define_process_env_default$3.NODE_ENV !== "production") && !isKeepAlive(instance.vnode) && true) {
      warn$1(
        `Non-function value encountered for default slot. Prefer function slots for better performance.`
      );
    }
    const normalized = normalizeSlotValue(children);
    instance.slots.default = () => normalized;
  }, "normalizeVNodeSlots");
  const assignSlots = /* @__PURE__ */ __name((slots, children, optimized) => {
    for (const key in children) {
      if (optimized || key !== "_") {
        slots[key] = children[key];
      }
    }
  }, "assignSlots");
  const initSlots = /* @__PURE__ */ __name((instance, children, optimized) => {
    const slots = instance.slots = createInternalObject();
    if (instance.vnode.shapeFlag & 32) {
      const type = children._;
      if (type) {
        assignSlots(slots, children, optimized);
        if (optimized) {
          def(slots, "_", type, true);
        }
      } else {
        normalizeObjectSlots(children, slots);
      }
    } else if (children) {
      normalizeVNodeSlots(instance, children);
    }
  }, "initSlots");
  const updateSlots = /* @__PURE__ */ __name((instance, children, optimized) => {
    const { vnode, slots } = instance;
    let needDeletionCheck = true;
    let deletionComparisonTarget = EMPTY_OBJ;
    if (vnode.shapeFlag & 32) {
      const type = children._;
      if (type) {
        if (!!(define_process_env_default$3.NODE_ENV !== "production") && isHmrUpdating) {
          assignSlots(slots, children, optimized);
          trigger(instance, "set", "$slots");
        } else if (optimized && type === 1) {
          needDeletionCheck = false;
        } else {
          assignSlots(slots, children, optimized);
        }
      } else {
        needDeletionCheck = !children.$stable;
        normalizeObjectSlots(children, slots);
      }
      deletionComparisonTarget = children;
    } else if (children) {
      normalizeVNodeSlots(instance, children);
      deletionComparisonTarget = { default: 1 };
    }
    if (needDeletionCheck) {
      for (const key in slots) {
        if (!isInternalKey(key) && deletionComparisonTarget[key] == null) {
          delete slots[key];
        }
      }
    }
  }, "updateSlots");
  function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
    if (isArray(rawRef)) {
      rawRef.forEach(
        (r, i) => setRef(
          r,
          oldRawRef && (isArray(oldRawRef) ? oldRawRef[i] : oldRawRef),
          parentSuspense,
          vnode,
          isUnmount
        )
      );
      return;
    }
    if (isAsyncWrapper(vnode) && !isUnmount) {
      return;
    }
    const refValue = vnode.shapeFlag & 4 ? getComponentPublicInstance(vnode.component) : vnode.el;
    const value = isUnmount ? null : refValue;
    const { i: owner, r: ref3 } = rawRef;
    if (!!(define_process_env_default$3.NODE_ENV !== "production") && !owner) {
      warn$1(
        `Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function.`
      );
      return;
    }
    const oldRef = oldRawRef && oldRawRef.r;
    const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
    const setupState = owner.setupState;
    if (oldRef != null && oldRef !== ref3) {
      if (isString(oldRef)) {
        refs[oldRef] = null;
        if (hasOwn(setupState, oldRef)) {
          setupState[oldRef] = null;
        }
      } else if (isRef(oldRef)) {
        oldRef.value = null;
      }
    }
    if (isFunction(ref3)) {
      callWithErrorHandling(ref3, owner, 12, [value, refs]);
    } else {
      const _isString = isString(ref3);
      const _isRef = isRef(ref3);
      if (_isString || _isRef) {
        const doSet = /* @__PURE__ */ __name(() => {
          if (rawRef.f) {
            const existing = _isString ? hasOwn(setupState, ref3) ? setupState[ref3] : refs[ref3] : ref3.value;
            if (isUnmount) {
              isArray(existing) && remove(existing, refValue);
            } else {
              if (!isArray(existing)) {
                if (_isString) {
                  refs[ref3] = [refValue];
                  if (hasOwn(setupState, ref3)) {
                    setupState[ref3] = refs[ref3];
                  }
                } else {
                  ref3.value = [refValue];
                  if (rawRef.k) refs[rawRef.k] = ref3.value;
                }
              } else if (!existing.includes(refValue)) {
                existing.push(refValue);
              }
            }
          } else if (_isString) {
            refs[ref3] = value;
            if (hasOwn(setupState, ref3)) {
              setupState[ref3] = value;
            }
          } else if (_isRef) {
            ref3.value = value;
            if (rawRef.k) refs[rawRef.k] = value;
          } else if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
            warn$1("Invalid template ref type:", ref3, `(${typeof ref3})`);
          }
        }, "doSet");
        if (value) {
          doSet.id = -1;
          queuePostRenderEffect(doSet, parentSuspense);
        } else {
          doSet();
        }
      } else if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
        warn$1("Invalid template ref type:", ref3, `(${typeof ref3})`);
      }
    }
  }
  __name(setRef, "setRef");
  const TeleportEndKey = Symbol("_vte");
  const isTeleport = /* @__PURE__ */ __name((type) => type.__isTeleport, "isTeleport");
  let supported;
  let perf;
  function startMeasure(instance, type) {
    if (instance.appContext.config.performance && isSupported()) {
      perf.mark(`vue-${type}-${instance.uid}`);
    }
    if (!!(define_process_env_default$3.NODE_ENV !== "production") || false) {
      devtoolsPerfStart(instance, type, isSupported() ? perf.now() : Date.now());
    }
  }
  __name(startMeasure, "startMeasure");
  function endMeasure(instance, type) {
    if (instance.appContext.config.performance && isSupported()) {
      const startTag = `vue-${type}-${instance.uid}`;
      const endTag = startTag + `:end`;
      perf.mark(endTag);
      perf.measure(
        `<${formatComponentName(instance, instance.type)}> ${type}`,
        startTag,
        endTag
      );
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
    }
    if (!!(define_process_env_default$3.NODE_ENV !== "production") || false) {
      devtoolsPerfEnd(instance, type, isSupported() ? perf.now() : Date.now());
    }
  }
  __name(endMeasure, "endMeasure");
  function isSupported() {
    if (supported !== void 0) {
      return supported;
    }
    if (typeof window !== "undefined" && window.performance) {
      supported = true;
      perf = window.performance;
    } else {
      supported = false;
    }
    return supported;
  }
  __name(isSupported, "isSupported");
  function initFeatureFlags() {
    const needWarn = [];
    if (!!(define_process_env_default$3.NODE_ENV !== "production") && needWarn.length) {
      const multi = needWarn.length > 1;
      console.warn(
        `Feature flag${multi ? `s` : ``} ${needWarn.join(", ")} ${multi ? `are` : `is`} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`
      );
    }
  }
  __name(initFeatureFlags, "initFeatureFlags");
  const queuePostRenderEffect = queueEffectWithSuspense;
  function createRenderer(options) {
    return baseCreateRenderer(options);
  }
  __name(createRenderer, "createRenderer");
  function baseCreateRenderer(options, createHydrationFns) {
    {
      initFeatureFlags();
    }
    const target = getGlobalThis();
    target.__VUE__ = true;
    if (!!(define_process_env_default$3.NODE_ENV !== "production") || false) {
      setDevtoolsHook$1(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
    }
    const {
      insert: hostInsert,
      remove: hostRemove,
      patchProp: hostPatchProp,
      createElement: hostCreateElement,
      createText: hostCreateText,
      createComment: hostCreateComment,
      setText: hostSetText,
      setElementText: hostSetElementText,
      parentNode: hostParentNode,
      nextSibling: hostNextSibling,
      setScopeId: hostSetScopeId = NOOP,
      insertStaticContent: hostInsertStaticContent
    } = options;
    const patch = /* @__PURE__ */ __name((n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, namespace = void 0, slotScopeIds = null, optimized = !!(define_process_env_default$3.NODE_ENV !== "production") && isHmrUpdating ? false : !!n2.dynamicChildren) => {
      if (n1 === n2) {
        return;
      }
      if (n1 && !isSameVNodeType(n1, n2)) {
        anchor = getNextHostNode(n1);
        unmount(n1, parentComponent, parentSuspense, true);
        n1 = null;
      }
      if (n2.patchFlag === -2) {
        optimized = false;
        n2.dynamicChildren = null;
      }
      const { type, ref: ref3, shapeFlag } = n2;
      switch (type) {
        case Text:
          processText(n1, n2, container, anchor);
          break;
        case Comment:
          processCommentNode(n1, n2, container, anchor);
          break;
        case Static:
          if (n1 == null) {
            mountStaticNode(n2, container, anchor, namespace);
          } else if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
            patchStaticNode(n1, n2, container, namespace);
          }
          break;
        case Fragment:
          processFragment(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          break;
        default:
          if (shapeFlag & 1) {
            processElement(
              n1,
              n2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          } else if (shapeFlag & 6) {
            processComponent(
              n1,
              n2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          } else if (shapeFlag & 64) {
            type.process(
              n1,
              n2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized,
              internals
            );
          } else if (shapeFlag & 128) {
            type.process(
              n1,
              n2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized,
              internals
            );
          } else if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
            warn$1("Invalid VNode type:", type, `(${typeof type})`);
          }
      }
      if (ref3 != null && parentComponent) {
        setRef(ref3, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
      }
    }, "patch");
    const processText = /* @__PURE__ */ __name((n1, n2, container, anchor) => {
      if (n1 == null) {
        hostInsert(
          n2.el = hostCreateText(n2.children),
          container,
          anchor
        );
      } else {
        const el = n2.el = n1.el;
        if (n2.children !== n1.children) {
          hostSetText(el, n2.children);
        }
      }
    }, "processText");
    const processCommentNode = /* @__PURE__ */ __name((n1, n2, container, anchor) => {
      if (n1 == null) {
        hostInsert(
          n2.el = hostCreateComment(n2.children || ""),
          container,
          anchor
        );
      } else {
        n2.el = n1.el;
      }
    }, "processCommentNode");
    const mountStaticNode = /* @__PURE__ */ __name((n2, container, anchor, namespace) => {
      [n2.el, n2.anchor] = hostInsertStaticContent(
        n2.children,
        container,
        anchor,
        namespace,
        n2.el,
        n2.anchor
      );
    }, "mountStaticNode");
    const patchStaticNode = /* @__PURE__ */ __name((n1, n2, container, namespace) => {
      if (n2.children !== n1.children) {
        const anchor = hostNextSibling(n1.anchor);
        removeStaticNode(n1);
        [n2.el, n2.anchor] = hostInsertStaticContent(
          n2.children,
          container,
          anchor,
          namespace
        );
      } else {
        n2.el = n1.el;
        n2.anchor = n1.anchor;
      }
    }, "patchStaticNode");
    const moveStaticNode = /* @__PURE__ */ __name(({ el, anchor }, container, nextSibling) => {
      let next;
      while (el && el !== anchor) {
        next = hostNextSibling(el);
        hostInsert(el, container, nextSibling);
        el = next;
      }
      hostInsert(anchor, container, nextSibling);
    }, "moveStaticNode");
    const removeStaticNode = /* @__PURE__ */ __name(({ el, anchor }) => {
      let next;
      while (el && el !== anchor) {
        next = hostNextSibling(el);
        hostRemove(el);
        el = next;
      }
      hostRemove(anchor);
    }, "removeStaticNode");
    const processElement = /* @__PURE__ */ __name((n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      if (n2.type === "svg") {
        namespace = "svg";
      } else if (n2.type === "math") {
        namespace = "mathml";
      }
      if (n1 == null) {
        mountElement(
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        patchElement(
          n1,
          n2,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      }
    }, "processElement");
    const mountElement = /* @__PURE__ */ __name((vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      let el;
      let vnodeHook;
      const { props, shapeFlag, transition, dirs } = vnode;
      el = vnode.el = hostCreateElement(
        vnode.type,
        namespace,
        props && props.is,
        props
      );
      if (shapeFlag & 8) {
        hostSetElementText(el, vnode.children);
      } else if (shapeFlag & 16) {
        mountChildren(
          vnode.children,
          el,
          null,
          parentComponent,
          parentSuspense,
          resolveChildrenNamespace(vnode, namespace),
          slotScopeIds,
          optimized
        );
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "created");
      }
      setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
      if (props) {
        for (const key in props) {
          if (key !== "value" && !isReservedProp(key)) {
            hostPatchProp(el, key, null, props[key], namespace, parentComponent);
          }
        }
        if ("value" in props) {
          hostPatchProp(el, "value", null, props.value, namespace);
        }
        if (vnodeHook = props.onVnodeBeforeMount) {
          invokeVNodeHook(vnodeHook, parentComponent, vnode);
        }
      }
      if (!!(define_process_env_default$3.NODE_ENV !== "production") || false) {
        def(el, "__vnode", vnode, true);
        def(el, "__vueParentComponent", parentComponent, true);
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
      }
      const needCallTransitionHooks = needTransition(parentSuspense, transition);
      if (needCallTransitionHooks) {
        transition.beforeEnter(el);
      }
      hostInsert(el, container, anchor);
      if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
        queuePostRenderEffect(() => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
          needCallTransitionHooks && transition.enter(el);
          dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
        }, parentSuspense);
      }
    }, "mountElement");
    const setScopeId = /* @__PURE__ */ __name((el, vnode, scopeId, slotScopeIds, parentComponent) => {
      if (scopeId) {
        hostSetScopeId(el, scopeId);
      }
      if (slotScopeIds) {
        for (let i = 0; i < slotScopeIds.length; i++) {
          hostSetScopeId(el, slotScopeIds[i]);
        }
      }
      if (parentComponent) {
        let subTree = parentComponent.subTree;
        if (!!(define_process_env_default$3.NODE_ENV !== "production") && subTree.patchFlag > 0 && subTree.patchFlag & 2048) {
          subTree = filterSingleRoot(subTree.children) || subTree;
        }
        if (vnode === subTree) {
          const parentVNode = parentComponent.vnode;
          setScopeId(
            el,
            parentVNode,
            parentVNode.scopeId,
            parentVNode.slotScopeIds,
            parentComponent.parent
          );
        }
      }
    }, "setScopeId");
    const mountChildren = /* @__PURE__ */ __name((children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, start = 0) => {
      for (let i = start; i < children.length; i++) {
        const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
        patch(
          null,
          child,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      }
    }, "mountChildren");
    const patchElement = /* @__PURE__ */ __name((n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      const el = n2.el = n1.el;
      if (!!(define_process_env_default$3.NODE_ENV !== "production") || false) {
        el.__vnode = n2;
      }
      let { patchFlag, dynamicChildren, dirs } = n2;
      patchFlag |= n1.patchFlag & 16;
      const oldProps = n1.props || EMPTY_OBJ;
      const newProps = n2.props || EMPTY_OBJ;
      let vnodeHook;
      parentComponent && toggleRecurse(parentComponent, false);
      if (vnodeHook = newProps.onVnodeBeforeUpdate) {
        invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
      }
      if (dirs) {
        invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
      }
      parentComponent && toggleRecurse(parentComponent, true);
      if (!!(define_process_env_default$3.NODE_ENV !== "production") && isHmrUpdating) {
        patchFlag = 0;
        optimized = false;
        dynamicChildren = null;
      }
      if (oldProps.innerHTML && newProps.innerHTML == null || oldProps.textContent && newProps.textContent == null) {
        hostSetElementText(el, "");
      }
      if (dynamicChildren) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          el,
          parentComponent,
          parentSuspense,
          resolveChildrenNamespace(n2, namespace),
          slotScopeIds
        );
        if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
          traverseStaticChildren(n1, n2);
        }
      } else if (!optimized) {
        patchChildren(
          n1,
          n2,
          el,
          null,
          parentComponent,
          parentSuspense,
          resolveChildrenNamespace(n2, namespace),
          slotScopeIds,
          false
        );
      }
      if (patchFlag > 0) {
        if (patchFlag & 16) {
          patchProps(el, oldProps, newProps, parentComponent, namespace);
        } else {
          if (patchFlag & 2) {
            if (oldProps.class !== newProps.class) {
              hostPatchProp(el, "class", null, newProps.class, namespace);
            }
          }
          if (patchFlag & 4) {
            hostPatchProp(el, "style", oldProps.style, newProps.style, namespace);
          }
          if (patchFlag & 8) {
            const propsToUpdate = n2.dynamicProps;
            for (let i = 0; i < propsToUpdate.length; i++) {
              const key = propsToUpdate[i];
              const prev = oldProps[key];
              const next = newProps[key];
              if (next !== prev || key === "value") {
                hostPatchProp(el, key, prev, next, namespace, parentComponent);
              }
            }
          }
        }
        if (patchFlag & 1) {
          if (n1.children !== n2.children) {
            hostSetElementText(el, n2.children);
          }
        }
      } else if (!optimized && dynamicChildren == null) {
        patchProps(el, oldProps, newProps, parentComponent, namespace);
      }
      if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
        queuePostRenderEffect(() => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
          dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
        }, parentSuspense);
      }
    }, "patchElement");
    const patchBlockChildren = /* @__PURE__ */ __name((oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, namespace, slotScopeIds) => {
      for (let i = 0; i < newChildren.length; i++) {
        const oldVNode = oldChildren[i];
        const newVNode = newChildren[i];
        const container = (
          // oldVNode may be an errored async setup() component inside Suspense
          // which will not have a mounted element
          oldVNode.el && // - In the case of a Fragment, we need to provide the actual parent
          // of the Fragment itself so it can move its children.
          (oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
          // which also requires the correct parent container
          !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
          oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : (
            // In other cases, the parent container is not actually used so we
            // just pass the block element here to avoid a DOM parentNode call.
            fallbackContainer
          )
        );
        patch(
          oldVNode,
          newVNode,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          true
        );
      }
    }, "patchBlockChildren");
    const patchProps = /* @__PURE__ */ __name((el, oldProps, newProps, parentComponent, namespace) => {
      if (oldProps !== newProps) {
        if (oldProps !== EMPTY_OBJ) {
          for (const key in oldProps) {
            if (!isReservedProp(key) && !(key in newProps)) {
              hostPatchProp(
                el,
                key,
                oldProps[key],
                null,
                namespace,
                parentComponent
              );
            }
          }
        }
        for (const key in newProps) {
          if (isReservedProp(key)) continue;
          const next = newProps[key];
          const prev = oldProps[key];
          if (next !== prev && key !== "value") {
            hostPatchProp(el, key, prev, next, namespace, parentComponent);
          }
        }
        if ("value" in newProps) {
          hostPatchProp(el, "value", oldProps.value, newProps.value, namespace);
        }
      }
    }, "patchProps");
    const processFragment = /* @__PURE__ */ __name((n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
      const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
      let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
      if (!!(define_process_env_default$3.NODE_ENV !== "production") && // #5523 dev root fragment may inherit directives
      (isHmrUpdating || patchFlag & 2048)) {
        patchFlag = 0;
        optimized = false;
        dynamicChildren = null;
      }
      if (fragmentSlotScopeIds) {
        slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
      }
      if (n1 == null) {
        hostInsert(fragmentStartAnchor, container, anchor);
        hostInsert(fragmentEndAnchor, container, anchor);
        mountChildren(
          // #10007
          // such fragment like `<></>` will be compiled into
          // a fragment which doesn't have a children.
          // In this case fallback to an empty array
          n2.children || [],
          container,
          fragmentEndAnchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
        // of renderSlot() with no valid children
        n1.dynamicChildren) {
          patchBlockChildren(
            n1.dynamicChildren,
            dynamicChildren,
            container,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds
          );
          if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
            traverseStaticChildren(n1, n2);
          } else if (
            // #2080 if the stable fragment has a key, it's a <template v-for> that may
            //  get moved around. Make sure all root level vnodes inherit el.
            // #2134 or if it's a component root, it may also get moved around
            // as the component is being moved.
            n2.key != null || parentComponent && n2 === parentComponent.subTree
          ) {
            traverseStaticChildren(
              n1,
              n2,
              true
              /* shallow */
            );
          }
        } else {
          patchChildren(
            n1,
            n2,
            container,
            fragmentEndAnchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        }
      }
    }, "processFragment");
    const processComponent = /* @__PURE__ */ __name((n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      n2.slotScopeIds = slotScopeIds;
      if (n1 == null) {
        if (n2.shapeFlag & 512) {
          parentComponent.ctx.activate(
            n2,
            container,
            anchor,
            namespace,
            optimized
          );
        } else {
          mountComponent(
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            optimized
          );
        }
      } else {
        updateComponent(n1, n2, optimized);
      }
    }, "processComponent");
    const mountComponent = /* @__PURE__ */ __name((initialVNode, container, anchor, parentComponent, parentSuspense, namespace, optimized) => {
      const instance = initialVNode.component = createComponentInstance(
        initialVNode,
        parentComponent,
        parentSuspense
      );
      if (!!(define_process_env_default$3.NODE_ENV !== "production") && instance.type.__hmrId) {
        registerHMR(instance);
      }
      if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
        pushWarningContext(initialVNode);
        startMeasure(instance, `mount`);
      }
      if (isKeepAlive(initialVNode)) {
        instance.ctx.renderer = internals;
      }
      {
        if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
          startMeasure(instance, `init`);
        }
        setupComponent(instance, false, optimized);
        if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
          endMeasure(instance, `init`);
        }
      }
      if (instance.asyncDep) {
        parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect, optimized);
        if (!initialVNode.el) {
          const placeholder = instance.subTree = createVNode(Comment);
          processCommentNode(null, placeholder, container, anchor);
        }
      } else {
        setupRenderEffect(
          instance,
          initialVNode,
          container,
          anchor,
          parentSuspense,
          namespace,
          optimized
        );
      }
      if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
        popWarningContext();
        endMeasure(instance, `mount`);
      }
    }, "mountComponent");
    const updateComponent = /* @__PURE__ */ __name((n1, n2, optimized) => {
      const instance = n2.component = n1.component;
      if (shouldUpdateComponent(n1, n2, optimized)) {
        if (instance.asyncDep && !instance.asyncResolved) {
          if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
            pushWarningContext(n2);
          }
          updateComponentPreRender(instance, n2, optimized);
          if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
            popWarningContext();
          }
          return;
        } else {
          instance.next = n2;
          invalidateJob(instance.update);
          instance.effect.dirty = true;
          instance.update();
        }
      } else {
        n2.el = n1.el;
        instance.vnode = n2;
      }
    }, "updateComponent");
    const setupRenderEffect = /* @__PURE__ */ __name((instance, initialVNode, container, anchor, parentSuspense, namespace, optimized) => {
      const componentUpdateFn = /* @__PURE__ */ __name(() => {
        if (!instance.isMounted) {
          let vnodeHook;
          const { el, props } = initialVNode;
          const { bm, m, parent } = instance;
          const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
          toggleRecurse(instance, false);
          if (bm) {
            invokeArrayFns(bm);
          }
          if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
            invokeVNodeHook(vnodeHook, parent, initialVNode);
          }
          toggleRecurse(instance, true);
          if (el && hydrateNode) {
            const hydrateSubTree = /* @__PURE__ */ __name(() => {
              if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
                startMeasure(instance, `render`);
              }
              instance.subTree = renderComponentRoot(instance);
              if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
                endMeasure(instance, `render`);
              }
              if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
                startMeasure(instance, `hydrate`);
              }
              hydrateNode(
                el,
                instance.subTree,
                instance,
                parentSuspense,
                null
              );
              if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
                endMeasure(instance, `hydrate`);
              }
            }, "hydrateSubTree");
            if (isAsyncWrapperVNode) {
              initialVNode.type.__asyncLoader().then(
                // note: we are moving the render call into an async callback,
                // which means it won't track dependencies - but it's ok because
                // a server-rendered async wrapper is already in resolved state
                // and it will never need to change.
                () => !instance.isUnmounted && hydrateSubTree()
              );
            } else {
              hydrateSubTree();
            }
          } else {
            if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
              startMeasure(instance, `render`);
            }
            const subTree = instance.subTree = renderComponentRoot(instance);
            if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
              endMeasure(instance, `render`);
            }
            if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
              startMeasure(instance, `patch`);
            }
            patch(
              null,
              subTree,
              container,
              anchor,
              instance,
              parentSuspense,
              namespace
            );
            if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
              endMeasure(instance, `patch`);
            }
            initialVNode.el = subTree.el;
          }
          if (m) {
            queuePostRenderEffect(m, parentSuspense);
          }
          if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
            const scopedInitialVNode = initialVNode;
            queuePostRenderEffect(
              () => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode),
              parentSuspense
            );
          }
          if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
            instance.a && queuePostRenderEffect(instance.a, parentSuspense);
          }
          instance.isMounted = true;
          if (!!(define_process_env_default$3.NODE_ENV !== "production") || false) {
            devtoolsComponentAdded(instance);
          }
          initialVNode = container = anchor = null;
        } else {
          let { next, bu, u, parent, vnode } = instance;
          {
            const nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance);
            if (nonHydratedAsyncRoot) {
              if (next) {
                next.el = vnode.el;
                updateComponentPreRender(instance, next, optimized);
              }
              nonHydratedAsyncRoot.asyncDep.then(() => {
                if (!instance.isUnmounted) {
                  componentUpdateFn();
                }
              });
              return;
            }
          }
          let originNext = next;
          let vnodeHook;
          if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
            pushWarningContext(next || instance.vnode);
          }
          toggleRecurse(instance, false);
          if (next) {
            next.el = vnode.el;
            updateComponentPreRender(instance, next, optimized);
          } else {
            next = vnode;
          }
          if (bu) {
            invokeArrayFns(bu);
          }
          if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
            invokeVNodeHook(vnodeHook, parent, next, vnode);
          }
          toggleRecurse(instance, true);
          if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
            startMeasure(instance, `render`);
          }
          const nextTree = renderComponentRoot(instance);
          if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
            endMeasure(instance, `render`);
          }
          const prevTree = instance.subTree;
          instance.subTree = nextTree;
          if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
            startMeasure(instance, `patch`);
          }
          patch(
            prevTree,
            nextTree,
            // parent may have changed if it's in a teleport
            hostParentNode(prevTree.el),
            // anchor may have changed if it's in a fragment
            getNextHostNode(prevTree),
            instance,
            parentSuspense,
            namespace
          );
          if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
            endMeasure(instance, `patch`);
          }
          next.el = nextTree.el;
          if (originNext === null) {
            updateHOCHostEl(instance, nextTree.el);
          }
          if (u) {
            queuePostRenderEffect(u, parentSuspense);
          }
          if (vnodeHook = next.props && next.props.onVnodeUpdated) {
            queuePostRenderEffect(
              () => invokeVNodeHook(vnodeHook, parent, next, vnode),
              parentSuspense
            );
          }
          if (!!(define_process_env_default$3.NODE_ENV !== "production") || false) {
            devtoolsComponentUpdated(instance);
          }
          if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
            popWarningContext();
          }
        }
      }, "componentUpdateFn");
      const effect2 = instance.effect = new ReactiveEffect(
        componentUpdateFn,
        NOOP,
        () => queueJob(update),
        instance.scope
        // track it in component's effect scope
      );
      const update = instance.update = () => {
        if (effect2.dirty) {
          effect2.run();
        }
      };
      update.i = instance;
      update.id = instance.uid;
      toggleRecurse(instance, true);
      if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
        effect2.onTrack = instance.rtc ? (e) => invokeArrayFns(instance.rtc, e) : void 0;
        effect2.onTrigger = instance.rtg ? (e) => invokeArrayFns(instance.rtg, e) : void 0;
      }
      update();
    }, "setupRenderEffect");
    const updateComponentPreRender = /* @__PURE__ */ __name((instance, nextVNode, optimized) => {
      nextVNode.component = instance;
      const prevProps = instance.vnode.props;
      instance.vnode = nextVNode;
      instance.next = null;
      updateProps(instance, nextVNode.props, prevProps, optimized);
      updateSlots(instance, nextVNode.children, optimized);
      pauseTracking();
      flushPreFlushCbs(instance);
      resetTracking();
    }, "updateComponentPreRender");
    const patchChildren = /* @__PURE__ */ __name((n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized = false) => {
      const c1 = n1 && n1.children;
      const prevShapeFlag = n1 ? n1.shapeFlag : 0;
      const c2 = n2.children;
      const { patchFlag, shapeFlag } = n2;
      if (patchFlag > 0) {
        if (patchFlag & 128) {
          patchKeyedChildren(
            c1,
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          return;
        } else if (patchFlag & 256) {
          patchUnkeyedChildren(
            c1,
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          return;
        }
      }
      if (shapeFlag & 8) {
        if (prevShapeFlag & 16) {
          unmountChildren(c1, parentComponent, parentSuspense);
        }
        if (c2 !== c1) {
          hostSetElementText(container, c2);
        }
      } else {
        if (prevShapeFlag & 16) {
          if (shapeFlag & 16) {
            patchKeyedChildren(
              c1,
              c2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          } else {
            unmountChildren(c1, parentComponent, parentSuspense, true);
          }
        } else {
          if (prevShapeFlag & 8) {
            hostSetElementText(container, "");
          }
          if (shapeFlag & 16) {
            mountChildren(
              c2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          }
        }
      }
    }, "patchChildren");
    const patchUnkeyedChildren = /* @__PURE__ */ __name((c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      c1 = c1 || EMPTY_ARR;
      c2 = c2 || EMPTY_ARR;
      const oldLength = c1.length;
      const newLength = c2.length;
      const commonLength = Math.min(oldLength, newLength);
      let i;
      for (i = 0; i < commonLength; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        patch(
          c1[i],
          nextChild,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      }
      if (oldLength > newLength) {
        unmountChildren(
          c1,
          parentComponent,
          parentSuspense,
          true,
          false,
          commonLength
        );
      } else {
        mountChildren(
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized,
          commonLength
        );
      }
    }, "patchUnkeyedChildren");
    const patchKeyedChildren = /* @__PURE__ */ __name((c1, c2, container, parentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      let i = 0;
      const l2 = c2.length;
      let e1 = c1.length - 1;
      let e2 = l2 - 1;
      while (i <= e1 && i <= e2) {
        const n1 = c1[i];
        const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (isSameVNodeType(n1, n2)) {
          patch(
            n1,
            n2,
            container,
            null,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else {
          break;
        }
        i++;
      }
      while (i <= e1 && i <= e2) {
        const n1 = c1[e1];
        const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
        if (isSameVNodeType(n1, n2)) {
          patch(
            n1,
            n2,
            container,
            null,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else {
          break;
        }
        e1--;
        e2--;
      }
      if (i > e1) {
        if (i <= e2) {
          const nextPos = e2 + 1;
          const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
          while (i <= e2) {
            patch(
              null,
              c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]),
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
            i++;
          }
        }
      } else if (i > e2) {
        while (i <= e1) {
          unmount(c1[i], parentComponent, parentSuspense, true);
          i++;
        }
      } else {
        const s1 = i;
        const s2 = i;
        const keyToNewIndexMap = /* @__PURE__ */ new Map();
        for (i = s2; i <= e2; i++) {
          const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
          if (nextChild.key != null) {
            if (!!(define_process_env_default$3.NODE_ENV !== "production") && keyToNewIndexMap.has(nextChild.key)) {
              warn$1(
                `Duplicate keys found during update:`,
                JSON.stringify(nextChild.key),
                `Make sure keys are unique.`
              );
            }
            keyToNewIndexMap.set(nextChild.key, i);
          }
        }
        let j;
        let patched = 0;
        const toBePatched = e2 - s2 + 1;
        let moved = false;
        let maxNewIndexSoFar = 0;
        const newIndexToOldIndexMap = new Array(toBePatched);
        for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0;
        for (i = s1; i <= e1; i++) {
          const prevChild = c1[i];
          if (patched >= toBePatched) {
            unmount(prevChild, parentComponent, parentSuspense, true);
            continue;
          }
          let newIndex;
          if (prevChild.key != null) {
            newIndex = keyToNewIndexMap.get(prevChild.key);
          } else {
            for (j = s2; j <= e2; j++) {
              if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
                newIndex = j;
                break;
              }
            }
          }
          if (newIndex === void 0) {
            unmount(prevChild, parentComponent, parentSuspense, true);
          } else {
            newIndexToOldIndexMap[newIndex - s2] = i + 1;
            if (newIndex >= maxNewIndexSoFar) {
              maxNewIndexSoFar = newIndex;
            } else {
              moved = true;
            }
            patch(
              prevChild,
              c2[newIndex],
              container,
              null,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
            patched++;
          }
        }
        const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
        j = increasingNewIndexSequence.length - 1;
        for (i = toBePatched - 1; i >= 0; i--) {
          const nextIndex = s2 + i;
          const nextChild = c2[nextIndex];
          const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
          if (newIndexToOldIndexMap[i] === 0) {
            patch(
              null,
              nextChild,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          } else if (moved) {
            if (j < 0 || i !== increasingNewIndexSequence[j]) {
              move(nextChild, container, anchor, 2);
            } else {
              j--;
            }
          }
        }
      }
    }, "patchKeyedChildren");
    const move = /* @__PURE__ */ __name((vnode, container, anchor, moveType, parentSuspense = null) => {
      const { el, type, transition, children, shapeFlag } = vnode;
      if (shapeFlag & 6) {
        move(vnode.component.subTree, container, anchor, moveType);
        return;
      }
      if (shapeFlag & 128) {
        vnode.suspense.move(container, anchor, moveType);
        return;
      }
      if (shapeFlag & 64) {
        type.move(vnode, container, anchor, internals);
        return;
      }
      if (type === Fragment) {
        hostInsert(el, container, anchor);
        for (let i = 0; i < children.length; i++) {
          move(children[i], container, anchor, moveType);
        }
        hostInsert(vnode.anchor, container, anchor);
        return;
      }
      if (type === Static) {
        moveStaticNode(vnode, container, anchor);
        return;
      }
      const needTransition2 = moveType !== 2 && shapeFlag & 1 && transition;
      if (needTransition2) {
        if (moveType === 0) {
          transition.beforeEnter(el);
          hostInsert(el, container, anchor);
          queuePostRenderEffect(() => transition.enter(el), parentSuspense);
        } else {
          const { leave, delayLeave, afterLeave } = transition;
          const remove22 = /* @__PURE__ */ __name(() => hostInsert(el, container, anchor), "remove22");
          const performLeave = /* @__PURE__ */ __name(() => {
            leave(el, () => {
              remove22();
              afterLeave && afterLeave();
            });
          }, "performLeave");
          if (delayLeave) {
            delayLeave(el, remove22, performLeave);
          } else {
            performLeave();
          }
        }
      } else {
        hostInsert(el, container, anchor);
      }
    }, "move");
    const unmount = /* @__PURE__ */ __name((vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
      const {
        type,
        props,
        ref: ref3,
        children,
        dynamicChildren,
        shapeFlag,
        patchFlag,
        dirs,
        cacheIndex
      } = vnode;
      if (patchFlag === -2) {
        optimized = false;
      }
      if (ref3 != null) {
        setRef(ref3, null, parentSuspense, vnode, true);
      }
      if (cacheIndex != null) {
        parentComponent.renderCache[cacheIndex] = void 0;
      }
      if (shapeFlag & 256) {
        parentComponent.ctx.deactivate(vnode);
        return;
      }
      const shouldInvokeDirs = shapeFlag & 1 && dirs;
      const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
      let vnodeHook;
      if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
      if (shapeFlag & 6) {
        unmountComponent(vnode.component, parentSuspense, doRemove);
      } else {
        if (shapeFlag & 128) {
          vnode.suspense.unmount(parentSuspense, doRemove);
          return;
        }
        if (shouldInvokeDirs) {
          invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
        }
        if (shapeFlag & 64) {
          vnode.type.remove(
            vnode,
            parentComponent,
            parentSuspense,
            internals,
            doRemove
          );
        } else if (dynamicChildren && // #5154
        // when v-once is used inside a block, setBlockTracking(-1) marks the
        // parent block with hasOnce: true
        // so that it doesn't take the fast path during unmount - otherwise
        // components nested in v-once are never unmounted.
        !dynamicChildren.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
        (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
          unmountChildren(
            dynamicChildren,
            parentComponent,
            parentSuspense,
            false,
            true
          );
        } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
          unmountChildren(children, parentComponent, parentSuspense);
        }
        if (doRemove) {
          remove2(vnode);
        }
      }
      if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
        queuePostRenderEffect(() => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
          shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
        }, parentSuspense);
      }
    }, "unmount");
    const remove2 = /* @__PURE__ */ __name((vnode) => {
      const { type, el, anchor, transition } = vnode;
      if (type === Fragment) {
        if (!!(define_process_env_default$3.NODE_ENV !== "production") && vnode.patchFlag > 0 && vnode.patchFlag & 2048 && transition && !transition.persisted) {
          vnode.children.forEach((child) => {
            if (child.type === Comment) {
              hostRemove(child.el);
            } else {
              remove2(child);
            }
          });
        } else {
          removeFragment(el, anchor);
        }
        return;
      }
      if (type === Static) {
        removeStaticNode(vnode);
        return;
      }
      const performRemove = /* @__PURE__ */ __name(() => {
        hostRemove(el);
        if (transition && !transition.persisted && transition.afterLeave) {
          transition.afterLeave();
        }
      }, "performRemove");
      if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
        const { leave, delayLeave } = transition;
        const performLeave = /* @__PURE__ */ __name(() => leave(el, performRemove), "performLeave");
        if (delayLeave) {
          delayLeave(vnode.el, performRemove, performLeave);
        } else {
          performLeave();
        }
      } else {
        performRemove();
      }
    }, "remove2");
    const removeFragment = /* @__PURE__ */ __name((cur, end) => {
      let next;
      while (cur !== end) {
        next = hostNextSibling(cur);
        hostRemove(cur);
        cur = next;
      }
      hostRemove(end);
    }, "removeFragment");
    const unmountComponent = /* @__PURE__ */ __name((instance, parentSuspense, doRemove) => {
      if (!!(define_process_env_default$3.NODE_ENV !== "production") && instance.type.__hmrId) {
        unregisterHMR(instance);
      }
      const { bum, scope, update, subTree, um, m, a } = instance;
      invalidateMount(m);
      invalidateMount(a);
      if (bum) {
        invokeArrayFns(bum);
      }
      scope.stop();
      if (update) {
        update.active = false;
        unmount(subTree, instance, parentSuspense, doRemove);
      }
      if (um) {
        queuePostRenderEffect(um, parentSuspense);
      }
      queuePostRenderEffect(() => {
        instance.isUnmounted = true;
      }, parentSuspense);
      if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
        parentSuspense.deps--;
        if (parentSuspense.deps === 0) {
          parentSuspense.resolve();
        }
      }
      if (!!(define_process_env_default$3.NODE_ENV !== "production") || false) {
        devtoolsComponentRemoved(instance);
      }
    }, "unmountComponent");
    const unmountChildren = /* @__PURE__ */ __name((children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
      for (let i = start; i < children.length; i++) {
        unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
      }
    }, "unmountChildren");
    const getNextHostNode = /* @__PURE__ */ __name((vnode) => {
      if (vnode.shapeFlag & 6) {
        return getNextHostNode(vnode.component.subTree);
      }
      if (vnode.shapeFlag & 128) {
        return vnode.suspense.next();
      }
      const el = hostNextSibling(vnode.anchor || vnode.el);
      const teleportEnd = el && el[TeleportEndKey];
      return teleportEnd ? hostNextSibling(teleportEnd) : el;
    }, "getNextHostNode");
    let isFlushing2 = false;
    const render2 = /* @__PURE__ */ __name((vnode, container, namespace) => {
      if (vnode == null) {
        if (container._vnode) {
          unmount(container._vnode, null, null, true);
        }
      } else {
        patch(
          container._vnode || null,
          vnode,
          container,
          null,
          null,
          null,
          namespace
        );
      }
      if (!isFlushing2) {
        isFlushing2 = true;
        flushPreFlushCbs();
        flushPostFlushCbs();
        isFlushing2 = false;
      }
      container._vnode = vnode;
    }, "render");
    const internals = {
      p: patch,
      um: unmount,
      m: move,
      r: remove2,
      mt: mountComponent,
      mc: mountChildren,
      pc: patchChildren,
      pbc: patchBlockChildren,
      n: getNextHostNode,
      o: options
    };
    let hydrate;
    let hydrateNode;
    return {
      render: render2,
      hydrate,
      createApp: createAppAPI(render2, hydrate)
    };
  }
  __name(baseCreateRenderer, "baseCreateRenderer");
  function resolveChildrenNamespace({ type, props }, currentNamespace) {
    return currentNamespace === "svg" && type === "foreignObject" || currentNamespace === "mathml" && type === "annotation-xml" && props && props.encoding && props.encoding.includes("html") ? void 0 : currentNamespace;
  }
  __name(resolveChildrenNamespace, "resolveChildrenNamespace");
  function toggleRecurse({ effect: effect2, update }, allowed) {
    effect2.allowRecurse = update.allowRecurse = allowed;
  }
  __name(toggleRecurse, "toggleRecurse");
  function needTransition(parentSuspense, transition) {
    return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
  }
  __name(needTransition, "needTransition");
  function traverseStaticChildren(n1, n2, shallow = false) {
    const ch1 = n1.children;
    const ch2 = n2.children;
    if (isArray(ch1) && isArray(ch2)) {
      for (let i = 0; i < ch1.length; i++) {
        const c1 = ch1[i];
        let c2 = ch2[i];
        if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
          if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
            c2 = ch2[i] = cloneIfMounted(ch2[i]);
            c2.el = c1.el;
          }
          if (!shallow && c2.patchFlag !== -2)
            traverseStaticChildren(c1, c2);
        }
        if (c2.type === Text) {
          c2.el = c1.el;
        }
        if (!!(define_process_env_default$3.NODE_ENV !== "production") && c2.type === Comment && !c2.el) {
          c2.el = c1.el;
        }
      }
    }
  }
  __name(traverseStaticChildren, "traverseStaticChildren");
  function getSequence(arr) {
    const p2 = arr.slice();
    const result = [0];
    let i, j, u, v, c;
    const len = arr.length;
    for (i = 0; i < len; i++) {
      const arrI = arr[i];
      if (arrI !== 0) {
        j = result[result.length - 1];
        if (arr[j] < arrI) {
          p2[i] = j;
          result.push(i);
          continue;
        }
        u = 0;
        v = result.length - 1;
        while (u < v) {
          c = u + v >> 1;
          if (arr[result[c]] < arrI) {
            u = c + 1;
          } else {
            v = c;
          }
        }
        if (arrI < arr[result[u]]) {
          if (u > 0) {
            p2[i] = result[u - 1];
          }
          result[u] = i;
        }
      }
    }
    u = result.length;
    v = result[u - 1];
    while (u-- > 0) {
      result[u] = v;
      v = p2[v];
    }
    return result;
  }
  __name(getSequence, "getSequence");
  function locateNonHydratedAsyncRoot(instance) {
    const subComponent = instance.subTree.component;
    if (subComponent) {
      if (subComponent.asyncDep && !subComponent.asyncResolved) {
        return subComponent;
      } else {
        return locateNonHydratedAsyncRoot(subComponent);
      }
    }
  }
  __name(locateNonHydratedAsyncRoot, "locateNonHydratedAsyncRoot");
  function invalidateMount(hooks) {
    if (hooks) {
      for (let i = 0; i < hooks.length; i++) hooks[i].active = false;
    }
  }
  __name(invalidateMount, "invalidateMount");
  const ssrContextKey = Symbol.for("v-scx");
  const useSSRContext = /* @__PURE__ */ __name(() => {
    {
      const ctx = inject(ssrContextKey);
      if (!ctx) {
        !!(define_process_env_default$3.NODE_ENV !== "production") && warn$1(
          `Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build.`
        );
      }
      return ctx;
    }
  }, "useSSRContext");
  const INITIAL_WATCHER_VALUE = {};
  function watch(source, cb, options) {
    if (!!(define_process_env_default$3.NODE_ENV !== "production") && !isFunction(cb)) {
      warn$1(
        `\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`
      );
    }
    return doWatch(source, cb, options);
  }
  __name(watch, "watch");
  function doWatch(source, cb, {
    immediate,
    deep,
    flush,
    once,
    onTrack,
    onTrigger
  } = EMPTY_OBJ) {
    if (cb && once) {
      const _cb = cb;
      cb = /* @__PURE__ */ __name((...args) => {
        _cb(...args);
        unwatch();
      }, "cb");
    }
    if (!!(define_process_env_default$3.NODE_ENV !== "production") && deep !== void 0 && typeof deep === "number") {
      warn$1(
        `watch() "deep" option with number value will be used as watch depth in future versions. Please use a boolean instead to avoid potential breakage.`
      );
    }
    if (!!(define_process_env_default$3.NODE_ENV !== "production") && !cb) {
      if (immediate !== void 0) {
        warn$1(
          `watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`
        );
      }
      if (deep !== void 0) {
        warn$1(
          `watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`
        );
      }
      if (once !== void 0) {
        warn$1(
          `watch() "once" option is only respected when using the watch(source, callback, options?) signature.`
        );
      }
    }
    const warnInvalidSource = /* @__PURE__ */ __name((s) => {
      warn$1(
        `Invalid watch source: `,
        s,
        `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`
      );
    }, "warnInvalidSource");
    const instance = currentInstance;
    const reactiveGetter = /* @__PURE__ */ __name((source2) => deep === true ? source2 : (
      // for deep: false, only traverse root-level properties
      traverse(source2, deep === false ? 1 : void 0)
    ), "reactiveGetter");
    let getter;
    let forceTrigger = false;
    let isMultiSource = false;
    if (isRef(source)) {
      getter = /* @__PURE__ */ __name(() => source.value, "getter");
      forceTrigger = isShallow(source);
    } else if (isReactive(source)) {
      getter = /* @__PURE__ */ __name(() => reactiveGetter(source), "getter");
      forceTrigger = true;
    } else if (isArray(source)) {
      isMultiSource = true;
      forceTrigger = source.some((s) => isReactive(s) || isShallow(s));
      getter = /* @__PURE__ */ __name(() => source.map((s) => {
        if (isRef(s)) {
          return s.value;
        } else if (isReactive(s)) {
          return reactiveGetter(s);
        } else if (isFunction(s)) {
          return callWithErrorHandling(s, instance, 2);
        } else {
          !!(define_process_env_default$3.NODE_ENV !== "production") && warnInvalidSource(s);
        }
      }), "getter");
    } else if (isFunction(source)) {
      if (cb) {
        getter = /* @__PURE__ */ __name(() => callWithErrorHandling(source, instance, 2), "getter");
      } else {
        getter = /* @__PURE__ */ __name(() => {
          if (cleanup) {
            cleanup();
          }
          return callWithAsyncErrorHandling(
            source,
            instance,
            3,
            [onCleanup]
          );
        }, "getter");
      }
    } else {
      getter = NOOP;
      !!(define_process_env_default$3.NODE_ENV !== "production") && warnInvalidSource(source);
    }
    if (cb && deep) {
      const baseGetter = getter;
      getter = /* @__PURE__ */ __name(() => traverse(baseGetter()), "getter");
    }
    let cleanup;
    let onCleanup = /* @__PURE__ */ __name((fn) => {
      cleanup = effect2.onStop = () => {
        callWithErrorHandling(fn, instance, 4);
        cleanup = effect2.onStop = void 0;
      };
    }, "onCleanup");
    let ssrCleanup;
    if (isInSSRComponentSetup) {
      onCleanup = NOOP;
      if (!cb) {
        getter();
      } else if (immediate) {
        callWithAsyncErrorHandling(cb, instance, 3, [
          getter(),
          isMultiSource ? [] : void 0,
          onCleanup
        ]);
      }
      if (flush === "sync") {
        const ctx = useSSRContext();
        ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
      } else {
        return NOOP;
      }
    }
    let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
    const job = /* @__PURE__ */ __name(() => {
      if (!effect2.active || !effect2.dirty) {
        return;
      }
      if (cb) {
        const newValue = effect2.run();
        if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue)) || false) {
          if (cleanup) {
            cleanup();
          }
          callWithAsyncErrorHandling(cb, instance, 3, [
            newValue,
            // pass undefined as the old value when it's changed for the first time
            oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
            onCleanup
          ]);
          oldValue = newValue;
        }
      } else {
        effect2.run();
      }
    }, "job");
    job.allowRecurse = !!cb;
    let scheduler;
    if (flush === "sync") {
      scheduler = job;
    } else if (flush === "post") {
      scheduler = /* @__PURE__ */ __name(() => queuePostRenderEffect(job, instance && instance.suspense), "scheduler");
    } else {
      job.pre = true;
      if (instance) job.id = instance.uid;
      scheduler = /* @__PURE__ */ __name(() => queueJob(job), "scheduler");
    }
    const effect2 = new ReactiveEffect(getter, NOOP, scheduler);
    const scope = getCurrentScope();
    const unwatch = /* @__PURE__ */ __name(() => {
      effect2.stop();
      if (scope) {
        remove(scope.effects, effect2);
      }
    }, "unwatch");
    if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
      effect2.onTrack = onTrack;
      effect2.onTrigger = onTrigger;
    }
    if (cb) {
      if (immediate) {
        job();
      } else {
        oldValue = effect2.run();
      }
    } else if (flush === "post") {
      queuePostRenderEffect(
        effect2.run.bind(effect2),
        instance && instance.suspense
      );
    } else {
      effect2.run();
    }
    if (ssrCleanup) ssrCleanup.push(unwatch);
    return unwatch;
  }
  __name(doWatch, "doWatch");
  function instanceWatch(source, value, options) {
    const publicThis = this.proxy;
    const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
    let cb;
    if (isFunction(value)) {
      cb = value;
    } else {
      cb = value.handler;
      options = value;
    }
    const reset = setCurrentInstance(this);
    const res = doWatch(getter, cb.bind(publicThis), options);
    reset();
    return res;
  }
  __name(instanceWatch, "instanceWatch");
  function createPathGetter(ctx, path) {
    const segments = path.split(".");
    return () => {
      let cur = ctx;
      for (let i = 0; i < segments.length && cur; i++) {
        cur = cur[segments[i]];
      }
      return cur;
    };
  }
  __name(createPathGetter, "createPathGetter");
  function traverse(value, depth = Infinity, seen) {
    if (depth <= 0 || !isObject(value) || value["__v_skip"]) {
      return value;
    }
    seen = seen || /* @__PURE__ */ new Set();
    if (seen.has(value)) {
      return value;
    }
    seen.add(value);
    depth--;
    if (isRef(value)) {
      traverse(value.value, depth, seen);
    } else if (isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        traverse(value[i], depth, seen);
      }
    } else if (isSet(value) || isMap(value)) {
      value.forEach((v) => {
        traverse(v, depth, seen);
      });
    } else if (isPlainObject$1(value)) {
      for (const key in value) {
        traverse(value[key], depth, seen);
      }
      for (const key of Object.getOwnPropertySymbols(value)) {
        if (Object.prototype.propertyIsEnumerable.call(value, key)) {
          traverse(value[key], depth, seen);
        }
      }
    }
    return value;
  }
  __name(traverse, "traverse");
  const getModelModifiers = /* @__PURE__ */ __name((props, modelName) => {
    return modelName === "modelValue" || modelName === "model-value" ? props.modelModifiers : props[`${modelName}Modifiers`] || props[`${camelize(modelName)}Modifiers`] || props[`${hyphenate(modelName)}Modifiers`];
  }, "getModelModifiers");
  function emit(instance, event, ...rawArgs) {
    if (instance.isUnmounted) return;
    const props = instance.vnode.props || EMPTY_OBJ;
    if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
      const {
        emitsOptions,
        propsOptions: [propsOptions]
      } = instance;
      if (emitsOptions) {
        if (!(event in emitsOptions) && true) {
          if (!propsOptions || !(toHandlerKey(event) in propsOptions)) {
            warn$1(
              `Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey(event)}" prop.`
            );
          }
        } else {
          const validator = emitsOptions[event];
          if (isFunction(validator)) {
            const isValid = validator(...rawArgs);
            if (!isValid) {
              warn$1(
                `Invalid event arguments: event validation failed for event "${event}".`
              );
            }
          }
        }
      }
    }
    let args = rawArgs;
    const isModelListener2 = event.startsWith("update:");
    const modifiers = isModelListener2 && getModelModifiers(props, event.slice(7));
    if (modifiers) {
      if (modifiers.trim) {
        args = rawArgs.map((a) => isString(a) ? a.trim() : a);
      }
      if (modifiers.number) {
        args = rawArgs.map(looseToNumber);
      }
    }
    if (!!(define_process_env_default$3.NODE_ENV !== "production") || false) {
      devtoolsComponentEmit(instance, event, args);
    }
    if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
      const lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && props[toHandlerKey(lowerCaseEvent)]) {
        warn$1(
          `Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(
            instance,
            instance.type
          )} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate(
            event
          )}" instead of "${event}".`
        );
      }
    }
    let handlerName;
    let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
    props[handlerName = toHandlerKey(camelize(event))];
    if (!handler && isModelListener2) {
      handler = props[handlerName = toHandlerKey(hyphenate(event))];
    }
    if (handler) {
      callWithAsyncErrorHandling(
        handler,
        instance,
        6,
        args
      );
    }
    const onceHandler = props[handlerName + `Once`];
    if (onceHandler) {
      if (!instance.emitted) {
        instance.emitted = {};
      } else if (instance.emitted[handlerName]) {
        return;
      }
      instance.emitted[handlerName] = true;
      callWithAsyncErrorHandling(
        onceHandler,
        instance,
        6,
        args
      );
    }
  }
  __name(emit, "emit");
  function normalizeEmitsOptions(comp, appContext, asMixin = false) {
    const cache = appContext.emitsCache;
    const cached = cache.get(comp);
    if (cached !== void 0) {
      return cached;
    }
    const raw = comp.emits;
    let normalized = {};
    let hasExtends = false;
    if (!isFunction(comp)) {
      const extendEmits = /* @__PURE__ */ __name((raw2) => {
        const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
        if (normalizedFromExtend) {
          hasExtends = true;
          extend(normalized, normalizedFromExtend);
        }
      }, "extendEmits");
      if (!asMixin && appContext.mixins.length) {
        appContext.mixins.forEach(extendEmits);
      }
      if (comp.extends) {
        extendEmits(comp.extends);
      }
      if (comp.mixins) {
        comp.mixins.forEach(extendEmits);
      }
    }
    if (!raw && !hasExtends) {
      if (isObject(comp)) {
        cache.set(comp, null);
      }
      return null;
    }
    if (isArray(raw)) {
      raw.forEach((key) => normalized[key] = null);
    } else {
      extend(normalized, raw);
    }
    if (isObject(comp)) {
      cache.set(comp, normalized);
    }
    return normalized;
  }
  __name(normalizeEmitsOptions, "normalizeEmitsOptions");
  function isEmitListener(options, key) {
    if (!options || !isOn(key)) {
      return false;
    }
    key = key.slice(2).replace(/Once$/, "");
    return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
  }
  __name(isEmitListener, "isEmitListener");
  let accessedAttrs = false;
  function markAttrsAccessed() {
    accessedAttrs = true;
  }
  __name(markAttrsAccessed, "markAttrsAccessed");
  function renderComponentRoot(instance) {
    const {
      type: Component,
      vnode,
      proxy,
      withProxy,
      propsOptions: [propsOptions],
      slots,
      attrs,
      emit: emit2,
      render: render2,
      renderCache,
      props,
      data,
      setupState,
      ctx,
      inheritAttrs
    } = instance;
    const prev = setCurrentRenderingInstance(instance);
    let result;
    let fallthroughAttrs;
    if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
      accessedAttrs = false;
    }
    try {
      if (vnode.shapeFlag & 4) {
        const proxyToUse = withProxy || proxy;
        const thisProxy = !!(define_process_env_default$3.NODE_ENV !== "production") && setupState.__isScriptSetup ? new Proxy(proxyToUse, {
          get(target, key, receiver) {
            warn$1(
              `Property '${String(
                key
              )}' was accessed via 'this'. Avoid using 'this' in templates.`
            );
            return Reflect.get(target, key, receiver);
          }
        }) : proxyToUse;
        result = normalizeVNode(
          render2.call(
            thisProxy,
            proxyToUse,
            renderCache,
            !!(define_process_env_default$3.NODE_ENV !== "production") ? shallowReadonly(props) : props,
            setupState,
            data,
            ctx
          )
        );
        fallthroughAttrs = attrs;
      } else {
        const render22 = Component;
        if (!!(define_process_env_default$3.NODE_ENV !== "production") && attrs === props) {
          markAttrsAccessed();
        }
        result = normalizeVNode(
          render22.length > 1 ? render22(
            !!(define_process_env_default$3.NODE_ENV !== "production") ? shallowReadonly(props) : props,
            !!(define_process_env_default$3.NODE_ENV !== "production") ? {
              get attrs() {
                markAttrsAccessed();
                return shallowReadonly(attrs);
              },
              slots,
              emit: emit2
            } : { attrs, slots, emit: emit2 }
          ) : render22(
            !!(define_process_env_default$3.NODE_ENV !== "production") ? shallowReadonly(props) : props,
            null
          )
        );
        fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
      }
    } catch (err) {
      blockStack.length = 0;
      handleError(err, instance, 1);
      result = createVNode(Comment);
    }
    let root = result;
    let setRoot = void 0;
    if (!!(define_process_env_default$3.NODE_ENV !== "production") && result.patchFlag > 0 && result.patchFlag & 2048) {
      [root, setRoot] = getChildRoot(result);
    }
    if (fallthroughAttrs && inheritAttrs !== false) {
      const keys = Object.keys(fallthroughAttrs);
      const { shapeFlag } = root;
      if (keys.length) {
        if (shapeFlag & (1 | 6)) {
          if (propsOptions && keys.some(isModelListener)) {
            fallthroughAttrs = filterModelListeners(
              fallthroughAttrs,
              propsOptions
            );
          }
          root = cloneVNode(root, fallthroughAttrs, false, true);
        } else if (!!(define_process_env_default$3.NODE_ENV !== "production") && !accessedAttrs && root.type !== Comment) {
          const allAttrs = Object.keys(attrs);
          const eventAttrs = [];
          const extraAttrs = [];
          for (let i = 0, l = allAttrs.length; i < l; i++) {
            const key = allAttrs[i];
            if (isOn(key)) {
              if (!isModelListener(key)) {
                eventAttrs.push(key[2].toLowerCase() + key.slice(3));
              }
            } else {
              extraAttrs.push(key);
            }
          }
          if (extraAttrs.length) {
            warn$1(
              `Extraneous non-props attributes (${extraAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes.`
            );
          }
          if (eventAttrs.length) {
            warn$1(
              `Extraneous non-emits event listeners (${eventAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`
            );
          }
        }
      }
    }
    if (vnode.dirs) {
      if (!!(define_process_env_default$3.NODE_ENV !== "production") && !isElementRoot(root)) {
        warn$1(
          `Runtime directive used on component with non-element root node. The directives will not function as intended.`
        );
      }
      root = cloneVNode(root, null, false, true);
      root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
    }
    if (vnode.transition) {
      if (!!(define_process_env_default$3.NODE_ENV !== "production") && !isElementRoot(root)) {
        warn$1(
          `Component inside <Transition> renders non-element root node that cannot be animated.`
        );
      }
      root.transition = vnode.transition;
    }
    if (!!(define_process_env_default$3.NODE_ENV !== "production") && setRoot) {
      setRoot(root);
    } else {
      result = root;
    }
    setCurrentRenderingInstance(prev);
    return result;
  }
  __name(renderComponentRoot, "renderComponentRoot");
  const getChildRoot = /* @__PURE__ */ __name((vnode) => {
    const rawChildren = vnode.children;
    const dynamicChildren = vnode.dynamicChildren;
    const childRoot = filterSingleRoot(rawChildren, false);
    if (!childRoot) {
      return [vnode, void 0];
    } else if (!!(define_process_env_default$3.NODE_ENV !== "production") && childRoot.patchFlag > 0 && childRoot.patchFlag & 2048) {
      return getChildRoot(childRoot);
    }
    const index = rawChildren.indexOf(childRoot);
    const dynamicIndex = dynamicChildren ? dynamicChildren.indexOf(childRoot) : -1;
    const setRoot = /* @__PURE__ */ __name((updatedRoot) => {
      rawChildren[index] = updatedRoot;
      if (dynamicChildren) {
        if (dynamicIndex > -1) {
          dynamicChildren[dynamicIndex] = updatedRoot;
        } else if (updatedRoot.patchFlag > 0) {
          vnode.dynamicChildren = [...dynamicChildren, updatedRoot];
        }
      }
    }, "setRoot");
    return [normalizeVNode(childRoot), setRoot];
  }, "getChildRoot");
  function filterSingleRoot(children, recurse = true) {
    let singleRoot;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (isVNode(child)) {
        if (child.type !== Comment || child.children === "v-if") {
          if (singleRoot) {
            return;
          } else {
            singleRoot = child;
            if (!!(define_process_env_default$3.NODE_ENV !== "production") && recurse && singleRoot.patchFlag > 0 && singleRoot.patchFlag & 2048) {
              return filterSingleRoot(singleRoot.children);
            }
          }
        }
      } else {
        return;
      }
    }
    return singleRoot;
  }
  __name(filterSingleRoot, "filterSingleRoot");
  const getFunctionalFallthrough = /* @__PURE__ */ __name((attrs) => {
    let res;
    for (const key in attrs) {
      if (key === "class" || key === "style" || isOn(key)) {
        (res || (res = {}))[key] = attrs[key];
      }
    }
    return res;
  }, "getFunctionalFallthrough");
  const filterModelListeners = /* @__PURE__ */ __name((attrs, props) => {
    const res = {};
    for (const key in attrs) {
      if (!isModelListener(key) || !(key.slice(9) in props)) {
        res[key] = attrs[key];
      }
    }
    return res;
  }, "filterModelListeners");
  const isElementRoot = /* @__PURE__ */ __name((vnode) => {
    return vnode.shapeFlag & (6 | 1) || vnode.type === Comment;
  }, "isElementRoot");
  function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
    const { props: prevProps, children: prevChildren, component } = prevVNode;
    const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
    const emits = component.emitsOptions;
    if (!!(define_process_env_default$3.NODE_ENV !== "production") && (prevChildren || nextChildren) && isHmrUpdating) {
      return true;
    }
    if (nextVNode.dirs || nextVNode.transition) {
      return true;
    }
    if (optimized && patchFlag >= 0) {
      if (patchFlag & 1024) {
        return true;
      }
      if (patchFlag & 16) {
        if (!prevProps) {
          return !!nextProps;
        }
        return hasPropsChanged(prevProps, nextProps, emits);
      } else if (patchFlag & 8) {
        const dynamicProps = nextVNode.dynamicProps;
        for (let i = 0; i < dynamicProps.length; i++) {
          const key = dynamicProps[i];
          if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
            return true;
          }
        }
      }
    } else {
      if (prevChildren || nextChildren) {
        if (!nextChildren || !nextChildren.$stable) {
          return true;
        }
      }
      if (prevProps === nextProps) {
        return false;
      }
      if (!prevProps) {
        return !!nextProps;
      }
      if (!nextProps) {
        return true;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    }
    return false;
  }
  __name(shouldUpdateComponent, "shouldUpdateComponent");
  function hasPropsChanged(prevProps, nextProps, emitsOptions) {
    const nextKeys = Object.keys(nextProps);
    if (nextKeys.length !== Object.keys(prevProps).length) {
      return true;
    }
    for (let i = 0; i < nextKeys.length; i++) {
      const key = nextKeys[i];
      if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
        return true;
      }
    }
    return false;
  }
  __name(hasPropsChanged, "hasPropsChanged");
  function updateHOCHostEl({ vnode, parent }, el) {
    while (parent) {
      const root = parent.subTree;
      if (root.suspense && root.suspense.activeBranch === vnode) {
        root.el = vnode.el;
      }
      if (root === vnode) {
        (vnode = parent.vnode).el = el;
        parent = parent.parent;
      } else {
        break;
      }
    }
  }
  __name(updateHOCHostEl, "updateHOCHostEl");
  const isSuspense = /* @__PURE__ */ __name((type) => type.__isSuspense, "isSuspense");
  function queueEffectWithSuspense(fn, suspense) {
    if (suspense && suspense.pendingBranch) {
      if (isArray(fn)) {
        suspense.effects.push(...fn);
      } else {
        suspense.effects.push(fn);
      }
    } else {
      queuePostFlushCb(fn);
    }
  }
  __name(queueEffectWithSuspense, "queueEffectWithSuspense");
  const Fragment = Symbol.for("v-fgt");
  const Text = Symbol.for("v-txt");
  const Comment = Symbol.for("v-cmt");
  const Static = Symbol.for("v-stc");
  const blockStack = [];
  let currentBlock = null;
  function openBlock(disableTracking = false) {
    blockStack.push(currentBlock = disableTracking ? null : []);
  }
  __name(openBlock, "openBlock");
  function closeBlock() {
    blockStack.pop();
    currentBlock = blockStack[blockStack.length - 1] || null;
  }
  __name(closeBlock, "closeBlock");
  let isBlockTreeEnabled = 1;
  function setBlockTracking(value) {
    isBlockTreeEnabled += value;
    if (value < 0 && currentBlock) {
      currentBlock.hasOnce = true;
    }
  }
  __name(setBlockTracking, "setBlockTracking");
  function setupBlock(vnode) {
    vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
    closeBlock();
    if (isBlockTreeEnabled > 0 && currentBlock) {
      currentBlock.push(vnode);
    }
    return vnode;
  }
  __name(setupBlock, "setupBlock");
  function createBlock(type, props, children, patchFlag, dynamicProps) {
    return setupBlock(
      createVNode(
        type,
        props,
        children,
        patchFlag,
        dynamicProps,
        true
      )
    );
  }
  __name(createBlock, "createBlock");
  function isVNode(value) {
    return value ? value.__v_isVNode === true : false;
  }
  __name(isVNode, "isVNode");
  function isSameVNodeType(n1, n2) {
    if (!!(define_process_env_default$3.NODE_ENV !== "production") && n2.shapeFlag & 6 && n1.component) {
      const dirtyInstances = hmrDirtyComponents.get(n2.type);
      if (dirtyInstances && dirtyInstances.has(n1.component)) {
        n1.shapeFlag &= ~256;
        n2.shapeFlag &= ~512;
        return false;
      }
    }
    return n1.type === n2.type && n1.key === n2.key;
  }
  __name(isSameVNodeType, "isSameVNodeType");
  const createVNodeWithArgsTransform = /* @__PURE__ */ __name((...args) => {
    return _createVNode(
      ...args
    );
  }, "createVNodeWithArgsTransform");
  const normalizeKey = /* @__PURE__ */ __name(({ key }) => key != null ? key : null, "normalizeKey");
  const normalizeRef = /* @__PURE__ */ __name(({
    ref: ref3,
    ref_key,
    ref_for
  }) => {
    if (typeof ref3 === "number") {
      ref3 = "" + ref3;
    }
    return ref3 != null ? isString(ref3) || isRef(ref3) || isFunction(ref3) ? { i: currentRenderingInstance, r: ref3, k: ref_key, f: !!ref_for } : ref3 : null;
  }, "normalizeRef");
  function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
    const vnode = {
      __v_isVNode: true,
      __v_skip: true,
      type,
      props,
      key: props && normalizeKey(props),
      ref: props && normalizeRef(props),
      scopeId: currentScopeId,
      slotScopeIds: null,
      children,
      component: null,
      suspense: null,
      ssContent: null,
      ssFallback: null,
      dirs: null,
      transition: null,
      el: null,
      anchor: null,
      target: null,
      targetStart: null,
      targetAnchor: null,
      staticCount: 0,
      shapeFlag,
      patchFlag,
      dynamicProps,
      dynamicChildren: null,
      appContext: null,
      ctx: currentRenderingInstance
    };
    if (needFullChildrenNormalization) {
      normalizeChildren(vnode, children);
      if (shapeFlag & 128) {
        type.normalize(vnode);
      }
    } else if (children) {
      vnode.shapeFlag |= isString(children) ? 8 : 16;
    }
    if (!!(define_process_env_default$3.NODE_ENV !== "production") && vnode.key !== vnode.key) {
      warn$1(`VNode created with invalid key (NaN). VNode type:`, vnode.type);
    }
    if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
    !isBlockNode && // has current parent block
    currentBlock && // presence of a patch flag indicates this node needs patching on updates.
    // component nodes also should always be patched, because even if the
    // component doesn't need to update, it needs to persist the instance on to
    // the next vnode so that it can be properly unmounted later.
    (vnode.patchFlag > 0 || shapeFlag & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
    // vnode should not be considered dynamic due to handler caching.
    vnode.patchFlag !== 32) {
      currentBlock.push(vnode);
    }
    return vnode;
  }
  __name(createBaseVNode, "createBaseVNode");
  const createVNode = !!(define_process_env_default$3.NODE_ENV !== "production") ? createVNodeWithArgsTransform : _createVNode;
  function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
    if (!type || type === NULL_DYNAMIC_COMPONENT) {
      if (!!(define_process_env_default$3.NODE_ENV !== "production") && !type) {
        warn$1(`Invalid vnode type when creating vnode: ${type}.`);
      }
      type = Comment;
    }
    if (isVNode(type)) {
      const cloned = cloneVNode(
        type,
        props,
        true
        /* mergeRef: true */
      );
      if (children) {
        normalizeChildren(cloned, children);
      }
      if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
        if (cloned.shapeFlag & 6) {
          currentBlock[currentBlock.indexOf(type)] = cloned;
        } else {
          currentBlock.push(cloned);
        }
      }
      cloned.patchFlag = -2;
      return cloned;
    }
    if (isClassComponent(type)) {
      type = type.__vccOpts;
    }
    if (props) {
      props = guardReactiveProps(props);
      let { class: klass, style } = props;
      if (klass && !isString(klass)) {
        props.class = normalizeClass(klass);
      }
      if (isObject(style)) {
        if (isProxy(style) && !isArray(style)) {
          style = extend({}, style);
        }
        props.style = normalizeStyle(style);
      }
    }
    const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject(type) ? 4 : isFunction(type) ? 2 : 0;
    if (!!(define_process_env_default$3.NODE_ENV !== "production") && shapeFlag & 4 && isProxy(type)) {
      type = toRaw(type);
      warn$1(
        `Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with \`markRaw\` or using \`shallowRef\` instead of \`ref\`.`,
        `
Component that was made reactive: `,
        type
      );
    }
    return createBaseVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      shapeFlag,
      isBlockNode,
      true
    );
  }
  __name(_createVNode, "_createVNode");
  function guardReactiveProps(props) {
    if (!props) return null;
    return isProxy(props) || isInternalObject(props) ? extend({}, props) : props;
  }
  __name(guardReactiveProps, "guardReactiveProps");
  function cloneVNode(vnode, extraProps, mergeRef = false, cloneTransition = false) {
    const { props, ref: ref3, patchFlag, children, transition } = vnode;
    const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
    const cloned = {
      __v_isVNode: true,
      __v_skip: true,
      type: vnode.type,
      props: mergedProps,
      key: mergedProps && normalizeKey(mergedProps),
      ref: extraProps && extraProps.ref ? (
        // #2078 in the case of <component :is="vnode" ref="extra"/>
        // if the vnode itself already has a ref, cloneVNode will need to merge
        // the refs so the single vnode can be set on multiple refs
        mergeRef && ref3 ? isArray(ref3) ? ref3.concat(normalizeRef(extraProps)) : [ref3, normalizeRef(extraProps)] : normalizeRef(extraProps)
      ) : ref3,
      scopeId: vnode.scopeId,
      slotScopeIds: vnode.slotScopeIds,
      children: !!(define_process_env_default$3.NODE_ENV !== "production") && patchFlag === -1 && isArray(children) ? children.map(deepCloneVNode) : children,
      target: vnode.target,
      targetStart: vnode.targetStart,
      targetAnchor: vnode.targetAnchor,
      staticCount: vnode.staticCount,
      shapeFlag: vnode.shapeFlag,
      // if the vnode is cloned with extra props, we can no longer assume its
      // existing patch flag to be reliable and need to add the FULL_PROPS flag.
      // note: preserve flag for fragments since they use the flag for children
      // fast paths only.
      patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
      dynamicProps: vnode.dynamicProps,
      dynamicChildren: vnode.dynamicChildren,
      appContext: vnode.appContext,
      dirs: vnode.dirs,
      transition,
      // These should technically only be non-null on mounted VNodes. However,
      // they *should* be copied for kept-alive vnodes. So we just always copy
      // them since them being non-null during a mount doesn't affect the logic as
      // they will simply be overwritten.
      component: vnode.component,
      suspense: vnode.suspense,
      ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
      ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
      el: vnode.el,
      anchor: vnode.anchor,
      ctx: vnode.ctx,
      ce: vnode.ce
    };
    if (transition && cloneTransition) {
      setTransitionHooks(
        cloned,
        transition.clone(cloned)
      );
    }
    return cloned;
  }
  __name(cloneVNode, "cloneVNode");
  function deepCloneVNode(vnode) {
    const cloned = cloneVNode(vnode);
    if (isArray(vnode.children)) {
      cloned.children = vnode.children.map(deepCloneVNode);
    }
    return cloned;
  }
  __name(deepCloneVNode, "deepCloneVNode");
  function createTextVNode(text = " ", flag = 0) {
    return createVNode(Text, null, text, flag);
  }
  __name(createTextVNode, "createTextVNode");
  function normalizeVNode(child) {
    if (child == null || typeof child === "boolean") {
      return createVNode(Comment);
    } else if (isArray(child)) {
      return createVNode(
        Fragment,
        null,
        // #3666, avoid reference pollution when reusing vnode
        child.slice()
      );
    } else if (typeof child === "object") {
      return cloneIfMounted(child);
    } else {
      return createVNode(Text, null, String(child));
    }
  }
  __name(normalizeVNode, "normalizeVNode");
  function cloneIfMounted(child) {
    return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
  }
  __name(cloneIfMounted, "cloneIfMounted");
  function normalizeChildren(vnode, children) {
    let type = 0;
    const { shapeFlag } = vnode;
    if (children == null) {
      children = null;
    } else if (isArray(children)) {
      type = 16;
    } else if (typeof children === "object") {
      if (shapeFlag & (1 | 64)) {
        const slot = children.default;
        if (slot) {
          slot._c && (slot._d = false);
          normalizeChildren(vnode, slot());
          slot._c && (slot._d = true);
        }
        return;
      } else {
        type = 32;
        const slotFlag = children._;
        if (!slotFlag && !isInternalObject(children)) {
          children._ctx = currentRenderingInstance;
        } else if (slotFlag === 3 && currentRenderingInstance) {
          if (currentRenderingInstance.slots._ === 1) {
            children._ = 1;
          } else {
            children._ = 2;
            vnode.patchFlag |= 1024;
          }
        }
      }
    } else if (isFunction(children)) {
      children = { default: children, _ctx: currentRenderingInstance };
      type = 32;
    } else {
      children = String(children);
      if (shapeFlag & 64) {
        type = 16;
        children = [createTextVNode(children)];
      } else {
        type = 8;
      }
    }
    vnode.children = children;
    vnode.shapeFlag |= type;
  }
  __name(normalizeChildren, "normalizeChildren");
  function mergeProps(...args) {
    const ret = {};
    for (let i = 0; i < args.length; i++) {
      const toMerge = args[i];
      for (const key in toMerge) {
        if (key === "class") {
          if (ret.class !== toMerge.class) {
            ret.class = normalizeClass([ret.class, toMerge.class]);
          }
        } else if (key === "style") {
          ret.style = normalizeStyle([ret.style, toMerge.style]);
        } else if (isOn(key)) {
          const existing = ret[key];
          const incoming = toMerge[key];
          if (incoming && existing !== incoming && !(isArray(existing) && existing.includes(incoming))) {
            ret[key] = existing ? [].concat(existing, incoming) : incoming;
          }
        } else if (key !== "") {
          ret[key] = toMerge[key];
        }
      }
    }
    return ret;
  }
  __name(mergeProps, "mergeProps");
  function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
    callWithAsyncErrorHandling(hook, instance, 7, [
      vnode,
      prevVNode
    ]);
  }
  __name(invokeVNodeHook, "invokeVNodeHook");
  const emptyAppContext = createAppContext();
  let uid = 0;
  function createComponentInstance(vnode, parent, suspense) {
    const type = vnode.type;
    const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
    const instance = {
      uid: uid++,
      vnode,
      type,
      parent,
      appContext,
      root: null,
      // to be immediately set
      next: null,
      subTree: null,
      // will be set synchronously right after creation
      effect: null,
      update: null,
      // will be set synchronously right after creation
      scope: new EffectScope(
        true
        /* detached */
      ),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: parent ? parent.provides : Object.create(appContext.provides),
      accessCache: null,
      renderCache: [],
      // local resolved assets
      components: null,
      directives: null,
      // resolved props and emits options
      propsOptions: normalizePropsOptions(type, appContext),
      emitsOptions: normalizeEmitsOptions(type, appContext),
      // emit
      emit: null,
      // to be set immediately
      emitted: null,
      // props default value
      propsDefaults: EMPTY_OBJ,
      // inheritAttrs
      inheritAttrs: type.inheritAttrs,
      // state
      ctx: EMPTY_OBJ,
      data: EMPTY_OBJ,
      props: EMPTY_OBJ,
      attrs: EMPTY_OBJ,
      slots: EMPTY_OBJ,
      refs: EMPTY_OBJ,
      setupState: EMPTY_OBJ,
      setupContext: null,
      // suspense related
      suspense,
      suspenseId: suspense ? suspense.pendingId : 0,
      asyncDep: null,
      asyncResolved: false,
      // lifecycle hooks
      // not using enums here because it results in computed properties
      isMounted: false,
      isUnmounted: false,
      isDeactivated: false,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null
    };
    if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
      instance.ctx = createDevRenderContext(instance);
    } else {
      instance.ctx = { _: instance };
    }
    instance.root = parent ? parent.root : instance;
    instance.emit = emit.bind(null, instance);
    if (vnode.ce) {
      vnode.ce(instance);
    }
    return instance;
  }
  __name(createComponentInstance, "createComponentInstance");
  let currentInstance = null;
  const getCurrentInstance = /* @__PURE__ */ __name(() => currentInstance || currentRenderingInstance, "getCurrentInstance");
  let internalSetCurrentInstance;
  let setInSSRSetupState;
  {
    const g = getGlobalThis();
    const registerGlobalSetter = /* @__PURE__ */ __name((key, setter) => {
      let setters;
      if (!(setters = g[key])) setters = g[key] = [];
      setters.push(setter);
      return (v) => {
        if (setters.length > 1) setters.forEach((set2) => set2(v));
        else setters[0](v);
      };
    }, "registerGlobalSetter");
    internalSetCurrentInstance = registerGlobalSetter(
      `__VUE_INSTANCE_SETTERS__`,
      (v) => currentInstance = v
    );
    setInSSRSetupState = registerGlobalSetter(
      `__VUE_SSR_SETTERS__`,
      (v) => isInSSRComponentSetup = v
    );
  }
  const setCurrentInstance = /* @__PURE__ */ __name((instance) => {
    const prev = currentInstance;
    internalSetCurrentInstance(instance);
    instance.scope.on();
    return () => {
      instance.scope.off();
      internalSetCurrentInstance(prev);
    };
  }, "setCurrentInstance");
  const unsetCurrentInstance = /* @__PURE__ */ __name(() => {
    currentInstance && currentInstance.scope.off();
    internalSetCurrentInstance(null);
  }, "unsetCurrentInstance");
  const isBuiltInTag = /* @__PURE__ */ makeMap("slot,component");
  function validateComponentName(name, { isNativeTag }) {
    if (isBuiltInTag(name) || isNativeTag(name)) {
      warn$1(
        "Do not use built-in or reserved HTML elements as component id: " + name
      );
    }
  }
  __name(validateComponentName, "validateComponentName");
  function isStatefulComponent(instance) {
    return instance.vnode.shapeFlag & 4;
  }
  __name(isStatefulComponent, "isStatefulComponent");
  let isInSSRComponentSetup = false;
  function setupComponent(instance, isSSR = false, optimized = false) {
    isSSR && setInSSRSetupState(isSSR);
    const { props, children } = instance.vnode;
    const isStateful = isStatefulComponent(instance);
    initProps(instance, props, isStateful, isSSR);
    initSlots(instance, children, optimized);
    const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
    isSSR && setInSSRSetupState(false);
    return setupResult;
  }
  __name(setupComponent, "setupComponent");
  function setupStatefulComponent(instance, isSSR) {
    var _a;
    const Component = instance.type;
    if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
      if (Component.name) {
        validateComponentName(Component.name, instance.appContext.config);
      }
      if (Component.components) {
        const names = Object.keys(Component.components);
        for (let i = 0; i < names.length; i++) {
          validateComponentName(names[i], instance.appContext.config);
        }
      }
      if (Component.directives) {
        const names = Object.keys(Component.directives);
        for (let i = 0; i < names.length; i++) {
          validateDirectiveName(names[i]);
        }
      }
      if (Component.compilerOptions && isRuntimeOnly()) {
        warn$1(
          `"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`
        );
      }
    }
    instance.accessCache = /* @__PURE__ */ Object.create(null);
    instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
    if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
      exposePropsOnRenderContext(instance);
    }
    const { setup } = Component;
    if (setup) {
      const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
      const reset = setCurrentInstance(instance);
      pauseTracking();
      const setupResult = callWithErrorHandling(
        setup,
        instance,
        0,
        [
          !!(define_process_env_default$3.NODE_ENV !== "production") ? shallowReadonly(instance.props) : instance.props,
          setupContext
        ]
      );
      resetTracking();
      reset();
      if (isPromise(setupResult)) {
        setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
        if (isSSR) {
          return setupResult.then((resolvedResult) => {
            handleSetupResult(instance, resolvedResult, isSSR);
          }).catch((e) => {
            handleError(e, instance, 0);
          });
        } else {
          instance.asyncDep = setupResult;
          if (!!(define_process_env_default$3.NODE_ENV !== "production") && !instance.suspense) {
            const name = (_a = Component.name) != null ? _a : "Anonymous";
            warn$1(
              `Component <${name}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`
            );
          }
        }
      } else {
        handleSetupResult(instance, setupResult, isSSR);
      }
    } else {
      finishComponentSetup(instance, isSSR);
    }
  }
  __name(setupStatefulComponent, "setupStatefulComponent");
  function handleSetupResult(instance, setupResult, isSSR) {
    if (isFunction(setupResult)) {
      if (instance.type.__ssrInlineRender) {
        instance.ssrRender = setupResult;
      } else {
        instance.render = setupResult;
      }
    } else if (isObject(setupResult)) {
      if (!!(define_process_env_default$3.NODE_ENV !== "production") && isVNode(setupResult)) {
        warn$1(
          `setup() should not return VNodes directly - return a render function instead.`
        );
      }
      if (!!(define_process_env_default$3.NODE_ENV !== "production") || false) {
        instance.devtoolsRawSetupState = setupResult;
      }
      instance.setupState = proxyRefs(setupResult);
      if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
        exposeSetupStateOnRenderContext(instance);
      }
    } else if (!!(define_process_env_default$3.NODE_ENV !== "production") && setupResult !== void 0) {
      warn$1(
        `setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`
      );
    }
    finishComponentSetup(instance, isSSR);
  }
  __name(handleSetupResult, "handleSetupResult");
  let compile;
  const isRuntimeOnly = /* @__PURE__ */ __name(() => !compile, "isRuntimeOnly");
  function finishComponentSetup(instance, isSSR, skipOptions) {
    const Component = instance.type;
    if (!instance.render) {
      if (!isSSR && compile && !Component.render) {
        const template = Component.template || resolveMergedOptions(instance).template;
        if (template) {
          if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
            startMeasure(instance, `compile`);
          }
          const { isCustomElement, compilerOptions } = instance.appContext.config;
          const { delimiters, compilerOptions: componentCompilerOptions } = Component;
          const finalCompilerOptions = extend(
            extend(
              {
                isCustomElement,
                delimiters
              },
              compilerOptions
            ),
            componentCompilerOptions
          );
          Component.render = compile(template, finalCompilerOptions);
          if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
            endMeasure(instance, `compile`);
          }
        }
      }
      instance.render = Component.render || NOOP;
    }
    {
      const reset = setCurrentInstance(instance);
      pauseTracking();
      try {
        applyOptions(instance);
      } finally {
        resetTracking();
        reset();
      }
    }
    if (!!(define_process_env_default$3.NODE_ENV !== "production") && !Component.render && instance.render === NOOP && !isSSR) {
      if (Component.template) {
        warn$1(
          `Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`
        );
      } else {
        warn$1(`Component is missing template or render function: `, Component);
      }
    }
  }
  __name(finishComponentSetup, "finishComponentSetup");
  const attrsProxyHandlers = !!(define_process_env_default$3.NODE_ENV !== "production") ? {
    get(target, key) {
      markAttrsAccessed();
      track(target, "get", "");
      return target[key];
    },
    set() {
      warn$1(`setupContext.attrs is readonly.`);
      return false;
    },
    deleteProperty() {
      warn$1(`setupContext.attrs is readonly.`);
      return false;
    }
  } : {
    get(target, key) {
      track(target, "get", "");
      return target[key];
    }
  };
  function getSlotsProxy(instance) {
    return new Proxy(instance.slots, {
      get(target, key) {
        track(instance, "get", "$slots");
        return target[key];
      }
    });
  }
  __name(getSlotsProxy, "getSlotsProxy");
  function createSetupContext(instance) {
    const expose = /* @__PURE__ */ __name((exposed) => {
      if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
        if (instance.exposed) {
          warn$1(`expose() should be called only once per setup().`);
        }
        if (exposed != null) {
          let exposedType = typeof exposed;
          if (exposedType === "object") {
            if (isArray(exposed)) {
              exposedType = "array";
            } else if (isRef(exposed)) {
              exposedType = "ref";
            }
          }
          if (exposedType !== "object") {
            warn$1(
              `expose() should be passed a plain object, received ${exposedType}.`
            );
          }
        }
      }
      instance.exposed = exposed || {};
    }, "expose");
    if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
      let attrsProxy;
      let slotsProxy;
      return Object.freeze({
        get attrs() {
          return attrsProxy || (attrsProxy = new Proxy(instance.attrs, attrsProxyHandlers));
        },
        get slots() {
          return slotsProxy || (slotsProxy = getSlotsProxy(instance));
        },
        get emit() {
          return (event, ...args) => instance.emit(event, ...args);
        },
        expose
      });
    } else {
      return {
        attrs: new Proxy(instance.attrs, attrsProxyHandlers),
        slots: instance.slots,
        emit: instance.emit,
        expose
      };
    }
  }
  __name(createSetupContext, "createSetupContext");
  function getComponentPublicInstance(instance) {
    if (instance.exposed) {
      return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
        get(target, key) {
          if (key in target) {
            return target[key];
          } else if (key in publicPropertiesMap) {
            return publicPropertiesMap[key](instance);
          }
        },
        has(target, key) {
          return key in target || key in publicPropertiesMap;
        }
      }));
    } else {
      return instance.proxy;
    }
  }
  __name(getComponentPublicInstance, "getComponentPublicInstance");
  const classifyRE = /(?:^|[-_])(\w)/g;
  const classify = /* @__PURE__ */ __name((str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, ""), "classify");
  function getComponentName(Component, includeInferred = true) {
    return isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
  }
  __name(getComponentName, "getComponentName");
  function formatComponentName(instance, Component, isRoot = false) {
    let name = getComponentName(Component);
    if (!name && Component.__file) {
      const match = Component.__file.match(/([^/\\]+)\.\w+$/);
      if (match) {
        name = match[1];
      }
    }
    if (!name && instance && instance.parent) {
      const inferFromRegistry = /* @__PURE__ */ __name((registry) => {
        for (const key in registry) {
          if (registry[key] === Component) {
            return key;
          }
        }
      }, "inferFromRegistry");
      name = inferFromRegistry(
        instance.components || instance.parent.type.components
      ) || inferFromRegistry(instance.appContext.components);
    }
    return name ? classify(name) : isRoot ? `App` : `Anonymous`;
  }
  __name(formatComponentName, "formatComponentName");
  function isClassComponent(value) {
    return isFunction(value) && "__vccOpts" in value;
  }
  __name(isClassComponent, "isClassComponent");
  const computed = /* @__PURE__ */ __name((getterOrOptions, debugOptions) => {
    const c = computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
    if (!!(define_process_env_default$3.NODE_ENV !== "production")) {
      const i = getCurrentInstance();
      if (i && i.appContext.config.warnRecursiveComputed) {
        c._warnRecursive = true;
      }
    }
    return c;
  }, "computed");
  function h(type, propsOrChildren, children) {
    const l = arguments.length;
    if (l === 2) {
      if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
        if (isVNode(propsOrChildren)) {
          return createVNode(type, null, [propsOrChildren]);
        }
        return createVNode(type, propsOrChildren);
      } else {
        return createVNode(type, null, propsOrChildren);
      }
    } else {
      if (l > 3) {
        children = Array.prototype.slice.call(arguments, 2);
      } else if (l === 3 && isVNode(children)) {
        children = [children];
      }
      return createVNode(type, propsOrChildren, children);
    }
  }
  __name(h, "h");
  function initCustomFormatter() {
    if (!!!(define_process_env_default$3.NODE_ENV !== "production") || typeof window === "undefined") {
      return;
    }
    const vueStyle = { style: "color:#3ba776" };
    const numberStyle = { style: "color:#1677ff" };
    const stringStyle = { style: "color:#f5222d" };
    const keywordStyle = { style: "color:#eb2f96" };
    const formatter = {
      __vue_custom_formatter: true,
      header(obj) {
        if (!isObject(obj)) {
          return null;
        }
        if (obj.__isVue) {
          return ["div", vueStyle, `VueInstance`];
        } else if (isRef(obj)) {
          return [
            "div",
            {},
            ["span", vueStyle, genRefFlag(obj)],
            "<",
            formatValue(obj.value),
            `>`
          ];
        } else if (isReactive(obj)) {
          return [
            "div",
            {},
            ["span", vueStyle, isShallow(obj) ? "ShallowReactive" : "Reactive"],
            "<",
            formatValue(obj),
            `>${isReadonly(obj) ? ` (readonly)` : ``}`
          ];
        } else if (isReadonly(obj)) {
          return [
            "div",
            {},
            ["span", vueStyle, isShallow(obj) ? "ShallowReadonly" : "Readonly"],
            "<",
            formatValue(obj),
            ">"
          ];
        }
        return null;
      },
      hasBody(obj) {
        return obj && obj.__isVue;
      },
      body(obj) {
        if (obj && obj.__isVue) {
          return [
            "div",
            {},
            ...formatInstance(obj.$)
          ];
        }
      }
    };
    function formatInstance(instance) {
      const blocks = [];
      if (instance.type.props && instance.props) {
        blocks.push(createInstanceBlock("props", toRaw(instance.props)));
      }
      if (instance.setupState !== EMPTY_OBJ) {
        blocks.push(createInstanceBlock("setup", instance.setupState));
      }
      if (instance.data !== EMPTY_OBJ) {
        blocks.push(createInstanceBlock("data", toRaw(instance.data)));
      }
      const computed2 = extractKeys(instance, "computed");
      if (computed2) {
        blocks.push(createInstanceBlock("computed", computed2));
      }
      const injected = extractKeys(instance, "inject");
      if (injected) {
        blocks.push(createInstanceBlock("injected", injected));
      }
      blocks.push([
        "div",
        {},
        [
          "span",
          {
            style: keywordStyle.style + ";opacity:0.66"
          },
          "$ (internal): "
        ],
        ["object", { object: instance }]
      ]);
      return blocks;
    }
    __name(formatInstance, "formatInstance");
    function createInstanceBlock(type, target) {
      target = extend({}, target);
      if (!Object.keys(target).length) {
        return ["span", {}];
      }
      return [
        "div",
        { style: "line-height:1.25em;margin-bottom:0.6em" },
        [
          "div",
          {
            style: "color:#476582"
          },
          type
        ],
        [
          "div",
          {
            style: "padding-left:1.25em"
          },
          ...Object.keys(target).map((key) => {
            return [
              "div",
              {},
              ["span", keywordStyle, key + ": "],
              formatValue(target[key], false)
            ];
          })
        ]
      ];
    }
    __name(createInstanceBlock, "createInstanceBlock");
    function formatValue(v, asRaw = true) {
      if (typeof v === "number") {
        return ["span", numberStyle, v];
      } else if (typeof v === "string") {
        return ["span", stringStyle, JSON.stringify(v)];
      } else if (typeof v === "boolean") {
        return ["span", keywordStyle, v];
      } else if (isObject(v)) {
        return ["object", { object: asRaw ? toRaw(v) : v }];
      } else {
        return ["span", stringStyle, String(v)];
      }
    }
    __name(formatValue, "formatValue");
    function extractKeys(instance, type) {
      const Comp = instance.type;
      if (isFunction(Comp)) {
        return;
      }
      const extracted = {};
      for (const key in instance.ctx) {
        if (isKeyOfType(Comp, key, type)) {
          extracted[key] = instance.ctx[key];
        }
      }
      return extracted;
    }
    __name(extractKeys, "extractKeys");
    function isKeyOfType(Comp, key, type) {
      const opts = Comp[type];
      if (isArray(opts) && opts.includes(key) || isObject(opts) && key in opts) {
        return true;
      }
      if (Comp.extends && isKeyOfType(Comp.extends, key, type)) {
        return true;
      }
      if (Comp.mixins && Comp.mixins.some((m) => isKeyOfType(m, key, type))) {
        return true;
      }
    }
    __name(isKeyOfType, "isKeyOfType");
    function genRefFlag(v) {
      if (isShallow(v)) {
        return `ShallowRef`;
      }
      if (v.effect) {
        return `ComputedRef`;
      }
      return `Ref`;
    }
    __name(genRefFlag, "genRefFlag");
    if (window.devtoolsFormatters) {
      window.devtoolsFormatters.push(formatter);
    } else {
      window.devtoolsFormatters = [formatter];
    }
  }
  __name(initCustomFormatter, "initCustomFormatter");
  const version = "3.4.34";
  const warn = !!(define_process_env_default$3.NODE_ENV !== "production") ? warn$1 : NOOP;
  var define_process_env_default$2 = {};
  const svgNS = "http://www.w3.org/2000/svg";
  const mathmlNS = "http://www.w3.org/1998/Math/MathML";
  const doc = typeof document !== "undefined" ? document : null;
  const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
  const nodeOps = {
    insert: /* @__PURE__ */ __name((child, parent, anchor) => {
      parent.insertBefore(child, anchor || null);
    }, "insert"),
    remove: /* @__PURE__ */ __name((child) => {
      const parent = child.parentNode;
      if (parent) {
        parent.removeChild(child);
      }
    }, "remove"),
    createElement: /* @__PURE__ */ __name((tag, namespace, is, props) => {
      const el = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : is ? doc.createElement(tag, { is }) : doc.createElement(tag);
      if (tag === "select" && props && props.multiple != null) {
        el.setAttribute("multiple", props.multiple);
      }
      return el;
    }, "createElement"),
    createText: /* @__PURE__ */ __name((text) => doc.createTextNode(text), "createText"),
    createComment: /* @__PURE__ */ __name((text) => doc.createComment(text), "createComment"),
    setText: /* @__PURE__ */ __name((node, text) => {
      node.nodeValue = text;
    }, "setText"),
    setElementText: /* @__PURE__ */ __name((el, text) => {
      el.textContent = text;
    }, "setElementText"),
    parentNode: /* @__PURE__ */ __name((node) => node.parentNode, "parentNode"),
    nextSibling: /* @__PURE__ */ __name((node) => node.nextSibling, "nextSibling"),
    querySelector: /* @__PURE__ */ __name((selector) => doc.querySelector(selector), "querySelector"),
    setScopeId(el, id) {
      el.setAttribute(id, "");
    },
    // __UNSAFE__
    // Reason: innerHTML.
    // Static content here can only come from compiled templates.
    // As long as the user only uses trusted templates, this is safe.
    insertStaticContent(content, parent, anchor, namespace, start, end) {
      const before = anchor ? anchor.previousSibling : parent.lastChild;
      if (start && (start === end || start.nextSibling)) {
        while (true) {
          parent.insertBefore(start.cloneNode(true), anchor);
          if (start === end || !(start = start.nextSibling)) break;
        }
      } else {
        templateContainer.innerHTML = namespace === "svg" ? `<svg>${content}</svg>` : namespace === "mathml" ? `<math>${content}</math>` : content;
        const template = templateContainer.content;
        if (namespace === "svg" || namespace === "mathml") {
          const wrapper = template.firstChild;
          while (wrapper.firstChild) {
            template.appendChild(wrapper.firstChild);
          }
          template.removeChild(wrapper);
        }
        parent.insertBefore(template, anchor);
      }
      return [
        // first
        before ? before.nextSibling : parent.firstChild,
        // last
        anchor ? anchor.previousSibling : parent.lastChild
      ];
    }
  };
  const TRANSITION = "transition";
  const ANIMATION = "animation";
  const vtcKey = Symbol("_vtc");
  const Transition = /* @__PURE__ */ __name((props, { slots }) => h(BaseTransition, resolveTransitionProps(props), slots), "Transition");
  Transition.displayName = "Transition";
  const DOMTransitionPropsValidators = {
    name: String,
    type: String,
    css: {
      type: Boolean,
      default: true
    },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String
  };
  Transition.props = /* @__PURE__ */ extend(
    {},
    BaseTransitionPropsValidators,
    DOMTransitionPropsValidators
  );
  const callHook = /* @__PURE__ */ __name((hook, args = []) => {
    if (isArray(hook)) {
      hook.forEach((h2) => h2(...args));
    } else if (hook) {
      hook(...args);
    }
  }, "callHook");
  const hasExplicitCallback = /* @__PURE__ */ __name((hook) => {
    return hook ? isArray(hook) ? hook.some((h2) => h2.length > 1) : hook.length > 1 : false;
  }, "hasExplicitCallback");
  function resolveTransitionProps(rawProps) {
    const baseProps = {};
    for (const key in rawProps) {
      if (!(key in DOMTransitionPropsValidators)) {
        baseProps[key] = rawProps[key];
      }
    }
    if (rawProps.css === false) {
      return baseProps;
    }
    const {
      name = "v",
      type,
      duration,
      enterFromClass = `${name}-enter-from`,
      enterActiveClass = `${name}-enter-active`,
      enterToClass = `${name}-enter-to`,
      appearFromClass = enterFromClass,
      appearActiveClass = enterActiveClass,
      appearToClass = enterToClass,
      leaveFromClass = `${name}-leave-from`,
      leaveActiveClass = `${name}-leave-active`,
      leaveToClass = `${name}-leave-to`
    } = rawProps;
    const durations = normalizeDuration(duration);
    const enterDuration = durations && durations[0];
    const leaveDuration = durations && durations[1];
    const {
      onBeforeEnter,
      onEnter,
      onEnterCancelled,
      onLeave,
      onLeaveCancelled,
      onBeforeAppear = onBeforeEnter,
      onAppear = onEnter,
      onAppearCancelled = onEnterCancelled
    } = baseProps;
    const finishEnter = /* @__PURE__ */ __name((el, isAppear, done) => {
      removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
      removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
      done && done();
    }, "finishEnter");
    const finishLeave = /* @__PURE__ */ __name((el, done) => {
      el._isLeaving = false;
      removeTransitionClass(el, leaveFromClass);
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
      done && done();
    }, "finishLeave");
    const makeEnterHook = /* @__PURE__ */ __name((isAppear) => {
      return (el, done) => {
        const hook = isAppear ? onAppear : onEnter;
        const resolve = /* @__PURE__ */ __name(() => finishEnter(el, isAppear, done), "resolve");
        callHook(hook, [el, resolve]);
        nextFrame(() => {
          removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
          addTransitionClass(el, isAppear ? appearToClass : enterToClass);
          if (!hasExplicitCallback(hook)) {
            whenTransitionEnds(el, type, enterDuration, resolve);
          }
        });
      };
    }, "makeEnterHook");
    return extend(baseProps, {
      onBeforeEnter(el) {
        callHook(onBeforeEnter, [el]);
        addTransitionClass(el, enterFromClass);
        addTransitionClass(el, enterActiveClass);
      },
      onBeforeAppear(el) {
        callHook(onBeforeAppear, [el]);
        addTransitionClass(el, appearFromClass);
        addTransitionClass(el, appearActiveClass);
      },
      onEnter: makeEnterHook(false),
      onAppear: makeEnterHook(true),
      onLeave(el, done) {
        el._isLeaving = true;
        const resolve = /* @__PURE__ */ __name(() => finishLeave(el, done), "resolve");
        addTransitionClass(el, leaveFromClass);
        addTransitionClass(el, leaveActiveClass);
        forceReflow();
        nextFrame(() => {
          if (!el._isLeaving) {
            return;
          }
          removeTransitionClass(el, leaveFromClass);
          addTransitionClass(el, leaveToClass);
          if (!hasExplicitCallback(onLeave)) {
            whenTransitionEnds(el, type, leaveDuration, resolve);
          }
        });
        callHook(onLeave, [el, resolve]);
      },
      onEnterCancelled(el) {
        finishEnter(el, false);
        callHook(onEnterCancelled, [el]);
      },
      onAppearCancelled(el) {
        finishEnter(el, true);
        callHook(onAppearCancelled, [el]);
      },
      onLeaveCancelled(el) {
        finishLeave(el);
        callHook(onLeaveCancelled, [el]);
      }
    });
  }
  __name(resolveTransitionProps, "resolveTransitionProps");
  function normalizeDuration(duration) {
    if (duration == null) {
      return null;
    } else if (isObject(duration)) {
      return [NumberOf(duration.enter), NumberOf(duration.leave)];
    } else {
      const n = NumberOf(duration);
      return [n, n];
    }
  }
  __name(normalizeDuration, "normalizeDuration");
  function NumberOf(val) {
    const res = toNumber(val);
    if (!!(define_process_env_default$2.NODE_ENV !== "production")) {
      assertNumber(res, "<transition> explicit duration");
    }
    return res;
  }
  __name(NumberOf, "NumberOf");
  function addTransitionClass(el, cls) {
    cls.split(/\s+/).forEach((c) => c && el.classList.add(c));
    (el[vtcKey] || (el[vtcKey] = /* @__PURE__ */ new Set())).add(cls);
  }
  __name(addTransitionClass, "addTransitionClass");
  function removeTransitionClass(el, cls) {
    cls.split(/\s+/).forEach((c) => c && el.classList.remove(c));
    const _vtc = el[vtcKey];
    if (_vtc) {
      _vtc.delete(cls);
      if (!_vtc.size) {
        el[vtcKey] = void 0;
      }
    }
  }
  __name(removeTransitionClass, "removeTransitionClass");
  function nextFrame(cb) {
    requestAnimationFrame(() => {
      requestAnimationFrame(cb);
    });
  }
  __name(nextFrame, "nextFrame");
  let endId = 0;
  function whenTransitionEnds(el, expectedType, explicitTimeout, resolve) {
    const id = el._endId = ++endId;
    const resolveIfNotStale = /* @__PURE__ */ __name(() => {
      if (id === el._endId) {
        resolve();
      }
    }, "resolveIfNotStale");
    if (explicitTimeout) {
      return setTimeout(resolveIfNotStale, explicitTimeout);
    }
    const { type, timeout, propCount } = getTransitionInfo(el, expectedType);
    if (!type) {
      return resolve();
    }
    const endEvent = type + "end";
    let ended = 0;
    const end = /* @__PURE__ */ __name(() => {
      el.removeEventListener(endEvent, onEnd);
      resolveIfNotStale();
    }, "end");
    const onEnd = /* @__PURE__ */ __name((e) => {
      if (e.target === el && ++ended >= propCount) {
        end();
      }
    }, "onEnd");
    setTimeout(() => {
      if (ended < propCount) {
        end();
      }
    }, timeout + 1);
    el.addEventListener(endEvent, onEnd);
  }
  __name(whenTransitionEnds, "whenTransitionEnds");
  function getTransitionInfo(el, expectedType) {
    const styles = window.getComputedStyle(el);
    const getStyleProperties = /* @__PURE__ */ __name((key) => (styles[key] || "").split(", "), "getStyleProperties");
    const transitionDelays = getStyleProperties(`${TRANSITION}Delay`);
    const transitionDurations = getStyleProperties(`${TRANSITION}Duration`);
    const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
    const animationDelays = getStyleProperties(`${ANIMATION}Delay`);
    const animationDurations = getStyleProperties(`${ANIMATION}Duration`);
    const animationTimeout = getTimeout(animationDelays, animationDurations);
    let type = null;
    let timeout = 0;
    let propCount = 0;
    if (expectedType === TRANSITION) {
      if (transitionTimeout > 0) {
        type = TRANSITION;
        timeout = transitionTimeout;
        propCount = transitionDurations.length;
      }
    } else if (expectedType === ANIMATION) {
      if (animationTimeout > 0) {
        type = ANIMATION;
        timeout = animationTimeout;
        propCount = animationDurations.length;
      }
    } else {
      timeout = Math.max(transitionTimeout, animationTimeout);
      type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
      propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
    }
    const hasTransform = type === TRANSITION && /\b(transform|all)(,|$)/.test(
      getStyleProperties(`${TRANSITION}Property`).toString()
    );
    return {
      type,
      timeout,
      propCount,
      hasTransform
    };
  }
  __name(getTransitionInfo, "getTransitionInfo");
  function getTimeout(delays, durations) {
    while (delays.length < durations.length) {
      delays = delays.concat(delays);
    }
    return Math.max(...durations.map((d, i) => toMs(d) + toMs(delays[i])));
  }
  __name(getTimeout, "getTimeout");
  function toMs(s) {
    if (s === "auto") return 0;
    return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
  }
  __name(toMs, "toMs");
  function forceReflow() {
    return document.body.offsetHeight;
  }
  __name(forceReflow, "forceReflow");
  function patchClass(el, value, isSVG) {
    const transitionClasses = el[vtcKey];
    if (transitionClasses) {
      value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
    }
    if (value == null) {
      el.removeAttribute("class");
    } else if (isSVG) {
      el.setAttribute("class", value);
    } else {
      el.className = value;
    }
  }
  __name(patchClass, "patchClass");
  const vShowOriginalDisplay = Symbol("_vod");
  const vShowHidden = Symbol("_vsh");
  const vShow = {
    beforeMount(el, { value }, { transition }) {
      el[vShowOriginalDisplay] = el.style.display === "none" ? "" : el.style.display;
      if (transition && value) {
        transition.beforeEnter(el);
      } else {
        setDisplay(el, value);
      }
    },
    mounted(el, { value }, { transition }) {
      if (transition && value) {
        transition.enter(el);
      }
    },
    updated(el, { value, oldValue }, { transition }) {
      if (!value === !oldValue) return;
      if (transition) {
        if (value) {
          transition.beforeEnter(el);
          setDisplay(el, true);
          transition.enter(el);
        } else {
          transition.leave(el, () => {
            setDisplay(el, false);
          });
        }
      } else {
        setDisplay(el, value);
      }
    },
    beforeUnmount(el, { value }) {
      setDisplay(el, value);
    }
  };
  if (!!(define_process_env_default$2.NODE_ENV !== "production")) {
    vShow.name = "show";
  }
  function setDisplay(el, value) {
    el.style.display = value ? el[vShowOriginalDisplay] : "none";
    el[vShowHidden] = !value;
  }
  __name(setDisplay, "setDisplay");
  const CSS_VAR_TEXT = Symbol(!!(define_process_env_default$2.NODE_ENV !== "production") ? "CSS_VAR_TEXT" : "");
  const displayRE = /(^|;)\s*display\s*:/;
  function patchStyle(el, prev, next) {
    const style = el.style;
    const isCssString = isString(next);
    let hasControlledDisplay = false;
    if (next && !isCssString) {
      if (prev) {
        if (!isString(prev)) {
          for (const key in prev) {
            if (next[key] == null) {
              setStyle(style, key, "");
            }
          }
        } else {
          for (const prevStyle of prev.split(";")) {
            const key = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
            if (next[key] == null) {
              setStyle(style, key, "");
            }
          }
        }
      }
      for (const key in next) {
        if (key === "display") {
          hasControlledDisplay = true;
        }
        setStyle(style, key, next[key]);
      }
    } else {
      if (isCssString) {
        if (prev !== next) {
          const cssVarText = style[CSS_VAR_TEXT];
          if (cssVarText) {
            next += ";" + cssVarText;
          }
          style.cssText = next;
          hasControlledDisplay = displayRE.test(next);
        }
      } else if (prev) {
        el.removeAttribute("style");
      }
    }
    if (vShowOriginalDisplay in el) {
      el[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "";
      if (el[vShowHidden]) {
        style.display = "none";
      }
    }
  }
  __name(patchStyle, "patchStyle");
  const semicolonRE = /[^\\];\s*$/;
  const importantRE = /\s*!important$/;
  function setStyle(style, name, val) {
    if (isArray(val)) {
      val.forEach((v) => setStyle(style, name, v));
    } else {
      if (val == null) val = "";
      if (!!(define_process_env_default$2.NODE_ENV !== "production")) {
        if (semicolonRE.test(val)) {
          warn(
            `Unexpected semicolon at the end of '${name}' style value: '${val}'`
          );
        }
      }
      if (name.startsWith("--")) {
        style.setProperty(name, val);
      } else {
        const prefixed = autoPrefix(style, name);
        if (importantRE.test(val)) {
          style.setProperty(
            hyphenate(prefixed),
            val.replace(importantRE, ""),
            "important"
          );
        } else {
          style[prefixed] = val;
        }
      }
    }
  }
  __name(setStyle, "setStyle");
  const prefixes = ["Webkit", "Moz", "ms"];
  const prefixCache = {};
  function autoPrefix(style, rawName) {
    const cached = prefixCache[rawName];
    if (cached) {
      return cached;
    }
    let name = camelize(rawName);
    if (name !== "filter" && name in style) {
      return prefixCache[rawName] = name;
    }
    name = capitalize(name);
    for (let i = 0; i < prefixes.length; i++) {
      const prefixed = prefixes[i] + name;
      if (prefixed in style) {
        return prefixCache[rawName] = prefixed;
      }
    }
    return rawName;
  }
  __name(autoPrefix, "autoPrefix");
  const xlinkNS = "http://www.w3.org/1999/xlink";
  function patchAttr(el, key, value, isSVG, instance, isBoolean2 = isSpecialBooleanAttr(key)) {
    if (isSVG && key.startsWith("xlink:")) {
      if (value == null) {
        el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
      } else {
        el.setAttributeNS(xlinkNS, key, value);
      }
    } else {
      if (value == null || isBoolean2 && !includeBooleanAttr(value)) {
        el.removeAttribute(key);
      } else {
        el.setAttribute(
          key,
          isBoolean2 ? "" : isSymbol(value) ? String(value) : value
        );
      }
    }
  }
  __name(patchAttr, "patchAttr");
  function patchDOMProp(el, key, value, parentComponent) {
    if (key === "innerHTML" || key === "textContent") {
      if (value == null) return;
      el[key] = value;
      return;
    }
    const tag = el.tagName;
    if (key === "value" && tag !== "PROGRESS" && // custom elements may use _value internally
    !tag.includes("-")) {
      const oldValue = tag === "OPTION" ? el.getAttribute("value") || "" : el.value;
      const newValue = value == null ? "" : String(value);
      if (oldValue !== newValue || !("_value" in el)) {
        el.value = newValue;
      }
      if (value == null) {
        el.removeAttribute(key);
      }
      el._value = value;
      return;
    }
    let needRemove = false;
    if (value === "" || value == null) {
      const type = typeof el[key];
      if (type === "boolean") {
        value = includeBooleanAttr(value);
      } else if (value == null && type === "string") {
        value = "";
        needRemove = true;
      } else if (type === "number") {
        value = 0;
        needRemove = true;
      }
    }
    try {
      el[key] = value;
    } catch (e) {
      if (!!(define_process_env_default$2.NODE_ENV !== "production") && !needRemove) {
        warn(
          `Failed setting prop "${key}" on <${tag.toLowerCase()}>: value ${value} is invalid.`,
          e
        );
      }
    }
    needRemove && el.removeAttribute(key);
  }
  __name(patchDOMProp, "patchDOMProp");
  function addEventListener(el, event, handler, options) {
    el.addEventListener(event, handler, options);
  }
  __name(addEventListener, "addEventListener");
  function removeEventListener(el, event, handler, options) {
    el.removeEventListener(event, handler, options);
  }
  __name(removeEventListener, "removeEventListener");
  const veiKey = Symbol("_vei");
  function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
    const invokers = el[veiKey] || (el[veiKey] = {});
    const existingInvoker = invokers[rawName];
    if (nextValue && existingInvoker) {
      existingInvoker.value = !!(define_process_env_default$2.NODE_ENV !== "production") ? sanitizeEventValue(nextValue, rawName) : nextValue;
    } else {
      const [name, options] = parseName(rawName);
      if (nextValue) {
        const invoker = invokers[rawName] = createInvoker(
          !!(define_process_env_default$2.NODE_ENV !== "production") ? sanitizeEventValue(nextValue, rawName) : nextValue,
          instance
        );
        addEventListener(el, name, invoker, options);
      } else if (existingInvoker) {
        removeEventListener(el, name, existingInvoker, options);
        invokers[rawName] = void 0;
      }
    }
  }
  __name(patchEvent, "patchEvent");
  const optionsModifierRE = /(?:Once|Passive|Capture)$/;
  function parseName(name) {
    let options;
    if (optionsModifierRE.test(name)) {
      options = {};
      let m;
      while (m = name.match(optionsModifierRE)) {
        name = name.slice(0, name.length - m[0].length);
        options[m[0].toLowerCase()] = true;
      }
    }
    const event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
    return [event, options];
  }
  __name(parseName, "parseName");
  let cachedNow = 0;
  const p = /* @__PURE__ */ Promise.resolve();
  const getNow = /* @__PURE__ */ __name(() => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now()), "getNow");
  function createInvoker(initialValue, instance) {
    const invoker = /* @__PURE__ */ __name((e) => {
      if (!e._vts) {
        e._vts = Date.now();
      } else if (e._vts <= invoker.attached) {
        return;
      }
      callWithAsyncErrorHandling(
        patchStopImmediatePropagation(e, invoker.value),
        instance,
        5,
        [e]
      );
    }, "invoker");
    invoker.value = initialValue;
    invoker.attached = getNow();
    return invoker;
  }
  __name(createInvoker, "createInvoker");
  function sanitizeEventValue(value, propName) {
    if (isFunction(value) || isArray(value)) {
      return value;
    }
    warn(
      `Wrong type passed as event handler to ${propName} - did you forget @ or : in front of your prop?
Expected function or array of functions, received type ${typeof value}.`
    );
    return NOOP;
  }
  __name(sanitizeEventValue, "sanitizeEventValue");
  function patchStopImmediatePropagation(e, value) {
    if (isArray(value)) {
      const originalStop = e.stopImmediatePropagation;
      e.stopImmediatePropagation = () => {
        originalStop.call(e);
        e._stopped = true;
      };
      return value.map(
        (fn) => (e2) => !e2._stopped && fn && fn(e2)
      );
    } else {
      return value;
    }
  }
  __name(patchStopImmediatePropagation, "patchStopImmediatePropagation");
  const isNativeOn = /* @__PURE__ */ __name((key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // lowercase letter
  key.charCodeAt(2) > 96 && key.charCodeAt(2) < 123, "isNativeOn");
  const patchProp = /* @__PURE__ */ __name((el, key, prevValue, nextValue, namespace, parentComponent) => {
    const isSVG = namespace === "svg";
    if (key === "class") {
      patchClass(el, nextValue, isSVG);
    } else if (key === "style") {
      patchStyle(el, prevValue, nextValue);
    } else if (isOn(key)) {
      if (!isModelListener(key)) {
        patchEvent(el, key, prevValue, nextValue, parentComponent);
      }
    } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
      patchDOMProp(el, key, nextValue);
      if (!el.tagName.includes("-") && (key === "value" || key === "checked" || key === "selected")) {
        patchAttr(el, key, nextValue, isSVG, parentComponent, key !== "value");
      }
    } else {
      if (key === "true-value") {
        el._trueValue = nextValue;
      } else if (key === "false-value") {
        el._falseValue = nextValue;
      }
      patchAttr(el, key, nextValue, isSVG);
    }
  }, "patchProp");
  function shouldSetAsProp(el, key, value, isSVG) {
    if (isSVG) {
      if (key === "innerHTML" || key === "textContent") {
        return true;
      }
      if (key in el && isNativeOn(key) && isFunction(value)) {
        return true;
      }
      return false;
    }
    if (key === "spellcheck" || key === "draggable" || key === "translate") {
      return false;
    }
    if (key === "form") {
      return false;
    }
    if (key === "list" && el.tagName === "INPUT") {
      return false;
    }
    if (key === "type" && el.tagName === "TEXTAREA") {
      return false;
    }
    if (key === "width" || key === "height") {
      const tag = el.tagName;
      if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "SOURCE") {
        return false;
      }
    }
    if (isNativeOn(key) && isString(value)) {
      return false;
    }
    return key in el;
  }
  __name(shouldSetAsProp, "shouldSetAsProp");
  const rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
  let renderer;
  function ensureRenderer() {
    return renderer || (renderer = createRenderer(rendererOptions));
  }
  __name(ensureRenderer, "ensureRenderer");
  const render = /* @__PURE__ */ __name((...args) => {
    ensureRenderer().render(...args);
  }, "render");
  var define_process_env_default$1 = {};
  function initDev() {
    {
      initCustomFormatter();
    }
  }
  __name(initDev, "initDev");
  if (!!(define_process_env_default$1.NODE_ENV !== "production")) {
    initDev();
  }
  var isVue2 = false;
  function set(target, key, val) {
    if (Array.isArray(target)) {
      target.length = Math.max(target.length, key);
      target.splice(key, 1, val);
      return val;
    }
    target[key] = val;
    return val;
  }
  __name(set, "set");
  function del(target, key) {
    if (Array.isArray(target)) {
      target.splice(key, 1);
      return;
    }
    delete target[key];
  }
  __name(del, "del");
  var define_process_env_default = {};
  let activePinia;
  const setActivePinia = /* @__PURE__ */ __name((pinia) => activePinia = pinia, "setActivePinia");
  const piniaSymbol = define_process_env_default.NODE_ENV !== "production" ? Symbol("pinia") : (
    /* istanbul ignore next */
    Symbol()
  );
  function isPlainObject(o) {
    return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
  }
  __name(isPlainObject, "isPlainObject");
  var MutationType;
  (function(MutationType2) {
    MutationType2["direct"] = "direct";
    MutationType2["patchObject"] = "patch object";
    MutationType2["patchFunction"] = "patch function";
  })(MutationType || (MutationType = {}));
  const IS_CLIENT = typeof window !== "undefined";
  const USE_DEVTOOLS = (define_process_env_default.NODE_ENV !== "production" || false) && !(define_process_env_default.NODE_ENV === "test") && IS_CLIENT;
  function patchObject(newState, oldState) {
    for (const key in oldState) {
      const subPatch = oldState[key];
      if (!(key in newState)) {
        continue;
      }
      const targetValue = newState[key];
      if (isPlainObject(targetValue) && isPlainObject(subPatch) && !isRef(subPatch) && !isReactive(subPatch)) {
        newState[key] = patchObject(targetValue, subPatch);
      } else {
        {
          newState[key] = subPatch;
        }
      }
    }
    return newState;
  }
  __name(patchObject, "patchObject");
  const noop = /* @__PURE__ */ __name(() => {
  }, "noop");
  function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
    subscriptions.push(callback);
    const removeSubscription = /* @__PURE__ */ __name(() => {
      const idx = subscriptions.indexOf(callback);
      if (idx > -1) {
        subscriptions.splice(idx, 1);
        onCleanup();
      }
    }, "removeSubscription");
    if (!detached && getCurrentScope()) {
      onScopeDispose(removeSubscription);
    }
    return removeSubscription;
  }
  __name(addSubscription, "addSubscription");
  function triggerSubscriptions(subscriptions, ...args) {
    subscriptions.slice().forEach((callback) => {
      callback(...args);
    });
  }
  __name(triggerSubscriptions, "triggerSubscriptions");
  const fallbackRunWithContext = /* @__PURE__ */ __name((fn) => fn(), "fallbackRunWithContext");
  function mergeReactiveObjects(target, patchToApply) {
    if (target instanceof Map && patchToApply instanceof Map) {
      patchToApply.forEach((value, key) => target.set(key, value));
    }
    if (target instanceof Set && patchToApply instanceof Set) {
      patchToApply.forEach(target.add, target);
    }
    for (const key in patchToApply) {
      if (!patchToApply.hasOwnProperty(key))
        continue;
      const subPatch = patchToApply[key];
      const targetValue = target[key];
      if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !isRef(subPatch) && !isReactive(subPatch)) {
        target[key] = mergeReactiveObjects(targetValue, subPatch);
      } else {
        target[key] = subPatch;
      }
    }
    return target;
  }
  __name(mergeReactiveObjects, "mergeReactiveObjects");
  const skipHydrateSymbol = define_process_env_default.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
    /* istanbul ignore next */
    Symbol()
  );
  function shouldHydrate(obj) {
    return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
  }
  __name(shouldHydrate, "shouldHydrate");
  const { assign } = Object;
  function isComputed(o) {
    return !!(isRef(o) && o.effect);
  }
  __name(isComputed, "isComputed");
  function createOptionsStore(id, options, pinia, hot) {
    const { state, actions, getters } = options;
    const initialState = pinia.state.value[id];
    let store;
    function setup() {
      if (!initialState && (!(define_process_env_default.NODE_ENV !== "production") || !hot)) {
        {
          pinia.state.value[id] = state ? state() : {};
        }
      }
      const localState = define_process_env_default.NODE_ENV !== "production" && hot ? (
        // use ref() to unwrap refs inside state TODO: check if this is still necessary
        toRefs(ref(state ? state() : {}).value)
      ) : toRefs(pinia.state.value[id]);
      return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
        if (define_process_env_default.NODE_ENV !== "production" && name in localState) {
          console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${name}" in store "${id}".`);
        }
        computedGetters[name] = markRaw(computed(() => {
          setActivePinia(pinia);
          const store2 = pinia._s.get(id);
          return getters[name].call(store2, store2);
        }));
        return computedGetters;
      }, {}));
    }
    __name(setup, "setup");
    store = createSetupStore(id, setup, options, pinia, hot, true);
    return store;
  }
  __name(createOptionsStore, "createOptionsStore");
  function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
    let scope;
    const optionsForPlugin = assign({ actions: {} }, options);
    if (define_process_env_default.NODE_ENV !== "production" && !pinia._e.active) {
      throw new Error("Pinia destroyed");
    }
    const $subscribeOptions = {
      deep: true
      // flush: 'post',
    };
    if (define_process_env_default.NODE_ENV !== "production" && !isVue2) {
      $subscribeOptions.onTrigger = (event) => {
        if (isListening) {
          debuggerEvents = event;
        } else if (isListening == false && !store._hotUpdating) {
          if (Array.isArray(debuggerEvents)) {
            debuggerEvents.push(event);
          } else {
            console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug.");
          }
        }
      };
    }
    let isListening;
    let isSyncListening;
    let subscriptions = [];
    let actionSubscriptions = [];
    let debuggerEvents;
    const initialState = pinia.state.value[$id];
    if (!isOptionsStore && !initialState && (!(define_process_env_default.NODE_ENV !== "production") || !hot)) {
      {
        pinia.state.value[$id] = {};
      }
    }
    const hotState = ref({});
    let activeListener;
    function $patch(partialStateOrMutator) {
      let subscriptionMutation;
      isListening = isSyncListening = false;
      if (define_process_env_default.NODE_ENV !== "production") {
        debuggerEvents = [];
      }
      if (typeof partialStateOrMutator === "function") {
        partialStateOrMutator(pinia.state.value[$id]);
        subscriptionMutation = {
          type: MutationType.patchFunction,
          storeId: $id,
          events: debuggerEvents
        };
      } else {
        mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
        subscriptionMutation = {
          type: MutationType.patchObject,
          payload: partialStateOrMutator,
          storeId: $id,
          events: debuggerEvents
        };
      }
      const myListenerId = activeListener = Symbol();
      nextTick().then(() => {
        if (activeListener === myListenerId) {
          isListening = true;
        }
      });
      isSyncListening = true;
      triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
    }
    __name($patch, "$patch");
    const $reset = isOptionsStore ? /* @__PURE__ */ __name(function $reset2() {
      const { state } = options;
      const newState = state ? state() : {};
      this.$patch(($state) => {
        assign($state, newState);
      });
    }, "$reset2") : (
      /* istanbul ignore next */
      define_process_env_default.NODE_ENV !== "production" ? () => {
        throw new Error(`🍍: Store "${$id}" is built using the setup syntax and does not implement $reset().`);
      } : noop
    );
    function $dispose() {
      scope.stop();
      subscriptions = [];
      actionSubscriptions = [];
      pinia._s.delete($id);
    }
    __name($dispose, "$dispose");
    function wrapAction(name, action) {
      return function() {
        setActivePinia(pinia);
        const args = Array.from(arguments);
        const afterCallbackList = [];
        const onErrorCallbackList = [];
        function after(callback) {
          afterCallbackList.push(callback);
        }
        __name(after, "after");
        function onError(callback) {
          onErrorCallbackList.push(callback);
        }
        __name(onError, "onError");
        triggerSubscriptions(actionSubscriptions, {
          args,
          name,
          store,
          after,
          onError
        });
        let ret;
        try {
          ret = action.apply(this && this.$id === $id ? this : store, args);
        } catch (error) {
          triggerSubscriptions(onErrorCallbackList, error);
          throw error;
        }
        if (ret instanceof Promise) {
          return ret.then((value) => {
            triggerSubscriptions(afterCallbackList, value);
            return value;
          }).catch((error) => {
            triggerSubscriptions(onErrorCallbackList, error);
            return Promise.reject(error);
          });
        }
        triggerSubscriptions(afterCallbackList, ret);
        return ret;
      };
    }
    __name(wrapAction, "wrapAction");
    const _hmrPayload = /* @__PURE__ */ markRaw({
      actions: {},
      getters: {},
      state: [],
      hotState
    });
    const partialStore = {
      _p: pinia,
      // _s: scope,
      $id,
      $onAction: addSubscription.bind(null, actionSubscriptions),
      $patch,
      $reset,
      $subscribe(callback, options2 = {}) {
        const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
        const stopWatcher = scope.run(() => watch(() => pinia.state.value[$id], (state) => {
          if (options2.flush === "sync" ? isSyncListening : isListening) {
            callback({
              storeId: $id,
              type: MutationType.direct,
              events: debuggerEvents
            }, state);
          }
        }, assign({}, $subscribeOptions, options2)));
        return removeSubscription;
      },
      $dispose
    };
    const store = reactive(define_process_env_default.NODE_ENV !== "production" || USE_DEVTOOLS ? assign(
      {
        _hmrPayload,
        _customProperties: markRaw(/* @__PURE__ */ new Set())
        // devtools custom properties
      },
      partialStore
      // must be added later
      // setupStore
    ) : partialStore);
    pinia._s.set($id, store);
    const runWithContext = pinia._a && pinia._a.runWithContext || fallbackRunWithContext;
    const setupStore = runWithContext(() => pinia._e.run(() => (scope = effectScope()).run(setup)));
    for (const key in setupStore) {
      const prop = setupStore[key];
      if (isRef(prop) && !isComputed(prop) || isReactive(prop)) {
        if (define_process_env_default.NODE_ENV !== "production" && hot) {
          set(hotState.value, key, toRef(setupStore, key));
        } else if (!isOptionsStore) {
          if (initialState && shouldHydrate(prop)) {
            if (isRef(prop)) {
              prop.value = initialState[key];
            } else {
              mergeReactiveObjects(prop, initialState[key]);
            }
          }
          {
            pinia.state.value[$id][key] = prop;
          }
        }
        if (define_process_env_default.NODE_ENV !== "production") {
          _hmrPayload.state.push(key);
        }
      } else if (typeof prop === "function") {
        const actionValue = define_process_env_default.NODE_ENV !== "production" && hot ? prop : wrapAction(key, prop);
        {
          setupStore[key] = actionValue;
        }
        if (define_process_env_default.NODE_ENV !== "production") {
          _hmrPayload.actions[key] = prop;
        }
        optionsForPlugin.actions[key] = prop;
      } else if (define_process_env_default.NODE_ENV !== "production") {
        if (isComputed(prop)) {
          _hmrPayload.getters[key] = isOptionsStore ? (
            // @ts-expect-error
            options.getters[key]
          ) : prop;
          if (IS_CLIENT) {
            const getters = setupStore._getters || // @ts-expect-error: same
            (setupStore._getters = markRaw([]));
            getters.push(key);
          }
        }
      }
    }
    {
      assign(store, setupStore);
      assign(toRaw(store), setupStore);
    }
    Object.defineProperty(store, "$state", {
      get: /* @__PURE__ */ __name(() => define_process_env_default.NODE_ENV !== "production" && hot ? hotState.value : pinia.state.value[$id], "get"),
      set: /* @__PURE__ */ __name((state) => {
        if (define_process_env_default.NODE_ENV !== "production" && hot) {
          throw new Error("cannot set hotState");
        }
        $patch(($state) => {
          assign($state, state);
        });
      }, "set")
    });
    if (define_process_env_default.NODE_ENV !== "production") {
      store._hotUpdate = markRaw((newStore) => {
        store._hotUpdating = true;
        newStore._hmrPayload.state.forEach((stateKey) => {
          if (stateKey in store.$state) {
            const newStateTarget = newStore.$state[stateKey];
            const oldStateSource = store.$state[stateKey];
            if (typeof newStateTarget === "object" && isPlainObject(newStateTarget) && isPlainObject(oldStateSource)) {
              patchObject(newStateTarget, oldStateSource);
            } else {
              newStore.$state[stateKey] = oldStateSource;
            }
          }
          set(store, stateKey, toRef(newStore.$state, stateKey));
        });
        Object.keys(store.$state).forEach((stateKey) => {
          if (!(stateKey in newStore.$state)) {
            del(store, stateKey);
          }
        });
        isListening = false;
        isSyncListening = false;
        pinia.state.value[$id] = toRef(newStore._hmrPayload, "hotState");
        isSyncListening = true;
        nextTick().then(() => {
          isListening = true;
        });
        for (const actionName in newStore._hmrPayload.actions) {
          const action = newStore[actionName];
          set(store, actionName, wrapAction(actionName, action));
        }
        for (const getterName in newStore._hmrPayload.getters) {
          const getter = newStore._hmrPayload.getters[getterName];
          const getterValue = isOptionsStore ? (
            // special handling of options api
            computed(() => {
              setActivePinia(pinia);
              return getter.call(store, store);
            })
          ) : getter;
          set(store, getterName, getterValue);
        }
        Object.keys(store._hmrPayload.getters).forEach((key) => {
          if (!(key in newStore._hmrPayload.getters)) {
            del(store, key);
          }
        });
        Object.keys(store._hmrPayload.actions).forEach((key) => {
          if (!(key in newStore._hmrPayload.actions)) {
            del(store, key);
          }
        });
        store._hmrPayload = newStore._hmrPayload;
        store._getters = newStore._getters;
        store._hotUpdating = false;
      });
    }
    if (USE_DEVTOOLS) {
      const nonEnumerable = {
        writable: true,
        configurable: true,
        // avoid warning on devtools trying to display this property
        enumerable: false
      };
      ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((p2) => {
        Object.defineProperty(store, p2, assign({ value: store[p2] }, nonEnumerable));
      });
    }
    pinia._p.forEach((extender) => {
      if (USE_DEVTOOLS) {
        const extensions = scope.run(() => extender({
          store,
          app: pinia._a,
          pinia,
          options: optionsForPlugin
        }));
        Object.keys(extensions || {}).forEach((key) => store._customProperties.add(key));
        assign(store, extensions);
      } else {
        assign(store, scope.run(() => extender({
          store,
          app: pinia._a,
          pinia,
          options: optionsForPlugin
        })));
      }
    });
    if (define_process_env_default.NODE_ENV !== "production" && store.$state && typeof store.$state === "object" && typeof store.$state.constructor === "function" && !store.$state.constructor.toString().includes("[native code]")) {
      console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${store.$id}".`);
    }
    if (initialState && isOptionsStore && options.hydrate) {
      options.hydrate(store.$state, initialState);
    }
    isListening = true;
    isSyncListening = true;
    return store;
  }
  __name(createSetupStore, "createSetupStore");
  function defineStore(idOrOptions, setup, setupOptions) {
    let id;
    let options;
    const isSetupStore = typeof setup === "function";
    if (typeof idOrOptions === "string") {
      id = idOrOptions;
      options = isSetupStore ? setupOptions : setup;
    } else {
      options = idOrOptions;
      id = idOrOptions.id;
      if (define_process_env_default.NODE_ENV !== "production" && typeof id !== "string") {
        throw new Error(`[🍍]: "defineStore()" must be passed a store id as its first argument.`);
      }
    }
    function useStore(pinia, hot) {
      const hasContext = hasInjectionContext();
      pinia = // in test mode, ignore the argument provided as we can always retrieve a
      // pinia instance with getActivePinia()
      (define_process_env_default.NODE_ENV === "test" && activePinia && activePinia._testing ? null : pinia) || (hasContext ? inject(piniaSymbol, null) : null);
      if (pinia)
        setActivePinia(pinia);
      if (define_process_env_default.NODE_ENV !== "production" && !activePinia) {
        throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
      }
      pinia = activePinia;
      if (!pinia._s.has(id)) {
        if (isSetupStore) {
          createSetupStore(id, setup, options, pinia);
        } else {
          createOptionsStore(id, options, pinia);
        }
        if (define_process_env_default.NODE_ENV !== "production") {
          useStore._pinia = pinia;
        }
      }
      const store = pinia._s.get(id);
      if (define_process_env_default.NODE_ENV !== "production" && hot) {
        const hotId = "__hot:" + id;
        const newStore = isSetupStore ? createSetupStore(hotId, setup, options, pinia, true) : createOptionsStore(hotId, assign({}, options), pinia, true);
        hot._hotUpdate(newStore);
        delete pinia.state.value[hotId];
        pinia._s.delete(hotId);
      }
      if (define_process_env_default.NODE_ENV !== "production" && IS_CLIENT) {
        const currentInstance2 = getCurrentInstance();
        if (currentInstance2 && currentInstance2.proxy && // avoid adding stores that are just built for hot module replacement
        !hot) {
          const vm = currentInstance2.proxy;
          const cache = "_pStores" in vm ? vm._pStores : vm._pStores = {};
          cache[id] = store;
        }
      }
      return store;
    }
    __name(useStore, "useStore");
    useStore.$id = id;
    return useStore;
  }
  __name(defineStore, "defineStore");
  const eventHandler$1 = /* @__PURE__ */ __name(async (event) => {
    let prettyBlocksContext = usePrettyBlocksContext();
    if (event.data.type == "zones") {
      let zones = event.data.data;
      prettyBlocksContext.$patch({
        zones
      });
    }
    if (event.data.type == "setNewUrl" || event.data.type == "setForceNewUrl") {
      let context = event.data.params.context;
      let custom_url = event.data.params.url;
      let force_reload = event.data.type == "setForceNewUrl" ? true : false;
      prettyBlocksContext.$patch({
        psContext: {
          ...prettyBlocksContext.psContext,
          ...context,
          current_url: custom_url
        }
      });
      if (force_reload) {
        window.location.reload();
      } else {
        prettyBlocksContext.changeUrl(custom_url);
      }
    }
    if (event.data.type == "updateTitleComponent") {
      let params = event.data.data.params;
      updateTitleComponent(JSON.parse(event.data.data.value), params.id_prettyblocks, params.field, params.index);
    }
    if (event.data.type == "reloadBlock") {
      let id_prettyblocks = event.data.data.data.id_prettyblocks;
      getBlockRender(id_prettyblocks).then((html) => {
        prettyBlocksContext.sendPrettyBlocksEvents("updateHTMLBlock", {
          id_prettyblocks,
          html
        });
      });
    }
    if (event.data.type == "setContext") {
      let iwindow = event.data.data.data;
      await prettyBlocksContext.$patch({
        psContext: {
          id_lang: iwindow.id_lang,
          id_shop: iwindow.id_shop,
          shop_name: iwindow.shop_name,
          // current_url: iwindow.current_url,
          href: iwindow.href
        }
      });
    }
  }, "eventHandler$1");
  const removeElement = /* @__PURE__ */ __name((el) => {
    if (typeof el.remove !== "undefined") {
      el.remove();
    } else {
      el.parentNode.removeChild(el);
    }
  }, "removeElement");
  const _Timer = class _Timer {
    constructor(callback, delay) {
      this.startedAt = Date.now();
      this.callback = callback;
      this.delay = delay;
      this.timer = setTimeout(callback, delay);
    }
    pause() {
      this.stop();
      this.delay -= Date.now() - this.startedAt;
    }
    resume() {
      this.stop();
      this.startedAt = Date.now();
      this.timer = setTimeout(this.callback, this.delay);
    }
    stop() {
      clearTimeout(this.timer);
    }
  };
  __name(_Timer, "Timer");
  let Timer = _Timer;
  const POSITIONS = {
    TOP_RIGHT: "top-right",
    TOP: "top",
    TOP_LEFT: "top-left",
    BOTTOM_RIGHT: "bottom-right",
    BOTTOM: "bottom",
    BOTTOM_LEFT: "bottom-left"
  };
  const Positions = Object.freeze(POSITIONS);
  function definePosition(position, top, bottom) {
    let result = null;
    switch (position) {
      case POSITIONS.TOP:
      case POSITIONS.TOP_RIGHT:
      case POSITIONS.TOP_LEFT:
        result = top;
        break;
      case POSITIONS.BOTTOM:
      case POSITIONS.BOTTOM_RIGHT:
      case POSITIONS.BOTTOM_LEFT:
        result = bottom;
        break;
    }
    return result;
  }
  __name(definePosition, "definePosition");
  const _Event = class _Event {
    constructor() {
      this.queue = {};
    }
    $on(name, callback) {
      this.queue[name] = this.queue[name] || [];
      this.queue[name].push(callback);
    }
    $off(name, callback) {
      if (this.queue[name]) {
        for (var i = 0; i < this.queue[name].length; i++) {
          if (this.queue[name][i] === callback) {
            this.queue[name].splice(i, 1);
            break;
          }
        }
      }
    }
    $emit(name, data) {
      if (this.queue[name]) {
        this.queue[name].forEach(function(callback) {
          callback(data);
        });
      }
    }
  };
  __name(_Event, "Event");
  let Event = _Event;
  const eventBus = new Event();
  const _export_sfc = /* @__PURE__ */ __name((sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  }, "_export_sfc");
  const _sfc_main = {
    name: "toast",
    props: {
      message: {
        type: String,
        required: true
      },
      type: {
        type: String,
        default: "default"
      },
      position: {
        type: String,
        default: Positions.BOTTOM_RIGHT,
        validator(value) {
          return Object.values(Positions).includes(value);
        }
      },
      maxToasts: {
        type: [Number, Boolean],
        default: false
      },
      duration: {
        type: [Number, Boolean],
        default: 4e3
      },
      dismissible: {
        type: Boolean,
        default: true
      },
      queue: {
        type: Boolean,
        default: false
      },
      pauseOnHover: {
        type: Boolean,
        default: true
      },
      useDefaultCss: {
        type: Boolean,
        default: true
      },
      onClose: {
        type: Function,
        default: /* @__PURE__ */ __name(() => {
        }, "default")
      },
      onClick: {
        type: Function,
        default: /* @__PURE__ */ __name(() => {
        }, "default")
      }
    },
    data() {
      return {
        isActive: false,
        parentTop: null,
        parentBottom: null,
        isHovered: false,
        timer: null
      };
    },
    beforeMount() {
      this.createParents();
      this.setDefaultCss();
      this.setupContainer();
    },
    mounted() {
      this.showNotice();
      eventBus.$on("toast-clear", this.close);
    },
    methods: {
      createParents() {
        this.parentTop = document.querySelector(".c-toast-container--top");
        this.parentBottom = document.querySelector(".c-toast-container--bottom");
        if (this.parentTop && this.parentBottom) return;
        if (!this.parentTop) {
          this.parentTop = document.createElement("div");
          this.parentTop.className = "c-toast-container c-toast-container--top";
        }
        if (!this.parentBottom) {
          this.parentBottom = document.createElement("div");
          this.parentBottom.className = "c-toast-container c-toast-container--bottom";
        }
      },
      setDefaultCss() {
        const type = this.useDefaultCss ? "add" : "remove";
        this.parentTop.classList[type]("v--default-css");
        this.parentBottom.classList[type]("v--default-css");
      },
      setupContainer() {
        const container = document.body;
        container.appendChild(this.parentTop);
        container.appendChild(this.parentBottom);
      },
      shouldQueue() {
        if (!this.queue && this.maxToasts === false) {
          return false;
        }
        if (this.maxToasts !== false) {
          return this.maxToasts <= this.parentTop.childElementCount + this.parentBottom.childElementCount;
        }
        return this.parentTop.childElementCount > 0 || this.parentBottom.childElementCount > 0;
      },
      showNotice() {
        if (this.shouldQueue()) {
          this.queueTimer = setTimeout(this.showNotice, 250);
          return;
        }
        this.correctParent.insertAdjacentElement("afterbegin", this.$el);
        this.isActive = true;
        this.timer = this.duration !== false ? new Timer(this.close, this.duration) : null;
      },
      click() {
        this.onClick.apply(null, arguments);
        if (this.dismissible) {
          this.close();
        }
      },
      toggleTimer(newVal) {
        if (this.timer && this.pauseOnHover) {
          newVal ? this.timer.pause() : this.timer.resume();
        }
      },
      stopTimer() {
        this.timer && this.timer.stop();
        clearTimeout(this.queueTimer);
      },
      close() {
        this.stopTimer();
        this.isActive = false;
        setTimeout(() => {
          this.onClose.apply(null, arguments);
          removeElement(this.$el);
        }, 150);
      }
    },
    computed: {
      correctParent() {
        return definePosition(this.position, this.parentTop, this.parentBottom);
      },
      transition() {
        return definePosition(
          this.position,
          {
            enter: "fadeInDown",
            leave: "fadeOut"
          },
          {
            enter: "fadeInUp",
            leave: "fadeOut"
          }
        );
      }
    },
    beforeUnmount() {
      eventBus.$off("toast-clear", this.close);
    }
  };
  const _hoisted_1 = ["innerHTML"];
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return openBlock(), createBlock(Transition, {
      "enter-active-class": $options.transition.enter,
      "leave-active-class": $options.transition.leave
    }, {
      default: withCtx(() => [
        withDirectives(createBaseVNode("div", {
          class: normalizeClass(["c-toast", `c-toast--${$props.type}`, `c-toast--${$props.position}`]),
          onMouseover: _cache[0] || (_cache[0] = ($event) => $options.toggleTimer(true)),
          onMouseleave: _cache[1] || (_cache[1] = ($event) => $options.toggleTimer(false)),
          onClick: _cache[2] || (_cache[2] = (...args) => $options.click && $options.click(...args)),
          role: "alert",
          innerHTML: $props.message
        }, null, 42, _hoisted_1), [
          [vShow, $data.isActive]
        ])
      ]),
      _: 1
    }, 8, ["enter-active-class", "leave-active-class"]);
  }
  __name(_sfc_render, "_sfc_render");
  const Toaster = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
  const createElement = /* @__PURE__ */ __name(() => typeof document !== "undefined" && document.createElement("div"), "createElement");
  const mount = /* @__PURE__ */ __name((component, { props, children, element, app } = {}) => {
    let el = element ? element : createElement();
    let vNode = h(component, props, children);
    if (app && app._context) {
      vNode.appContext = app._context;
    }
    render(vNode, el);
    const destroy = /* @__PURE__ */ __name(() => {
      if (el) {
        render(null, el);
      }
      el = null;
      vNode = null;
    }, "destroy");
    return { vNode, destroy, el };
  }, "mount");
  const Api = /* @__PURE__ */ __name((globalOptions = {}) => {
    return {
      show(message, options = {}) {
        let localOptions = { message, ...options };
        const c = mount(Toaster, {
          props: { ...globalOptions, ...localOptions }
        });
        return c;
      },
      clear() {
        eventBus.$emit("toast-clear");
      },
      success(message, options = {}) {
        options.type = "success";
        return this.show(message, options);
      },
      error(message, options = {}) {
        options.type = "error";
        return this.show(message, options);
      },
      info(message, options = {}) {
        options.type = "info";
        return this.show(message, options);
      },
      warning(message, options = {}) {
        options.type = "warning";
        return this.show(message, options);
      }
    };
  }, "Api");
  const Plugin = /* @__PURE__ */ __name((app, options = {}) => {
    let methods = Api(options);
    app.$toast = methods;
    app.config.globalProperties.$toast = methods;
  }, "Plugin");
  Toaster.install = Plugin;
  const HttpClient = {
    async get(url, params = {}) {
      const paramCharacter = url.includes("?") ? "&" : "?";
      let urlWithParams = url;
      if (Object.keys(params).length > 0) {
        urlWithParams += `${paramCharacter}${new URLSearchParams(params)}`;
      }
      const response = await fetch(urlWithParams);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    },
    async post(url, params = {}) {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    }
  };
  const toaster = Api({
    position: "top"
  });
  defineStore("currentblock", {
    state: /* @__PURE__ */ __name(() => {
      return {
        id_prettyblocks: null,
        instance_id: null,
        code: null,
        subSelected: null,
        need_reload: true
      };
    }, "state")
  });
  const usePrettyBlocksContext = defineStore("prettyBlocksContext", {
    state: /* @__PURE__ */ __name(() => ({
      blocks: [],
      blocksFormatted: [],
      zones: [],
      currentBlock: {
        id_prettyblocks: null,
        instance_id: null,
        code: null,
        subSelected: null,
        need_reload: true,
        states: []
      },
      currentZone: {
        name: "displayHome",
        alias: "",
        priority: true,
        zoneToFocus: "displayHome"
      },
      psContext: {
        id_lang: 1,
        id_shop: 1,
        shop_name: null,
        current_url: ajax_urls.startup_url + (ajax_urls.startup_url.includes("?prettyblocks=1") ? "" : "?prettyblocks=1"),
        href: ajax_urls.startup_url
      },
      iframe: {
        domElement: ref(null),
        object: null,
        width: ref("w-full"),
        height: ref("h-full"),
        device: ref("desktop"),
        loader: ref(true),
        rightPanel: ref("default"),
        // should be defaut, extends or hide
        leftPanel: ref("default")
        //  should be defaut, extends or hide
      },
      saveContext: ref("settings"),
      eventListeners: {}
    }), "state"),
    getters: {
      getDomElement(state) {
        return state.iframe.domElement;
      },
      getZones(state) {
        return state.zones;
      },
      getBlocks(state) {
        return state.blocks;
      },
      getCurrentBlock(state) {
        return state.currentBlock;
      },
      getCurrentZone(state) {
        return state.currentZone;
      },
      getPsContext(state) {
        return state.psContext;
      },
      getIframe(state) {
        return state.iframe;
      }
    },
    actions: {
      changeIframeSize(width, height, device) {
        this.$patch((state) => {
          state.iframe.width = ref(width);
          state.iframe.height = ref(height);
          state.iframe.device = ref(device);
        });
      },
      initStates() {
        let context = this.psContext;
        let current_zone = this.currentZone.name;
        const params = {
          ajax: true,
          action: "GetStates",
          zone: current_zone,
          ctx_id_lang: context.id_lang,
          ctx_id_shop: context.id_shop,
          ajax_token: security_app.ajax_token
        };
        HttpClient.get(ajax_urls.state, params).then((data) => {
          let blocksFormatted = Object.entries(data.blocks).map(([key, value] = block) => {
            return value.formatted;
          });
          this.$patch((state) => {
            state.blocks = data.blocks, state.blocksFormatted = blocksFormatted;
          });
        }).catch((error) => console.error(error));
      },
      reloadZoneContent() {
        this.sendPrettyBlocksEvents("reloadZone", { zone: this.currentZone.name });
      },
      setIframe() {
        this.$patch((state) => {
          state.iframe.domElement = ref(document.getElementById("website-iframe"));
          this.listenIframe();
        });
      },
      displaySettingsPanel() {
        this.$patch((state) => {
          state.saveContext = ref("settings");
        });
      },
      updatePanelState(side, value) {
        if (!["left", "right"].includes(side)) {
          console.error('Invalid side parameter. Must be "left" or "right".');
          return;
        }
        if (!["default", "extends", "hide"].includes(value)) {
          console.error('Invalid value parameter. Must be "default", "extends", or "hide".');
          return;
        }
        this.$patch((state) => {
          state.iframe[`${side}Panel`] = ref(value);
        });
      },
      displayMessage(message) {
        toaster.show(message);
      },
      displayError(message) {
        toaster.error(message, {
          duration: 5e3,
          position: "top",
          type: "error"
        });
      },
      listenIframe() {
        window.addEventListener("message", eventHandler$1);
        this.iframe.domElement.addEventListener("load", (e) => {
          setTimeout(() => {
            this.sendPrettyBlocksEvents("initIframe");
            this.sendPrettyBlocksEvents("getContext");
            this.sendPrettyBlocksEvents("getZones");
            this.hideLoader();
          }, 100);
        });
      },
      sendPrettyBlocksEvents(eventType, data = []) {
        let message = { type: eventType, data };
        this.iframe.domElement.contentWindow.postMessage(message, "*");
      },
      changeUrl(url) {
        this.$patch((state) => {
          state.psContext.current_url = this.updateFilteredURL(url);
        });
        this.pushUrl(url);
        this.showLoader();
        this.setIframe();
      },
      showLoader() {
        this.$patch((state) => {
          state.iframe.loader = true;
        });
      },
      hideLoader() {
        this.$patch((state) => {
          state.iframe.loader = false;
        });
      },
      pushUrl(url) {
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set("startup_url", this.updateFilteredURL(url));
        window.history.replaceState({}, "", currentUrl.toString());
      },
      updateFilteredURL(url) {
        let hashIndex = url.indexOf("#");
        if (hashIndex !== -1) {
          url = url.substring(0, hashIndex) + "?prettyblocks=1" + url.substring(hashIndex);
        } else if (!url.includes("?")) {
          url += "?prettyblocks=1";
        } else if (!url.includes("prettyblocks")) {
          url += "&prettyblocks=1";
        }
        return url;
      },
      reloadIframe(currentSrc = false) {
        if (this.iframe.domElement) {
          let url = this.iframe.domElement.src;
          if (currentSrc === false) {
            currentSrc = url;
          }
          console.log("currentSrc", currentSrc);
          this.iframe.domElement.src = "";
          setTimeout(() => {
            this.iframe.domElement.src = currentSrc;
          }, 100);
        }
      },
      getSubSelectedKey() {
        let key_formatted = 0;
        this.subSelected = this.currentBlock.subSelected;
        if (typeof this.subSelected !== "undefined") {
          key_formatted = this.subSelected.split("-")[1];
        } else {
          let maxKey = 0;
          if (this.states.length == 0) {
            let keys = Object.keys(this.states).map(Number);
            maxKey = Math.max(...keys);
          }
          maxKey = maxKey + 1;
          key_formatted = this.id_prettyblocks + "-" + maxKey;
        }
        return key_formatted;
      },
      async saveConfig(configState) {
        const params = {
          id_prettyblocks: this.currentBlock.id_prettyblocks,
          action: "updateBlockConfig",
          state: JSON.stringify(configState),
          subSelected: this.subSelected,
          ajax: true,
          ctx_id_lang: this.psContext.id_lang,
          ctx_id_shop: this.psContext.id_shop,
          ajax_token: security_app.ajax_token
        };
        let data = await HttpClient.post(ajax_urls.state, params);
        return data;
      },
      async updateSubSelectItem(state) {
        const params = {
          id_prettyblocks: this.currentBlock.id_prettyblocks,
          action: "updateState",
          state: JSON.stringify(state.value),
          subSelected: this.getSubSelectedKey(),
          ajax: true,
          ctx_id_lang: this.psContext.id_lang,
          ctx_id_shop: this.psContext.id_shop,
          ajax_token: security_app.ajax_token
        };
        let data = await HttpClient.post(ajax_urls.state, params);
        return data;
      },
      updateCurrentZone(zone) {
        this.$patch((state) => {
          state.currentZone.name = zone.name;
          state.currentZone.alias = zone.alias;
          state.currentZone.priority = zone.priority;
          state.currentZone.zoneToFocus = zone.name;
        });
      },
      setZoneToFocus(zoneName) {
        this.$patch((state) => {
          state.currentZone.zoneToFocus = zoneName;
        });
      },
      async getContext() {
        return new Promise((resolve) => {
          resolve({
            id_lang: this.psContext.id_lang,
            id_shop: this.psContext.id_shop,
            shop_name: this.psContext.shop_name,
            current_url: this.psContext.current_url,
            href: this.psContext.href
          });
        });
      },
      emit(event, ...args) {
        if (this.eventListeners[event]) {
          this.eventListeners[event].forEach((callback) => callback(...args));
        }
      },
      on(event, callback) {
        if (!this.eventListeners[event]) {
          this.eventListeners[event] = [];
        }
        this.eventListeners[event].push(callback);
      },
      emitSaveContext() {
        switch (this.saveContext) {
          case "config":
            this.emit("saveConfig");
            break;
          case "settings":
            this.emit("saveSettings");
            break;
          case "subState":
            this.emit("saveSubState");
            break;
          default:
            console.warn("Unknown saveContext:", this.saveContext);
        }
      },
      updateSaveContext(newContext) {
        this.saveContext = ref(newContext);
        this.emitSaveContext();
      }
    }
  });
  defineStore("iframe", {
    state: /* @__PURE__ */ __name(() => ({
      domElement: ref("test"),
      object: null
    }), "state"),
    actions: {
      setDomElement() {
        this.$patch((state) => {
          state.domElement = ref(document.getElementById("website-iframe"));
        });
      }
    },
    getters: {
      getDomElement(state) {
        return state.domElement;
      }
    }
  });
  defineStore("currentZone", {
    state: /* @__PURE__ */ __name(() => ({
      name: "displayHome",
      alias: "",
      priority: false,
      zoneToFocus: ""
    }), "state"),
    actions: {
      updateZone(zone) {
        this.name = zone.name;
        this.alias = zone.alias;
        this.priority = zone.priority;
        this.zoneToFocus = zone.name;
      },
      setZoneToFocus(zoneName) {
        this.zoneToFocus = zoneName;
      }
    }
  });
  defineStore("contextStore", {
    state: /* @__PURE__ */ __name(() => {
      return {
        id_lang: 0,
        id_shop: 0,
        shop_name: null,
        current_url: null,
        href: null
      };
    }, "state"),
    actions: {
      async getContext() {
        return new Promise((resolve) => {
          resolve({
            id_lang: this.id_lang,
            id_shop: this.id_shop,
            shop_name: this.shop_name,
            current_url: this.current_url,
            href: this.href
          });
        });
      }
    }
  });
  defineStore("useStoredZones", {
    state: /* @__PURE__ */ __name(() => {
      return {
        zones: []
      };
    }, "state"),
    getters: {
      all(state) {
        return state.zones;
      }
    }
  });
  defineStore("storedBlocks", {
    state: /* @__PURE__ */ __name(() => {
      return {
        blocks: []
      };
    }, "state"),
    getters: {
      all(state) {
        return state.blocks;
      }
    }
  });
  function getZoneDetailsByDom(domElement) {
    return {
      name: domElement.getAttribute("data-zone-name"),
      alias: domElement.getAttribute("data-zone-alias") || "",
      priority: domElement.getAttribute("data-zone-priority") || false
    };
  }
  __name(getZoneDetailsByDom, "getZoneDetailsByDom");
  async function getBlockRender(id_prettyblocks) {
    let prettyBlocksContext = usePrettyBlocksContext();
    let responseData = {};
    const params = {
      ajax: true,
      id_prettyblocks,
      action: "GetBlockRender",
      ctx_id_lang: prettyBlocksContext.psContext.id_lang,
      ctx_id_shop: prettyBlocksContext.psContext.id_shop,
      ajax_token: security_app.ajax_token
    };
    try {
      const data = await HttpClient.get(ajax_urls.block_url, params);
      responseData = data.html;
    } catch (error) {
      console.log("Error fetching block render:", error);
      responseData = "";
    }
    return responseData;
  }
  __name(getBlockRender, "getBlockRender");
  async function updateTitleComponent(newValue, id_block = null, field = null, index = null) {
    if (!id_block) {
      id_block = newValue.html.closest("[data-id-prettyblocks]").getAttribute("data-id-prettyblocks");
    }
    if (!field) {
      field = newValue.html.getAttribute("data-field");
    }
    if (!index) {
      index = null;
    }
    let prettyBlocksContext = usePrettyBlocksContext();
    let context = prettyBlocksContext.psContext;
    let data = {
      id_prettyblocks: id_block,
      element: newValue,
      ctx_id_lang: context.id_lang,
      ctx_id_shop: context.id_shop,
      field,
      ajax: true,
      index,
      action: "updateTitleComponent",
      ajax_token: security_app.ajax_token
    };
    try {
      const response = await HttpClient.post(ajax_urls.api, data);
      prettyBlocksContext.displayMessage(response.message);
    } catch (error) {
      console.error(error);
    }
  }
  __name(updateTitleComponent, "updateTitleComponent");
  const getContext = /* @__PURE__ */ __name(() => {
    return {
      id_lang: prestashop.language.id,
      id_shop: prestashop.modules.prettyblocks.id_shop,
      shop_name: prestashop.modules.prettyblocks.shop_name,
      current_url: prestashop.modules.prettyblocks.shop_current_url,
      href: window.location.href
    };
  }, "getContext");
  let eventHandler = /* @__PURE__ */ __name((event) => {
    if (event.data.type == "getContext") {
      let context = getContext();
      return event.source.postMessage({
        type: "setContext",
        data: { data: context }
      }, "*");
    }
    if (event.data.type == "initIframe") {
      event.source.postMessage({ type: "iframeInit", data: null }, "*");
      return loadToolBar(event);
    }
    if (event.data.type == "reloadBlock") {
      let id_prettyblocks = event.data;
      return reloadBlock(id_prettyblocks, event);
    }
    if (event.data.type == "selectBlock") {
      let id_prettyblocks = event.data.data.id_prettyblocks;
      return selectBlock(id_prettyblocks, event);
    }
    if (event.data.type == "focusOnZone") {
      let zone_name = event.data.data;
      document.querySelectorAll(".border-dotted").forEach((div) => {
        div.classList.remove("border-dotted");
      });
      let el = document.querySelector('[data-prettyblocks-zone="' + zone_name + '"]');
      el.classList.add("border-dotted");
      return el.scrollIntoView({
        alignToTop: true,
        behavior: "smooth"
        // block: 'top'
      });
    }
    if (event.data.type == "focusOnBlock") {
      let id_prettyblocks = event.data.data;
      return focusBlock(id_prettyblocks);
    }
    if (event.data.type == "getCurrentDocumentUrl") {
      return event.source.postMessage({ type: "currentDocumentUrl", data: document.location.href }, "*");
    }
    if (event.data.type == "updateHTMLBlock") {
      let id_prettyblocks = event.data.data.id_prettyblocks;
      let data = event.data.data.html;
      let domBlock = document.querySelector('[data-id-prettyblocks="' + id_prettyblocks + '"]');
      domBlock.innerHTML = data;
      document.dispatchEvent(new CustomEvent("updatePrettyBlocks", {
        detail: { block: {
          id_prettyblocks
        } }
      }));
      return loadToolBar(event);
    }
    if (event.data.type == "scrollInIframe") {
      return focusBlock(event.data.data);
    }
    if (event.data.type == "getZones") {
      let els = document.querySelectorAll("[data-zone-name]");
      let zones = [];
      let zone_name = "";
      els.forEach((el) => {
        zone_name = el.getAttribute("data-zone-name");
        let current_zone = {
          name: el.getAttribute("data-zone-name"),
          alias: el.getAttribute("data-zone-alias") || "",
          priority: el.getAttribute("data-zone-priority") || "false"
        };
        if (!zones.some((zone) => zone.name === zone_name)) {
          zones.push(current_zone);
        }
      });
      return event.source.postMessage({ type: "zones", data: zones }, "*");
    }
  }, "eventHandler");
  const selectBlock = /* @__PURE__ */ __name((id_prettyblocks, event) => {
    let el = focusBlock(id_prettyblocks);
    let zone_name = el.closest("[data-prettyblocks-zone]").getAttribute("data-prettyblocks-zone");
    let zoneElement = getZoneDetailsByDom(document.getQuerySelector('[data-zone-name="' + zone_name + '"]'));
    let params = {
      id_prettyblocks,
      zone: zoneElement
    };
    return event.source.postMessage({ type: "focusBlock", data: params }, "*");
  }, "selectBlock");
  const reloadBlock = /* @__PURE__ */ __name((id_prettyblocks, event) => {
    return event.source.postMessage({ type: "reloadBlock", data: id_prettyblocks }, "*");
  }, "reloadBlock");
  const focusBlock = /* @__PURE__ */ __name((id_prettyblocks) => {
    let doc2 = document;
    let el = doc2.querySelector('[data-id-prettyblocks="' + id_prettyblocks + '"]');
    if (doc2.body.contains(el) && !el.classList.contains("border-dotted")) {
      el.scrollIntoView({
        alignToTop: false,
        behavior: "smooth"
        // block: 'center'
      });
      let tr = doc2.querySelectorAll("[data-block]");
      tr.forEach((bl) => {
        bl.classList.remove("border-dotted");
      });
      el.classList.add("border-dotted");
    }
    return el;
  }, "focusBlock");
  const loadToolBar = /* @__PURE__ */ __name((event) => {
    const tb = new toolbar(document.querySelectorAll(".ptb-title"), document, window);
    tb.on("change", async (value) => {
      let params = {
        id_prettyblocks: value.html.closest("[data-id-prettyblocks]").getAttribute("data-id-prettyblocks"),
        field: value.html.getAttribute("data-field"),
        index: value.html.hasAttribute("data-index") ? value.html.getAttribute("data-index") : null
      };
      event.source.postMessage({
        type: "updateTitleComponent",
        data: { params, value: JSON.stringify(value) }
      }, "*");
    });
  }, "loadToolBar");
  document.addEventListener("DOMContentLoaded", (event) => {
    window.addEventListener("message", eventHandler, false);
    const links = document.querySelectorAll("a");
    links.forEach((link) => {
      link.addEventListener("click", function(e) {
        e.preventDefault();
        let href = link.getAttribute("href");
        if (href && href !== "#" && (href.includes("http") || href.includes("https"))) {
          let context = getContext();
          let params = {
            context,
            url: href
          };
          window.parent.postMessage({ type: "setNewUrl", params }, "*");
        }
      });
    });
    window.navigation.addEventListener("navigate", (event2) => {
      let url = event2.destination.url;
      if (url !== "about:blank") {
        event2.preventDefault();
        let context = getContext();
        let params = {
          context,
          url
        };
        window.parent.postMessage({ type: "setForceNewUrl", params }, "*");
      }
    });
  });
})();