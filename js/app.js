$(document).ready(function () {
  
  // variables
  var searchType = 'email'; // starts as email by default
  const emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const proxyurl = "";
  const url = 'https://ltv-data-api.herokuapp.com/api/v1/records.json?';
  // DOM variables for DOM manipulation
  const _ = {
    searchByEmailBtn : document.querySelector("#btn-search-by-email"),
    searchByphoneBtn : document.querySelector("#btn-search-by-phone"),
    input : document.querySelector( ".form-control" ),
    errorMessage : document.querySelector( ".error-msg" )
  };
  
  $( "#btn-search-by-email" ).on( "click", function( e ) {
    e.preventDefault();
    
    _.searchByphoneBtn.classList.remove( "btn-warning" );
    _.searchByphoneBtn.classList.add( "btn-outline-warning" );
    _.searchByEmailBtn.classList.add( "btn-warning" );
    _.searchByEmailBtn.classList.remove( "btn-outline-warning" );
    _.errorMessage.innerText = "Please enter a valid email address";
    _.input.placeholder = "ENTER AN EMAIL ADDRESS";
    _.errorMessage.parentNode.classList.remove( "error" );
    
    searchType = 'email';
  });
  
  $( "#btn-search-by-phone").on( "click", function( e ) {
    e.preventDefault();
    
    _.searchByphoneBtn.classList.add( "btn-warning" );
    _.searchByphoneBtn.classList.remove( "btn-outline-warning" );
    _.searchByEmailBtn.classList.remove( "btn-warning" );
    _.searchByEmailBtn.classList.add( "btn-outline-warning" );
    _.errorMessage.innerText = "Please enter a valid phone number";
    _.input.placeholder = "ENTER A PHONE NUMBER";
    _.errorMessage.parentNode.classList.remove( "error" );
    
    searchType = 'phone';
  });
  
  function redirectToResultPage(){
    window.location.href = "result.html";
  }
  
  function request( urlPlusQueryString ) {
    fetch(proxyurl + urlPlusQueryString)
      .then((response) => response.text())
      .then(function (contents) {
        localStorage.setItem("userObject", contents);
        redirectToResultPage();
      })
      .catch((e) => console.log(e));
  }
    

  $("#btn-search").on("click", function (e) {

    e.preventDefault();
    localStorage.clear(); //Clears storage for next request
    var inputValue = _.input.value.toLowerCase();
    console.log( _.input );
    console.log( typeof(inputValue), inputValue );
    // Selecting type of search, if type of search email: email request, else: phone request
    if( searchType == "email" ) {
      // If email is valid proceed with the request, else show an error message
      if ( inputValue.match( emailRegEx ) ) {
        _.errorMessage.parentNode.classList.remove( "error" );
        const urlPlusQueryString = url + 'email=' + inputValue;
        // it makes a request to the api with an email address and redirects to page result
        request( urlPlusQueryString );
      } else {
        _.errorMessage.parentNode.classList.add( "error" );
      }
    } else {
      
    }

  });

  $('input[type="text"]').keypress(function (event) {
    email = $('input[type="text"]').val().toLowerCase();
    regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (email.match(regEx)) {
      x = true;
      document.querySelector('input[type="text"]').parentNode.classList.remove("error");
    } else {
      x = false;
    }
    keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
      /**
       * Makes a request to ltv API to search an specific email address.
       * If there's a response, it gets stored in the local storage and redirects to results page
       */
      event.preventDefault();
      localStorage.clear(); //Clears storage for next request

      var x, y;


      if (x === true) {
        const proxyurl = "";
        const url =
          'https://ltv-data-api.herokuapp.com/api/v1/records.json?email=' + email;
        fetch(proxyurl + url)
          .then((response) => response.text())
          .then(function (contents) {
            localStorage.setItem("userObject", contents);
            window.location.href = "result.html";
          })
          .catch((e) => console.log(e));
      } else if (x !== true) {
        document.querySelector('input[type="text"]').parentNode.classList.add("error");
      }
    }
  });

});
