// Firebase stuff
var config = {
    apiKey: "AIzaSyB_BRogTI0T_IcxQgA9OXgEaR0q51ICeR4",
    authDomain: "train-7c903.firebaseapp.com",
    databaseURL: "https://train-7c903.firebaseio.com",
    projectId: "train-7c903",
    storageBucket: "",
    messagingSenderId: "914566750236"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

var trainName = "";
var trainDestination = "";
var trainFirst = "";
var trainFrequency = "";

// Submit button takes all data in forms 
$("#addTrainButton").on("click", function(event) {
    event.preventDefault();
    
    // Make a new table row
    newTableRow = $("<tr>");
    newTableRow.attr("scope", "row");

    // Make a new table columns
    $("<td>").text($("#trainName-input").val().trim()).appendTo(newTableRow);
    $("<td>").text($("#trainDestination-input").val().trim()).appendTo(newTableRow);
    $("<td>").text($("#trainFirst-input").val().trim()).appendTo(newTableRow);
    $("<td>").text($("#trainFrequency-input").val().trim()).appendTo(newTableRow);

    // Append table row to tbody, thus allowing it to appear on display
    newTableRow.appendTo("#initialTable")
   
    // make vars for firebase storage
    trainName = $("#trainName-input").val().trim();
    trainDestination = $("#trainDestination-input").val().trim();
    trainFirst = $("#trainFirst-input").val().trim();
    trainFrequency = $("#trainFrequency-input").val().trim();

    // Data reference with .push, so input data goes into firebase
    database.ref().push({
        name: trainName,
        destination: trainDestination,
        first: trainFirst,
        frequency: trainFrequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    // Clear out the forms
    $("#trainName-input").val(" ");
    $("#trainDestination-input").val(" ");
    $("#trainFirst-input").val(" ");
    $("#trainFrequency-input").val(" ");
});

// Update data in firebase  

// trainFrequency = $("#trainFrequency-input").val().trim();
// trainFirst = $("#trainFirst-input").val().trim();

// var timeConverted = moment(trainFirst, "HH:mm").sutract(1, "years");
