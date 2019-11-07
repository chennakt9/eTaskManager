const electron = require('electron');
        const {ipcRenderer} = electron;
        
        function makecol(row,arg1){

            var col = document.createElement("th");
            row.appendChild(col);
            var node = document.createTextNode(arg1);
            col.appendChild(node);

        }


        
        console.log("I'm also working");
        
        ipcRenderer.once('expand_flag',function(e,item){
            const python_s = require('child_process').spawn('python', ['./helpers/threads.py',item]);
            console.log(item);
            var text = `Threads for process with pid  <mark>${item}</mark>`;
            document.getElementById("threads_head").innerHTML = text;

            var text = `Children for process with pid  <mark>${item}</mark>`;
            document.getElementById("children_head").innerHTML = text;


            python_s.stdout.on('data',function(out_put){
                // console.log("hii")
                var ans = JSON.parse(out_put.toString('utf8'));
                // console.log(ans);
                document.getElementById("children_table_body").innerHTML="";
                document.getElementById("threads_table_body").innerHTML="";
                if(ans["error"]){
                    console.log(ans["error"])
                    document.getElementById("error_alert").style.display = "block"
                }else{
                    // document.getElementById("error_alert").hide()
                    if(ans["threads"]["access_denied_error"]){
                        console.log(ans["threads"]["access_denied_error"])
                        document.getElementById("threads_access_denied_alert").style.display = "block"
                    }
                    
                    if(ans["threads"]["error"]){
                        console.log(ans["threads"]["error"])
                        document.getElementById("threads_none_alert").style.display = "block"
                    }else{

                        for (let i = 0; i < ans["threads"]["output"].length; i++) {
                        var row = document.createElement("tr");

                        for (let j=0; j<3; j++){
                            makecol(row,ans["threads"]["output"][i][j])
                        }
                        
                        document.getElementById("threads_table_body").appendChild(row);
                        
                        
                    }

                    }

                    if(ans["children"]["access_denied_error"]){
                        console.log(ans["children"]["access_denied_error"])
                        document.getElementById("childern_access_denied_alert").style.display = "block"
                    }
                    
                    if(ans["children"]["error"]){
                        console.log(ans["children"]["error"])
                        document.getElementById("children_none_alert").style.display = "block"
                    }else{

                        x_vals = []
                        y_vals = []

                        for (let i = 0; i < ans["children"]["output"].length; i++) {
                        var row = document.createElement("tr");
                        
                        makecol(row,ans["children"]["output"][i]["name"]);
                        x_vals[i] = ans["children"]["output"][i]["name"]

                        makecol(row,ans["children"]["output"][i]["pid"]);
                        makecol(row,ans["children"]["output"][i]["ppid"]);
                        // makecol(row,ans["children"]["output"][i]["num_threads"]);
                        y_vals[i] = ans["children"]["output"][i]["num_threads"]

                        makecol(row,ans["children"]["output"][i]["username"]);
                        makecol(row,ans["children"]["output"][i]["memory_percent"]);
                        makecol(row,ans["children"]["output"][i]["cpu_percent"]);
                        makecol(row,ans["children"]["output"][i]["status"]); 
                        
                        
                        
                        document.getElementById("children_table_body").appendChild(row);
                        
                        
                    }

                    // console.log(x_vals)
                    // console.log(y_vals)

                    let chart = document.getElementById('threads_show');

                    let lineChart = new Chart(chart, { 
                        type : 'doughnut',
                        data : {
                            labels: x_vals,
                            datasets : [{
                                label : 'CPU PERCENT',
                                backgroundColor : ['rgba(0,128,128,.9)',
                                'rgba(68, 194, 66,0.8)',
                                'rgba(67, 176, 176,0.8)',
                                'rgba(59, 50, 115,0.8)',
                                'rgba(156, 43, 166,0.8)',
                                'rgba(166, 43, 117,0.8)',
                                'rgba(145, 35, 55,0.8)',
                                'rgba(145, 72, 35,0.8)',
                                'rgba(224, 142, 101,0.8)',
                                'rgba(107, 86, 75,0.8)',
                                'rgba(107, 171, 17,0.8)',
                                'rgba(10, 233, 245,0.8)',
                                'rgba(247, 232, 250,0.8)',
                                'rgba(13, 12, 13,0.8)',
                                'rgba(219, 0, 0,0.8)'
                                
                            ],
                            borderWidth:1,
                            borderColor:'#777',
                            hoverBorderWidth:3,
                            hoverBorderColor:'#000',
                            data : y_vals,
                            borderWidth:0.6,
                            borderColor:'black'
                            
                            }]
                        },
                
                            options: {
                                
                                title: {
                                    display : true,
                                    text : "No of threads per child process",
                                    fontSize : 18
                                },
                                animation: {
                                    duration: 0
                                }
                            }
                    })

                    }
                    

                }

                
                
            })
            

        });