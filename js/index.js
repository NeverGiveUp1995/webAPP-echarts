import {creatHtml, renderChart} from './report_keyAbility.js';
import demo01 from './demo01.js';
import demo02 from './demo02.js';

window.onload = function () {
    let chartTabs = ["分类报告-怀特图", "分类报告-象限图", "分类报告-核心素养", "分类报告-认知层次", "分类报告-题型分析", "学科报告-成绩分布",];
    let renderTabs = (chartTabs) => {
        let chartTabDom = document.querySelector("#footer ul");
        chartTabDom.innerHTML = "";
        let tabsHtml = '';
        let currentHrefTab = window.location.href.split("#")[1];
        let currentTab = currentHrefTab ? currentHrefTab.split("-")[1] : '0';
        chartTabs.map((item, index) => {
            console.log(index, currentTab)
            index == currentTab ?
                tabsHtml += `\n<li id="currentTab"><a href="#tab-${index}">${item.split('-')[1]}</a></li>`
                :
                tabsHtml += `\n<li><a href="#tab-${index}">${item.split('-')[1]}</a></li>`;
        });
        chartTabDom.innerHTML = tabsHtml;
        let chartTabsDom = document.querySelectorAll("#footer ul li");

        for (let i = 0; i < chartTabsDom.length; i++) {
            chartTabsDom[i].onclick = () => {
                let headerTitleDom = document.querySelector('.header .title');
                let str = chartTabsDom[i].firstChild.innerHTML;
                headerTitleDom.innerHTML = str;
                for (let index = 0; index < chartTabsDom.length; index++) {
                    if (index === i) {
                        chartTabsDom[index].id = "currentTab";
                    } else {
                        chartTabsDom[index].id = "";
                    }
                }


                if (i == 0) {
                    let parentDom = document.querySelector(".radarChartArea");
                    parentDom.innerHTML = "";
                    parentDom.innerHTML = "<div id='demo01'/>";
                    //调用图表渲染
                    let classData = [
                        [-2.7, 0.02],
                        [2.67, 0.98],
                        [-3.72, 0.74],
                        [-3.36, 0.03],
                        [1.13, 0.62],
                        [0.56, 0.64],
                        [-1.15, 0.65],
                        [-0.47, 0.71],
                        [-0.87, 0.6],
                        [0.68, 0.05],
                        [3.96, 0.29],
                        [1.86, 0.48],
                        [0.9, 0.75],
                        [-2.39, 0.64],
                        [-3.97, 0.46]
                    ];
                    let schoolData = [
                        [-2.7, 0.25], [2.67, 0.12], [-3.72, 0.88], [-3.36, 0.81], [1.13, 0.19], [0.56, 0.94], [-1.15, 0.12], [-0.47, 0.32], [-0.87, 0.89], [0.68, 0.62], [3.96, 0.79], [1.86, 0.58], [0.9, 0.29], [-2.39, 0.33], [-3.97, 0.19]
                    ];
                    let nameData = [];
                    let valueData = [];

                    for (let i = 0; i < 50; i++) {
                        let random = Math.random();
                        nameData.push(`O${i + 1}`);
                        valueData.push(parseInt(random * 8 * 100) / 100 - 4);
                    }
                    /**
                     * option :{
                     *  parentSelector:"",必传
                     *  canvasSelector："",必传
                     *  proportionOfWH："",
                     *  topicOpt: {
                     *      startValOfRange: 0,
                     *      endValOfRange: 30,
                     *      rangeCriticalVal: 24,
                     *  },
                     *  datas:{
                     *      classData:[[x1,y1],[x2,y2],...],班级的数据（必传）
                     *      schoolData:[[x1,y1],[x2,y2]
                     *      ,...],全校的数据（必传）
                     *      topicData:{
                     *          nameData:[];
                     *      };题目难度数据（必传）
                     *  }；必传
                     * }
                     * },参数配置对象
                     */
                    demo01(echarts).renderChart({
                        parentSelector: ".radarChartArea",//必传
                        canvasSelector: "#demo01",//必传
                        proportionOfWH: 1.5,
                        topicOpt: {
                            startValOfRange: 0,
                            endValOfRange: 30,
                            rangeCriticalVal: 24,
                        },
                        datas: {
                            classData,
                            schoolData,
                            topicData: {
                                nameData,
                                valueData
                            },
                        }
                    });
                } else if (i == 1) {
                    let parentDom = document.querySelector(".radarChartArea");
                    parentDom.innerHTML = "";
                    parentDom.innerHTML = "<div id='demo01'/>";
                    let demo2NameData = [];
                    let demo2ValueData = [];
                    for (let i = 0; i < 10; i++) {
                        let randomX = Math.random();
                        let randomY = Math.random();
                        let x = parseInt(randomX * 40 * 100) / 100 + 106.5;
                        let y = parseInt(randomY * 18 * 100) / 100 + 8.1;
                        demo2NameData.push(`高一（${i}）`);
                        demo2ValueData.push([x, y]);
                    }
                    demo02(echarts).renderChart({
                        parentSelector: ".radarChartArea",//必传
                        canvasSelector: "#demo01",//必传
                        nameData: demo2NameData,
                        valueData: demo2ValueData,
                        proportionOfWH: 1
                    })
                } else {
                    let parentDom = document.querySelector(".radarChartArea");
                    parentDom.innerHTML = "图表正在开发中。。。";
                }

            }
        }

        //点击当前tab
        chartTabsDom[parseInt(currentTab)].click();
    };
    renderTabs(chartTabs);
};
