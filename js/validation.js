   $("#addBtn").click(function() {

    var name =  $("#name").val();
    var wordOne =  $("#wordOne").val();
    var wordTwo =  $("#wordTwo").val();
    var wordThree =  $("#wordThree").val();

  
    if(name.trim().indexOf(' ') == -1 && name.length <25 && name.length>=1 ){ 
        console.log(name);

        if(wordOne.length<=20 && wordOne.length>=1 && wordOne.trim().indexOf(' ') == -1 && wordTwo.trim().indexOf(' ') == -1 && wordTwo.length<=20 && wordTwo.length>=1 && wordThree.trim().indexOf(' ') == -1 && wordThree.length<=20 && wordThree.length>=1){
            const requestBricks = firebase.functions().httpsCallable('writeName');
            requestBricks({name: name, wordOne: wordOne, wordTwo:wordTwo, wordThree:wordThree}).then(result => {
                console.log(result.data);
                alert("Your loved one was submitted in the database. THANK YOU");
                $("#name").val("");
                $("#wordOne").val("");
                $("#wordTwo").val("");
                $("#wordThree").val("");
            });  
        } else{
            alert("Please ensure you fill all the spaces and each word is no longer than 20 characters.")
        }
       

    } else {
        alert("Please enter just the first name (1 word) - max characters allowed are 25.");
    }
        
});
    
  





