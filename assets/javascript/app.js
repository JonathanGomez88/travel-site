
$("input[id='one-way']").on("click", function (event) {
  $(".return-class").hide()
})

$("input[id='round-trip']").on("click", function (event) {
  $(".return-class").show()
})


function roundTripDisplay(results, departureIATA, destinationIATA) {

  var resultsArray = results.results

  // console.log(resultsArray)

  for(var i = 0; i < resultsArray.length; i++) {
    
    var inboundDuration;
    var flightFare = resultsArray[i].fare.total_price
    var inboundArrivalDate;
    var airline;
    var outboundDuration;
    var outboundArrivalDate;
    var destinationAirport


 
  
    for(var y = 0; y <resultsArray[i].itineraries.length; y++) {

      console.log(resultsArray[i].itineraries[y])
      console.log(resultsArray[i].itineraries[y].inbound.duration)
      inboundDuration = resultsArray[i].itineraries[y].inbound.duration;
      console.log(inboundDuration)
      inboundArrivalDate = resultsArray[i].itineraries[y].inbound.flights[0].arrives_at.split("T");
      console.log(inboundArrivalDate)
      airline = resultsArray[i].itineraries[y].inbound.flights[0].marketing_airline;
      console.log(airline)
      


      outboundDuration = resultsArray[i].itineraries[y].outbound.duration;
      outboundArrivalDate = resultsArray[i].itineraries[y].outbound.flights[0].arrives_at.split("T");
      
      destinationAirport = destinationIATA

    }

    // This is where you want to append everything
    $("#flight-display > tbody").prepend("<tr><td>$" + flightFare + "</td><td>" + departureIATA + "</td><td>" + airline + "</td><td>" + outboundArrivalDate[0] + "</td><td>" + outboundArrivalDate[1] + "</td></tr>")
  
  }


}

// function reset() {

// }



// Click handlers which takes input and runs it through apis
$("#submit-btn").on("click", function (event) {


  event.preventDefault();

var departureDate = $("#departure-date").val();
var returnDate = $("#return-date").val();
var departureIATA = $("#departure-iata").val().trim();
var destinationIATA = $("#destination-iata").val().trim();

console.log(departureDate);
console.log(returnDate);
console.log(departureIATA);
console.log(destinationIATA);

  var oneWayQueryURL = "https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=%20vA7jW9vS5DQj5MHWkavbCHddVJqDV47d&origin=" + departureIATA + "&destination=" + destinationIATA + "&departure_date=" + departureDate + "&nonstop=true&number_of_results=10"
  console.log(oneWayQueryURL)

  var roundTripQueryURL = "https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=%20vA7jW9vS5DQj5MHWkavbCHddVJqDV47d&origin=" + departureIATA + "&destination=" + destinationIATA + "&departure_date=" + departureDate + "&return_date=" + returnDate + "&nonstop=true&number_of_results=10"

console.log(roundTripQueryURL)



// if else statement to determine one-way/round trip

if($("input[id='round-trip']:checked").val()) {
  $.ajax({
    url: roundTripQueryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    roundTripDisplay(response, departureIATA, destinationIATA)
  });
}  else {
  $.ajax({
    url: oneWayQueryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
  });
}
 
// clear submit input 

$("#departure-iata").val("")
$("#destination-iata").val("")
$("#departure-date").val("yyyy/MM/dd")
$("#return-date").val("yyyy/MM/dd")


})