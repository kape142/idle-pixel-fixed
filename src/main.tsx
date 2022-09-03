import IPFMenuBar from './IPFMenuBar'
import ActivityLog from "./activitylog/ActivityLog";
import { appendReact } from './util/domOperations'

appendReact(<IPFMenuBar />, "menu-bar-buttons")
appendReact(<ActivityLog />, "content")

