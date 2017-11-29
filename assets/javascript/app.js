var param_address;
var lat;
var long;
var latitude;
var longitude;

		var queryURL = "https://api.eventful.com/json/events/search?keywords=concerts&location=Austin&date=Future&app_key=FJQT56r7DBrkQKgc"
	    $.ajax({

	      url: queryURL,
	      method: "GET",
	      dataType: "jsonp"
	    }).done(function(response) {
	    	console.log(response);
	    	// console.log(response.events.event[0].image.medium.url);
	    	//var src = response.events.event[0].image.medium.url;
	    	
	    	 for(var i=0; i<response.events.event.length; i++){
		    	//var protocol="https:";
		    	var result= response.events.event[i];
	    	 	console.log(result.title)
	    		var div = $("<div>");
		    	div = $("<div>").append(result.title);
		    	var date = $("<div>");
		    	date = $("<div>").append(moment(result.start_time).format("MMMM Do YYYY, h:mm a"));
		    	var venue = $("<div>");
		    	venue = $("<div>").append(result.venue_name);
		    	var address =$("<div>");
		    	address= $("<div>").append(result.venue_address);
		    	// location= $("<div>").append(result.start_time);
		    	
		    	if(result.image == null){
		    		console.log('sorry no pic');
		    		$("#event").append(div, date, venue,address);

		    	} else{
			    	var source = "https:" + result.image.medium.url;
			    	//console.log(source);

			    	var event_img = $("<img>");

			    	event_img.attr("src", source);

			    	$("#event").append(event_img, div,date,venue,address);

			    }
		    var city=result.city_name;
	    	param_address = city;
	    		
	    	 }
	    	// var address =response.events.event[0].venue_address;
	    	// address = address.replace(/ /g, "+");
		    var postal_code = response.events.event[0].postal_code
		    // var state = response.events.event[0].region_abbr
	    	// param_address = (address+",+"+city+",+"+state);
	    	//console.log(param_address);   

//------------------------------------------- GEOCODE

	    	var qURL="https://maps.googleapis.com/maps/api/geocode/json?address="+param_address+"&key=AIzaSyACTToJ83QeuxyB1XttdgZ1MaVTMZSEoWg"

	    	$.ajax({
	    		url:qURL,
	    		method:"GET"
	    	}).done(function(response){
	    		//console.log(response);
	    		lat = response.results[0].geometry.location.lat;
	    		long = response.results[0].geometry.location.lng;
	    		latitude = lat.toString();
	    		longitude = long.toString().slice(0,-1);
	    		console.log(latitude);
	    		console.log(longitude);
//---------------------------------------------PARKWHIZ

	    		var url ="http://api.parkwhiz.com/v4/quotes/?q=coordinates:"+lat+","+long+"&start_time=2017-12-01T12:00&end_time=2017-12-01T20:00&api_key=f7b2b035fff3071079e73edd3d9e42924c0c0eeb"
					$.ajax({
						url: url,
						method:"GET",
					}).done(function(response){
						console.log(response);
						for(var i=0; i<response.length; i++){
							console.log(response[i]._embedded["pw:location"].name);
							var parking_name = $("<div>");
							 	parking_name = $("<div>").append(response[i]._embedded["pw:location"].name);
							 	$("#parking").append(parking_name);
							 var parking_img =$("<div>");
							 	 parking_img =$("<div>").append(response[i]._embedded["pw:location"].name)
						}
					}) // end for ajax call of parwhiz

	    	});
	   });