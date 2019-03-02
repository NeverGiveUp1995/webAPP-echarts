export default function (echarts) {
    let myChart = {};
    const chartNodeId1 = "demo01";
    let getOption = (rangOpt) => {
        let data1 = [
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
        let data2 = [
            [-2.7, 0.25], [2.67, 0.12], [-3.72, 0.88], [-3.36, 0.81], [1.13, 0.19], [0.56, 0.94], [-1.15, 0.12], [-0.47, 0.32], [-0.87, 0.89], [0.68, 0.62], [3.96, 0.79], [1.86, 0.58], [0.9, 0.29], [-2.39, 0.33], [-3.97, 0.19]
        ];
        let nameData = [];
        let data = [];
        for (let i = 0; i < 50; i++) {
            let random = Math.random();
            nameData.push(`O${i + 1}`);
            data.push(parseInt(random * 8 * 100) / 100 - 4);
        }
        let defaultStartValOutOfRange = 0;//默认超出条数后的显示范围起始值值
        let defaultEndValOutOfRange = 20;//默认超出条数后的显示范围结束值
        let topicDifficultyRange = {
            startValOfRange: 0,//题目难度显示范围的起始值（默认100）
            endValOfRange: 100,//题目难度显示范围的结束值（默认100）
            rangeCriticalVal: 24,//范围临界值（题目数量超过多少条，显示总题数的某个比例（proportion））
        };//中间题目难度显示范围
        if (rangOpt && rangOpt.rangeCriticalVal) {
            topicDifficultyRange.rangeCriticalVal = rangOpt.rangeCriticalVal
        }
        if (data.length > topicDifficultyRange.rangeCriticalVal) {
            rangOpt && rangOpt.startValOfRange ? topicDifficultyRange.startValOfRange = rangOpt.startValOfRange : topicDifficultyRange.startValOfRange = defaultStartValOutOfRange;
            rangOpt && rangOpt.endValOfRange ? topicDifficultyRange.endValOfRange = rangOpt.endValOfRange : topicDifficultyRange.endValOfRange = defaultEndValOutOfRange;
        }

        console.log(topicDifficultyRange);
        let resultData = (data) => {
            let resulrData = [];
            data.map(item => {
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
                    end: 50,
                    xAxisIndex: [0, 1, 2]
                },
                {
                    gridIndex: 1,
                    show: true,
                    type: 'inside',
                    realtime: true,
                    start: 0,
                    end: 50,
                    xAxisIndex: [0, 1, 2]
                },
                //配置中间题目难度的y轴缩放（动态）
                {
                    gridIndex: 1,
                    type: 'inside',
                    start: topicDifficultyRange.startValOfRange,
                    end: topicDifficultyRange.endValOfRange,
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
                {left: 40, top: '5%', right: 40, height: '28%'},
                {left: 40, top: '38%', right: 40, height: '20%'},
                {left: 40, top: '63%', right: 40, height: '28%'},
            ],
            xAxis: [
                {
                    show: true,
                    name: '难度',
                    type: 'value',
                    gridIndex: 0,
                    boundaryGap: true,
                    axisLine: {onZero: true},
                    min: -4,
                    max: 4

                },
                {
                    show: false,
                    name: '难度',
                    type: 'value',
                    gridIndex: 1,
                    boundaryGap: true,
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
                    boundaryGap: true,
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
                    data: data1,
                    barWidth: 10,
                },
                {
                    name: '题目难度分布',
                    type: 'bar',
                    color: 'rgba(49,194,124,0)',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    data: resultData(data),
                    barWidth: 5,
                    barCategoryGap: 8,
                    label: {
                        show: true,
                        color: '#000',
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
                    data: data2,
                    barWidth: 10
                },
            ]
        };
        return option;
    };
    let creatHtml = (title) => {
        let html = `<div>
               <p>${title}</p>
               <div class="radarChartArea" >
                    <canvas id=${chartNodeId1} ></canvas>
               </div>
            </div>`;
        let parentNode = document.getElementsByClassName("container")[0];
        parentNode.innerHTML = html;
    };

    let renderChart = () => {
        let radarChartAreaDom = document.getElementsByClassName("radarChartArea")[0];
        let chartDom1 = document.getElementById(chartNodeId1);
        let width = parseInt(radarChartAreaDom.scrollWidth);
        let height = parseInt(1.5 * width);
        let eCharts1 = echarts.init(chartDom1, 'light', {width, height});
        eCharts1.setOption(getOption({
            startValOfRange: 0,
            endValOfRange: 30,
            rangeCriticalVal: 20
        }));
    };

    myChart.creatChart = (title) => {
        creatHtml(title);
        renderChart();
    };
    return myChart;
}
