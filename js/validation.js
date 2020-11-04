   $("#addBtn").click(function() {

    var name =  $("#name").val();
    var wordOne =  $("#wordOne").val();
    var wordTwo =  $("#wordTwo").val();
    var wordThree =  $("#wordThree").val();

  
    if(name.trim().indexOf(' ') == -1 && name.length <25){ 
        console.log(name);

        if(wordOne.length<=20 && wordTwo.length<=20 && wordThree<=20){
            const requestBricks = firebase.functions().httpsCallable('writeName');
            requestBricks({name: name, wordOne: wordOne, wordTwo:wordTwo, wordThree:wordThree}).then(result => {
                console.log(result.data);
                // alert(result.data);
                // window.location.href = "loggedIn.html";
            });  
        } else{
            alert("Please ensure that all words are less or equal to 20 characters.")
        }
       




    } else {
        alert("Please enter just the first name (1 word) - max characters allowed are 25.");
    }




    
        
    });
    
  





