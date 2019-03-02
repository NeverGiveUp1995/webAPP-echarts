$(document).ready(function () {
    let dataA = [];
    let dataB = [];
    let dataC = [];
    let dataD = [];
    let yAxis = [];

    for (let i = 0; i < 100; i++) {
        let flag = 100;
        let a = parseInt(Math.random() * 100);
        let b = parseInt(Math.random() * (100 - a));
        let c = parseInt(Math.random() * (100 - a - b));
        let d = 100 - a - b - c;
        console.log(a, b, c, d)
        dataA.push(a);
        dataB.push(b);
        dataC.push(-c);
        dataD.push(-d);
        yAxis.push(`class${i + 1}`)
    }
    let chartOpt = option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: ['A等', 'B等', 'C等', 'D等'],
        },
        dataZoom: [
            {
                type: 'slider',
                show: true,
                realtime: true,
                yAxisIndex: 0,
                start: 0,
                end: 10,
                filterMode: 'empty'
            },
            {
                type: 'inside',
                yAxisIndex: 0,
                filterMode: 'empty'
            },
        ],
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            min: -100,
            max: 100,
            axisLabel: {
                formatter: (data) => {
                    return Math.abs(data);
                }
            }
        },
        yAxis: {
            type: 'category',
            data: yAxis
        },
        series: [
            {
                name: 'A等',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: dataA
            },
            {
                name: 'B等',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: dataB
            },
            {
                name: 'C等',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: dataC
            },
            {
                name: 'D等',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: dataD
            },
        ]
    };
    let $myECharts = $('#myChart');
    let myChart = echarts.init($myECharts[0], "light");
    myChart.setOption(chartOpt);
});
