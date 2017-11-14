function showForm() {
    var selopt = document.getElementById("selectProject").value;
    if (selopt == "Power") {
        document.getElementById("selectPowerTask").style.display = "block";
        document.getElementById("selectTerminalTask").style.display = "none";
        document.getElementById("selectBlank").style.display = "none";
    }
    if (selopt == "Terminal") {
        document.getElementById("selectTerminalTask").style.display = "block";
        document.getElementById("selectPowerTask").style.display = "none";
        document.getElementById("selectBlank").style.display = "none";
    }
    if (selopt == 0) {
        document.getElementById("selectTerminalTask").style.display = "none";
        document.getElementById("selectPowerTask").style.display = "none";
        document.getElementById("selectBlank").style.display = "block";
    }
}


//taskList Array
var taskListData = [];

//DOM Ready
$(document).ready(function(){
    //populate task list on initial load
    console.log("initial load");
    populateTable();
});

function populateTable(){
    //content string
    var tableContent ='';
    console.log("Inside populateTable()");
    //AJAX call to get tasks
    $.getJSON('/tasks', function (data){
        //for each item, construct table row and cells and add to string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td>' + this.local.project + '</td>';
            tableContent += '<td>' + this.local.task + '</td>';
            tableContent += '<td>' + this.local.hours + '</td>';
            tableContent += '/<tr>';
        });

        //inject to content string
        $('#taskList table tbody').html(tableContent);
    });
};