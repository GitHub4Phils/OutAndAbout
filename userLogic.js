// focus on getting the user name all the time
$("#username-input").focus(); 

function ValidateEmail(email)   
{  
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))  
  {  
    return (true);  
  }  else
  {
    alert("Please enter a valid email address!") ; 
    return (false)  ;
  }
}  

function validatePhone(phone)  
{  
  var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;  
  if (phone.value.match(phoneno))  
        {  
          return true;  
        }  
      else  
        {  
        alert("Please enter correct phone format");  
        return false;  
        }  
}  



// Initialize Firebase
  var config = {
    apiKey: "AIzaSyD_vpYQZnUe9ENFciN6nDU4352kJt92xJc",
    authDomain: "outandabout-ddea5.firebaseapp.com",
    databaseURL: "https://outandabout-ddea5.firebaseio.com",
    projectId: "outandabout-ddea5",
    storageBucket: "outandabout-ddea5.appspot.com",
    messagingSenderId: "436267379416"
  };
  firebase.initializeApp(config);

var database = firebase.database();



//  Button for adding users
$("#add-user-btn").on("click", function(event) {
  event.preventDefault();
  //console.log(ValidateEmail("maroseray@yahoo.com"));

  // Grabs user input
  var name    = $("#name-input").val().trim();
  var email   = $("#email-input").val().trim();
  var phone   = $("#phone-input").val().trim();
  var eventid = $("#eventid-input").val().trim();
  var eventname  = $("#eventname-input").val().trim();
  var eventdate  = $("#eventdate-input").val().trim();

  // //validate email
  if (ValidateEmail(email)===true){


    //if (validatePhone(phone)===true){
    // if (validatePhone(phone)===true){

      // Creates local "temporary" object for holding user data
      var newUser = {
        name:      name,
        email:     email,
        phone:     phone,
        eventid:   eventid,
        eventname: eventname,
        eventdate: eventdate
        
      };

      // Uploads user data to the database
      //database.ref().push(newUser);
      database.ref('users/' + name).set(newUser);
      var d= new Date();
      var militarynow = d.getTime();

      // Logs everything to console
      console.log(newUser.name);
      console.log(newUser.email);
      console.log(newUser.phone);

      // Alert
      //alert("user successfully added");

      // Clears all of the text-boxes
        $("#name-input").val("");
        $("#email-input").val("");
        $("#phone-input").val("");
        $("#eventname-input").val("");
        $("#eventid-input").val("");
        $("#eventdate-input").val("");
        $("#name-input").focus();


      } else{
        //shoot the data back in the form fields

        $("#name-input").val(name);
        $("#email-input").val(email);
        $("#email-input").focus();
        $("#phone-input").val(phone);
        $("#eventid-input").val(eventid);
        $("#eventname-input").val(eventname);
        $("#eventdate-input").val(eventdate);
       } 

    // } else {
    //   //shoot the data back in the form fields
    //     $("#name-input").val(name);
    //     $("#email-input").val(email);
    //     $("#phone-input").focus();
    //     $("#phone-input").val(phone);
    //     $("#eventid-input").val(eventid);
    //     $("#eventname-input").val(eventname);
    //     $("#eventdate-input").val(eventdate);
    // }
    // } else {
    //   //shoot the data back in the form fields
    //     $("#name-input").val(name);
    //     $("#email-input").val(email);
    //     $("#phone-input").focus();
    //     $("#phone-input").val(phone);
    // }
  
});

// this line repopulates the data sets from firebase after something has been added or updated
database.ref("users/").on("child_changed", function(childSnapshot, prevChildKey) {
  //console.log("this is under child_changed event of firebase")
  //console.log(childSnapshot.val());

  // Store everything into a variable.
  var UserName      = childSnapshot.val().name;
  var email         = childSnapshot.val().email;
  var phone         = childSnapshot.val().phone;
  var eventid       = childSnapshot.val().eventid;
  var eventname     = childSnapshot.val().eventname;
  var eventdate     = childSnapshot.val().eventdate;

  // User Info
  // console.log(UserName);
  // console.log(email);
  // console.log(phone);

   // Add each user's data into the table
   $("#user-table > tbody").append("<tr class='user' id='"+UserName+"'><td>" + UserName + "</td><td>" + email + "</td><td>"+phone+"</td><button id='"+UserName+"'>Edit</button>&nbsp;<button>Delete</button></td></tr>");


});


//this line starts populating the firebase database list on page load
database.ref("users/").on("child_added", function(childSnapshot, prevChildKey) {
  //console.log("this is under child_added event of firebase")
  //console.log(childSnapshot.val());

  //populateData();
  // Store everything into a variable.
  var userName   = childSnapshot.val().name;
  var email      = childSnapshot.val().email;
  var phone      = childSnapshot.val().phone;

  // show User Info
  // console.log(userName);
  // console.log(email);
  // console.log(phone);


   // Add each user's data into the table
   $("#user-table > tbody").append("<tr class='user' id='"+userName+"'><td>" + userName + "</td><td>" + email + "</td><td>"+phone+"</td><td>&nbsp;<button id='"+userName+"'>Edit</button>&nbsp;<button>Delete</button></td></tr>");


  
});



