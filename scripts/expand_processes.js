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
            const python_s = require('child_process').spawn('python', ['./helpers/show_threads.py',item]);
            console.log(item);
            var text = `Threads for process with pid  <mark>${item}</mark>`;
            document.getElementById("head").innerHTML = text;
            
            python_s.stdout.on('data',function(out_put){
                console.log("hii")
                var ans = JSON.parse(out_put.toString('utf8'));
                console.log(ans);

                if(ans["error"]){
                    console.log(ans["error"])
                    document.getElementById("error_alert").style.display = "block"
                }else{
                    // document.getElementById("error_alert").hide()
                    if(ans["threads"]["access_denied_error"]){
                        console.log(ans["threads"]["access_denied_error"])
                        document.getElementById("access_denied_alert").style.display = "block"
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
                    

                }

                
                
            })
            

        });