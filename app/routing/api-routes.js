
// DEPENDENCIES

var bodyParser = require('body-parser');
var path = require('path');

// LOAD DATA

var friendsTable = require('../data/friends.js');

// ROUTING

module.exports = function(app) {
    // API GET Requests

    app.get('/api/friends', function(request, result) {
        result.json(friendsTable);
    });

    app.post("/api/friends", function(request, result) {
        var you = request.body;
        var newFriend = -1;
        var newFriendScore = 100;
        var currentFriendScore = 0;
        // Loop thru all friends in the friends table to identify the friend that have the lowest score difference 
        //and then return friend so modal opens showing the friend.
        
        for (i = 0; i < friendsTable.length; i++) {

            if (you != friendsTable[i]) {
                for (j = 0; j < you.scores.length; j++) {

                    currentFriendScore = currentFriendScore + Math.abs(friendsTable[i].scores[j] - you.scores[j]);
                }
                if (currentFriendScore <= newFriendScore) {
                    newFriend = i;
                    newFriendScore = currentFriendScore;
                }
                currentFriendScore = 0;
            }
        }
        friendsTable.push(you);
        newFriendDetails = friendsTable[newFriend];
        result.json(newFriendDetails);

    });

};