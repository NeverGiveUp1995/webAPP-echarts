export default function (echarts) {
    let myChart = {};
    let getOption = (paramOpt) => {

        let {datas, topicOpt = {}} = paramOpt;
        let {classData, schoolData, topicData} = datas;
        let {nameData, valueData} = topicData;
        /*
        * startValOfRange:题目难度显示范围的起始值（默认0）
        * endValOfRange:题目难度显示范围的结束值（默认100）
        * startValOutOfRange: 默认超出条数后的显示范围起始值值（默认0）
        *  endValOutOfRange: 默认超出条数后的显示范围结束值(默认20)
        * rangeCriticalVal:范围临界值（题目数量超过多少条，显示总题数的某个比例（proportion））
        * */
        let {startValOfRange = 0, endValOfRange = 100, startValOutOfRange = 0, endValOutOfRange = 20, rangeCriticalVal = 24} = topicOpt;

        //如果超过指定的数据量，显示对应的显示范围（默认超出的状态值：24条，显示0~20）
        if (valueData.length > rangeCriticalVal) {
            startValOfRange = startValOutOfRange;
            endValOfRange = endValOutOfRange;
        }

        console.log({startValOfRange, endValOfRange, rangeCriticalVal});
        let resultData = (valueData) => {
            let resulrData = [];
            valueData.map(item => {
                resulrData.push(item + 4);
            });
            return resulrData;
        };

        let option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    animation: true,
                }
            },

            axisPointer: {
                link: {xAxisIndex: 'all'}
            },

            dataZoom: [
                {
                    gridIndex: 0,
                    show: true,
                    type: 'inside',
                    realtime: true,
                    start: 0,
                    end: 100,
                    xAxisIndex: [0, 1, 2]
                },
                {
                    gridIndex: 1,
                    show: true,
                    type: 'inside',
                    realtime: true,
                    start: 0,
                    end: 100,
                    xAxisIndex: [0, 1, 2]
                },
                //配置中间题目难度的y轴缩放（动态）
                {
                    gridIndex: 1,
                    type: 'inside',
                    start: startValOfRange,
                    end: endValOfRange,
                    yAxisIndex: 1,
                },
                {
                    gridIndex: 2,
                    show: true,
                    type: 'inside',
                    realtime: true,
                    start: 0,
                    end: 100,
                    xAxisIndex: [0, 1, 2]
                },
            ],
            grid: [
                {left: 40, top: 30, right: 40, height: '28%'},
                {left: 40, top: '40%', right: 40, height: '20%'},
                {left: 40, top: '65%', right: 40, height: '28%'},
            ],
            xAxis: [
                {
                    show: true,
                    name: '难度',
                    type: 'value',
                    gridIndex: 0,
                    axisLine: {onZero: true},
                    min: -4,
                    max: 4

                },
                {
                    show: false,
                    name: '难度',
                    type: 'value',
                    gridIndex: 1,
                    axisLine: {onZero: true},
                    min: 0,
                    max: 8,
                    axisLabel: {
                        formatter: (data) => {
                            console.log("X轴", data);
                            return data - 4
                        }
                    }

                },
                {
                    show: true,
                    name: '难度',
                    type: 'value',
                    position: 'top',
                    gridIndex: 2,
                    axisLine: {onZero: true},
                    axisTick: {
                        alignWithLabel: true
                    },
                    min: -4,
                    max: 4
                },
            ],
            yAxis: [
                {
                    show: true,
                    name: '本班学生能力分布比例',
                    type: 'value',
                    gridIndex: 0,
                    fontSize: 10,
                    min: 0,
                    max: 1,
                    axisLabel: {
                        fontSize: 10,
                        formatter: (data) => {
                            data = `${data * 100}%`
                            return data;
                        }
                    }

                },
                {
                    show: true,
                    gridIndex: 1,
                    type: 'category',
                    data: nameData,
                    axisLabel: {
                        fontSize: 10
                    }
                },
                {
                    show: true,
                    name: '全校学生能力分布比例',
                    gridIndex: 2,
                    inverse: true,
                    type: 'value',
                    axisLabel: {
                        fontSize: 10,
                        formatter: (data) => {
                            data = `${data * 100}%`
                            return data;
                        }
                    }

                },
            ],
            series: [
                {
                    name: '分布比例',
                    type: 'bar',
                    hoverAnimation: true,
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    data: classData,
                    barWidth: 10,
                },
                {
                    name: '题目难度分布',
                    type: 'bar',
                    color: 'rgba(49,194,124,0)',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    data: resultData(valueData),
                    barWidth: 5,
                    barCategoryGap: 8,
                    label: {
                        show: true,
                        color: '#666',
                        fontSize: 10,
                        position: 'right',
                        formatter: (data) => {
                            return data.name;
                        }
                    },
                },
                {
                    name: '分布比例',
                    type: 'bar',
                    hoverAnimation: true,
                    xAxisIndex: 2,
                    yAxisIndex: 2,
                    data: schoolData,
                    barWidth: 10
                },
            ]
        };
        return option;
    };

    /**
     *渲染图表
     * @param parentSelector:需要渲染的父元素的容器字符串（唯一）
     * @param canvasSelector:canvas标签的唯一的选择器字符串
     * @param proportionOfWH:高宽比例（高/宽）:默认==>1.5
     */
    myChart.renderChart = (option) => {
        let {parentSelector, canvasSelector, proportionOfWH = 1.5} = option;
        let parentAreaDom = document.querySelector(parentSelector);
        let chartDom1 = document.querySelector(canvasSelector);
        let width = parseInt(parentAreaDom.scrollWidth);
        let height = parseInt(proportionOfWH * width);
        let eCharts1 = echarts.init(chartDom1, 'light', {width, height});
        eCharts1.setOption(getOption(option));
    };

    return myChart;
}
