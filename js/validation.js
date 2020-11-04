   $("#addBtn").click(function() {
    const requestBricks = firebase.functions().httpsCallable('writeName');
    requestBricks({name: 'Alex', threeWords:"NICE, FUNNY, PROFESSOR"}).then(result => {
        console.log(result.data);
        alert(result.data);
        // window.location.href = "loggedIn.html";
    });
        
    });
    
  





