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