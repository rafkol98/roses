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
   
        const name = data.name.toUpperCase();
        const wordOne = data.wordOne.toUpperCase();
        const wordTwo = data.wordTwo.toUpperCase();
        const wordThree = data.wordThree.toUpperCase();
       
        const namesRef = admin.database().ref('names');
       
        var currentTimestamp = new Date().getTime();

        if(name.trim().indexOf(' ') === -1 && name.length <25 && name.length>=1 ){
    
            console.log(name+" is all letters and under 25 characters");

            if(wordOne.length<=20 && wordOne.length>=1 && (wordOne.trim().indexOf(' ') === -1) && (wordTwo.trim().indexOf(' ') === -1) && wordTwo.length<=20 && wordTwo.length>=1 && (wordThree.trim().indexOf(' ') === -1) && wordThree.length<=20 && wordThree.length>=1){
                var threeWords = wordOne+", "+wordTwo+", "+wordThree;
                console.log(threeWords+" is under 60 characters");
                //WRITE TO DATABASE.
                namesRef.child(currentTimestamp).child("name").set(name);
                namesRef.child(currentTimestamp).child("threeWords").set(threeWords);
                namesRef.child(currentTimestamp).child("final").set(false);
               
            } else{
                console.log("One of the 3 words is more than 20 characters."); 
            }

        } else {
            console.log(name+" contains more than 25 characters.");
        }
        
});

//WHEN final becomes true, remove it from names table, put him to namesFinal table. Run every minute check if they become final==true , remove them. add them to final table.



exports.returnName = functions.https.onCall((data, context) => {
   return admin.database().ref('namesFinal').once('value').then(function(snapshot) {
        var numberOfChildren = snapshot.numChildren();
        
        var randomNum = Math.floor(Math.random() * numberOfChildren) + 1;
     
        
        console.log("numberOfChildren "+numberOfChildren);
        console.log("randomNum "+randomNum);

        var string = "1604495333873"
        
        var count = 0;
        snapshot.forEach((child) => {
          count++;
          //if count is the random number.
          if(count===randomNum){
            //get uid of random selected.
            var key = child.val();
            
          
            string = key;
            console.log(string);
            
          }});
          console.log(string+" alo");
          return string;
    }).catch(error => {
        console.log(error)})
 
});


exports.truncate = functions.database.ref('/names/{timestamp}').onWrite(async (change) => {
    const parentRef = change.after.ref.parent;
    const snapshot = await parentRef.once('value');
    var key =snapshot.key;
    var numChildren =snapshot.numChildren();
    console.log("numChildren is: "+numChildren+" key: "+key);
    if (snapshot.numChildren() === 2) {
        console.log("SOMEONE TRIED TO CHEAT THE SYSTEM, not 2 children were tried to be entered. key timestamp:"+key)
        
    }
    return null;
  });


exports.taskRunner = functions.runWith({memory: '2GB'}).pubsub.schedule('* * * * *').onRun(async context => {
    return admin.database().ref('names').once('value').then(function (snapshot) {
        console.log("taskRunner running.")
        const namesFinalRef = admin.database().ref('namesFinal');

        snapshot.forEach((child) => {
            console.log("checking child "+child.key)
            if (child.hasChild("final")) {
                if (child.child("final").val() === true) {
                    console.log("child key"+child.key)
                    namesFinalRef.child(child.key).set(child.val());
                    admin.database().ref('names/' + child.key).remove();
                }
            }

        });

        return null;
    });
});
