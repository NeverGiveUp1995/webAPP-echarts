export default function () {
    let reportOfSubject = {};

    let getOption = () => {
        let nameData = [];
        let valueData = [];
        for (let i = 0; i < 10; i++) {
            let randomX = Math.random();
            let randomY = Math.random();
            let x = parseInt(randomX * 40 * 100) / 100 + 106.5;
            let y = parseInt(randomY * 18 * 100) / 100 + 8.1;
            valueData.push([x, y]);
            nameData.push(`高一（${i}）`);
        }

        valueData.map(item => {
            item[0] -= 126.5;
            item[1] -= 17.5;
        })
        option = {
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
                    formatter: (data) => {
                        return parseInt((data + 17.1) * 10) / 10;
                    }
                }
            },
            series: [
                {
                    type: 'scatter',
                    color: 'rgb(49,194,124)',
                    label: {
                        show: true,
                        color: '#333',
                        position: 'top',
                        padding: 10,
                        backgroundColor: '#fff',
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
    reportOfSubject.renderChart = (option) => {

    };
    return reportOfSubject;
}
