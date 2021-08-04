firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;
    var email_id = user.email;
    if(user != null & email_id == "admin@nus.edu.sg"){

      window.location.href = "overview.html"

    }

  } else {
    //User Not Signed In
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
});

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);
    console.log(errorCode);

    // ...
  });

}

function signUp(){
  var email = document.getElementById("email").value;
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var data = {
    Email: email,
    Username: username
  }
  const promise = firebase.auth().createUserWithEmailAndPassword(email,password).then(cred =>  {
    return db.collection('users').doc(cred.user.uid).set(data)
  })
  //
  promise.catch(e=>alert(e.message));
  alert("SignUp Successfully");
}

function logout(){
  firebase.auth().signOut();
  window.location.href = "index.html"
}
