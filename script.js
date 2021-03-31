// Emily Herman
// JavaScript for workday planner

// Display current day at the top of the calendar using Moment.js library
var date = moment().format("LL");
var day = moment().format("dddd");
var currentTime = moment().format("H"); // military time

$("#currentDay").text(day + ", " + date);

// Dynamically create a time block for each hour of the workday
// Each row has: hour, input block, save button
for (var i = 8; i < 18; i++) {

    // Create div for rows, assign attributes
    var row = $("<div>").attr("class", "row time-block");

    // Create div for hour column, assign attributes
    var hour = $("<div>").attr("class", "col-sm-1 hour");

    // Add hour and AM or PM to first column
    if (i < 12) {
        var time = $("<p>").text(i + " AM");
    } else if (i === 12) {
        var time = $("<p>").text(i + " PM");
    } else {
        var time = $("<p>").text(i-12 + " PM");
    }

    // Add time <p> to hour column; add column to row; add row to time-block container
    $(".container").append(row.append(hour.append(time)));

    // Create div and textarea for input column, assign attributes
    var inputDiv = $("<div>").attr("style", "padding-right:0px; padding-left:0px");
    var textArea = $("<textarea>").attr("id", "textarea" + i);
    textArea.attr("class", "textEntry");

    // Color-code each time block (past, present, future) based on current time
    if (i < currentTime) {
        inputDiv.attr("class", "col-sm-10 past");
    } else if (i == currentTime) {
        inputDiv.attr("class", "col-sm-10 present");
    } else {
        inputDiv.attr("class", "col-sm-10 future");
    }

    // Add textarea to column; add column to row; add row to time-block container
    $(".container").append(row.append(inputDiv.append(textArea)));

    // Create save button, add attributes and icon
    var button = $("<div>").attr("class", "col-sm-1 saveBtn");
    button.attr("id", "save" + i);
    var buttonIcon = $("<i>").attr("class", "fas fa-save");

    // Add icon to button column, add column to row, add row to time-block container
    $(".container").append(row.append(button.append(buttonIcon)));
}

// Click save button:
$(".saveBtn").on("click", function() {

    // Get ID of textarea from clicked row; assign to variable
    var textareaId = $(this).prev()[0].firstChild.id;
    var thisTextarea = $("textarea#" + textareaId).val();

    // Store textarea text in local storage
    localStorage.getItem(textareaId + "Storage");
    localStorage.setItem(textareaId + "Storage", thisTextarea);
});

// Refresh the page and the saved events persist
$(window).on("load", function() {

    for (var j = 8; j < 18; j++) {
        $("#textarea" + j).val(localStorage.getItem("textarea" + j + "Storage"));
    }

});

