console.log('loaded ');

angular.module('mailManager', ['vcRecaptcha'])
.controller('mailCtrl',[ '$http', '$scope', '$window', function( $http, $scope, $window ){
	$scope.server = 'http://54.88.65.90:3005'; // do not include trailing '/'
	$scope.key = "6Lef510UAAAAAHytDRJTVDGAUA_aMPaAnDDCkxV_";

	$scope.sendMail = function () {

	};


  // Recaptcha Logic
    $scope.setResponse = function (response) {
        console.info('Response available');
        $scope.response = response;
    };
    $scope.setWidgetId = function (widgetId) {
        console.info('Created widget ID: %s', widgetId);
        $scope.widgetId = widgetId;
    };
    $scope.cbExpiration = function() {
        console.info('Captcha expired. Resetting response object');
        vcRecaptchaService.reload($scope.widgetId);
        $scope.response = null;
     };

    $scope.submit = function () {
        console.log('sending the captcha response to the server', $scope.response);
		
		var payload = {
			"name":$scope.name,
			"email":$scope.email,
			"comment":$scope.comment

		};

		if (validatePayload(payload)) {
			console.log(payload);
			console.log('payload was good - hitting server');
			$scope.checkCaptcha(payload, function(result) {
        		console.log('server response', result);
        	})
		} else {
			console.log(payload);
			console.log('payload was bad');
		}
        
    };

    $scope.checkCaptcha = function (payload, cb) {
		console.log('testing captcha');
		payload.response = $scope.response;
		
	  // Load the view-data from the node.js server
	  	$http.post( $scope.server + '/checkCaptcha/', payload)
	  		.then(function(response) { 
	          console.log(response);
	          cb(true);      	
	        }). 
	        catch(function(error) { 
	          console.log(error);
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