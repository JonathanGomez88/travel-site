// this submits when enter is pressed
$("input").keyup(function (event) {
  if (event.keyCode === 13) {
    $("#submit-btn").click();
    $(this).val('');
  }
})

$("input[id='one-way']").on("click", function (event) {
  $(".return-class").hide()
})

$("input[id='round-trip']").on("click", function (event) {
  $(".return-class").show() 
})


function roundTripDisplay(results) {
  var resultsArray = results.results
  console.log(resultsArray)

  for (let i = 0; i < resultsArray.length; i++) {
    for (let y = 0; y < resultsArray[i].itineraries.length; y++) {
      var airline = resultsArray[i].itineraries[y].inbound.flights[0].marketing_airline;
      var aeQueryURL = "https://aviation-edge.com/api/public/airlineDatabase?key=9b19be-736be9-6955e9-60dab9-9ea13c&codeIataAirline=" + airline
      $.ajax({
        url: aeQueryURL,
        method: "GET"
      }).then(function (response) {
        var res = JSON.parse(response)
        var airlineName = res[0].nameAirline;

        var inboundDuration = resultsArray[i].itineraries[y].inbound.duration;
        var flightFare = resultsArray[i].fare.total_price;
        var inboundArrivalDate = moment(resultsArray[i].itineraries[y].inbound.flights[0].arrives_at);
        var outboundDuration = resultsArray[i].itineraries[y].outbound.duration;
        var outboundArrivalDate = moment(resultsArray[i].itineraries[y].outbound.flights[0].arrives_at);
        var destinationAirport = resultsArray[i].itineraries[y].inbound.flights[0].destination.airport;
        var departureAirport = resultsArray[i].itineraries[y].inbound.flights[0].origin.airport;
        var flightNumberOut = resultsArray[i].itineraries[y].outbound.flights[0].flight_number
        var flightNumberIn = resultsArray[i].itineraries[y].inbound.flights[0].flight_number

        var time = outboundDuration;
        var hour = time.substr(0, 2)
        var minutes = time.substr(3, 4)
        var outboundDurationDisplay = hour + "h " + minutes + 'm';

        var time = inboundDuration;
        var hour = time.substr(0, 2)
        var minutes = time.substr(3, 4)
        var inboundDurationDisplay = hour + "h " + minutes + 'm';

        $("#flight-display > tbody").prepend("<tr><td>$" + flightFare + "</td><td>" + airlineName + "</td><td>" + destinationAirport + "</td><td>" + flightNumberOut + "</td><td>" + outboundArrivalDate.format("MM/DD/YYYY") + "</td><td>" + outboundArrivalDate.format("hh:mm a") + "<br>" + "(" + outboundDurationDisplay + ")" + "</td><td>" + departureAirport + "</td><td>" + flightNumberIn + "</td><td>" + inboundArrivalDate.format("MM/DD/YYYY") + "</td><td>" + inboundArrivalDate.format("hh:mm a") + "<br>" + "(" + inboundDurationDisplay + ")" + "</td></tr>")
      });
    }
  }
}

function oneWayDisplay(results) {
  var resultsArray = results.results
  console.log(resultsArray)

  for (let i = 0; i < resultsArray.length; i++) {
    for (let y = 0; y < resultsArray[i].itineraries.length; y++) {
      var airline = resultsArray[i].itineraries[y].outbound.flights[0].marketing_airline;
      var aeQueryURL = "https://aviation-edge.com/api/public/airlineDatabase?key=6d7024-f62f82-09d9fc-a91c4a-e4539c&codeIataAirline=" + airline

      $.ajax({
        url: aeQueryURL,
        method: "GET"
      }).then(function (response) {
        console.log()
        console.log();
        var res = JSON.parse(response)
        console.log()
        airlineName = res[0].nameAirline

        var outboundDuration = resultsArray[i].itineraries[y].outbound.duration;
        var flightFare = resultsArray[i].fare.total_price;
        var destinationAirport = resultsArray[i].itineraries[y].outbound.flights[0].destination.airport;
        var outboundArrivalDate = moment(resultsArray[i].itineraries[y].outbound.flights[0].arrives_at);
        var departureAirport = resultsArray[i].itineraries[y].outbound.flights[0].origin.airport;
        var flightNumberOut = resultsArray[i].itineraries[y].outbound.flights[0].flight_number

        var time = outboundDuration;
        var hour = time.substr(0, 2)
        var minutes = time.substr(3, 4)
        var outboundDurationDisplay = hour + "h " + minutes + 'm';

        $("#flight-display > tbody").prepend("<tr><td>$" + flightFare + "</td><td>" + airlineName + "</td><td>" + departureAirport + "</td><td>" + flightNumberOut + "</td><td>" + outboundArrivalDate.format("MM/DD/YYYY") + "</td><td>" + outboundArrivalDate.format("hh:mm a") + "<br>" + "(" + outboundDurationDisplay + ")" + "</td><td>" + destinationAirport + "</td><td>" + "N/A" + "</td><td>" + "N/A" + "</td><td>" + "N/A" + "</td></tr>")

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


  var oneWayQueryURL = "https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=%20vA7jW9vS5DQj5MHWkavbCHddVJqDV47d&origin=" + departureIATA + "&destination=" + destinationIATA + "&departure_date=" + departureDate + "&nonstop=true&number_of_results=5"


  var roundTripQueryURL = "https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=%20vA7jW9vS5DQj5MHWkavbCHddVJqDV47d&origin=" + departureIATA + "&destination=" + destinationIATA + "&departure_date=" + departureDate + "&return_date=" + returnDate + "&nonstop=true&number_of_results=5"





  // if else statement to determine one-way/round trip

  if ($("input[id='round-trip']:checked").val()) {
    $.ajax({
      url: roundTripQueryURL,
      method: "GET",
      error: function (err) {
        console.log("i have a bad feeling about this")
        $(".modal").modal();
      $("#modal1").modal("open");
      }
    }).then(function (response) {
      console.log(response);
      roundTripDisplay(response)
    });
  } else {
    $.ajax({
      url: oneWayQueryURL,
      method: "GET",
      error: function (err) {
        console.log("i have a bad feeling about this")
        $(".modal").modal();
      $("#modal1").modal("open");
      }
      
    }).then(function (response) {
      console.log(response);
      oneWayDisplay(response);
    });
  }




  // clear submit input 

  $("#departure-iata").val("")
  $("#destination-iata").val("")
  $("#departure-date").val("yyyy/MM/dd")
  $("#return-date").val("yyyy/MM/dd")

})




