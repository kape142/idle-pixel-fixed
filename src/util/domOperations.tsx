import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { makeId } from "./stringUtils";
import { store } from "../redux/store";

export const hideElementById = (id: string) => {
  const el = document.getElementById(id);
  if (el && el.style) {
    el.style.display = "none";
  }
};

export const showElementById = (id: string) => {
  const el = document.getElementById(id);
  if (el && el.style) {
    el.style.display = "";
  }
};

export const updateTextContentById = (id: string, textContent: string) => {
  const el = document.getElementById(id);
  if(el){
    el.textContent = textContent
  }
}

export const updateTimer = (selector: string, time: number) => {
  const id = `notification-${selector}`;
  const element = document.getElementById(id);
  if (element) {
    const displays = element.getElementsByTagName("item-display");
    if (displays[0]) {
      displays[0].textContent = format_time(time);
    }
    showElementById(id);
  }
};

export const appendReact = (
  component: React.ReactElement,
  id: string,
  insertBeforeId?: string
) => {
  const parent = document.getElementById(id);
  if (!parent) return;

  const reactRoot = document.createElement("div");
  const reactRootId = `${id}-react-child-${makeId(8)}`;
  reactRoot.id = reactRootId;
  if (insertBeforeId) {
    const insertBeforeElement = document.getElementById(insertBeforeId);
    if (insertBeforeElement) {
      parent.insertBefore(reactRoot, insertBeforeElement);
    } else {
      console.warn(
        `trying to insert before id ${insertBeforeId} but no element with that id was found`
      );
    }
  } else {
    parent.appendChild(reactRoot);
  }

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>{component}</Provider>
    </React.StrictMode>,
    document.getElementById(reactRootId)
  );
};
