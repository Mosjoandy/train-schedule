# train-schedule


## Overview

This project was designed to utilize firebase and moment in dynamically creating and remaining persistent in train schedule data. Users can input their train names, destination, time at first pass, and the intervals. The input data is then stored in a google firebase, then called and posted to the display.
* * *
![Train Scheduler](https://cdn.discordapp.com/attachments/276798661256806410/443580743722205185/unknown.png)

## Process

- When the page has been loaded, the user is presented with a static screen containing a title, train data, and a train data submission form.
- Users can input their train data in the appropriate forms and submit.
- The data is converted and stored in google firebase.
- Once the data is pushed into firebase, it is then immediately called upon.
- The table is dynamically created with jQuery and appended to train schedule.

## Logic

### functions:

- Part of the codeblock in the submit on click function.
- This code takes in user input for train data, then converts and pushes it into values on firebase.

```trainName = $("#trainName-input").val().trim();
    trainDestination = $("#trainDestination-input").val().trim();
    trainFirst = $("#trainFirst-input").val().trim();
    trainFrequency = $("#trainFrequency-input").val().trim();

    database.ref().push({
        name: trainName,
        destination: trainDestination,
        first: trainFirst,
        frequency: trainFrequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
```

- This function calls on the firebase train data and utilizes "child_added".
- Uses "snapshot", followed by a time conversion to display minutes to arrival and frequency.

```
database.ref().on("child_added", function(snapshot) {

    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var first = snapshot.val().first;
    var frequency = snapshot.val().frequency;

        var tFrequency = frequency;
        var firstTime = first;
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        var currentTime = moment();
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        var tRemainder = diffTime % tFrequency;
        var tMinutesTillTrain = tFrequency - tRemainder;
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
```

- Using jQuery, the train data pulled from firebase can then be dynamically created and appended to a hook in the HTML.

```
$("#initialTable").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" +
first + "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
```

## CDN's Used

- Bootstrap v4.1.0 - [getbootstrap](https://getbootstrap.com/)
- jQuery v3.3.1 (uncompressed) - [jQuery core](https://code.jquery.com/)
- Moment.js 2.22.1 - [Moment.js](https://momentjs.com/)

## Database

- Firebase 5.0.1 - [Google Firebase](https://firebase.google.com/)