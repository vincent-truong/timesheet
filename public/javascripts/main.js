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
  //  populateTable();
});

//add task button click
$('#addTask').on('click', addTask);

function addTask(event){
  event.preventDefault();
  var newTask = {
      'id': $('#datepicker').val(),
      'project': $('#selectProject').val(),
      'task': $('#selectPTask').val(),
      'hours': $('#hours').val()
  };
  $.ajax({
      type: 'POST',
      data: newTask,
      url: '/tasks',
      dataType: 'JSON'
  }).done(function (response){
      //if ajax successful
      if (response.msg === '') {

          //update table
          populateTable();
      }
      else {
          //if something went wrong, alert
          alert('Error: ' + response.msg);
      }
  });
};

//populate task list with all the task corresponding to the date
//should first clear out any existing dates and repopulate (if different dates case)
function populateTable(){
    //content string
    var tableContent ='';
    console.log("Inside populateTable()");

    //clear table first
    $('#tasklist table tbody tr').remove();

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