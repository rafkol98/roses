   $("#addBtn").click(function() {

    var name =  $("#name").val();
    var threeWords =  $("#threeWords").val();

  
    if(name.trim().indexOf(' ') == -1 && name.length <25){ 
        console.log(name +" " +threeWords);
        const requestBricks = firebase.functions().httpsCallable('writeName');
        requestBricks({name: name, threeWords:threeWords}).then(result => {
            console.log(result.data);
            alert(result.data);
            // window.location.href = "loggedIn.html";
        });




    } else {
        alert("Please enter just the first name (1 word) - max characters allowed are 25.");
    }




    
        
    });
    
  





