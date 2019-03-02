// import {creatHtml, renderChart} from './report_keyAbility.js';
import demo01 from './demo01.js';

window.onload = function () {
    let chartTabs = ["分类报告-降雨量demo", "分类报告-关键能力", "分类报告-核心素养", "分类报告-认知层次", "分类报告-题型分析", "学科报告-成绩分布",];
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
                console.log(demo01(echarts));
                demo01(echarts).creatChart(`4. ${str}`);
            }
        }
    };
    renderTabs(chartTabs);
};
