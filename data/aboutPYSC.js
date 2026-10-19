import {teammateName} from './team.js';
export const aboutPYSC = [
  {
    name: "Founded",
    value: "Aug 23, 2025",
    icon: "fa fa-flag"
  },
  {
    name: "Type",
    value: "Independent Storm Chaser",
    icon: "fa fa-bolt"
  },
  {
    name: "Members",
    value: teammateName.filter(t => !t.includes("Marco")).length,
    icon: "fa fa-user-group"
  }
]
