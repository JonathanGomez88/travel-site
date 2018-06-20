
$("input[id='one-way']").on("click", function (event) {
  $(".return-class").hide()
  $("#returnAirport").hide()
  $("#returnDate").hide()
  $("#returnTime").hide()
})

$("input[id='round-trip']").on("click", function (event) {
  $(".return-class").show()
  $("#returnAirport").show()
  $("#returnDate").show()
  $("#returnTime").show()
})


function roundTripDisplay(results) {

  var resultsArray = results.results

  console.log(resultsArray)

  for(var i = 0; i < resultsArray.length; i++) {
    
    var inboundDuration;
    var flightFare = resultsArray[i].fare.total_price
    var inboundArrivalDate;
    var airline;
    var outboundDuration;
    var outboundArrivalDate;
    var destinationAirport
    var departureAirport
    



  
    for(var y = 0; y < resultsArray[i].itineraries.length; y++) {

      
      inboundDuration = resultsArray[i].itineraries[y].inbound.duration;
      inboundArrivalDate = moment(resultsArray[i].itineraries[y].inbound.flights[0].arrives_at);
      airline = resultsArray[i].itineraries[y].inbound.flights[0].marketing_airline;
      outboundDuration = resultsArray[i].itineraries[y].outbound.duration;
      outboundArrivalDate = moment(resultsArray[i].itineraries[y].outbound.flights[0].arrives_at);
      destinationAirport = resultsArray[i].itineraries[y].inbound.flights[0].destination.airport;
      departureAirport =  resultsArray[i].itineraries[y].inbound.flights[0].origin.airport;
      var airlineName = '';
      
      var aeQueryURL = "https://aviation-edge.com/api/public/airlineDatabase?key=526f3f-81b813-daa58b-cf4f23-0f0bfd&codeIataAirline=" + airline

      $.ajax({
        url: aeQueryURL,
        method: "GET"
      }).then(function (response) {
        var res = JSON.parse(response)
        console.log(res[0].nameAirline)
        airlineName = res[0].nameAirline
        $("#flight-display > tbody").prepend("<tr><td>$" + flightFare + "</td><td>" + airlineName + "</td><td>" + destinationAirport + "</td><td>" + outboundArrivalDate.format("MM/DD/YYYY") + "</td><td>" + outboundArrivalDate.format("hh:mm a") + "</td><td>" + departureAirport + "</td><td>" + inboundArrivalDate.format("MM/DD/YYYY") + "</td><td>" + inboundArrivalDate.format("hh:mm a") + "</td></tr>")
      });
      
    

    // This is where you want to append everything
    
    }
  }


}


function oneWayDisplay(results) {

  var resultsArray = results.results

  console.log(resultsArray)

  for(var i = 0; i < resultsArray.length; i++) {
    
    var flightFare = resultsArray[i].fare.total_price
    var airline;
    var outboundDuration;
    var outboundArrivalDate;
    var departureAirport;


 
  
    for(var y = 0; y < resultsArray[i].itineraries.length; y++) {

      
      airline = resultsArray[i].itineraries[y].outbound.flights[0].marketing_airline;
      outboundDuration = resultsArray[i].itineraries[y].outbound.duration;
      outboundArrivalDate = moment(resultsArray[i].itineraries[y].outbound.flights[0].arrives_at);
      departureAirport = resultsArray[i].itineraries[y].outbound.flights[0].origin.airport;

      var aeQueryURL = "https://aviation-edge.com/api/public/airlineDatabase?key=526f3f-81b813-daa58b-cf4f23-0f0bfd&codeIataAirline=" + airline

      $.ajax({
        url: aeQueryURL,
        method: "GET"
      }).then(function (response) {
        console.log(aeQueryURL)
        console.log(response);
        console.log(response[0].nameAirline);

        var res = JSON.parse(response)
        console.log(res[0].nameAirline)
        airlineName = res[0].nameAirline

            // This is where you want to append everything
    $("#flight-display > tbody").prepend("<tr><td>$" + flightFare + "</td><td>" + airlineName + "</td><td>" + departureAirport + "</td><td>" + outboundArrivalDate.format("MM/DD/YYYY") + "</td><td>" + outboundArrivalDate.format("hh:mm a") + "</td></tr>")
        
      });


    }
  }

 
  

}







// Click handlers which takes input and runs it through apis
$("#submit-btn").on("click", function (event) {


  event.preventDefault();

var departureDate = $("#departure-date").val();
var returnDate = $("#return-date").val();
var departureIATA = $("#departure-iata").val().trim();
var destinationIATA = $("#destination-iata").val().trim();


  var oneWayQueryURL = "https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=%20vA7jW9vS5DQj5MHWkavbCHddVJqDV47d&origin=" + departureIATA + "&destination=" + destinationIATA + "&departure_date=" + departureDate + "&nonstop=true&number_of_results=10"
  

  var roundTripQueryURL = "https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=%20vA7jW9vS5DQj5MHWkavbCHddVJqDV47d&origin=" + departureIATA + "&destination=" + destinationIATA + "&departure_date=" + departureDate + "&return_date=" + returnDate + "&nonstop=true&number_of_results=10"





// if else statement to determine one-way/round trip

if($("input[id='round-trip']:checked").val()) {
  $.ajax({
    url: roundTripQueryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    roundTripDisplay(response)
  });
}  else {
  $.ajax({
    url: oneWayQueryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    oneWayDisplay(response)
  });
}
 
// clear submit input 

$("#departure-iata").val("")
$("#destination-iata").val("")
$("#departure-date").val("yyyy/MM/dd")
$("#return-date").val("yyyy/MM/dd")







})



