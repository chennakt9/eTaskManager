const python_s = require('child_process').spawn('python', ['./helpers/cpu_percent.py']);

console.log("alskjdfln")

function show(){

    python_s.stdout.on('data',function(output_data){
try{
    var ans = JSON.parse(output_data.toString('utf8'));
    
    //Chart.js
    let array = [];
    for (let i = 0; i < 60; i++) {
        if(((i+1)%10)== 0){
            array[i]= i+1 ;
        }
        else array[i]= ""
    }
 
    let chart = document.getElementById('cpu_percent');

    let lineChart = new Chart(chart, { 
        type : 'line',
        data : {
            labels: array,
            datasets : [{
                label : 'CPU PERCENT',
                backgroundColor : 'rgba(0,128,128,.9)',
                data : ans["key_f"],
                borderWidth:0.6,
                borderColor:'black'
                
            }]
        },

            options: {
                events: ['click','touchmove'],
                scales: {
                    yAxes: [{
                        ticks: {
                            suggestedMin: 0,
                            suggestedMax: 70
                        }
                    }]
                },
                title: {
                    display : true,
                    text : "Percentage Of CPU In Use",
                    fontSize : 18
                },
                animation: {
                    duration: 0
                }
            }
    })

    //Chart.js ends
    } catch(error){
        console.log(error);
    }


});
}

show();