var config = {
    apiKey: "AIzaSyBGVOLHpcg_AyZVxrxheOsIWR3dUbQR6pg",
    authDomain: "train-times-47d49.firebaseapp.com",
    databaseURL: "https://train-times-47d49.firebaseio.com",
    projectId: "train-times-47d49",
    storageBucket: "train-times-47d49.appspot.com",
    messagingSenderId: "825557081947"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function() {
event.preventDefault();

var trainName = $("#train-name-input").val().trim();
var trainDestination = $("#destination-input").val().trim();
var firstTrain = $("#first-train-input").val().trim();
var trainFrequency = $("#frequency-input").val().trim();

var newTrain = {
    name: trainName,
    destination: trainDestination,
    first: firstTrain,
    frequency: trainFrequency,
};

database.ref().push(newTrain);

console.log(newTrain.name)
console.log(newTrain.destination);
console.log(newTrain.first);
console.log(newTrain.frequency);

$("#train-name-input").val("");
$("#destination-input").val("");
$("#first-train-input").val("");
$("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().first;
    var trainFrequency = childSnapshot.val().frequency;

    console.log(trainName);
    console.log(trainDestination);
    console.log(firstTrain);
    console.log(trainFrequency);

    var nextArrival = 


    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
    trainFrequency);
});