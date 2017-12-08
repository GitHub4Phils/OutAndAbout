var evntflRspns = new Array();
var parkngRspns = new Array();
//---------------------------------- user validation
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
	} else {
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
//-------------------------------------------- create PDF
function createPDF(data){
	var doc = new jsPDF();
	var posE1=60;
	var events = data.events
	var parkings = data.parkings
	doc.setFontSize(40);
	doc.text( 50, 25, "Out & About inc.");
	doc.text( 25, 25, "____________________");
	doc.setFontSize(12);
	doc.text(30,40,"Confirmation Id:");
	    doc.text(63,40,"#prBfs4t457")
	doc.text(30,45,"Name:");
	    doc.text(45, 45, data.name);
	doc.text(30,50,"ID:");
	    doc.text(40,50, data.id);
	doc.text(25,55,"---------------------------------------------------");
	for(var i=0; i<events.length; i++){
		doc.text(30,posE1,"Event:");
	    	doc.text(43, posE1, events[i].title);
	    	posE1 = posE1 + 5;
		doc.text(30,posE1,"Date of Event:");
		    doc.text(58,posE1, events[i].date)
		    posE1 = posE1 + 5;
		doc.text(30,posE1,"Address:");
		    doc.text(48,posE1, events[i].address);
		    posE1 = posE1 + 5;
		doc.text(30,posE1,"City:");
		    doc.text(40,posE1, events[i].city);
		    posE1 = posE1 + 5;
		doc.text(30,posE1,"Price: $");
		    doc.text(45,posE1, events[i].price.toString());
		    posE1 = posE1 + 5;
		doc.text(30,posE1,"Qty:");
		    doc.text(40,posE1, events[i].qty);
		    posE1 = posE1 + 5;
		    doc.text(25,posE1,"---------------------------------------------------");
			posE1 = posE1 + 5;
	}
	for(var i =0; i <parkings.length; i++){
		doc.text(30, posE1, "Parking Garage:");
		    doc.text(65, posE1,parkings[i].parkingName);
		    posE1 = posE1 + 5;
		doc.text(30, posE1, "Garage Address:");
		    doc.text(65, posE1,parkings[i].parkingAddress);
		    posE1 = posE1 + 5;
		doc.text(30, posE1, "Garage Price:");
		    doc.text(65, posE1,parkings[i].parkingPrice);
		    posE1 = posE1 + 5;
		doc.text(30, posE1, "Reserved Spot:");
		    doc.text(65, posE1,parkings[i].quantity);
		    posE1 = posE1 + 5;
		
	}
	    doc.setFontSize(40);
	doc.text(25, 270, "_____________________");
	    doc.setFontSize(12);
	    doc.text(40,280, "Address: Thompson Joe Center 2405 Robert Dedman Dr. Austin TX ");
        doc.text(43,285, "Email: customerService@awesome.net | Contact:(915)-800-1111");
	doc.save('a4.pdf');
}

$(document).ready(function(){
	$("#submit").on("click", function(event){
		event.preventDefault();
		$("#lclimg").html("<img src=assets/images/localevents.png>");
		$("#lclimg").show();
		$("#event_title").show();
		$(".eventDiv").hide();
		$(".parkingDiv").hide();
		$(".cart").show();

		var input_location = $("#location").val();
		if(validateText(input_location)){
		} else{
			$("#location").focus();
			return;
		}
		input_location = input_location.replace(/ /g, "+");
		var input_date = $("#date").val();
		if(validateDate(input_date)){
		} else{
			$("#date").focus();
			return;
		}
		input_date = input_date.replace(/ /g, "+");
//----------------------------------------------------- eventful api
		var queryURL = "https://api.eventful.com/json/events/search?keywords=concerts&location="+input_location+"&t="+input_date+"&app_key=FJQT56r7DBrkQKgc"

		$.ajax({
			url: queryURL,
		    method: "GET",
		    dataType: "jsonp"
			}).done(function(response){
		    	console.log(response);
		    	for(var i=0; i<response.events.event.length; i++)
		    	{
		    		var event_price = Math.floor(Math.random()*(150-50 +1))+50;
		    		response.events.event[i].price = event_price;
		    		evntflRspns.push(response.events.event[i]);
			    	var eventDiv = $("<div>").addClass("eventDiv");
		    		var result= response.events.event[i];
		    		var title = $("<p>").text(result.title);
		    		var date = $("<p>").text(moment(result.start_time).format("MMMM Do YYYY, h:mm a"));
		    		var venueName = $("<p>").text(result.venue_name);
		    		var venueAddress= result.venue_address;
		    		var cityName = result.city_name;
		    		var address = $("<p>").text(venueAddress + ", " + cityName);
		    		var event_img = $("<img>");
		    			if(result.image == null){
		    				console.log('sorry no pic');
		    			} else{
		    				var source = "https:" + result.image.medium.url;
		    				event_img.attr("src", source);
		    			}
		    		var price = $("<p>").text("$"+evntflRspns[i].price);
		    			
		    		eventDiv.append(event_img, title, date, venueName, address,price, 
		    			"<button class=\"addToCart\" event_id="+(evntflRspns.length-1)+">Add To Cart</button>", 
		    			"<button class=\"findParking\">Find Parking</button>");
	    	 		$("#event_title").append(eventDiv);
	    	 	};

	    	 	$(".addToCart").on("click",function(){
					var eventCartdiv = $("<div>").addClass("eventCartdiv");
					var delBtn = $("<button>Remove from Cart</button>").addClass("delBtn");
					var eventPos = $(this).attr("event_id");
					$(eventCartdiv).attr("id", eventPos);
					var eventObj_T = $("<p>").text(evntflRspns[eventPos].title);
					var eventObj_D = $("<p>").text(moment(evntflRspns[eventPos].start_time).format("MMMM Do YYYY, h:mm a"));
					var eventObj_VN= $("<p>").text(evntflRspns[eventPos].venue_name);
					var eventObj_VA = $("<p>").text(evntflRspns[eventPos].venue_address);
					var eventObj_CT= $("<p>").text(evntflRspns[eventPos].city_name);
					var price = $("<p>").text("$ "+evntflRspns[eventPos].price);
					eventCartdiv.append(eventObj_T, eventObj_D, eventObj_VN,eventObj_VN, eventObj_VA, eventObj_CT,price, " <input type='text' id='qty' placeholder='Ticket Qty'>", delBtn)

					$("#eventOrder").append(eventCartdiv);

					$(".delBtn").on("click", function(){
						$("#"+eventPos).remove();
					})
				});

	    	 	$(".findParking").on("click",function(){
	    	 		$("#lclimg").html("<img src=assets/images/parking.png>")
					var city=result.city_name;
					param_address = city;
					$(".eventDiv").hide();
//----------------- Geocode api call	

			    	var qURL="https://maps.googleapis.com/maps/api/geocode/json?address="+param_address+"&key=AIzaSyACTToJ83QeuxyB1XttdgZ1MaVTMZSEoWg"
					$.ajax({
			    		url:qURL,
			    		method:"GET"
			    	}).done(function(response){
			    		lat = response.results[0].geometry.location.lat;
			    		long = response.results[0].geometry.location.lng;
			    		latitude = lat.toString();
			    		longitude = long.toString().slice(0,-1);

//--------------------- Parkwhiz api call		

			    		var url ="http://api.parkwhiz.com/v4/quotes/?q=coordinates:"+lat+","+long+"&start_time=2017-12-01T12:00&end_time=2017-12-01T20:00&api_key=f7b2b035fff3071079e73edd3d9e42924c0c0eeb"
						$.ajax({
							url: url,
							method:"GET",
						}).done(function(response){
							for(var i=0; i<response.length; i++){
								parkngRspns.push(response[i]); 
								var parkingDiv = $("<div>").addClass("parkingDiv");
								$(parkingDiv).attr("id", i);
					    		var result = response[i]._embedded["pw:location"];
					    		var parkingName = $("<p>").text(result.name); 
					    		var parkingAddress = $("<p>").text(result.address1);
					    		var parkingCityName = $("<p>").text(result.city);
						    	var parkingPrice = $("<p>").text("$ " + response[i].purchase_options[0].price.USD);
					    		var parkingAvail = $("<p>").text("Status: " +response[i].purchase_options[0].space_availability.status);
					    		var parking_img = $("<img>");
					    		var source = result.photos[0].sizes.hub_frontpage.URL;
		    					parking_img.attr("src", source);
					    		parkingDiv.append(parkingName, parkingAddress,parkingCityName, parkingPrice,parkingAvail, parking_img,  "<button  class=\"reserveParking\" parking_id="+(parkngRspns.length-1)+">Reserve Spot</button>");
					    		$("#event_title").append(parkingDiv);
							}
							$(".reserveParking").on("click", function(){
								$("#event_title").hide();
								$("#lclimg").hide();
								var parkingCartDiv = $("<div>").addClass("parkingCartDiv");
								var parkingPos = $(this).attr("parking_id");
								var id_name= "p" + parkingPos;
								$(parkingCartDiv).attr("id", id_name);

								var Cart_ParkingName = parkngRspns[parkingPos]._embedded["pw:location"].name;
								var Cart_ParkingAddress = parkngRspns[parkingPos]._embedded["pw:location"].address1;
								var Cart_ParkingCity = parkngRspns[parkingPos]._embedded["pw:location"].city;
								var Cart_ParkingPrice = $("<p>").text("$ "+ parkngRspns[parkingPos].purchase_options[0].price.USD);
								var delBtn = $("<button>Remove from Cart</button>").addClass("delBtn");

								parkingCartDiv.append(Cart_ParkingName,Cart_ParkingAddress,Cart_ParkingCity,Cart_ParkingPrice, " <input type='text' id='spotQty' placeholder='Spot Qty'>", delBtn);
								$("#parkingOrder").append(parkingCartDiv);

								$(".delBtn").on("click", function(){
									$("#"+id_name).remove();
									$("#lclimg").show();
									$("#event_title").show();
								});
							})
						});
			    	});
				});
			
			}); 
	});
});

//-------------------------------------------------------------- firebase
var config = {
    apiKey: "AIzaSyAIMwpXcNenm3vzpRa9BlfGGWrv9gl-VC4",
    authDomain: "myawesomeproject-50e44.firebaseapp.com",
    databaseURL: "https://myawesomeproject-50e44.firebaseio.com",
    projectId: "myawesomeproject-50e44",
    storageBucket: "myawesomeproject-50e44.appspot.com",
    messagingSenderId: "1073694632622"
};
  	firebase.initializeApp(config);
  	var database = firebase.database();

	$("#add-user-btn").on("click", function(event) {
		event.preventDefault();

//-------------------user input------------------------------
		var clientName = $("#name-input").val().trim();
			if(validateText(clientName)){
			} else {
				$("#name-input").focus();
				return;
			}

		var clientEmail = $("#email-input").val().trim();
			if(validateEmail(clientEmail)){
			} else{
				$("#email-input").focus();
				return;
			}

		var clientPhone = $("#phone-input").val().trim();
			if (validatePhone(clientPhone)){
			} else {
				$("#phone-input").focus();
				return;
			}

		var clientCreditCard = $("#cc-input").val().trim();
			if(validateCreditCards(clientCreditCard)){
			} else{
				$("#cc-input").focus();
			}
		var clientId = clientCreditCard.substring(clientCreditCard.length-4,clientCreditCard.length);

		var newClient = {
			name:clientName,
			email:clientEmail,
			phone:clientPhone,
			creditCard:clientCreditCard,
			id:clientId,
			dateOrdered:Date.now(),
			events:[],
			parkings:[]
		};

//-----------------------------------------event data------------------------
		var eventOrderId = $(".eventCartdiv").attr("id");

		$(".eventCartdiv").each(function(index){
			console.log(index+ ": " + $(this).attr("id"));
			var id = $(this).attr("id");
			var eventOrderTitle = evntflRspns[parseInt(id)].title; 
			var eventOrderDate = evntflRspns[parseInt(id)].start_time;
			var eventOrderAddress= evntflRspns[parseInt(id)].venue_address;
			var eventOrderCity = evntflRspns[parseInt(id)].city_name;
			var eventOrderPrice = evntflRspns[parseInt(id)].price;
			var ticket_qty = $("#qty").val();

			var newEventOrder ={
				title:eventOrderTitle,
				date:eventOrderDate,
				address:eventOrderAddress,
				city:eventOrderCity,
				price:eventOrderPrice,
				qty:ticket_qty,
				
			}

			newClient.events.push(newEventOrder);
		});

//------------------------------------ Parking data -----------------------
		var parkingOrderId = $(".parkingCartDiv").attr("id");
			parkingOrderId = parseInt(parkingOrderId.match(/\d+/));
		var parkingNameOrder = parkngRspns[parkingOrderId]._embedded["pw:location"].name;
		var parkingAddressOrder = parkngRspns[parkingOrderId]._embedded["pw:location"].address1;
		var parkingPriceOrder = parkngRspns[parkingOrderId].purchase_options[0].price.USD
		var spot_qty = $("#spotQty").val();

		var newParkingOrder ={
			parkingName:parkingNameOrder,
			parkingAddress:parkingAddressOrder,
			parkingPrice:parkingPriceOrder,
			quantity:spot_qty,
		}
		newClient.parkings.push(newParkingOrder);
		database.ref("/client").push(newClient)
		
		$(".finalMessage").show();

		$("#name-input").val(""); 
		$("#email-input").val("");
		$("#phone-input").val("");
		$("#cc-input").val("");
		$("#location").val("");
		$("#date").val("");
		$(".eventCartdiv").hide();
		$(".parkingCartDiv").hide();

		createPDF(newClient);
	});


































































