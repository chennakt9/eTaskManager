const python_s = require('child_process').spawn('python', ['./helpers/only_show_processes.py']);


console.log("I am working");


function makecol(row,arg1){

    var col = document.createElement("th");
    row.appendChild(col);
    var node = document.createTextNode(arg1);
    col.appendChild(node);

}

function sentrie(data){
    try{
    var ans = JSON.parse(data.toString('utf8'));
    // console.log(ans["key_f"]);
    } catch(error){
        console.log(error);
    }
    

    console.log(ans["key_f"]);


    document.getElementById("body_table").innerHTML=""; //Updating content dynamiclally


    var len = ans["key_f"].length;//getting the length of the array

    for(var i = 0; i < len; i++) {
    
        var row = document.createElement("tr");

        makecol(row,ans["key_f"][i]["pid"]);
        makecol(row,ans["key_f"][i]["memory_percent"]);
        makecol(row,ans["key_f"][i]["cpu_percent"]); 
        makecol(row,ans["key_f"][i]["name"]);
        makecol(row,ans["key_f"][i]["status"]);

        document.getElementById("body_table").appendChild(row);
        
    }


}

//////////////////// Show Function with Callback  ///////////////////////
function show(callback){
    
python_s.stdout.on('data',function(output_data){
    
    sentrie(output_data);
    callback();

});


}

show(wrapperCallback);

//////////////////// Show Function with Callback  Ends///////////////////////

let index;
let old_index;
let g_name_val;
expand_handler_flag = 0;
kill_handler_flag = 0;
var table = document.getElementById("table_cre");


function wrapperCallback(){ //wrapperCallback is a function which consists of both expand and kill functions
                            //and get index function as well it is called after table is updated

for (let i = 0; i < table.rows.length; i++) {

    if(index){
        
    if(table.rows[i].cells[0].innerHTML==index){
        console.log("pass")
        table.rows[i].style.backgroundColor = "blue";
    }
    }
    
}

////////////////////////////////////////////////  GETIING INDEX OF A ROW AND CHANGING COLOUR  ///////////////////////////////////////
function indexCallback(){

if (table) {
    
for (var i = 0; i < table.rows.length; i++) {
    
    table.rows[i].addEventListener('click',function newfunc() {
        console.log(this);
            
    tableText(this);
    this.removeEventListener('click', newfunc);

    });

}
}

}


function tableText(tableRow) {

    var pid_val = tableRow.childNodes[0].innerHTML;
    var name_val = tableRow.childNodes[3].innerHTML;
    tableRow.style.backgroundColor = "blue";
    old_index = pid_val;
    
    if(pid_val!=index && index!=undefined){
        old_index = index;
    }
    index = pid_val;
    g_name_val = name_val;
    
    }


indexCallback();

////////////////////////////////////////////////  GETIING INDEX OF A ROW AND CHANGING COLOUR  ENDS   ///////////////////////////////////////


//////////// Exapnd On click set flag //////////////////////////
function expand_clickHandler(){
        
   expand_handler_flag = 1;   
    
}

function expand(){
    document.getElementById("expandbtn").addEventListener('click',expand_clickHandler,{once:true});

}

expand();
//////////// Exapnd On click set flag Ends//////////////////////////

/////////////////// Kill onclick set flag /////////////////////////////
function kill(){

document.getElementById("endbtn").addEventListener('click',function(){

    kill_handler_flag = 1;
});

}

kill();

/////////////////// Kill onclick set flag Ends/////////////////////////////

console.log(index)
console.log(old_index);
console.log(g_name_val)
console.log(expand_handler_flag)
console.log(kill_handler_flag)

///////////////////////////////////////////////////// Sending index value to main.js to create expand Vindow  ///////////////////////////////////////
if(expand_handler_flag==1){
    const electron = require('electron');
    let {ipcRenderer} = electron;
    ipcRenderer.send("expand_flag",index);
    
    document.getElementById("expandbtn").removeEventListener('click',expand_clickHandler);
}

expand_handler_flag = 0;
///////////////////////////////////////////////////// Sending index value to main.js to create expand Vindow  Ends///////////////////////////////////////


//////////////////////// Killing the process ///////////////////////////////
if(kill_handler_flag==1){

    const python_s = require('child_process').spawn('python', ['./helpers/kill.py',g_name_val]);
    
    python_s.stdout.on('data',function(data){
    

        console.log(JSON.parse(data.toString()));
    
    });

}


kill_handler_flag = 0;
//////////////////////// Killing the process Ends///////////////////////////////
}
