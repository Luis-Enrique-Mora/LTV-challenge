
$(document).ready(function () {

  // Variables
  const url = 'https://ltv-data-api.herokuapp.com/api/v1/records.json?';
  const proxyurl = "";
  const emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  var emailError = false;
  var phoneError = false;
  
  // it waits for a second to simulate loading page
  setTimeout( function() {
    var loadingSection = document.querySelector( ".loading" );
    var aboveTheFoldSection = document.querySelector( ".above-the-fold" );
    var featuresSection = document.querySelector( ".features");

    loadingSection.classList.add( "hide" );
    aboveTheFoldSection.classList.remove( "hide" );
    featuresSection.classList.remove( "hide" );
  }, 1000);
  
  // it request to the api and redirects to result page
  function request( urlAndQuerystring ) {
    fetch( proxyurl + urlAndQuerystring )
    .then( ( response ) => response.text() )
    .then( function ( contents ) {
      localStorage.setItem( "userObject", contents );
      window.location.href = "result.html";
    })
    .catch( ( e ) => console.log( e ) );
  }

  // execute logic in case of a click event on the btn
  $( "#btn-search-by-email" ).on( "click", function ( e ) {
    e.preventDefault();
    localStorage.clear(); //Clears storage for next request
    var emailValue = $( 'input[name="email"]' ).val().toLowerCase();

    if ( emailValue.match( emailRegEx ) ) {
      emailError = false;
    } else {
      emailError = true;
    }

    let emailInput = document.querySelector( 'input[name="email"]' );
    // if there is not error, execute the request, else show error message to the user
    if ( emailError === false ) {
        emailInput.parentNode.classList.remove( "error" );
        let urlAndQuerystring = url + 'email=' + emailValue;
        request( urlAndQuerystring );

    } else if ( emailError !== false ) {
      emailInput.parentNode.classList.add( "error" );
    }
  });

  // execute logic in case of pressing enter while typing in the email input
  $( 'input[name="email"]' ).keypress( function ( event ) {
    let emailValue = $( 'input[name="email"]' ).val().toLowerCase();
    let emailInput = document.querySelector( 'input[name="email"]' );

    if ( emailValue.match( emailRegEx ) ) {
      emailError = false;
      emailInput.parentNode.classList.remove( "error" );
    } else {
      emailError = true;
    }

    keycode = ( event.keyCode ? event.keyCode : event.which );
    if (keycode == '13') {
      event.preventDefault();
      /**
       * If no error: Makes a request to ltv API to search an specific email address.
       * If there's a response, it gets stored in the local storage and redirects to results page
       * 
       * If error: Display error message to the client
       */
      localStorage.clear(); //Clears storage for next request

      if (emailError === false) {
        // url + querystring
        let urlAndQuerystring = url + 'email=' + emailValue;
        // Request to the api and redirect to result page
        request( urlAndQuerystring );
      } else if ( emailError !== false ) {
        emailInput.parentNode.classList.add( "error" );
      }
    }
  });

  $( "#btn-search-by-phone" ).on( "click", function ( e ) {
    e.preventDefault();
    localStorage.clear(); //Clears storage for next request
    var phoneValue = parseInt( $( 'input[name="phone"]' ).val() );
    console.log(phoneValue, typeof(phoneValue));
    // phone validation
    phoneValue = typeof( phoneValue ) == 'number' && phoneValue.toString().length == 10 ? phoneValue : false;

    if ( phoneValue ) {
        phoneError = false;
    } else {
        phoneError = true;
    }

    let phoneInput = document.querySelector( 'input[name="phone"]' );
    
    if ( phoneError === false ) {
      phoneInput.parentNode.classList.remove( "error" );
      var urlAndQuerystring = url + 'phone=' + phoneValue;
      // Request to the LTV api and redirect to result page
      request( urlAndQuerystring );
    } else if ( phoneError !== false ) {
        phoneInput.parentNode.classList.add("error");
    }
  });

  // execute logic in case of pressing enter while typing in the phone input
  $( 'input[name="phone"]' ).keypress(function ( event ) {

    var phoneValue = parseInt( $( 'input[name="phone"]' ).val() );
    phoneValue = typeof( phoneValue ) == 'number' && phoneValue.toString().length == 10 ? phoneValue : false;
    
    if ( phoneValue ) {
        phoneError = false;
    } else {
        phoneError = true;
    }

    keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
      /**
       * Makes a request to ltv API to search an specific email address.
       * If there's a response, it gets stored in the local storage and redirects to results page
       */
      event.preventDefault();
      localStorage.clear(); //Clears storage for next request

      let phoneInput = document.querySelector( 'input[name="phone"]' );
      if ( phoneError === false ) {
        phoneInput.parentNode.classList.remove( "error" );
        var urlAndQuerystring = url + 'phone=' + phoneValue;
        // Request to the LTV api and redirect to result page
        request( urlAndQuerystring );
      } else if ( phoneError !== false ) {
          phoneInput.parentNode.classList.add( "error" );
      }
    }
  });

});
