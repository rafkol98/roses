const functions = require('firebase-functions');

const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.sayHello = functions.https.onCall((data,context)=>{
    const namesRef = admin.database().ref('names');
    namesRef.child("alo").set("meow");
    return 'Hello ninjas!';
})


exports.writeName = functions.https.onCall((data, context) => {
   
        const name = data.name;
        const wordOne = data.wordOne.toUpperCase();
        const wordTwo = data.wordTwo.toUpperCase();
        const wordThree = data.wordThree.toUpperCase();
       
        const namesRef = admin.database().ref('names');

       
        var currentTimestamp = new Date().getTime();

        if(name.length<=25){
    
            console.log(name+" is all letters and under 25 characters");

            if(wordOne.length<=20 && wordTwo.length<=20 && wordThree.length<=20){
                var threeWords = wordOne+", "+wordTwo+", "+wordThree;
                console.log(threeWords+" is under 60 characters");
                //WRITE TO DATABASE.
                namesRef.child(currentTimestamp).child("name").set(name);
                namesRef.child(currentTimestamp).child("threeWords").set(threeWords);
               
            } else{
                console.log("One of the 3 words is more than 20 characters."); 
            }

        } else {
            console.log(name+" contains more than 25 characters.");
        }

  
});


// function allLetter(inputtxt) {
//     var letters = /^[A-Za-z]+$/;
//     if (inputtxt.value.match(letters)) {
//         return true;
//     } else {
//         return false;
//     }
// }
