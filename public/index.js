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
    const {GME, MSFT, DIS, BTNX} = mockData; 
// This is an example of "destructuring" an object
// "Destructuring" creates new variables from an object or an array
    const stocks = [GME, MSFT, DIS, BTNX ];
    console.log(stocks)
    
    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)'                
            }]
        }
    });
}




main()
//cb3dde24accd4a5392d83f62de00247e  //KEY for twelvedata.com