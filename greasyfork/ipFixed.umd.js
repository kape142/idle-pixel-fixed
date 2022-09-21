// ==UserScript==
// @name         Idle Pixel Fixed
// @namespace    com.kape142.idlepixelfixed
// @version      0.4.0
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
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(require("@reduxjs/toolkit"), require("react-redux"), require("react"), require("react-dom")) : typeof define === "function" && define.amd ? define(["@reduxjs/toolkit", "react-redux", "react", "react-dom"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.RTK, global.ReactRedux, global.React, global.ReactDOM));
})(this, function(toolkit, reactRedux, React$1, ReactDOM) {
  "use strict";
  function _interopDefaultLegacy(e) {
    return e && typeof e === "object" && "default" in e ? e : { "default": e };
  }
  var React__default = /* @__PURE__ */ _interopDefaultLegacy(React$1);
  var ReactDOM__default = /* @__PURE__ */ _interopDefaultLegacy(ReactDOM);
  const initialState$5 = {
    isOpen: false
  };
  const activityLogSlice = toolkit.createSlice({
    name: "Activity Log",
    initialState: initialState$5,
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
  const initialState$4 = {
    subscribers: []
  };
  const removeSubscriber = (state, subscriber) => {
    state.subscribers = state.subscribers.filter((sub) => !(sub.id === subscriber.id && sub.key === subscriber.key));
    return state;
  };
  const localStorageSlice = toolkit.createSlice({
    name: "Local Storage",
    initialState: initialState$4,
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
  const useLocalStorage = (key, initialValue, id2) => {
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
        id: id2
      }));
      return () => {
        dispatch(unsubscribeFromLocalStorage({ key, id: id2 }));
      };
    }, [key, setValue, id2]);
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
        margin: "1em",
        padding: "1em",
        width: "100%"
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        width: "100%",
        justifyContent: "space-around",
        fontSize: "1.6em"
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        visibility: "hidden",
        width: "5em"
      }
    }, "padding"), /* @__PURE__ */ React.createElement("div", null, "Loot"), /* @__PURE__ */ React.createElement("div", {
      title: formatDate(timestamp),
      style: {
        color: "gray",
        width: "5em"
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
        padding: "1em 2em",
        minWidth: "15me",
        margin: "1em",
        borderRadius: "10px"
      }
    }, /* @__PURE__ */ React.createElement("img", {
      style: {
        width: "5em",
        height: "5em",
        marginRight: "1.6em"
      },
      src: get_image(item.image),
      alt: `${item.label}-image`
    }), /* @__PURE__ */ React.createElement("span", {
      style: {
        fontSize: "1.6em"
      }
    }, item.label)))));
  };
  var ActivityLogItemType = /* @__PURE__ */ ((ActivityLogItemType2) => {
    ActivityLogItemType2["LOOT"] = "LOOT";
    ActivityLogItemType2["COOK"] = "COOK";
    return ActivityLogItemType2;
  })(ActivityLogItemType || {});
  const removeEmpty = (it) => it !== void 0 && it !== null;
  const toggleInArray = (array, item) => {
    const i = array.indexOf(item);
    return i === -1 ? array.concat(item) : array.slice(0, i).concat(array.slice(i + 1));
  };
  const classNames = (classes, ...classList) => [
    Object.keys(classes).reduce((acc, cur) => `${acc}${classes[cur] ? ` ${cur}` : ""}`, "").trim()
  ].concat(classList.filter(removeEmpty)).join(" ");
  const IPimg = (_a) => {
    var _b = _a, {
      name,
      size,
      className,
      style
    } = _b, rest = __objRest(_b, [
      "name",
      "size",
      "className",
      "style"
    ]);
    return /* @__PURE__ */ React.createElement("img", __spreadValues({
      src: get_image(`images/${name}.png`),
      alt: name,
      className: classNames({ [`w${size}`]: !!size }, className),
      style: __spreadValues({ objectFit: "cover" }, style)
    }, rest));
  };
  const CookEntry = ({ content, timestamp }) => {
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        borderBottom: "1px solid grey",
        margin: "1em",
        padding: "1em",
        width: "100%"
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        width: "100%",
        justifyContent: "space-around",
        fontSize: "1.6em"
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        width: "5em",
        visibility: "hidden"
      }
    }, "padding"), /* @__PURE__ */ React.createElement("div", null, "Cooking"), /* @__PURE__ */ React.createElement("div", {
      title: formatDate(timestamp),
      style: {
        width: "5em",
        color: "gray"
      }
    }, timeSince(timestamp))), /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontSize: "1.6em"
      }
    }, /* @__PURE__ */ React.createElement(IPimg, {
      name: Cooking.getOven(),
      size: 50
    }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(IPimg, {
      name: content.name,
      size: 30
    }), content.cooked, " Cooked.", /* @__PURE__ */ React.createElement("span", {
      className: "color-grey"
    }, "(", content.cookedXp, " xp)")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(IPimg, {
      name: content.name.replace("cooked", "raw"),
      size: 30,
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
  const initialState$3 = {
    consumers: []
  };
  const removeConsumer = (state, consumerId) => {
    state.consumers = state.consumers.filter((consumer) => !(consumer.id === consumerId));
    return state;
  };
  const websocketSlice = toolkit.createSlice({
    name: "Websocket",
    initialState: initialState$3,
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
  const useWebsocket = (onMessage, priority, id2) => {
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
        id: id2
      }));
      return () => {
        dispatch(removeWebsocketConsumer(id2));
      };
    }, [onMessage, priority, id2]);
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
  const replaceWebSocketMessage = (type, replace) => (ev) => {
    const { type: foundType, data } = websocketMessageSplit(ev.data);
    if (type === foundType) {
      const newData = replace(data);
      return Object.assign({}, ev, { data: newData });
    }
    return ev;
  };
  const websocketMessageSplit = (message) => {
    const split = message.split("=");
    return { type: split[0], data: split[1] };
  };
  const sendMessage = (type, ...values) => websocket.connected_socket.send(`${type}=${values.join("~")}`);
  const reduceToRecord = (list, mappers) => list.reduce((acc, cur, j) => {
    const i = Math.floor(j / mappers.length);
    if (!acc[i])
      acc[i] = {};
    mappers.forEach((mapper, index) => {
      if (j % mappers.length === index) {
        Object.assign(acc[i], mapper(cur));
      }
    });
    return acc;
  }, []).map((t) => t);
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
        items: reduceToRecord(dataArray.slice(1), [
          (value) => ({ image: value }),
          (value) => ({ label: value }),
          (value) => ({ background: value })
        ])
      }
    };
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
        overflowY: "auto",
        overflowX: "hidden",
        fontSize: "10px"
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
  const initialState$2 = {
    foo: "bonn",
    bar: 0
  };
  const testSlice = toolkit.createSlice({
    name: "test",
    initialState: initialState$2,
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
  const initialState$1 = {
    isOpen: false
  };
  const overviewSlice = toolkit.createSlice({
    name: "Overview",
    initialState: initialState$1,
    reducers: {
      openOverview(state) {
        state.isOpen = true;
      },
      closeOverview(state) {
        state.isOpen = false;
      }
    }
  });
  const { openOverview, closeOverview } = overviewSlice.actions;
  const selectOverviewIsOpen = (state) => state.overview.isOpen;
  var overviewReducer = overviewSlice.reducer;
  const initialState = {
    observers: []
  };
  const removeObserver = (state, observerId) => {
    state.observers = state.observers.filter((observer) => !(observer.id === observerId));
    return state;
  };
  const setItemsSlice = toolkit.createSlice({
    name: "Set items",
    initialState,
    reducers: {
      addSetItemsObserver(state, action) {
        removeObserver(state, action.payload.id);
        state.observers.push(action.payload);
      },
      removeSetItemsObserver(state, action) {
        removeObserver(state, action.payload);
      }
    }
  });
  const { addSetItemsObserver, removeSetItemsObserver } = setItemsSlice.actions;
  const selectSetItemsObservers = (state) => state.setItems.observers;
  var setItemsReducer = setItemsSlice.reducer;
  const store = toolkit.configureStore({
    reducer: {
      test: testReducer,
      activityLog: activityLogReducer,
      localStorage: localStorageReducer,
      websocket: websocketReducer,
      overview: overviewReducer,
      setItems: setItemsReducer
    }
  });
  const hideElementById = (id2) => {
    const el = document.getElementById(id2);
    if (el && el.style) {
      el.style.display = "none";
    }
  };
  const showElementById = (id2) => {
    const el = document.getElementById(id2);
    if (el && el.style) {
      el.style.display = "";
    }
  };
  const updateTextContentById = (id2, textContent) => {
    const el = document.getElementById(id2);
    if (el) {
      el.textContent = textContent;
    }
  };
  const updateTimer = (selector, time) => {
    const id2 = `notification-${selector}`;
    const element = document.getElementById(id2);
    if (element) {
      const displays = element.getElementsByTagName("item-display");
      if (displays[0]) {
        displays[0].textContent = format_time(time);
      }
      showElementById(id2);
    }
  };
  const appendReact = (component, id2, insertBeforeId) => {
    const parent = document.getElementById(id2);
    if (!parent)
      return;
    const reactRoot = document.createElement("div");
    const reactRootId = `${id2}-react-child-${makeId(8)}`;
    reactRoot.id = reactRootId;
    if (insertBeforeId) {
      const insertBeforeElement = document.getElementById(insertBeforeId);
      if (insertBeforeElement) {
        parent.insertBefore(reactRoot, insertBeforeElement);
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
  const OverviewButton = ({}) => {
    const dispatch = useIPFDispatch();
    return /* @__PURE__ */ React.createElement("div", {
      className: "hover hover-menu-bar-item",
      role: "button",
      onClick: () => {
        hideElementById(Globals.currentPanel);
        Globals.currentPanel = "";
        dispatch(openOverview());
      }
    }, /* @__PURE__ */ React.createElement(IPimg, {
      style: {
        marginRight: "10px"
      },
      name: "community_center_1",
      className: "w20"
    }), /* @__PURE__ */ React.createElement("span", null, "OVERVIEW"));
  };
  const useNumberItemObserver = (item, id2) => {
    const [value, setValue] = useItemObserver(item, id2);
    return [
      Number(value),
      (newValue) => {
        Items.set(item, newValue.toString());
        setValue(newValue.toString());
      }
    ];
  };
  const useItemObserver = (item, id2) => {
    const [value, _setValue] = React$1.useState(Items.getItem(item));
    const [trueValue, _setTrueValue] = React$1.useState(Items.getItem(item));
    const itemId = `${id2}-${item}`;
    const observers = useIPFSelector(selectSetItemsObservers);
    const [forceTrueValueTimeout, setForceTrueValueTimeout] = React$1.useState(setTimeout(() => {
    }));
    const setValue = React$1.useCallback((newValue) => {
      _setValue(newValue);
      Items.set(item, newValue);
      observers.forEach((observer) => observer.item === item && observer.onChange(newValue));
    }, [observers, item, _setValue]);
    const setTrueValue = React$1.useCallback((newValue) => {
      if (value === trueValue) {
        _setValue(newValue);
      } else {
        clearTimeout(forceTrueValueTimeout);
        setForceTrueValueTimeout(setTimeout(() => {
          _setValue(newValue);
        }, 3e3));
      }
      _setTrueValue(newValue);
    }, [_setValue, _setTrueValue, forceTrueValueTimeout, setForceTrueValueTimeout]);
    const dispatch = useIPFDispatch();
    React$1.useEffect(() => {
      dispatch(addSetItemsObserver({
        onChange: setTrueValue,
        item,
        id: itemId
      }));
      return () => {
        dispatch(removeSetItemsObserver(itemId));
      };
    }, [setTrueValue, item, id2]);
    return [value, setValue];
  };
  const useSetItemsObserver = () => {
    const observers = useIPFSelector(selectSetItemsObservers);
    const onMessage = React$1.useMemo(() => observeWebSocketMessage("SET_ITEMS", (dataString) => {
      const data = reduceToRecord(dataString.split("~"), [
        (value) => ({ name: value }),
        (value) => ({ value })
      ]);
      observers.forEach((observer) => {
        data.forEach((d) => {
          if (d.name === observer.item) {
            observer.onChange(d.value);
          }
        });
      });
    }), [observers]);
    useWebsocket(onMessage, 10, "setItems");
  };
  const PotionDisplay = ({ potionName, toggle, view, opacity }) => {
    const [amount, setAmount] = useNumberItemObserver(potionName, "PotionDisplay");
    const [timer, setTimer] = useNumberItemObserver(`${potionName}_timer`, "PotionDisplay");
    const hasPotionStacker = Math.sign(Number(Items.getItem("donor_potion_stacker_timestamp")));
    const potionTimer = Brewing.get_potion_timer(potionName);
    const ingredients = Brewing.get_ingredients(potionName);
    const getMakeable = () => reduceToRecord(ingredients, [
      (value) => ({ item: value }),
      (value) => ({ amount: Number(value) })
    ]).reduce((acc, cur) => Math.min(Math.floor(Number(Items.getItem(cur.item)) / cur.amount), acc), Number.MAX_SAFE_INTEGER);
    const onDrinkClick = () => {
      if (amount > 0 && timer <= potionTimer * hasPotionStacker) {
        setAmount(amount - 1);
        setTimer(timer + potionTimer);
        updateTimer(`potion-${potionName}_timer`, timer + potionTimer);
        sendMessage("DRINK", potionName);
      }
    };
    const onBrewClick = (event) => {
      const makeable = getMakeable();
      let making = 1;
      if (makeable > 0) {
        if (event.shiftKey) {
          making = makeable;
        } else if (event.ctrlKey) {
          making = Math.min(5, makeable);
        }
        setAmount(amount + making);
        sendMessage("BREW", potionName, making);
      }
    };
    const onClick = view === BrewingView.DRINK ? onDrinkClick : view === BrewingView.BREW ? onBrewClick : toggle;
    return /* @__PURE__ */ React__default["default"].createElement("div", {
      style: {
        width: "50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "70px",
        opacity
      }
    }, /* @__PURE__ */ React__default["default"].createElement(IPimg, {
      role: "button",
      name: "stardust",
      onClick: toggle,
      style: {
        visibility: view === BrewingView.FAVORITE ? "visible" : "hidden"
      },
      size: 20
    }), /* @__PURE__ */ React__default["default"].createElement(IPimg, {
      name: potionName,
      size: 30,
      title: view === BrewingView.BREW ? `Max ${getMakeable()}` : Items.get_pretty_item_name(potionName),
      onClick,
      role: "button",
      style: view === BrewingView.BREW && getMakeable() === 0 || view === BrewingView.DRINK && amount <= 0 ? {
        opacity: 0.5,
        cursor: "default"
      } : void 0
    }), /* @__PURE__ */ React__default["default"].createElement("span", {
      style: {
        height: "20px"
      }
    }, amount), view === BrewingView.BREW && /* @__PURE__ */ React__default["default"].createElement("span", {
      style: {
        fontSize: "25px",
        fontWeight: "500",
        position: "absolute",
        margin: "0 0 40px 25px",
        height: "30px"
      }
    }, "+"));
  };
  var BrewingView = /* @__PURE__ */ ((BrewingView2) => {
    BrewingView2["DRINK"] = "DRINK";
    BrewingView2["BREW"] = "BREW";
    BrewingView2["FAVORITE"] = "FAVORITE";
    return BrewingView2;
  })(BrewingView || {});
  const BrewingOverview = ({}) => {
    useIPFDispatch();
    const [view, setView] = React$1.useState("DRINK");
    const potions = Object.keys(Brewing.POTION_TIMERS);
    const [favorites, setFavorites] = useLocalStorage("brewing-favorites", potions, "PotionDisplay");
    const toggle = (potionName) => () => {
      setFavorites((favs) => {
        favs = toggleInArray(favs, potionName);
        return potions.filter((potion) => favs.includes(potion));
      });
    };
    const viewSelectorStyle = (selectorView) => ({
      opacity: view === selectorView ? 0.3 : 1
    });
    const onMessage = React$1.useMemo(() => replaceWebSocketMessage("OPEN_DIALOGUE", (data) => {
      if (data.split("~")[0] === "INGREDIENTS USED") {
        return "";
      }
      return data;
    }), []);
    useWebsocket(onMessage, 1, "BrewingOverview");
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        height: "250px",
        width: "300px",
        flexDirection: "row",
        justifyContent: "center",
        border: "1px solid black"
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        width: `100%`,
        flexDirection: "row"
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "30px",
        flexShrink: 0,
        justifyContent: "space-evenly",
        alignItems: "center"
      }
    }, /* @__PURE__ */ React.createElement(IPimg, {
      role: "button",
      name: "brewing",
      onClick: () => setView("DRINK"),
      size: 30,
      style: viewSelectorStyle("DRINK")
    }), /* @__PURE__ */ React.createElement(IPimg, {
      role: "button",
      name: "brewing_kit",
      onClick: () => setView("BREW"),
      size: 30,
      style: viewSelectorStyle("BREW")
    }), /* @__PURE__ */ React.createElement(IPimg, {
      role: "button",
      name: "view",
      onClick: () => setView("FAVORITE"),
      size: 30,
      style: viewSelectorStyle("FAVORITE")
    })), /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        alignContent: "flex-start"
      }
    }, (view === "FAVORITE" ? potions : favorites).map((potion) => /* @__PURE__ */ React.createElement(PotionDisplay, {
      key: potion,
      potionName: potion,
      toggle: toggle(potion),
      view,
      opacity: favorites.includes(potion) ? 1 : 0.5
    })))));
  };
  const WoodcuttingPatch = ({ type, stage, timer, plotClick }) => {
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundImage: `url(${get_image("images/background_grass.png")}`,
        borderRadius: "20px",
        height: "120px",
        width: "100px"
      }
    }, type !== "none" ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(IPimg, {
      role: "button",
      name: `woodcutting_${type}_${stage}`,
      onClick: plotClick,
      size: 100,
      style: {}
    }), /* @__PURE__ */ React.createElement("span", {
      style: {
        color: "white"
      }
    }, stage === 4 ? "READY" : format_time(timer))) : null);
  };
  const useTreePatchesObserver = (id2) => {
    const hookId = `useTreePatchesObserver-${id2}`;
    const [stage1, setStage1] = useNumberItemObserver(`tree_stage_1`, hookId);
    const [stage2, setStage2] = useNumberItemObserver(`tree_stage_2`, hookId);
    const [stage3, setStage3] = useNumberItemObserver(`tree_stage_3`, hookId);
    const [stage4, setStage4] = useNumberItemObserver(`tree_stage_4`, hookId);
    const [stage5, setStage5] = useNumberItemObserver(`tree_stage_5`, hookId);
    const [type1, setType1] = useItemObserver(`tree_1`, hookId);
    const [type2, setType2] = useItemObserver(`tree_2`, hookId);
    const [type3, setType3] = useItemObserver(`tree_3`, hookId);
    const [type4, setType4] = useItemObserver(`tree_4`, hookId);
    const [type5, setType5] = useItemObserver(`tree_5`, hookId);
    const [timer1, setTimer1] = useNumberItemObserver(`tree_timer_1`, hookId);
    const [timer2, setTimer2] = useNumberItemObserver(`tree_timer_2`, hookId);
    const [timer3, setTimer3] = useNumberItemObserver(`tree_timer_3`, hookId);
    const [timer4, setTimer4] = useNumberItemObserver(`tree_timer_4`, hookId);
    const [timer5, setTimer5] = useNumberItemObserver(`tree_timer_5`, hookId);
    return [
      {
        stage: stage1,
        setStage: setStage1,
        type: type1,
        setType: setType1,
        timer: timer1,
        setTimer: setTimer1
      },
      {
        stage: stage2,
        setStage: setStage2,
        type: type2,
        setType: setType2,
        timer: timer2,
        setTimer: setTimer2
      },
      {
        stage: stage3,
        setStage: setStage3,
        type: type3,
        setType: setType3,
        timer: timer3,
        setTimer: setTimer3
      },
      {
        stage: stage4,
        setStage: setStage4,
        type: type4,
        setType: setType4,
        timer: timer4,
        setTimer: setTimer4
      },
      {
        stage: stage5,
        setStage: setStage5,
        type: type5,
        setType: setType5,
        timer: timer5,
        setTimer: setTimer5
      }
    ];
  };
  const id$3 = "WoodcuttingOverview";
  const WoodcuttingOverview = () => {
    useIPFDispatch();
    const patches = 3 + Math.sign(Number(Items.getItem("donor_tree_patches_timestamp"))) * 2;
    const patchData = useTreePatchesObserver(id$3);
    const finishedPatches = patchData.reduce((acc, cur) => acc + (cur.stage === 4 ? 1 : 0), 0);
    const plotClick = (index) => {
      const { stage, setType, setStage } = patchData[index];
      if (stage === 4) {
        console.log(finishedPatches);
        if (finishedPatches === 1) {
          hideElementById("notification-woodcutting");
        }
        Woodcutting.clicksPlot(index + 1);
        setType("none");
        setStage(0);
      }
    };
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        height: "250px",
        gap: "10px",
        alignItems: "center",
        alignContent: "center",
        border: "1px solid black",
        width: "550px",
        justifyContent: "center"
      }
    }, Array(patches).fill(null).map((v, i) => /* @__PURE__ */ React.createElement(WoodcuttingPatch, {
      type: patchData[i].type,
      stage: patchData[i].stage,
      timer: patchData[i].timer,
      plotClick: () => plotClick(i),
      key: i + 1
    })));
  };
  const OreDisplay = ({ ore, disabled, setSmelting }) => {
    const furnaceCapacity = Number(Furnace.getFurnaceCapacity());
    const [amount, setAmount] = useNumberItemObserver(ore, `OreDisplay-${ore}`);
    const [oil, setOil] = useNumberItemObserver("oil", `OreDisplay-${ore}`);
    const oilPerBar = Crafting.getOilPerBar(ore);
    const onClick = (event) => {
      const maxAmount = Math.floor(Math.min(oil / oilPerBar, amount));
      let making = Math.min(furnaceCapacity, maxAmount);
      if (event.ctrlKey) {
        making = Math.min(5, maxAmount);
      } else if (event.shiftKey) {
        making = Math.floor(making / 2);
      }
      if (making > 0) {
        setSmelting({
          type: ore,
          amountAt: 0,
          amountSet: making
        });
        setAmount(amount - making);
        updateTextContentById("notification-furnace-label", `0/${making}`);
        showElementById("notification-furnace");
        sendMessage("SMELT", ore, making);
      }
    };
    const unselectable = disabled || amount === 0 || oil < oilPerBar;
    const formattedAmount = amount < 1e3 ? `${amount}` : amount < 1e6 ? `${(amount / 1e3).toFixed(5 - Math.floor(Math.log10(amount)))}k` : `${(amount / 1e6).toFixed(8 - Math.floor(Math.log10(amount)))}m`;
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "50px",
        alignItems: "center"
      }
    }, /* @__PURE__ */ React.createElement(IPimg, {
      role: "button",
      name: ore,
      size: 30,
      style: unselectable ? {
        opacity: 0.5,
        cursor: "default"
      } : void 0,
      onClick: unselectable ? void 0 : onClick
    }), /* @__PURE__ */ React.createElement("span", null, formattedAmount));
  };
  const BarDisplay = ({ bar }) => {
    const [amount, setAmount] = useNumberItemObserver(bar, "BarDisplay");
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "50px",
        alignItems: "center"
      }
    }, /* @__PURE__ */ React.createElement(IPimg, {
      name: bar,
      size: 30
    }), /* @__PURE__ */ React.createElement("span", null, amount));
  };
  const ORES = ["copper", "iron", "silver", "gold", "promethium"];
  const BARS = [
    "bronze_bar",
    "iron_bar",
    "silver_bar",
    "gold_bar",
    "promethium_bar"
  ];
  const oreToBar = (ore) => ore === "copper" ? "bronze_bar" : `${ore}_bar`;
  const CraftingOverview = () => {
    useIPFDispatch();
    const furnace = Furnace.getFurnace();
    const [oreType, setOreType] = useItemObserver("furnace_ore_type", "CraftingOverview");
    const [oreAmountAt, setOreAmountAt] = useNumberItemObserver("furnace_ore_amount_at", "CraftingOverview");
    const [oreAmountSet, setOreAmountSet] = useNumberItemObserver("furnace_ore_amount_set", "CraftingOverview");
    const setSmelting = (smelting) => {
      setOreType(smelting.type);
      setOreAmountAt(smelting.amountAt);
      setOreAmountSet(smelting.amountSet);
    };
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        height: "250px",
        width: "300px",
        gap: "10px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid black"
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        gap: "10px"
      }
    }, BARS.map((bar) => /* @__PURE__ */ React.createElement(BarDisplay, {
      bar,
      key: bar
    }))), /* @__PURE__ */ React.createElement(IPimg, {
      name: furnace,
      size: 50
    }), /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        gap: "5px"
      }
    }, oreType !== "none" ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(IPimg, {
      name: oreToBar(oreType),
      size: 20,
      style: {}
    }), /* @__PURE__ */ React.createElement("span", null, `${oreAmountAt}/${oreAmountSet}`)) : /* @__PURE__ */ React.createElement("span", null, "Not smelting")), /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        gap: "10px"
      }
    }, ORES.map((ore) => /* @__PURE__ */ React.createElement(OreDisplay, {
      ore,
      disabled: oreType !== "none",
      setSmelting,
      key: ore
    }))));
  };
  const MachineDisplay = ({ machine, changeOilOut }) => {
    useIPFDispatch();
    const oilUse = Ores.getOilCost(machine);
    const [amount, setAmount] = useNumberItemObserver(machine, "MachineDisplay");
    const [amountOn, setAmountOn] = useNumberItemObserver(`${machine}_on`, "MachineDisplay");
    const onIncrease = () => {
      if (amountOn < amount) {
        sendMessage("MACHINERY", machine, "increase");
        setAmountOn(amountOn + 1);
        changeOilOut(oilUse);
      }
    };
    const onDecrease = () => {
      if (amountOn > 0) {
        sendMessage("MACHINERY", machine, "decrease");
        setAmountOn(amountOn - 1);
        changeOilOut(-oilUse);
      }
    };
    return amount > 0 ? /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "min-content",
        alignItems: "center"
      }
    }, /* @__PURE__ */ React.createElement(IPimg, {
      name: machine,
      size: 50,
      style: {}
    }), /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        gap: "5px",
        alignItems: "center"
      }
    }, /* @__PURE__ */ React.createElement(IPimg, {
      name: "oil",
      size: 20
    }), /* @__PURE__ */ React.createElement("span", null, `${oilUse * amountOn} (${oilUse})`)), /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        gap: "5px",
        width: "max-content"
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      role: "button",
      style: {
        fontWeight: "500",
        fontSize: "24px",
        visibility: amountOn > 0 ? "visible" : "hidden"
      },
      onClick: onDecrease
    }, "<"), /* @__PURE__ */ React.createElement("span", {
      style: { margin: "0 10px" }
    }, `${amountOn} / ${amount}`), /* @__PURE__ */ React.createElement("span", {
      role: "button",
      style: {
        fontWeight: "500",
        fontSize: "24px",
        visibility: amountOn < amount ? "visible" : "hidden"
      },
      onClick: onIncrease
    }, ">")))) : null;
  };
  const MACHINES = ["drill", "crusher", "giant_drill"];
  const MiningOverview = () => {
    useIPFDispatch();
    const [oilIn, setOilIn] = useNumberItemObserver("oil_in", "MiningOverview");
    const [oilOut, setOilOut] = React$1.useState(Items.getItem("oil_out"));
    const changeOilOut = (change) => setOilOut((oilOut2) => oilOut2 + change);
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        height: "250px",
        width: "300px",
        gap: "10px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid black"
      }
    }, /* @__PURE__ */ React.createElement(IPimg, {
      name: "oil",
      size: 50,
      style: {}
    }), /* @__PURE__ */ React.createElement("span", null, `+${oilIn} / -${oilOut}`), /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        width: "100%",
        justifyContent: "space-evenly"
      }
    }, MACHINES.map((machine) => /* @__PURE__ */ React.createElement(MachineDisplay, {
      machine,
      changeOilOut,
      key: machine
    }))));
  };
  const FarmingPatch = ({ seed, stage, timer, plotClick }) => {
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundImage: `url(${get_image("images/background_grass.png")}`,
        borderRadius: "20px",
        height: "120px",
        width: "100px"
      }
    }, seed !== "none" ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
      style: { height: "100px", width: "100px" }
    }, /* @__PURE__ */ React.createElement(IPimg, {
      role: "button",
      name: `farming_${seed}_${stage}`,
      onClick: plotClick,
      size: 100,
      style: { zIndex: 1, position: "absolute", objectFit: "unset" }
    }), /* @__PURE__ */ React.createElement(IPimg, {
      name: `farming_none`,
      size: 100,
      style: { position: "absolute", objectFit: "unset" }
    })), /* @__PURE__ */ React.createElement("span", {
      style: {
        color: "white"
      }
    }, stage === 4 ? "READY" : timer > 0 ? format_time(timer) : "")) : null);
  };
  const id$2 = "SeedDisplay";
  const SeedDisplay = ({ seed, seedClick, nextPlot }) => {
    const [amount, setAmount] = useNumberItemObserver(seed, id$2);
    const onClick = () => {
      if (nextPlot > 0 && amount > 0) {
        seedClick();
        setAmount(amount - 1);
      }
    };
    return amount > 0 ? /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        width: "50px",
        alignItems: "center",
        opacity: nextPlot > 0 ? 1 : 0.5,
        cursor: nextPlot > 0 ? "pointer" : "default"
      },
      role: "button"
    }, /* @__PURE__ */ React.createElement(IPimg, {
      name: seed,
      size: 30,
      onClick,
      title: Items.get_pretty_item_name(seed)
    }), /* @__PURE__ */ React.createElement("span", null, amount)) : null;
  };
  const useFarmPatchesObserver = (id2) => {
    const hookId = `useFarmPatchesObserver-${id2}`;
    const [stage1, setStage1] = useNumberItemObserver(`farm_stage_1`, hookId);
    const [stage2, setStage2] = useNumberItemObserver(`farm_stage_2`, hookId);
    const [stage3, setStage3] = useNumberItemObserver(`farm_stage_3`, hookId);
    const [stage4, setStage4] = useNumberItemObserver(`farm_stage_4`, hookId);
    const [stage5, setStage5] = useNumberItemObserver(`farm_stage_5`, hookId);
    const [seed1, setSeed1] = useItemObserver(`farm_1`, hookId);
    const [seed2, setSeed2] = useItemObserver(`farm_2`, hookId);
    const [seed3, setSeed3] = useItemObserver(`farm_3`, hookId);
    const [seed4, setSeed4] = useItemObserver(`farm_4`, hookId);
    const [seed5, setSeed5] = useItemObserver(`farm_5`, hookId);
    const [timer1, setTimer1] = useNumberItemObserver(`farm_timer_1`, hookId);
    const [timer2, setTimer2] = useNumberItemObserver(`farm_timer_2`, hookId);
    const [timer3, setTimer3] = useNumberItemObserver(`farm_timer_3`, hookId);
    const [timer4, setTimer4] = useNumberItemObserver(`farm_timer_4`, hookId);
    const [timer5, setTimer5] = useNumberItemObserver(`farm_timer_5`, hookId);
    return [
      {
        stage: stage1,
        setStage: setStage1,
        seed: seed1,
        setSeed: setSeed1,
        timer: timer1,
        setTimer: setTimer1
      },
      {
        stage: stage2,
        setStage: setStage2,
        seed: seed2,
        setSeed: setSeed2,
        timer: timer2,
        setTimer: setTimer2
      },
      {
        stage: stage3,
        setStage: setStage3,
        seed: seed3,
        setSeed: setSeed3,
        timer: timer3,
        setTimer: setTimer3
      },
      {
        stage: stage4,
        setStage: setStage4,
        seed: seed4,
        setSeed: setSeed4,
        timer: timer4,
        setTimer: setTimer4
      },
      {
        stage: stage5,
        setStage: setStage5,
        seed: seed5,
        setSeed: setSeed5,
        timer: timer5,
        setTimer: setTimer5
      }
    ];
  };
  const SEEDS = {
    dotted_green_leaf_seeds: {
      id: "dotted_green_leaf_seeds",
      level: 1,
      stopsDying: 15,
      time: 15,
      bonemealCost: 0
    },
    stardust_seeds: {
      id: "stardust_seeds",
      level: 8,
      stopsDying: 0,
      time: 20,
      bonemealCost: 0
    },
    green_leaf_seeds: {
      id: "green_leaf_seeds",
      level: 10,
      stopsDying: 25,
      time: 30,
      bonemealCost: 0
    },
    lime_leaf_seeds: {
      id: "lime_leaf_seeds",
      level: 25,
      stopsDying: 40,
      time: 60,
      bonemealCost: 1
    },
    gold_leaf_seeds: {
      id: "gold_leaf_seeds",
      level: 50,
      stopsDying: 60,
      time: 2 * 60,
      bonemealCost: 10
    },
    crystal_leaf_seeds: {
      id: "crystal_leaf_seeds",
      level: 70,
      stopsDying: 80,
      time: 5 * 60,
      bonemealCost: 25
    },
    red_mushroom_seeds: {
      id: "red_mushroom_seeds",
      level: 1,
      stopsDying: 0,
      time: 5,
      bonemealCost: 0
    },
    tree_seeds: {
      id: "tree_seeds",
      level: 10,
      stopsDying: 25,
      time: 5 * 60,
      bonemealCost: 10
    },
    oak_tree_seeds: {
      id: "oak_tree_seeds",
      level: 25,
      stopsDying: 40,
      time: 4 * 60,
      bonemealCost: 25
    },
    willow_tree_seeds: {
      id: "willow_tree_seeds",
      level: 37,
      stopsDying: 55,
      time: 8 * 60,
      bonemealCost: 50
    },
    maple_tree_seeds: {
      id: "maple_tree_seeds",
      level: 50,
      stopsDying: 65,
      time: 12 * 60,
      bonemealCost: 120
    },
    stardust_tree_seeds: {
      id: "stardust_tree_seeds",
      level: 65,
      stopsDying: 80,
      time: 15 * 60,
      bonemealCost: 150
    },
    pine_tree_seeds: {
      id: "pine_tree_seeds",
      level: 70,
      stopsDying: 85,
      time: 17 * 60,
      bonemealCost: 180
    }
  };
  const id$1 = "FarmingOverview";
  const FarmingOverview = () => {
    useIPFDispatch();
    const seeds = Object.keys(SEEDS);
    const patches = 3 + Math.sign(Number(Items.getItem("donor_farm_patches_timestamp"))) * 2;
    const patchData = useFarmPatchesObserver(id$1);
    const nextPlot = patchData.map((patch) => patch.stage).findIndex((value, index) => value === 0 && index < patches) + 1;
    const finishedPatches = patchData.reduce((acc, cur) => acc + (cur.stage === 4 ? 1 : 0), 0);
    const seedClick = (seed) => {
      sendMessage("PLANT", seed, nextPlot);
      console.log("planting in", nextPlot);
      patchData[nextPlot - 1].setSeed(seed);
      patchData[nextPlot - 1].setStage(1);
      patchData[nextPlot - 1].setTimer(SEEDS[seed].time * 60);
    };
    const plotClick = (index) => {
      const { stage, setStage, setSeed } = patchData[index];
      if (stage === 4) {
        console.log(finishedPatches);
        if (finishedPatches === 1) {
          hideElementById("notification-farming");
        }
        sendMessage("CLICKS_PLOT", index + 1);
        setSeed("none");
        setStage(0);
      }
    };
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        height: "250px",
        gap: "5px",
        border: "1px solid black",
        width: "550px",
        flexDirection: "column",
        justifyContent: "space-between"
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap"
      }
    }, seeds.map((seed) => /* @__PURE__ */ React.createElement(SeedDisplay, {
      seed,
      seedClick: () => seedClick(seed),
      nextPlot,
      key: seed
    }))), /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        gap: "10px"
      }
    }, Array(patches).fill(null).map((v, i) => /* @__PURE__ */ React.createElement(FarmingPatch, {
      seed: patchData[i].seed,
      stage: patchData[i].stage,
      timer: patchData[i].timer,
      plotClick: () => plotClick(i),
      key: i + 1
    }))));
  };
  const GatheringBagDisplay = ({ area }) => {
    const itemName = `gathering_loot_bag_${area}`;
    const [amount, setAmount] = useNumberItemObserver(itemName, `GatheringBagDisplay-${area}`);
    const onClick = (event) => {
      let making = amount;
      if (event.ctrlKey) {
        making = Math.min(5, making);
      } else if (event.shiftKey) {
        making = Math.floor(making / 2);
      }
      if (making > 0) {
        setAmount(amount - making);
        sendMessage("OPEN_GATHERING_LOOT", area, making);
      }
    };
    const unselectable = amount <= 0;
    const formattedAmount = amount < 1e3 ? `${amount}` : amount < 1e6 ? `${(amount / 1e3).toFixed(5 - Math.floor(Math.log10(amount)))}k` : `${(amount / 1e6).toFixed(8 - Math.floor(Math.log10(amount)))}m`;
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "50px",
        alignItems: "center"
      }
    }, /* @__PURE__ */ React.createElement(IPimg, {
      role: "button",
      name: itemName,
      size: 30,
      style: unselectable ? {
        opacity: 0.5,
        cursor: "default"
      } : void 0,
      onClick: unselectable ? void 0 : onClick,
      title: Items.get_pretty_item_name(itemName)
    }), /* @__PURE__ */ React.createElement("span", null, formattedAmount));
  };
  const AREAS = {
    mines: {
      image: "mine"
    },
    fields: {
      image: "field"
    },
    forest: {
      image: "forest"
    },
    fishing_pond: {
      image: "fishing_pond"
    },
    kitchen: {
      image: "kitchen"
    },
    gem_mine: {
      image: "gem_mine"
    }
  };
  const id = "GatheringOverview";
  const GatheringOverview = () => {
    const areas = Object.keys(AREAS);
    useItemObserver("current_gathering_area", id);
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        height: "250px",
        width: "300px",
        gap: "10px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid black"
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        width: "100%",
        justifyContent: "space-evenly"
      }
    }, areas.map((area) => /* @__PURE__ */ React.createElement(GatheringBagDisplay, {
      area,
      key: area
    }))));
  };
  const OverviewPanel = ({}) => {
    const dispatch = useIPFDispatch();
    const overviewIsOpen = useIPFSelector(selectOverviewIsOpen);
    useSetItemsObserver();
    const oldSwitchPanels = React$1.useRef(switch_panels);
    React$1.useEffect(() => {
      switch_panels = (id2) => {
        dispatch(closeOverview());
        oldSwitchPanels.current(id2);
      };
    }, []);
    const [list, _] = useLocalStorage("activity-log", [], "OverviewPanel");
    return overviewIsOpen ? /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        gap: "15px",
        justifyContent: "space-around"
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        width: "75%"
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        gap: "15px",
        justifyContent: "space-around"
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        alignItems: "center",
        width: "50%"
      }
    }, /* @__PURE__ */ React.createElement(WoodcuttingOverview, null), /* @__PURE__ */ React.createElement(FarmingOverview, null)), /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        alignItems: "center",
        width: "50%%"
      }
    }, /* @__PURE__ */ React.createElement(BrewingOverview, null), /* @__PURE__ */ React.createElement(GatheringOverview, null)), /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        alignItems: "center",
        width: "50%%"
      }
    }, /* @__PURE__ */ React.createElement(CraftingOverview, null), /* @__PURE__ */ React.createElement(MiningOverview, null)))), /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        alignItems: "center",
        width: "25%",
        fontSize: "8px",
        overflowY: "auto",
        overflowX: "hidden",
        height: "calc(100vh - 200px)",
        border: "1px solid grey",
        borderRadius: "10px"
      }
    }, list.slice(0, 10).map((item) => /* @__PURE__ */ React.createElement(ActivityLogEntry, {
      item
    })))) : null;
  };
  const init = () => {
    appendReact(/* @__PURE__ */ React.createElement(IPFMenuBar, null), "menu-bar-buttons");
    appendReact(/* @__PURE__ */ React.createElement(ActivityLog, null), "content");
    appendReact(/* @__PURE__ */ React.createElement(OverviewButton, null), "menu-bar-buttons", "menu-bar-keyitems");
    appendReact(/* @__PURE__ */ React.createElement(OverviewPanel, null), "panels", "panel-keyitems");
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
