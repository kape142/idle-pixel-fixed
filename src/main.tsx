import IPFMenuBar from './IPFMenuBar'
import ActivityLog from "./activitylog/ActivityLog";
import { appendReact, hideElementById, showElementById } from './util/domOperations'
import { useState } from 'react';



let [activityLogOpen, setActivityLogOpen] = useState(false);
const openActivityLog = () => setActivityLogOpen(true)
const closeActivityLog = () => setActivityLogOpen(false)
appendReact(<IPFMenuBar openActivityLog={openActivityLog}/>, "menu-bar-buttons")
appendReact(<ActivityLog open={activityLogOpen} closeActivityLog={closeActivityLog} />, "content")

