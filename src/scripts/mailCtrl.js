// console.log('loaded ');

angular.module('mailManager', ['vcRecaptcha'])
.controller('mailCtrl',[ '$http', '$scope', '$window', function( $http, $scope, $window ){
	// $scope.server = 'http://localhost:3005'; // do not include trailing '/'

	$scope.server = 'https://app.theblockchaininstitute.org'; // do not include trailing '/'
	$scope.key = "6Lef510UAAAAAHytDRJTVDGAUA_aMPaAnDDCkxV_";

	$scope.init = function () {
		$scope.status = "";
		$scope.display = {
        				"contactForm":"",
        				"successMessage":"hidden",
        				"errorMessage":"hidden",
        				"mc_signup":"",
        				"mc_signup_message":"hidden"
        			};
        $scope.submitButton = "Send Message";
        $scope.submitSubscribeButton = "Send";
        console.log('ran init and button is', $scope.submitSubscribeButton);

		};

	$scope.init();



  // Recaptcha Logic
    $scope.setResponse = function (response) {
        // console.info('Response available');
        $scope.response = response;
    };
    $scope.setWidgetId = function (widgetId) {
        // console.info('Created widget ID: %s', widgetId);
        $scope.widgetId = widgetId;
    };
    $scope.cbExpiration = function() {
        // console.info('Captcha expired. Resetting response object');
        vcRecaptchaService.reload($scope.widgetId);
        $scope.response = null;
     };

    $scope.submit = function () {
        // console.log('sending the captcha response to the server', $scope.response);
		
        $scope.submitButton = "Please wait.";

		var payload = {
			"name":$scope.name,
			"email":$scope.email,
			"phone":$scope.phone,
			"comment":$scope.comment

		};

		if (validatePayload(payload)) {
			// console.log(payload);
			// console.log('payload was good - hitting server');
			$scope.checkCaptcha(payload, function(result) {
        		// console.log('server response', result);
    			$scope.status = "Form submitted successfully. A member of our team will reach out soon!";
        		if(result) {
        			$scope.display = {
        				"contactForm":"hidden",
        				"successMessage":"",
        				"errorMessage":"hidden"
        			} 
        		} else {
        			$scope.status = "Contact us form temporarily disabled. Please feel free to sign up for our mailing list below.";        			
        			$scope.display = {
        				"contactForm":"hidden",
        				"successMessage":"hidden",
        				"errorMessage":""
        			} 
        		}
        	})
		} else {
			// console.log(payload);
			// console.log('payload was bad');
		}
        
    };

    $scope.subscribe = function () {
        // console.log('sending the captcha response to the server', $scope.response);
		
        $scope.submitSubscribeButton = "Please wait.";

		var payload = {
			"email":$scope.subscribe_email

		};

		if (validatePayload(payload)) {

			sendSubscribe(payload, function(result, error) {

        		if(result) {
        			if ('error' === result.data) {
					  noteErrorMessage(result.data);

        			}else {
	        			console.log('success', result)
	        			mc_success_message();
	        		}
        		} else {
        			console.log('failed', error)
        			noteErrorMessage(error)
        		}
        	})

		} else {

			console.log('payload was bad', payload);

		}
        
    };    

    function noteErrorMessage() {
    	$scope.ErrorMessage = 'Sorry, there was an issue subscribing to the list.';
    	$scope.display = {
    		"mc_sinup":"",
    		"mc_signup_message":""
    	}
    }

    function mc_success_message() {
    	$scope.ErrorMessage = 'Thanks!';
    	$scope.display = {
    		"mc_signup":"hidden",
    		"mc_signup_message":""
    	}
    }

    function sendSubscribe (payload, cb) {

    	$http.post( $scope.server + '/subscribe/', payload)
	  		.then(function(response) { 
	          // console.log(response);
	          cb(response, null);      	
      	      $scope.submitSubscribeButton = "Thanks!";

	        }). 
	        catch(function(error) { 
	          // console.log(error);
	          cb(null, error);
              $scope.submitSubscribeButton = "Failed";
	        
	        }); 

    }

    $scope.checkCaptcha = function (payload, cb) {
		// console.log('testing captcha');
		payload.response = $scope.response;
		
	  // Load the view-data from the node.js server
	  	$http.post( $scope.server + '/checkCaptcha/', payload)
	  		.then(function(response) { 
	          // console.log(response);
	          cb(true);      	
	        }). 
	        catch(function(error) { 
	          // console.log(error);
	          cb(false);
	        }); 

    }

  // Data validation
	function validatePayload (p) {
		if (!validateEmail(p.email)) {
			return false;
		} else {
			return true;
		} 
	}

	function validateEmail(email) {
	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(String(email).toLowerCase());
	}

	




}]);