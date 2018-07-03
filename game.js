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
        trainName: trainName,
        trainDestination: trainDestination,
        firstTrain: firstTrain,
        trainFrequency: trainFrequency,
        // nextTrain: nextTrain,
        // minLeft: min
    };

    database.ref().push(newTrain);

    console.log(newTrain.trainName)
    console.log(newTrain.trainDestination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.trainFrequency);

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().trainName;
    var trainDestination = childSnapshot.val().trainDestination;
    var firstTrain = moment(childSnapshot.val().firstTrain, 'HH:mm').format('X');
    var trainFrequency = childSnapshot.val().trainFrequency;
    var difference = moment().diff(moment.unix(firstTrain), "minutes")
    var timeLeft = moment().diff(moment.unix(firstTrain), 'minutes') % trainFrequency
    var min = moment(trainFrequency - timeLeft, 'mm').format('mm')
    var nextTrain = moment().add(min, 'm').format('hh:mm A')

    console.log(trainName);
    console.log(trainDestination);
    console.log(firstTrain);
    console.log(trainFrequency);

    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
    trainFrequency + "</td><td>" +nextTrain + "</td><td>" + min + "</td></tr>");
});