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
    errorMessage : document.querySelector( ".error-msg" ),
    loadingSection : document.querySelector( ".loading" ),
    aboveTheFoldSection : document.querySelector( ".above-the-fold" ),
    featuresSection : document.querySelector( ".features"),
  };

  // it waits for a second to simulate loading page
  setTimeout( function() {
    _.loadingSection.classList.add( "hide" );
    _.aboveTheFoldSection.classList.remove( "hide" );
    _.featuresSection.classList.remove( "hide" );
  }, 1000);
  
  $( "#btn-search-by-email" ).on( "click", function( e ) {
    e.preventDefault();
    
    _.searchByphoneBtn.classList.remove( "btn-warning" );
    _.searchByphoneBtn.classList.add( "btn-outline-warning" );
    _.searchByEmailBtn.classList.add( "btn-warning" );
    _.searchByEmailBtn.classList.remove( "btn-outline-warning" );
    _.input.type = "text";
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
    _.input.type = "number";
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
    var inputValue = _.input.value;

    // Selecting type of search, if type of search email: email request, else: phone request
    if( searchType == "email" ) {
      var emailValue = inputValue.toLowerCase();
      // If email is valid proceed with the request, else show an error message
      if ( emailValue.match( emailRegEx ) ) {
        _.errorMessage.parentNode.classList.remove( "error" );
        const urlPlusQueryString = url + 'email=' + emailValue;
        // it makes a request to the api with an email address and redirects to page result
        request( urlPlusQueryString );
      } else {
        _.errorMessage.parentNode.classList.add( "error" );
      }
    } else {
      inputValue = parseInt( inputValue );
      // Phone validation, valid if phone equals to number and length = 10, else invalid = false
      let phoneValue = typeof( inputValue ) == 'number' && inputValue.toString().length == 10 ? inputValue : false;
      // If phone is valid proceed with the request, else show an error message
      if ( phoneValue ) {
        _.errorMessage.parentNode.classList.remove( "error" );
        const urlPlusQueryString = url + 'phone=' + phoneValue;
        // it makes a request to the api with a phone number and redirects to page result
        request( urlPlusQueryString );
      } else {
        _.errorMessage.parentNode.classList.add( "error" );
      }
    }
  });

  $('.form-control').keypress(function (event) {
    
    e.preventDefault();
    localStorage.clear(); //Clears storage for next request
    var inputValue = _.input.value;
    keycode = (event.keyCode ? event.keyCode : event.which);

    if (keycode == '13') {
      // Selecting type of search, if type of search email: email request, else: phone request
      if( searchType == "email" ) {
        var emailValue = inputValue.toLowerCase();
        // If email is valid proceed with the request, else show an error message
        if ( emailValue.match( emailRegEx ) ) {
          _.errorMessage.parentNode.classList.remove( "error" );
          const urlPlusQueryString = url + 'email=' + emailValue;
          // it makes a request to the api with an email address and redirects to page result
          request( urlPlusQueryString );
        } else {
          _.errorMessage.parentNode.classList.add( "error" );
        }
      } else {
        inputValue = parseInt( inputValue );
        // Phone validation, valid if phone equals to number and length = 10, else invalid = false
        let phoneValue = typeof( inputValue ) == 'number' && inputValue.toString().length == 10 ? inputValue : false;
        // If phone is valid proceed with the request, else show an error message
        if ( phoneValue ) {
          _.errorMessage.parentNode.classList.remove( "error" );
          const urlPlusQueryString = url + 'phone=' + phoneValue;
          // it makes a request to the api with a phone number and redirects to page result
          request( urlPlusQueryString );
        } else {
          _.errorMessage.parentNode.classList.add( "error" );
        }
      }
    }
  });

});
