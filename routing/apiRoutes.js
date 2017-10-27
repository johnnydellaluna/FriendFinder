var friends = require("../app/data/friends.js");

var express = require('express');
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

module.exports = function(app) {

app.get("/api/friends", function(req, res) {
    res.json(friends);
});

app.post("/api/friends", function(req, res) {

    var newSurvey = req.body;

    var newFriendArray = [];

    for (var i = 0; i < friends.length; i++) {
        var scoreDifference = 0;

        for (var k = 0; i < friends[i].scores.length; k++) {
            var difference = Math.abs(friends[i].scores[k] - newSurvey.scores[k]);

            scoreDifference += difference;
        }

        newFriendArray.push({
            name: friends[i].name,
            photo: friends[i].photo,
            totalDifference: scoreDifference
        });
    }

    var highScore = 50;

    for (var i = 0; i < newFriendArray.length; i++) {
        if (newFriendArray[i].totalDifference < highScore) {
            highScore = newFriendArray[i].totalDifference;
        }
    }

    var pickedFriend = {};

    for (var i = 0; i < newFriendArray.length; i++) {
        if (newFriendArray[i].totalDifference === highScore) {
            pickedFriend = newFriendArray[i];
        }
    }

    res.json(pickedFriend);

    friends.push(newSurvey);

});

};