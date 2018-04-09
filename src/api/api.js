import {httpPost,httpGet} from "../config";

//获取科室图标  Department0:三个图标   Department1:全部图标
export const Department0 = httpGet('/Department/0')
export const Department1 = httpGet('/Department/1')