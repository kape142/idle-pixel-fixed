import React from "react";
import ReactDOM from 'react-dom'
import { makeId } from "./stringUtils";

export const hideElementById = (id: string) => {
    const el = document.getElementById(id)
    if(el && el.style){
        el.style.display = "none";
    }
}

export const showElementById = (id: string) => {
    const el = document.getElementById(id)
    if(el && el.style){
        el.style.display = "";
    }
}

export const appendReact = (component: React.ReactElement, id: string, insertBeforeId?: string) => {
    const parent = document.getElementById(id)
    if(!parent) return;

    const reactRoot = document.createElement("div")
    const reactRootId = `${id}-react-child-${makeId(8)}`;
    reactRoot.id = reactRootId
    if(insertBeforeId){
        const insertBeforeElement = document.getElementById(insertBeforeId)
        if(insertBeforeElement){
            parent.insertBefore(insertBeforeElement, reactRoot)
        }else{
            console.warn(`trying to insert before id ${insertBeforeId} but no element with that id was found`)
        }
    } else {
        parent.appendChild(reactRoot)
    }
    
    ReactDOM.render(
        <React.StrictMode>
          {component}
        </React.StrictMode>,
        document.getElementById(reactRootId)
      )
}