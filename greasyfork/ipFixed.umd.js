// ==UserScript==
// @name         Idle Pixel Fixed
// @namespace    com.kape142.idlepixelfixed
// @version      0.3
// @description  Extension to improve the experience of Idle Pixel
// @author       kape142
// @match        https://idle-pixel.com/login/play/*
// @grant        none
// @require      https://unpkg.com/react@17/umd/react.production.min.js
// @require      https://unpkg.com/react-dom@17/umd/react-dom.production.min.js
// @require      https://unpkg.com/@reduxjs/toolkit@1.8.5/dist/redux-toolkit.umd.min.js
// @require      https://unpkg.com/react-redux@8.0.2/dist/react-redux.js

// ==/UserScript==

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(require("@reduxjs/toolkit"), require("react-redux"), require("react"), require("react-dom")) : typeof define === "function" && define.amd ? define(["@reduxjs/toolkit", "react-redux", "react", "react-dom"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.RTK, global.ReactRedux, global.React, global.ReactDOM));
})(this, function(toolkit, reactRedux, React$1, ReactDOM) {
  "use strict";
  function _interopDefaultLegacy(e) {
    return e && typeof e === "object" && "default" in e ? e : { "default": e };
  }
  var React__default = /* @__PURE__ */ _interopDefaultLegacy(React$1);
  var ReactDOM__default = /* @__PURE__ */ _interopDefaultLegacy(ReactDOM);
  const initialState$2 = {
    isOpen: false
  };
  const activityLogSlice = toolkit.createSlice({
    name: "Activity Log",
    initialState: initialState$2,
    reducers: {
      openActivityLog(state) {
        state.isOpen = true;
      },
      closeActivityLog(state) {
        state.isOpen = false;
      }
    }
  });
  const { openActivityLog, closeActivityLog } = activityLogSlice.actions;
  const selectActivityLogIsOpen = (state) => state.activityLog.isOpen;
  var activityLogReducer = activityLogSlice.reducer;
  const useIPFDispatch = reactRedux.useDispatch;
  const useIPFSelector = reactRedux.useSelector;
  const IPFMenuBar = ({}) => {
    const dispatch = useIPFDispatch();
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("hr", null), /* @__PURE__ */ React.createElement("div", {
      className: "center"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "color-grey"
    }, "Idle Pixel Fixed"), /* @__PURE__ */ React.createElement("div", {
      className: "App"
    }, /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("button", {
      type: "button",
      onClick: () => dispatch(openActivityLog())
    }, "Activity Log")))));
  };
  const initialState$1 = {
    subscribers: []
  };
  const removeSubscriber = (state, subscriber) => {
    state.subscribers = state.subscribers.filter((sub) => !(sub.id === subscriber.id && sub.key === subscriber.key));
    return state;
  };
  const localStorageSlice = toolkit.createSlice({
    name: "Local Storage",
    initialState: initialState$1,
    reducers: {
      subscribeToLocalStorage(state, action) {
        state = removeSubscriber(state, action.payload);
        state.subscribers.push(action.payload);
      },
      unsubscribeFromLocalStorage(state, action) {
        state = removeSubscriber(state, action.payload);
      }
    }
  });
  const { subscribeToLocalStorage, unsubscribeFromLocalStorage } = localStorageSlice.actions;
  const selectSubscribers = (state) => state.localStorage.subscribers;
  var localStorageReducer = localStorageSlice.reducer;
  const useLocalStorage = (key, initialValue, id) => {
    const [value, setValue] = React$1.useState(() => {
      const prevSaved = window.localStorage.getItem(`${var_username}.${key}`);
      return prevSaved ? JSON.parse(prevSaved) : initialValue;
    });
    const dispatch = useIPFDispatch();
    const subscribers = useIPFSelector(selectSubscribers);
    React$1.useEffect(() => {
      dispatch(subscribeToLocalStorage({
        setValue,
        key,
        id
      }));
      return () => {
        dispatch(unsubscribeFromLocalStorage({ key, id }));
      };
    }, [key, setValue, id]);
    React$1.useEffect(() => {
      window.localStorage.setItem(`${var_username}.${key}`, JSON.stringify(value));
      subscribers.filter((sub) => sub.key === key).forEach((sub) => {
        sub.setValue(value);
      });
    }, [key, value]);
    return [value, setValue];
  };
  const LootEntry = ({ content }) => {
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        borderBottom: "1px solid grey",
        margin: "10px",
        padding: "10px"
      }
    }, "Loot", /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap"
      }
    }, content.items.map((item) => /* @__PURE__ */ React.createElement("div", {
      style: {
        backgroundColor: item.background,
        border: "1px solid black",
        padding: "10px 20px",
        minWidth: "150px",
        margin: "10px",
        borderRadius: "10px"
      }
    }, /* @__PURE__ */ React.createElement("img", {
      style: {
        width: "50px",
        height: "50px",
        marginRight: "16px"
      },
      src: get_image(item.image),
      alt: `${item.label}-image`
    }), item.label))));
  };
  const onMessage = (func) => {
    const old = websocket.connected_socket.onmessage;
    websocket.connected_socket.onmessage = function(ev) {
      const updatedEv = func(ev);
      if (old)
        old(updatedEv);
    };
  };
  const observeWebSocketMessage = (type, observe) => {
    onMessage((ev) => {
      const { type: foundType, data } = websocketMessageSplit(ev.data);
      if (type === foundType) {
        observe(data);
      }
      return ev;
    });
  };
  const consumeWebSocketMessage = (type, consume) => {
    onMessage((ev) => {
      const { type: foundType, data } = websocketMessageSplit(ev.data);
      if (type === foundType) {
        consume(data);
        return Object.assign({}, ev, { data: "" });
      }
      return ev;
    });
  };
  const websocketMessageSplit = (message) => {
    const split = message.split("=");
    return { type: split[0], data: split[1] };
  };
  const useActivityLogWebSocketListener = (settings) => {
    const [list, setList] = useLocalStorage("activity-log", [], "useActivityLogWebSocketListener");
    React$1.useEffect(() => {
      const onMessage2 = settings.blockDialogues ? consumeWebSocketMessage : observeWebSocketMessage;
      onMessage2("OPEN_LOOT_DIALOGUE", (data) => {
        const activityLogItem = lootDialogueParser(data);
        setList((list2) => [activityLogItem].concat(list2));
      });
    }, []);
    return list;
  };
  const TYPE_LOOT = "LOOT";
  const lootDialogueParser = (data) => {
    const dataArray = data.split("~");
    return {
      type: TYPE_LOOT,
      timestamp: new Date(),
      content: {
        extraData: dataArray[0],
        items: dataArray.slice(1).reduce((acc, cur, j) => {
          const i = Math.floor(j / 3);
          if (!acc[i])
            acc[i] = {};
          if (j % 3 === 0)
            acc[i].image = cur;
          if (j % 3 === 1)
            acc[i].label = cur;
          if (j % 3 === 2)
            acc[i].background = cur;
          return acc;
        }, []).map((item) => item)
      }
    };
  };
  const ActivityLogEntry = ({ item }) => {
    switch (item.type) {
      case TYPE_LOOT:
        return /* @__PURE__ */ React.createElement(LootEntry, {
          content: item.content
        });
      default:
        return null;
    }
  };
  const ActivityLog = ({}) => {
    const [settings, setSettings] = useLocalStorage("activity-log-settings", { blockDialogues: true }, "ActivityLog");
    const list = useActivityLogWebSocketListener(settings);
    const open = useIPFSelector(selectActivityLogIsOpen);
    const dispatch = useIPFDispatch();
    return /* @__PURE__ */ React.createElement(React.Fragment, null, open && /* @__PURE__ */ React.createElement("div", {
      style: {
        position: "absolute",
        top: "10vh",
        left: "25vw",
        width: "50vw",
        height: "85vh",
        textAlign: "center",
        border: "1px solid grey",
        backgroundColor: "#e5fbff",
        borderRadius: "20px",
        padding: "20px",
        zIndex: 1e4
      }
    }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", {
      className: "color-grey"
    }, "Activity log"), /* @__PURE__ */ React.createElement("button", {
      type: "button",
      onClick: () => setSettings((set) => __spreadProps(__spreadValues({}, set), { blockDialogues: !set.blockDialogues })),
      style: {
        position: "absolute",
        top: "10px",
        right: "70px",
        backgroundColor: "grey",
        borderRadius: "5px",
        width: "50px"
      }
    }, settings.blockDialogues ? "\xD8" : "O"), /* @__PURE__ */ React.createElement("button", {
      type: "button",
      onClick: () => dispatch(closeActivityLog()),
      style: {
        position: "absolute",
        top: "10px",
        right: "10px",
        backgroundColor: "#e01e1e",
        borderRadius: "5px",
        width: "50px"
      }
    }, "X")), /* @__PURE__ */ React.createElement("div", {
      style: {
        height: "calc(85vh - 120px)",
        overflowY: "auto"
      }
    }, list.map((item) => /* @__PURE__ */ React.createElement(ActivityLogEntry, {
      item
    })))));
  };
  const ID_SYMBOLS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const makeId = (length) => {
    let text = "";
    for (let i = 0; i < length; i++) {
      text += ID_SYMBOLS.charAt(Math.floor(Math.random() * ID_SYMBOLS.length));
    }
    return text;
  };
  const initialState = {
    foo: "bonn",
    bar: 0
  };
  const testSlice = toolkit.createSlice({
    name: "test",
    initialState,
    reducers: {
      testFoo(state, action) {
        state.foo = action.payload;
      },
      testBar(state, action) {
        state.bar += action.payload;
      }
    }
  });
  testSlice.actions;
  var testReducer = testSlice.reducer;
  const store = toolkit.configureStore({
    reducer: {
      test: testReducer,
      activityLog: activityLogReducer,
      localStorage: localStorageReducer
    }
  });
  const appendReact = (component, id, insertBeforeId) => {
    const parent = document.getElementById(id);
    if (!parent)
      return;
    const reactRoot = document.createElement("div");
    const reactRootId = `${id}-react-child-${makeId(8)}`;
    reactRoot.id = reactRootId;
    if (insertBeforeId) {
      const insertBeforeElement = document.getElementById(insertBeforeId);
      if (insertBeforeElement) {
        parent.insertBefore(insertBeforeElement, reactRoot);
      } else {
        console.warn(`trying to insert before id ${insertBeforeId} but no element with that id was found`);
      }
    } else {
      parent.appendChild(reactRoot);
    }
    ReactDOM__default["default"].render(/* @__PURE__ */ React__default["default"].createElement(React__default["default"].StrictMode, null, /* @__PURE__ */ React__default["default"].createElement(reactRedux.Provider, {
      store
    }, component)), document.getElementById(reactRootId));
  };
  const waitFor = (check, func) => {
    const wrapperFunc = () => {
      if (check()) {
        func();
      } else {
        setTimeout(wrapperFunc, 1e3);
      }
    };
    wrapperFunc();
  };
  const init = () => {
    appendReact(/* @__PURE__ */ React.createElement(IPFMenuBar, null), "menu-bar-buttons");
    appendReact(/* @__PURE__ */ React.createElement(ActivityLog, null), "content");
  };
  waitFor(() => {
    try {
      const a = var_username == null ? void 0 : var_username.toLowerCase();
    } catch (e) {
      return false;
    }
    return true;
  }, init);
});
