// ==UserScript==
// @name         Idle Pixel Fixed
// @namespace    com.kape142.idlepixelfixed
// @version      0.4.1
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
  const initialState$3 = {
    isOpen: false
  };
  const activityLogSlice = toolkit.createSlice({
    name: "Activity Log",
    initialState: initialState$3,
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
  const initialState$2 = {
    subscribers: []
  };
  const removeSubscriber = (state, subscriber) => {
    state.subscribers = state.subscribers.filter((sub) => !(sub.id === subscriber.id && sub.key === subscriber.key));
    return state;
  };
  const localStorageSlice = toolkit.createSlice({
    name: "Local Storage",
    initialState: initialState$2,
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
  const timeSince = (timestamp) => {
    const parsedTimestamp = new Date(timestamp);
    const now = new Date();
    const secs = (now.getTime() - parsedTimestamp.getTime()) / 1e3;
    if (secs < 60)
      return `${Math.floor(secs)}s`;
    const mins = (now.getTime() - parsedTimestamp.getTime()) / 6e4;
    if (mins < 60)
      return `${Math.floor(mins)}m`;
    const hours = (now.getTime() - parsedTimestamp.getTime()) / 36e5;
    if (hours < 24)
      return `${Math.floor(hours)}h`;
    const days = (now.getTime() - parsedTimestamp.getTime()) / 864e5;
    if (days < 365)
      return `${Math.floor(days)}d`;
    const years = (now.getTime() - parsedTimestamp.getTime()) / 31536e6;
    return `${Math.floor(years)}y`;
  };
  const formatDate = (timestamp) => new Date(timestamp).toLocaleString();
  const LootEntry = ({ content, timestamp }) => {
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        borderBottom: "1px solid grey",
        margin: "10px",
        padding: "10px"
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        width: "100%",
        justifyContent: "space-around"
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        visibility: "hidden",
        width: "50px"
      }
    }, "padding"), /* @__PURE__ */ React.createElement("div", null, "Loot"), /* @__PURE__ */ React.createElement("div", {
      title: formatDate(timestamp),
      style: {
        color: "gray",
        width: "50px"
      }
    }, timeSince(timestamp))), /* @__PURE__ */ React.createElement("div", {
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
  var ActivityLogItemType = /* @__PURE__ */ ((ActivityLogItemType2) => {
    ActivityLogItemType2["LOOT"] = "LOOT";
    ActivityLogItemType2["COOK"] = "COOK";
    return ActivityLogItemType2;
  })(ActivityLogItemType || {});
  const CookEntry = ({ content, timestamp }) => {
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        borderBottom: "1px solid grey",
        margin: "10px",
        padding: "10px"
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        width: "100%",
        justifyContent: "space-around"
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        width: "50px",
        visibility: "hidden"
      }
    }, "padding"), /* @__PURE__ */ React.createElement("div", null, "Cooking"), /* @__PURE__ */ React.createElement("div", {
      title: formatDate(timestamp),
      style: {
        width: "50px",
        color: "gray"
      }
    }, timeSince(timestamp))), /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }
    }, /* @__PURE__ */ React.createElement("img", {
      style: {
        width: "50px",
        height: "50px"
      },
      src: get_image(`images/${Cooking.getOven()}.png`),
      alt: `${Cooking.getOven()}-image`
    }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("img", {
      style: {
        width: "30px",
        height: "30px"
      },
      src: get_image(`images/${content.name}.png`),
      alt: `${content.name}-image`
    }), content.cooked, " Cooked.", /* @__PURE__ */ React.createElement("span", {
      className: "color-grey"
    }, "(", content.cookedXp, " xp)")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("img", {
      style: {
        width: "30px",
        height: "30px"
      },
      src: get_image(`images/${content.name.replace("cooked", "raw")}.png`),
      alt: `${content.name.replace("cooked", "raw")}-image`,
      className: "grayscale"
    }), content.burnt, " Burnt.", /* @__PURE__ */ React.createElement("span", {
      className: "color-grey"
    }, "(", content.burntXp, " xp)"))));
  };
  const ActivityLogEntry = ({ item }) => {
    switch (item.type) {
      case ActivityLogItemType.LOOT:
        return /* @__PURE__ */ React.createElement(LootEntry, {
          content: item.content,
          timestamp: item.timestamp
        });
      case ActivityLogItemType.COOK:
        return /* @__PURE__ */ React.createElement(CookEntry, {
          content: item.content,
          timestamp: item.timestamp
        });
      default:
        return null;
    }
  };
  const initialState$1 = {
    consumers: []
  };
  const removeConsumer = (state, consumerId) => {
    state.consumers = state.consumers.filter((consumer) => !(consumer.id === consumerId));
    return state;
  };
  const websocketSlice = toolkit.createSlice({
    name: "Websocket",
    initialState: initialState$1,
    reducers: {
      addWebsocketConsumer(state, action) {
        removeConsumer(state, action.payload.id);
        state.consumers.push(action.payload);
      },
      removeWebsocketConsumer(state, action) {
        removeConsumer(state, action.payload);
      }
    }
  });
  const { addWebsocketConsumer, removeWebsocketConsumer } = websocketSlice.actions;
  const selectWebsocketConsumers = (state) => state.websocket.consumers;
  var websocketReducer = websocketSlice.reducer;
  const useWebsocket = (onMessage, priority, id) => {
    const oldOnMessage = React$1.useRef(websocket.connected_socket.onmessage);
    const dispatch = useIPFDispatch();
    const consumers = useIPFSelector(selectWebsocketConsumers);
    const functions = React$1.useMemo(() => {
      var _a;
      return consumers.concat([
        {
          onMessage: (_a = oldOnMessage.current) != null ? _a : trivialOnMessage,
          priority: 0,
          id: "smitty"
        }
      ]).sort((a, b) => b.priority - a.priority).map((consumer) => consumer.onMessage);
    }, [consumers]);
    React$1.useEffect(() => {
      dispatch(addWebsocketConsumer({
        onMessage,
        priority,
        id
      }));
      return () => {
        dispatch(removeWebsocketConsumer(id));
      };
    }, [onMessage, priority, id]);
    React$1.useEffect(() => {
      websocket.connected_socket.onmessage = (ev) => {
        functions.reduce((acc, cur) => cur(acc), ev);
      };
    }, [consumers]);
  };
  const trivialOnMessage = (ev) => ev;
  const observeWebSocketMessage = (type, observe) => (ev) => {
    const { type: foundType, data } = websocketMessageSplit(ev.data);
    if (type === foundType) {
      observe(data);
    }
    return ev;
  };
  const consumeWebSocketMessage = (type, consume) => (ev) => {
    const { type: foundType, data } = websocketMessageSplit(ev.data);
    if (type === foundType) {
      consume(data);
      return Object.assign({}, ev, { data: "" });
    }
    return ev;
  };
  const websocketMessageSplit = (message) => {
    const split = message.split("=");
    return { type: split[0], data: split[1] };
  };
  const useActivityLogWebSocketListener = (settings) => {
    const [list, setList] = useLocalStorage("activity-log", [], "useActivityLogWebSocketListener");
    const onMessageFactory = React$1.useMemo(() => settings.blockDialogues ? consumeWebSocketMessage : observeWebSocketMessage, [settings.blockDialogues]);
    const onLootMessage = React$1.useMemo(() => onMessageFactory("OPEN_LOOT_DIALOGUE", (data) => {
      const activityLogItem = lootDialogueParser(data);
      setList((list2) => [activityLogItem].concat(list2));
    }), [onMessageFactory]);
    useWebsocket(onLootMessage, 1e3, "useActivityLogWebSocketListener-Loot");
    const onCookedMessage = React$1.useMemo(() => onMessageFactory("COOKING_RESULTS", (data) => {
      const activityLogItem = cookDialogueParser(data);
      setList((list2) => [activityLogItem].concat(list2));
    }), [onMessageFactory]);
    useWebsocket(onCookedMessage, 1e3, "useActivityLogWebSocketListener-Cook");
    return list;
  };
  const cookDialogueParser = (data) => {
    const dataArray = data.split("~");
    return {
      type: ActivityLogItemType.COOK,
      timestamp: new Date(),
      content: {
        name: dataArray[0],
        cooked: Number(dataArray[1]),
        cookedXp: Number(dataArray[2]),
        burnt: Number(dataArray[3]),
        burntXp: Number(dataArray[4])
      }
    };
  };
  const lootDialogueParser = (data) => {
    const dataArray = data.split("~");
    return {
      type: ActivityLogItemType.LOOT,
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
  const ActivityLog = ({}) => {
    const [settings, setSettings] = useLocalStorage("activity-log-settings", { blockDialogues: true }, "ActivityLog");
    const list = useActivityLogWebSocketListener(settings);
    const open = useIPFSelector(selectActivityLogIsOpen);
    const dispatch = useIPFDispatch();
    return /* @__PURE__ */ React.createElement(React.Fragment, null, open && /* @__PURE__ */ React.createElement("div", {
      onClick: () => dispatch(closeActivityLog()),
      style: {
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%"
      }
    }, /* @__PURE__ */ React.createElement("div", {
      onClick: (event) => event.stopPropagation(),
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
      title: "Toggle showing loot pop-ups. O means they will appear, \xD8 means they are blocked.",
      type: "button",
      onClick: () => setSettings((set) => __spreadProps(__spreadValues({}, set), {
        blockDialogues: !set.blockDialogues
      })),
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
    }))))));
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
      localStorage: localStorageReducer,
      websocket: websocketReducer
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
      var_username == null ? void 0 : var_username.toLowerCase();
    } catch (e) {
      return false;
    }
    return true;
  }, init);
});
