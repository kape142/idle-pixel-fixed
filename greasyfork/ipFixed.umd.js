// ==UserScript==
// @name         Idle Pixel Fixed
// @namespace    com.kape142.idlepixelfixed
// @version      0.2
// @description  Extension to improve the experience of Idle Pixel
// @author       kape142
// @match        https://idle-pixel.com/login/play/*
// @grant        none
// @require      https://unpkg.com/react@17/umd/react.production.min.js
// @require      https://unpkg.com/react-dom@17/umd/react-dom.production.min.js
// @require      https://unpkg.com/@reduxjs/toolkit@1.8.5/dist/redux-toolkit.umd.min.js
// @require      https://unpkg.com/react-redux@8.0.2/dist/react-redux.js

// ==/UserScript==

(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(require("react"), require("@reduxjs/toolkit"), require("react-redux"), require("react-dom")) : typeof define === "function" && define.amd ? define(["react", "@reduxjs/toolkit", "react-redux", "react-dom"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.React, global.RTK, global.ReactRedux, global.ReactDOM));
})(this, function(React$1, toolkit, reactRedux, ReactDOM) {
  "use strict";
  function _interopDefaultLegacy(e) {
    return e && typeof e === "object" && "default" in e ? e : { "default": e };
  }
  var React__default = /* @__PURE__ */ _interopDefaultLegacy(React$1);
  var ReactDOM__default = /* @__PURE__ */ _interopDefaultLegacy(ReactDOM);
  const initialState$1 = {
    isOpen: false
  };
  const activityLogSlice = toolkit.createSlice({
    name: "Activity Log",
    initialState: initialState$1,
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
    React$1.useState(0);
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
  const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = React$1.useState(() => {
      const prevSaved = window.localStorage.getItem(key);
      return prevSaved ? JSON.parse(prevSaved) : initialValue;
    });
    React$1.useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
  };
  const LootEntry = ({ content }) => {
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, content.title), content.items.map((item) => /* @__PURE__ */ React.createElement("div", null, item.label)));
  };
  const ActivityLogEntry = ({ item }) => {
    switch (item.type) {
      case "loot":
        return /* @__PURE__ */ React.createElement(LootEntry, {
          content: item.content
        });
      default:
        return null;
    }
  };
  const ActivityLog = ({}) => {
    const [list, setList] = useLocalStorage("activity-log", []);
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
        padding: "20px"
      }
    }, /* @__PURE__ */ React.createElement("h2", {
      className: "color-grey"
    }, "Activity log"), list.map((item) => /* @__PURE__ */ React.createElement(ActivityLogEntry, {
      item
    })), /* @__PURE__ */ React.createElement("button", {
      type: "button",
      onClick: () => dispatch(closeActivityLog())
    }, "Close")));
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
    reducer: { test: testReducer, activityLog: activityLogReducer }
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
  appendReact(/* @__PURE__ */ React.createElement(IPFMenuBar, null), "menu-bar-buttons");
  appendReact(/* @__PURE__ */ React.createElement(ActivityLog, null), "content");
});
