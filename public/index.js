async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    let response = await fetch('https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1min&apikey=cb3dde24accd4a5392d83f62de00247e')
    let result = await response.json();
    //console.log(result)

    // let GME = result.GME
    // let MSFT = result.MSFT
    // let DIS = result.DIS
    // let BTNX = result.BTNX

    // const stocks = [GME, MSFT, DIS, BTNX ];

// Bonus Note: 
// Another way to write the above lines would to refactor it as:
    const {GME, MSFT, DIS, BNTX} = mockData; 
// This is an example of "destructuring" an object
// "Destructuring" creates new variables from an object or an array
    const stocks = [GME, MSFT, DIS, BNTX];
    console.log(stocks)
//=======================================================================
function getColor(stock){
    if(stock === "GME"){
        return 'rgba(61, 161, 61, 0.7)'
    }
    if(stock === "MSFT"){
        return 'rgba(209, 4, 25, 0.7)'
    }
    if(stock === "DIS"){
        return 'rgba(18, 4, 209, 0.7)'
    }
    if(stock === "BNTX"){
        return 'rgba(166, 43, 158, 0.7)'
    }
}
function getHighest(obj){
    let max = 0;
    for(let i = 0; i < obj.length; i++)
    {
        if(max< obj[i])
            max = obj[i]
    }
    return max;
}
    stocks.forEach( stock => stock.values.reverse())

    // Time Chart
    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.reverse().map(value => value.datetime),
            datasets: stocks.map( stock => ({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor:  getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
            }))
        }
    });
    
    // ===== Highest Stock Price ===== 
    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['GME', 'MSFT', 'DIS', 'BNTX'],
            datasets: [{
                label: 'Highest',
                data: [
                    getHighest(stocks[0].values.map(value => parseFloat(value.high))),
                    getHighest(stocks[1].values.map(value => parseFloat(value.high))),
                    getHighest(stocks[2].values.map(value => parseFloat(value.high))),
                    getHighest(stocks[3].values.map(value => parseFloat(value.high)))
                ],
                backgroundColor: [
                    getColor(stocks[0].meta.symbol),
                    getColor(stocks[1].meta.symbol),
                    getColor(stocks[2].meta.symbol),
                    getColor(stocks[3].meta.symbol)
                ],
                borderColor: [
                    getColor(stocks[0].meta.symbol),
                    getColor(stocks[1].meta.symbol),
                    getColor(stocks[2].meta.symbol),
                    getColor(stocks[3].meta.symbol)
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

let resutls = stocks[0].values.map(value => parseFloat(value.high))    
console.log(resutls)


    // ===== Average Stock Price===== averagePriceChartCanvas
    
}






main()
//cb3dde24accd4a5392d83f62de00247e  //KEY for twelvedata.com