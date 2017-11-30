// var param_address;
// var lat;
// var long;
// var latitude;
// var longitude;


// 		var queryURL = "https://api.eventful.com/json/events/search?keywords=concerts&location=Austin&date=Future&app_key=FJQT56r7DBrkQKgc"
// 	    $.ajax({

// 	      url: queryURL,
// 	      method: "GET",
// 	      dataType: "jsonp"
// 	    }).done(function(response) {
// 	    	console.log(response);
// 	    	console.log(response.events.event[0].image.medium.url);
// 	    	//var src = response.events.event[0].image.medium.url;
	    	
// 	    	 for(var i=0; i<response.events.event.length; i++){
// 		    	//var protocol="https:";
// 		    	var result= response.events.event[i];
// 	    	 	console.log(result.title)
// 	    		var div = $("<div>");
// 		    	div = $("<div>").append(result.title);
// 		    	var date = $("<div>");
// 		    	date = $("<div>").append(moment(result.start_time).format("MMMM Do YYYY, h:mm a"));
// 		    	var venue = $("<div>");
// 		    	venue = $("<div>").append(result.venue_name);
// 		    	var address =$("<div>");
// 		    	address= $("<div>").append(result.venue_address);
// 		    	// location= $("<div>").append(result.start_time);
		    	
// 		    	if(result.image == null){
// 		    		console.log('sorry no pic');
// 		    		$("#event").append(div, date, venue,address);

// 		    	} else{
// 			    	var source = "https:" + result.image.medium.url;
// 			    	//console.log(source);

// 			    	var event_img = $("<img>");

// 			    	event_img.attr("src", source);

// 			    	$("#event").append(event_img, div,date,venue,address);

// 			    }
// 		    var city=result.city_name;
// 	    	param_address = city;
	    		
// 	    	 }
// 	    	// var address =response.events.event[0].venue_address;
// 	    	// address = address.replace(/ /g, "+");
// 		    var postal_code = response.events.event[0].postal_code
// 		    // var state = response.events.event[0].region_abbr
// 	    	// param_address = (address+",+"+city+",+"+state);
// 	    	//console.log(param_address);   

// //------------------------------------------- GEOCODE

// 	    	var qURL="https://maps.googleapis.com/maps/api/geocode/json?address="+param_address+"&key=AIzaSyACTToJ83QeuxyB1XttdgZ1MaVTMZSEoWg"

// 	    	$.ajax({
// 	    		url:qURL,
// 	    		method:"GET"
// 	    	}).done(function(response){
// 	    		//console.log(response);
// 	    		lat = response.results[0].geometry.location.lat;
// 	    		long = response.results[0].geometry.location.lng;
// 	    		latitude = lat.toString();
// 	    		longitude = long.toString().slice(0,-1);
// 	    		console.log(latitude);
// 	    		console.log(longitude);
// //---------------------------------------------PARKWHIZ

// 	    		var url ="http://api.parkwhiz.com/v4/quotes/?q=coordinates:"+lat+","+long+"&start_time=2017-12-01T12:00&end_time=2017-12-01T20:00&api_key=f7b2b035fff3071079e73edd3d9e42924c0c0eeb"
// 					$.ajax({
// 						url: url,
// 						method:"GET",
// 					}).done(function(response){
// 						console.log(response);
// 						for(var i=0; i<response.length; i++){
// 							console.log(response[i]._embedded["pw:location"].name);
// 							var parking_name = $("<div>");
// 							 	parking_name = $("<div>").append(response[i]._embedded["pw:location"].name);
// 							 	$("#parking").append(parking_name);
// 							 var parking_img =$("<div>");
// 							 	 parking_img =$("<div>").append(response[i]._embedded["pw:location"].name)
// 						}
// 					}) // end for ajax call of parwhiz

// 	    	});
// 	   });
// -----------------------------------------------------------------


$(document).ready(function(){
//------------------------- when you click on the go button it should call the api of eventful	
	console.log("ready");
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
		    	console.log(response);
		    	//var addAnEventIcon = $("<button>");
// i think i need to put the buttons into a table...
		    	for(var i=0; i<response.events.event.length; i++)
		    	{
			    	var eventDiv = $("<div>").addClass("eventDiv");
		    		var result= response.events.event[i];
		    		var title = $("<p>").text(result.title);
		    		var date = $("<p>").text(moment(result.start_time).format("MMMM Do YYYY, h:mm a"));
		    		var venueName = $("<p>").text(result.venue_name);
		    		var venueAddress= $("<p>").text(result.venue_address);
		    		var cityName = $("<p>").text(result.city_name);
		    		var event_img = $("<img>");
		    	// add id to the div so we can show it later
		    		var event_id = result.id;	
		    		//var cons = eventDiv.attr("id", event_id);

		    		//console.log(cons);

		    			if(result.image == null){
		    				console.log('sorry no pic');
		    			} else{
		    				var source = "https:" + result.image.medium.url;
		    				event_img.attr("src", source);
		    			}
		    		eventDiv.append(event_img, title, date, venueName, venueAddress, cityName, "<button class=\"findParking\">Find Parking</button>");
	    	 		$("#event_title").append(eventDiv);
	    	 	};// end of for loop

	    	 	$(".findParking").on("click",function(){
					var city=result.city_name;
					param_address = city;
					$(".eventDiv").hide();


//--------------- Geocode api call	

			    	var qURL="https://maps.googleapis.com/maps/api/geocode/json?address="+param_address+"&key=AIzaSyACTToJ83QeuxyB1XttdgZ1MaVTMZSEoWg"
					alert("Parking");
					$.ajax({
			    		url:qURL,
			    		method:"GET"
			    	}).done(function(response){
			    		lat = response.results[0].geometry.location.lat;
			    		long = response.results[0].geometry.location.lng;
			    		latitude = lat.toString();
			    		longitude = long.toString().slice(0,-1);
			    		console.log(latitude);
			    		console.log(longitude);

//--------------------- Parkwhiz api call		

			    		var url ="http://api.parkwhiz.com/v4/quotes/?q=coordinates:"+lat+","+long+"&start_time=2017-12-01T12:00&end_time=2017-12-01T20:00&api_key=f7b2b035fff3071079e73edd3d9e42924c0c0eeb"
						$.ajax({
							url: url,
							method:"GET",
						}).done(function(response){
							console.log(response);
							for(var i=0; i<response.length; i++){
								console.log(response[i]._embedded["pw:location"].name);
							}
						});
							// for(var i=0; i<response.length; i++){
							// 	var parking_name = $("<div>");
							// 	parking_name = $("<div>").append(response[i]._embedded["pw:location"].name);
							//  	$("#parking").append(parking_name);
							// 	var parking_img =$("<div>");
							// 	parking_img =$("<div>").append(response[i]._embedded["pw:location"].name)
							// }
							//}) // end for ajax call of parwhiz

			    	}); // end of .done Geocode
				}); //end of .findParking
//----------------------------- calling geocode api				
			}); // of .done for eventful ajax
		});// end of submit button listener
	});// end document ready

































