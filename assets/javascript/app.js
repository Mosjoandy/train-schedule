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

// Making var's for the submit button
var trainName = "";
var trainDestination = "";
var trainFirst = "";
var trainFrequency = "";

// Submit button takes all data in forms 
$("#addTrainButton").on("click", function(event) {
    event.preventDefault();

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

// Call firebase database based on dateAdded and print to screen all existing objects with append
database.ref().on("child_added", function(snapshot) {

    // pulling firebase data
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var first = snapshot.val().first;
    var frequency = snapshot.val().frequency;

        // setting var to firebase frequency
        var tFrequency = frequency;

        // setting var to firebase first
        var firstTime = first;

        //remove the years
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

        // Current Time
        var currentTime = moment();

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

        // Time apart using modular 
        var tRemainder = diffTime % tFrequency;

        // Minute Until Train
        var tMinutesTillTrain = tFrequency - tRemainder;

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    // dynamically creating and appending a new row in the table with new columns containing all the relavant train data
$("#initialTable").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" +
first + "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");

});