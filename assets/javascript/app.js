function validateText(text){
	var regex = /^[a-zA-Z\s]+$/;
        if (regex.test(text)){
            return true;
        } else {
            return false;
        }
}

function validateDate(date){
	var regex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
		if(regex.test(date)){
			return true;
		} else {
			return false;
		}
}

function validateEmail(email){
	var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if(regex.test(email)){
		return true;
	} else {
		return false;
	}

}

function validatePhone(phone){
	var regex = /^[2-9]\d{2}-\d{3}-\d{4}$/;
	if (regex.test(phone)){
		return true;
	} else{
		return false;
	}
}

function validateCreditCards(cc){
	var regex = /^(\d{4}-){3}\d{4}$|^(\d{4} ){3}\d{4}$|^\d{16}$/;
	if (regex.test(cc)){
		return true;
	} else {
		return false;
	}
}




$(document).ready(function(){

	$("#submit").on("click", function(event){
		event.preventDefault();
		var input_location = $("#location").val();
		var input_date = $("#date").val();
		var queryURL = "https://api.eventful.com/json/events/search?keywords=concerts&location="+input_location+"&date=Future&app_key=FJQT56r7DBrkQKgc"

		$.ajax({
			url: queryURL,
		    method: "GET",
		    dataType: "jsonp"
			}).done(function(response){
		    	{
			    	var eventDiv = $("<div>").addClass("eventDiv");
		    		var result= response.events.event[i];
		    		var title = $("<p>").text(result.title);
		    		var date = $("<p>").text(moment(result.start_time).format("MMMM Do YYYY, h:mm a"));
		    		var venueName = $("<p>").text(result.venue_name);
		    		var venueAddress= $("<p>").text(result.venue_address);
		    		var cityName = $("<p>").text(result.city_name);
		    		var eventID = $("<p>").text(result.id);
		    		var event_img = $("<img>");
		    		var event_id = result.id;	
		    			if(result.image == null){
		    				console.log('sorry no pic');
		    			} else{
		    				var source = "https:" + result.image.medium.url;
		    				event_img.attr("src", source);
		    			}
		    		eventDiv.append(event_img, title, date, venueName, venueAddress, cityName, eventID, "<button class=\"findParking\" id=\"eventID\" >Find Parking</button>");

	    	 		$("#event_title").append(eventDiv);
	    	 	};

	    	 	$(".findParking").on("click",function(){
	    	 		var test= $("#id").val();
					var city=result.city_name;
					param_address = city;
					$(".eventDiv").hide();

			    	var qURL="https://maps.googleapis.com/maps/api/geocode/json?address="+param_address+"&key=AIzaSyACTToJ83QeuxyB1XttdgZ1MaVTMZSEoWg"
					$.ajax({
			    		url:qURL,
			    		method:"GET"
			    	}).done(function(response){
			    		lat = response.results[0].geometry.location.lat;
			    		long = response.results[0].geometry.location.lng;
			    		latitude = lat.toString();
			    		longitude = long.toString().slice(0,-1);

			    		var url ="http://api.parkwhiz.com/v4/quotes/?q=coordinates:"+lat+","+long+"&start_time=2017-12-01T12:00&end_time=2017-12-01T20:00&api_key=f7b2b035fff3071079e73edd3d9e42924c0c0eeb"
						$.ajax({
							url: url,
							method:"GET",
						}).done(function(response){
							for(var i=0; i<response.length; i++){
								var parkingDiv = $("<div>").addClass("parkingDiv");
					    		var result = response[i]._embedded["pw:location"];
					    		var parkingName = $("<p>").text(result.name); 
					    		var parkingAddress = $("<p>").text(result.address1);
					    		var parkingCityName = $("<p>").text(result.city);
					    		var parking_img = $("<img>");
					    		var source = result.photos[0].sizes.hub_frontpage.URL;
		    					parking_img.attr("src", source);
					    		parkingDiv.append(parkingName, parkingAddress,parkingCityName, parking_img, "<button  class=\"reserveParking\">Reserve this parking</button>");
					    		$("#event_title").append(parkingDiv);
							}
						});
			    	}); 
				}); 
			
			}); 
		});
	});

































