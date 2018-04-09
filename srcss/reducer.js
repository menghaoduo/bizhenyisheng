//合并所有reducer，并返回
import {combineReducers} from 'redux'
import { user } from "./redux/user.redux";
import { help } from "./redux/user.help.redux";
import { select } from "./redux/user.select.redux";

export default combineReducers({ user,help,select})
