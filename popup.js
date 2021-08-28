const timeTable = document.querySelector("#time-table > tbody");

function loadTable () {
    const req = new XMLHttpRequest();

    req.open("GET","timetable.json");

    req.onload = () => {
        try {
            const json = JSON.parse(req.responseText);
            populateTable(json);
        } catch(e){
            console.warn(e);
        }
    };

    req.send();
}


function populateTable(json){
    
    while(timeTable.firstChild){
        timeTable.removeChild(timeTable.firstChild);
    }

    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var d = new Date();
    var i = d.getDay();
    
    for(x in json.days[i]){
        const tr = document.createElement("tr");
        if(x==0){
            document.getElementById("day").innerHTML = days[i];
        }
        else{
            for(y in json.days[i][x]){
                if(y==='link'){
                    const td = document.createElement("td");
                    const link = document.createElement("a");
                    link.textContent = "Link";
                    link.setAttribute('href',json.days[i][x][y]);
                    link.setAttribute('target','_blank');
                    td.appendChild(link);
                    tr.appendChild(td); 
                }
                else{
                    const td = document.createElement("td");
                    td.textContent = json.days[i][x][y];
                    tr.appendChild(td);
                
                }
            }
        }

        timeTable.appendChild(tr);
    }

}

document.addEventListener("DOMContentLoaded", () => { loadTable(); });