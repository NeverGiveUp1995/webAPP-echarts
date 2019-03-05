export default function (echarts) {
    let reportOfSubjectChart = {};

    let getOption = (opt) => {
        let {nameData, valueData} = opt;
        valueData.map(item => {
            item[0] -= 126.5;
            item[1] -= 17.5;
        });
        let getRanDomColorList = () => {
            let colorList = [];
            //十六进制数组
            let hexadecimalArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F",];
            for (let i = 0; i < valueData.length; i++) {
                let colorStr = "";
                do {
                    colorStr = `#${hexadecimalArr[parseInt(Math.random() * 16)]}${hexadecimalArr[parseInt(Math.random() * 16)]}${hexadecimalArr[parseInt(Math.random() * 16)]}${hexadecimalArr[parseInt(Math.random() * 16)]}${hexadecimalArr[parseInt(Math.random() * 16)]}${hexadecimalArr[parseInt(Math.random() * 16)]}`;
                } while (colorStr === "#FFFFFF");
                colorList.push(colorStr);
            }
            return colorList;
        };
        let option = {
            tooltip: {
                trigger: 'item',
                axisPointer: {
                    type: "line",
                    snap: true,

                },
                formatter: (data) => {
                    console.log("&&&", data)
                    let tipStr = "";
                    tipStr += `<p style="font-size: 15px;font-weight: bold">${data.seriesName}</p>
                                <p>
                                    <p style="padding-left: 15px">平均分：${parseInt((data.data[0] + 126.5) * 100) / 100}</p>
                                    <p style="padding-left: 15px">标准差：${parseInt((data.data[1] + 17.5) * 100) / 100}</p>
                                </p>
                                `;
                    return tipStr;
                }
            },
            dataZoom: [
                {
                    type: 'inside',
                    xAxisIndex: 0,
                    filterMode: 'empty'
                },
                {
                    type: 'inside',
                    yAxisIndex: 0,
                    filterMode: 'empty'
                }],
            xAxis: {
                type: 'value',
                min: -20,
                max: 20,
                axisLabel: {
                    fontSize: 10,
                    formatter: (data) => {
                        return parseInt((data + 126.5) * 10) / 10;
                    }
                }
            },
            yAxis: {
                type: 'value',
                min: -9,
                max: 9,
                axisLabel: {
                    fontSize: 10,
                    formatter: (data) => {
                        return parseInt((data + 17.1) * 10) / 10;
                    }
                }
            },
            series: [
                {
                    name: '成绩竞争力分析',
                    type: 'scatter',
                    itemStyle: {
                        color: (params) => {
                            let colorList = getRanDomColorList();
                            return colorList[params.dataIndex]

                        },
                    },
                    symbolSize: [15, 15],
                    label: {
                        show: true,
                        color: '#333',
                        position: 'top',
                        distance: 1,
                        fontSize: 10,
                        padding: 2,
                        borderRadius: 2,
                        backgroundColor: '#e4e4e4',
                        formatter: (data) => {
                            console.log(data)
                            let index = data.dataIndex;
                            return nameData[index]
                        }
                    },
                    data: valueData
                }
            ]
        };
        return option;
    };
    /**
     *渲染图表
     * @param option:配置对象
     */
    reportOfSubjectChart.renderChart = (option) => {
        let {parentSelector, canvasSelector, proportionOfWH = 1} = option;
        let parentDom = document.querySelector(parentSelector);
        let canvasDom = document.querySelector(canvasSelector);
        let width = parseInt(parentDom.scrollWidth);
        let height = proportionOfWH * width;
        let myCharts = echarts.init(canvasDom, "light", {width, height});
        myCharts.setOption(getOption(option));
    };
    return reportOfSubjectChart;
}
