import React from 'react'
import {Menu,NavBar,Icon,ActivityIndicator} from 'antd-mobile'
import './city.select.css'
import { connect } from 'react-redux'
@connect(
    state=>state.select
)
class CitySelect extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            initData: '',
            show: false,
            data: [
                {
                    "value": "1",
                    "label": "北京",
                    "children": [
                        {"label":"东城区","value": "1"},
                        {"label":"西城区","value": "2"},
                        {"label":"崇文区","value": "3"},
                        {"label":"宣武区","value": "4"},
                        {"label":"朝阳区","value": "5"},
                        {"label":"丰台区","value": "6"},
                        {"label":"石景山区","value": "7"},
                        {"label":"海淀区","value": "8"},
                        {"label":"门头沟区","value": "9"},
                        {"label":"房山区","value": "10"},
                        {"label":"通州区","value": "11"},
                        {"label":"顺义区","value": "12"},
                        {"label":"昌平区","value": "13"},
                        {"label":"大兴区","value": "14"},
                        {"label":"平谷区","value": "15"},
                        {"label":"怀柔区","value": "16"},
                        {"label":"密云县","value": "17"},
                        {"label":"延庆县","value": "18"}
                    ]
                },
                {
                    "value": "2",
                    "label": "天津",
                    "children": [
                        {"label":"和平区","value": "1"},
                        {"label":"河东区","value": "2"},
                        {"label":"河西区","value": "3"},
                        {"label":"南开区","value": "4"},
                        {"label":"河北区","value": "5"},
                        {"label":"红桥区","value": "6"},
                        {"label":"塘沽区","value": "7"},
                        {"label":"汉沽区","value": "8"},
                        {"label":"大港区","value": "9"},
                        {"label":"东丽区","value": "10"},
                        {"label":"西青区","value": "11"},
                        {"label":"津南区","value": "12"},
                        {"label":"北辰区","value": "13"},
                        {"label":"武清区","value": "14"},
                        {"label":"宝坻区","value": "15"},
                        {"label":"宁河县","value": "16"},
                        {"label":"静海县","value": "17"},
                        {"label":"蓟县","value": "18"}
                    ]
                },
                {
                    "value": "3",
                    "label": "河北",
                    "children": [
                        {"label": "石家庄","value": "1"},
                        {"label": "唐山","value": "2"},
                        {"label": "秦皇岛","value": "3"},
                        {"label": "邯郸","value": "4"},
                        {"label": "邢台","value": "5"},
                        {"label": "保定","value": "6"},
                        {"label": "张家口","value": "7"},
                        {"label": "承德","value": "8"},
                        {"label": "沧州","value": "9"},
                        {"label": "廊坊","value": "10"},
                        {"label": "衡水","value": "11"}
                    ]
                },
                {
                    "value": "4",
                    "label": "山西",
                    "children": [
                        {"label": "太原","value": "1"},
                        {"label": "大同","value": "2"},
                        {"label": "阳泉","value": "3"},
                        {"label": "长治","value": "4"},
                        {"label": "晋城","value": "5"},
                        {"label": "朔州","value": "6"},
                        {"label": "忻州","value": "7"},
                        {"label": "吕梁","value": "8"},
                        {"label": "晋中","value": "9"},
                        {"label": "临汾","value": "10"},
                        {"label": "运城","value": "11"}
                    ]
                },
                {
                    "value": "5",
                    "label": "内蒙古",
                    "children": [
                        {"label": "呼和浩特","value": "1"},
                        {"label": "包头","value": "2"},
                        {"label": "乌海","value": "3"},
                        {"label": "赤峰","value": "4"},
                        {"label": "呼伦贝尔","value": "5"},
                        {"label": "兴安盟","value": "6"},
                        {"label": "通辽","value": "7"},
                        {"label": "锡林郭勒盟","value": "8"},
                        {"label": "乌兰察布盟","value": "9"},
                        {"label": "伊克昭盟","value": "10"},
                        {"label": "巴彦淖尔盟","value": "11"},
                        {"label": "阿拉善盟","value": "12"}
                    ]
                },
                {
                    "value": "6",
                    "label": "辽宁",
                    "children": [
                        {"label": "沈阳","value": "1"},
                        {"label": "大连","value": "2"},
                        {"label": "鞍山","value": "3"},
                        {"label": "抚顺","value": "4"},
                        {"label": "本溪","value": "5"},
                        {"label": "丹东","value": "6"},
                        {"label": "锦州","value": "7"},
                        {"label": "营口","value": "8"},
                        {"label": "阜新","value": "9"},
                        {"label": "辽阳","value": "10"},
                        {"label": "盘锦","value": "11"},
                        {"label": "铁岭","value": "12"},
                        {"label": "朝阳","value": "13"},
                        {"label": "葫芦岛","value": "14"}
                    ]
                },
                {
                    "value": "7",
                    "label": "吉林",
                    "children": [
                        {"label": "长春","value": "1"},
                        {"label": "吉林","value": "2"},
                        {"label": "四平","value": "3"},
                        {"label": "辽源","value": "4"},
                        {"label": "通化","value": "5"},
                        {"label": "白山","value": "6"},
                        {"label": "松原","value": "7"},
                        {"label": "白城","value": "8"},
                        {"label": "延边朝鲜族自治州","value": "9"}
                    ]
                },
                {
                    "value": "8",
                    "label": "黑龙江",
                    "children": [
                        {"label": "哈尔滨","value": "1"},
                        {"label": "齐齐哈尔","value": "2"},
                        {"label": "鹤岗","value": "3"},
                        {"label": "双鸭山","value": "4"},
                        {"label": "鸡西","value": "5"},
                        {"label": "大庆","value": "6"},
                        {"label": "伊春","value": "7"},
                        {"label": "牡丹江","value": "8"},
                        {"label": "佳木斯","value": "9"},
                        {"label": "七台河","value": "10"},
                        {"label": "黑河","value": "11"},
                        {"label": "绥化","value": "12"},
                        {"label": "大兴安岭地区","value": "13"}
                    ]
                },
                {
                    "value": "9",
                    "label": "上海",
                    "children": [
                        {"label":"黄浦区","value": "1"},
                        {"label":"卢湾区","value": "2"},
                        {"label":"徐汇区","value": "3"},
                        {"label":"长宁区","value": "4"},
                        {"label":"静安区","value": "5"},
                        {"label":"普陀区","value": "6"},
                        {"label":"闸北区","value": "7"},
                        {"label":"虹口区","value": "8"},
                        {"label":"杨浦区","value": "9"},
                        {"label":"宝山区","value": "10"},
                        {"label":"闵行区","value": "11"},
                        {"label":"嘉定区","value": "12"},
                        {"label":"松江区","value": "13"},
                        {"label":"金山区","value": "14"},
                        {"label":"青浦区","value": "15"},
                        {"label":"南汇区","value": "16"},
                        {"label":"奉贤区","value": "17"},
                        {"label":"浦东新区","value": "18"},
                        {"label":"崇明县","value": "19"}
                    ]
                },
                {
                    "value": "10",
                    "label": "江苏",
                    "children": [
                        {"label": "南京","value": "1"},
                        {"label": "苏州","value": "2"},
                        {"label": "无锡","value": "3"},
                        {"label": "常州","value": "4"},
                        {"label": "镇江","value": "5"},
                        {"label": "南通","value": "6"},
                        {"label": "泰州","value": "7"},
                        {"label": "扬州","value": "8"},
                        {"label": "盐城","value": "9"},
                        {"label": "连云港","value": "10"},
                        {"label": "徐州","value": "11"},
                        {"label": "淮安","value": "12"},
                        {"label": "宿迁","value": "13"}
                    ]
                },
                {
                    "value": "11",
                    "label": "浙江",
                    "children": [
                        {"label": "杭州","value": "1"},
                        {"label": "宁波","value": "2"},
                        {"label": "温州","value": "3"},
                        {"label": "嘉兴","value": "4"},
                        {"label": "湖州","value": "5"},
                        {"label": "绍兴","value": "6"},
                        {"label": "金华","value": "7"},
                        {"label": "衢州","value": "8"},
                        {"label": "舟山","value": "9"},
                        {"label": "台州","value": "10"},
                        {"label": "丽水","value": "11"}
                    ]
                },
                {
                    "value": "12",
                    "label": "安徽",
                    "children": [
                        {"label": "合肥","value": "1"},
                        {"label": "芜湖","value": "2"},
                        {"label": "蚌埠","value": "3"},
                        {"label": "淮南","value": "4"},
                        {"label": "马鞍山","value": "5"},
                        {"label": "淮北","value": "6"},
                        {"label": "铜陵","value": "7"},
                        {"label": "安庆","value": "8"},
                        {"label": "黄山","value": "9"},
                        {"label": "滁州","value": "10"},
                        {"label": "阜阳","value": "11"},
                        {"label": "宿州","value": "12"},
                        {"label": "巢湖","value": "13"},
                        {"label": "六安","value": "14"},
                        {"label": "亳州","value": "15"},
                        {"label": "池州","value": "16"},
                        {"label": "宣城","value": "17"}
                    ]
                },
                {
                    "value": "13",
                    "label": "福建",
                    "children": [
                        {"label": "福州","value": "1"},
                        {"label": "厦门","value": "2"},
                        {"label": "莆田","value": "3"},
                        {"label": "三明","value": "4"},
                        {"label": "泉州","value": "5"},
                        {"label": "漳州","value": "6"},
                        {"label": "南平","value": "7"},
                        {"label": "龙岩","value": "8"},
                        {"label": "宁德","value": "9"}
                    ]
                },
                {
                    "value": "14",
                    "label": "江西",
                    "children": [
                        {"label": "南昌","value": "1"},
                        {"label": "景德镇","value": "2"},
                        {"label": "萍乡","value": "3"},
                        {"label": "九江","value": "4"},
                        {"label": "新余","value": "5"},
                        {"label": "鹰潭","value": "6"},
                        {"label": "赣州","value": "7"},
                        {"label": "吉安","value": "8"},
                        {"label": "宜春","value": "9"},
                        {"label": "抚州","value": "10"},
                        {"label": "上饶","value": "11"}
                    ]
                },
                {
                    "value": "15",
                    "label": "山东",
                    "children": [
                        {"label": "济南","value": "1"},
                        {"label": "青岛","value": "2"},
                        {"label": "淄博","value": "3"},
                        {"label": "枣庄","value": "4"},
                        {"label": "东营","value": "5"},
                        {"label": "烟台","value": "6"},
                        {"label": "潍坊","value": "7"},
                        {"label": "济宁","value": "8"},
                        {"label": "泰安","value": "9"},
                        {"label": "威海","value": "10"},
                        {"label": "日照","value": "11"},
                        {"label": "莱芜","value": "12"},
                        {"label": "临沂","value": "13"},
                        {"label": "德州","value": "14"},
                        {"label": "聊城","value": "15"},
                        {"label": "滨州","value": "16"},
                        {"label": "菏泽","value": "17"}
                    ]
                },
                {
                    "value": "16",
                    "label": "河南",
                    "children": [
                        {"label": "郑州","value": "1"},
                        {"label": "开封","value": "2"},
                        {"label": "洛阳","value": "3"},
                        {"label": "平顶山","value": "4"},
                        {"label": "安阳","value": "5"},
                        {"label": "鹤壁","value": "6"},
                        {"label": "新乡","value": "7"},
                        {"label": "焦作","value": "8"},
                        {"label": "濮阳","value": "9"},
                        {"label": "许昌","value": "10"},
                        {"label": "漯河","value": "11"},
                        {"label": "三门峡","value": "12"},
                        {"label": "南阳","value": "13"},
                        {"label": "商丘","value": "14"},
                        {"label": "信阳","value": "15"},
                        {"label": "周口","value": "16"},
                        {"label": "驻马店","value": "17"},
                        {"label": "焦作","value": "18"}
                    ]
                },
                {
                    "value": "17",
                    "label": "湖北",
                    "children": [
                        {"label": "武汉","value": "1"},
                        {"label": "黄石","value": "2"},
                        {"label": "十堰","value": "3"},
                        {"label": "荆州","value": "4"},
                        {"label": "宜昌","value": "5"},
                        {"label": "襄樊","value": "6"},
                        {"label": "鄂州","value": "7"},
                        {"label": "荆门","value": "8"},
                        {"label": "孝感","value": "9"},
                        {"label": "黄冈","value": "10"},
                        {"label": "咸宁","value": "11"},
                        {"label": "随州","value": "12"},
                        {"label": "恩施土家族苗族自治州","value": "13"},
                        {"label": "仙桃","value": "14"},
                        {"label": "天门","value": "15"},
                        {"label": "潜江","value": "16"},
                        {"label": "神农架林区","value": "17"}
                    ]
                },
                {
                    "value": "18",
                    "label": "湖南",
                    "children": [
                        {"label": "长沙","value": "1"},
                        {"label": "株洲","value": "2"},
                        {"label": "湘潭","value": "3"},
                        {"label": "衡阳","value": "4"},
                        {"label": "邵阳","value": "5"},
                        {"label": "岳阳","value": "6"},
                        {"label": "常德","value": "7"},
                        {"label": "张家界","value": "8"},
                        {"label": "益阳","value": "9"},
                        {"label": "郴州","value": "10"},
                        {"label": "永州","value": "11"},
                        {"label": "怀化","value": "12"},
                        {"label": "娄底","value": "13"},
                        {"label": "湘西土家族苗族自治州","value": "14"}
                    ]
                },
                {
                    "value": "19",
                    "label": "广东",
                    "children": [
                        {"label": "广州","value": "1"},
                        {"label": "深圳","value": "2"},
                        {"label": "东莞","value": "3"},
                        {"label": "中山","value": "4"},
                        {"label": "潮州","value": "5"},
                        {"label": "揭阳","value": "6"},
                        {"label": "云浮","value": "7"},
                        {"label": "珠海","value": "8"},
                        {"label": "汕头","value": "9"},
                        {"label": "韶关","value": "10"},
                        {"label": "佛山","value": "11"},
                        {"label": "江门","value": "12"},
                        {"label": "湛江","value": "13"},
                        {"label": "茂名","value": "14"},
                        {"label": "肇庆","value": "15"},
                        {"label": "惠州","value": "16"},
                        {"label": "梅州","value": "17"},
                        {"label": "汕尾","value": "18"},
                        {"label": "河源","value": "19"},
                        {"label": "阳江","value": "20"},
                        {"label": "清远","value": "21"}
                    ]
                },
                {
                    "value": "20",
                    "label": "广西",
                    "children": [
                        {"label": "南宁","value": "1"},
                        {"label": "柳州","value": "2"},
                        {"label": "桂林","value": "3"},
                        {"label": "梧州","value": "4"},
                        {"label": "北海","value": "5"},
                        {"label": "防城港","value": "6"},
                        {"label": "钦州","value": "7"},
                        {"label": "贵港","value": "8"},
                        {"label": "玉林","value": "9"},
                        {"label": "百色","value": "10"},
                        {"label": "贺州","value": "11"},
                        {"label": "河池","value": "12"},
                        {"label": "来宾","value": "13"},
                        {"label": "崇左","value": "14"}
                    ]
                },
                {
                    "value": "21",
                    "label": "海南",
                    "children": [
                        {"label": "海口","value": "1"},
                        {"label": "三亚","value": "2"},
                        {"label": "五指山","value": "3"},
                        {"label": "琼海","value": "4"},
                        {"label": "儋州","value": "5"},
                        {"label": "文昌","value": "6"},
                        {"label": "万宁","value": "7"},
                        {"label": "东方","value": "8"},
                        {"label": "澄迈县","value": "9"},
                        {"label": "定安县","value": "10"},
                        {"label": "屯昌县","value": "11"},
                        {"label": "临高县","value": "12"},
                        {"label": "白沙黎族自治县","value": "13"},
                        {"label": "昌江黎族自治县","value": "14"},
                        {"label": "乐东黎族自治县","value": "15"},
                        {"label": "陵水黎族自治县","value": "16"},
                        {"label": "保亭黎族苗族自治县","value": "17"},
                        {"label": "琼中黎族苗族自治县","value": "18"}
                    ]
                },
                {
                    "value": "22",
                    "label": "重庆",
                    "children": [
                        {"label":"渝中区","value": "1"},
                        {"label":"大渡口区","value": "2"},
                        {"label":"江北区","value": "3"},
                        {"label":"南岸区","value": "4"},
                        {"label":"北碚区","value": "5,"},
                        {"label":"渝北区","value": "6"},
                        {"label":"巴南区","value": "7"},
                        {"label":"长寿区","value": "8"},
                        {"label":"双桥区","value": "9"},
                        {"label":"沙坪坝区","value": "10"},
                        {"label":"万盛区","value": "11"},
                        {"label":"万州区","value": "12"},
                        {"label":"涪陵区","value": "13"},
                        {"label":"黔江区","value": "14"},
                        {"label":"永川区","value": "15"},
                        {"label":"合川区","value": "16"},
                        {"label":"江津区","value": "17"},
                        {"label":"九龙坡区","value": "18"},
                        {"label":"南川区","value": "19"},
                        {"label":"綦江县","value": "20"},
                        {"label":"潼南县","value": "21"},
                        {"label":"荣昌县","value": "22"},
                        {"label":"璧山县","value": "23"},
                        {"label":"大足县","value": "24"},
                        {"label":"铜梁县","value": "25"},
                        {"label":"梁平县","value": "26"},
                        {"label":"开县","value": "27"},
                        {"label":"忠县","value": "28"},
                        {"label":"城口县","value": "29"},
                        {"label":"垫江县","value": "30"},
                        {"label":"武隆县","value": "31"},
                        {"label":"丰都县","value": "33"},
                        {"label":"奉节县","value": "34"},
                        {"label":"云阳县","value": "35"},
                        {"label":"巫溪县","value": "36"},
                        {"label":"巫山县","value": "37"},
                        {"label":"石柱土家族自治县","value": "38"},
                        {"label":"秀山土家族苗族自治县","value": "39"},
                        {"label":"酉阳土家族苗族自治县","value": "40"},
                        {"label":"彭水苗族土家族自治县","value": "41"}
                    ]
                },
                {
                    "value": "23",
                    "label": "四川",
                    "children": [
                        {"label": "成都","value": "1"},
                        {"label": "自贡","value": "2"},
                        {"label": "攀枝花","value": "3"},
                        {"label": "泸州","value": "4"},
                        {"label": "德阳","value": "5"},
                        {"label": "绵阳","value": "6"},
                        {"label": "广元","value": "7"},
                        {"label": "遂宁","value": "8"},
                        {"label": "内江","value": "9"},
                        {"label": "乐山","value": "10"},
                        {"label": "南充","value": "11"},
                        {"label": "眉山","value": "12"},
                        {"label": "宜宾","value": "13"},
                        {"label": "广安","value": "14"},
                        {"label": "达州","value": "15"},
                        {"label": "雅安","value": "16"},
                        {"label": "巴中","value": "17"},
                        {"label": "资阳","value": "18"},
                        {"label": "阿坝藏族羌族自治州","value": "19"},
                        {"label": "甘孜藏族自治州","value": "20"},
                        {"label": "凉山彝族自治州","value": "21"}
                    ]
                },
                {
                    "value": "24",
                    "label": "贵州",
                    "children": [
                        {"label": "贵阳","value": "1"},
                        {"label": "六盘水","value": "2"},
                        {"label": "遵义","value": "3"},
                        {"label": "安顺","value": "4"},
                        {"label": "铜仁地区","value": "5"},
                        {"label": "毕节地区","value": "6"},
                        {"label": "黔西南布依族苗族自治州","value": "7"},
                        {"label": "黔东南苗族侗族自治州","value": "8"},
                        {"label": "黔南布依族苗族自治州","value": "9"}
                    ]
                },
                {
                    "value": "25",
                    "label": "云南",
                    "children": [
                        {"label": "昆明","value": "1"},
                        {"label": "曲靖","value": "2"},
                        {"label": "玉溪","value": "3"},
                        {"label": "保山","value": "4"},
                        {"label": "昭通","value": "5"},
                        {"label": "丽江","value": "6"},
                        {"label": "普洱","value": "7"},
                        {"label": "临沧","value": "8"},
                        {"label": "德宏傣族景颇族自治州","value": "9"},
                        {"label": "怒江傈僳族自治州","value": "10"},
                        {"label": "迪庆藏族自治州","value": "11"},
                        {"label": "大理白族自治州","value": "12"},
                        {"label": "楚雄彝族自治州","value": "13"},
                        {"label": "红河哈尼族彝族自治州","value": "14"},
                        {"label": "文山壮族苗族自治州","value": "15"},
                        {"label": "西双版纳傣族自治州","value": "16"}
                    ]
                },
                {
                    "value": "26",
                    "label": "西藏",
                    "children": [
                        {"label": "拉萨","value": "1"},
                        {"label": "那曲地区","value": "2"},
                        {"label": "昌都地区","value": "3"},
                        {"label": "林芝地区","value": "4"},
                        {"label": "山南地区","value": "5"},
                        {"label": "日喀则地区","value": "6"},
                        {"label": "阿里地区","value": "7"}
                    ]
                },
                {
                    "value": "27",
                    "label": "陕西",
                    "children": [
                        {"label": "西安","value": "1"},
                        {"label": "铜川","value": "2"},
                        {"label": "宝鸡","value": "3"},
                        {"label": "咸阳","value": "4"},
                        {"label": "渭南","value": "5"},
                        {"label": "延安","value": "6"},
                        {"label": "汉中","value": "7"},
                        {"label": "榆林","value": "8"},
                        {"label": "安康", "value": "9"},
                        {"label": "商洛","value": "10"}
                    ]
                },
                {
                    "value": "28",
                    "label": "甘肃",
                    "children": [
                        {"label": "兰州","value": "1"},
                        {"label": "嘉峪关","value": "2"},
                        {"label": "金昌","value": "3"},
                        {"label": "白银","value": "4"},
                        {"label": "天水","value": "5"},
                        {"label": "武威","value": "6"},
                        {"label": "酒泉","value": "7"},
                        {"label": "张掖","value": "8"},
                        {"label": "庆阳","value": "9"},
                        {"label": "平凉","value": "10"},
                        {"label": "定西","value": "11"},
                        {"label": "陇南","value": "12"},
                        {"label": "临夏回族自治州","value": "13"},
                        {"label": "甘南藏族自治州","value": "14"}
                    ]
                },
                {
                    "value": "29",
                    "label": "青海",
                    "children": [
                        {"label": "西宁","value": "1"},
                        {"label": "海东地区","value": "2"},
                        {"label": "海北藏族自治州","value": "3"},
                        {"label": "海南藏族自治州","value": "4"},
                        {"label": "黄南藏族自治州","value": "5"},
                        {"label": "果洛藏族自治州","value": "6"},
                        {"label": "玉树藏族自治州","value": "7"},
                        {"label": "海西蒙古族藏族自治州","value": "8"}
                    ]
                },
                {
                    "value": "30",
                    "label": "宁夏",
                    "children": [
                        {"label": "银川","value": "1"},
                        {"label": "石嘴山","value": "2"},
                        {"label": "吴忠","value": "3"},
                        {"label": "固原","value": "4"},
                        {"label": "中卫","value": "5"}
                    ]
                },
                {
                    "value": "31",
                    "label": "新疆",
                    "children": [
                        {"label": "乌鲁木齐","value": "1"},
                        {"label": "克拉玛依","value": "2"},
                        {"label": "吐鲁番地区","value": "3"},
                        {"label": "哈密地区","value": "4"},
                        {"label": "和田地区","value": "5"},
                        {"label": "阿克苏地区","value": "6"},
                        {"label": "喀什地区","value": "7"},
                        {"label": "克孜勒苏柯尔克孜自治州","value": "8"},
                        {"label": "巴音郭楞蒙古自治州","value": "9"},
                        {"label": "昌吉回族自治州","value": "10"},
                        {"label": "博尔塔拉蒙古自治州","value": "11"},
                        {"label": "石河子","value": "12"},
                        {"label": "阿拉尔","value": "13"},
                        {"label": "图木舒克","value": "14"},
                        {"label": "五家渠","value": "15"},
                        {"label": "伊犁哈萨克自治州","value": "16"}
                    ]
                },
                {
                    "value": "32",
                    "label": "台湾",
                    "children": [
                        {"label":"台北市","value": "1"},
                        {"label":"高雄市","value": "2"},
                        {"label":"台北县","value": "3"},
                        {"label":"桃园县","value": "4"},
                        {"label":"新竹县","value": "5"},
                        {"label":"苗栗县","value": "6"},
                        {"label":"台中县","value": "7"},
                        {"label":"彰化县","value": "8"},
                        {"label":"南投县","value": "9"},
                        {"label":"云林县","value": "10"},
                        {"label":"嘉义县","value": "11"},
                        {"label":"台南县","value": "12"},
                        {"label":"高雄县","value": "13"},
                        {"label":"屏东县","value": "14"},
                        {"label":"宜兰县","value": "15"},
                        {"label":"花莲县","value": "16"},
                        {"label":"台东县","value": "17"},
                        {"label":"澎湖县","value": "18"},
                        {"label":"基隆市","value": "19"},
                        {"label":"新竹市","value": "20"},
                        {"label":"台中市","value": "21"},
                        {"label":"嘉义市","value": "22"},
                        {"label":"台南市","value": "23"}
                    ]
                },
                {
                    "value": "33",
                    "label": "澳门"
                },
                {
                    "value": "34",
                    "label": "香港"
                }
            ]
        };
    }
    onChange = (value) => {
        let label = '';
        this.state.data.forEach((dataItem) => {
            if (dataItem.value === value[0]) {
                label = dataItem.label;
                if (dataItem.children && value[1]) {
                    dataItem.children.forEach((cItem) => {
                        if (cItem.value === value[1]) {
                            label += ` ${cItem.label}`;
                        }
                    });
                }
            }
        });
        console.log(label);
    }
    handleClick = (e) => {
        e.preventDefault(); // Fix event propagation on Android
        this.setState({
            show: !this.state.show,
        });
        // mock for async data loading
        if (!this.state.initData) {
            // setTimeout(() => {
                this.setState({
                    initData: this.state.data
                })
            // }, 500);
        }
    }
    onMaskClick = () => {
        this.setState({
            show: false,
        });
    }
    onSelect = ()=>{
        if(this.props.office||this.props.rank||this.props.tags){
            this.setState({
                show: false,
            });
        }
    }
    render(){
        const { initData, show } = this.state;
        const menuEl = (
            <Menu
                className="multi-foo-menu menu"
                data={initData}
                value={['1', ['1']]}
                onChange={this.onChange}
                height={document.documentElement.clientHeight * 0.3}
            />
        );
        const loadingEl = (
            <div style={{ position: 'absolute', width: '100%', height: document.documentElement.clientHeight * 0.6, display: 'flex', justifyContent: 'center' }}>
                <ActivityIndicator size="large" />
            </div>
        );
        return (
                <div className={show ? 'single-menu-active' : ''} style={{width:'100%',display:'inline-block',zIndex: '22'}}>
                        <NavBar
                            leftContent="Menu"
                            mode="light"
                            onClick={this.handleClick}
                            value={['1', ['1']]}
                            className="single-top-nav-bar"
                            style={{width:'100%'}}
                        >
                            城市<Icon type="down" size='xs'/>
                        </NavBar>

                    {show ? initData ? menuEl : loadingEl : null}
                    {show ? <div className="menu-mask" onClick={this.onMaskClick} /> : null}
                </div>
        )
    }
    componentWillUpdate(){
        if(!this.props.office||!this.props.rank||!this.props.tags){
            this.state.show = false;
        }
    }
}

export default CitySelect