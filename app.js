


// Click handlers which takes input and runs it through apis
$("#submit-btn").on("click", function (event) {
  event.preventDefault();

var departureDate = $("#departure-date").val();
var returnDate = $("#return-date").val();
var departureIATA = $("#departure-iata").val();
var destinationIATA = $("#destination-iata").val();

console.log(departureDate);
console.log(returnDate);
console.log(departureIATA);
console.log(destinationIATA);

  var oneWayQueryURL = "api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=%20vA7jW9vS5DQj5MHWkavbCHddVJqDV47d&origin=" + departureIATA + "&destination=" + destinationIATA + "&departure_date=" + departureDate
  console.log(oneWayQueryURL)

  var roundTripQueryURL = "api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=%20vA7jW9vS5DQj5MHWkavbCHddVJqDV47d&origin=" + departureIATA + "&destination=" + destinationIATA + "&departure_date=" + departureDate + "&return_date=" + returnDate

console.log(roundTripQueryURL)



// if else statement to determine one-way/round trip
 
// if(onewaychecked) {
// $.ajax({
//     url: oneWayQueryURL,
//     method: "GET"
//   }).then(function (response) {
//     console.log(response);
//   });
// } else {
//   $.ajax({
//     url: roundTripQueryURL,
//     method: "GET"
//   }).then(function (response) {
//     console.log(response);
//   });
// }
// });

// $("#").on("click", function () {

//   alert("Infor added")
//   var queryURL = "";

//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   })

//     .then(function (response) {

//       var results = response.data;

//       for (var i = 0; i < results.length; i++) {

//       }

//       var infoURL = $("<>");

//       infoUrl.attr("src", );
//       infoUrl.attr("", "");


//       $("#").prepend(infoURL);
//     });




  // 3 Ajax calls

  // 1st call takes the user city inputs, runs them through Aviation edge and changes them to IATA
  // $.ajax({
  //   url: queryURL,
  //   method: "GET"
  // }).then(function (response) {
  //   console.log(response);
  //   console.log(response.Runtime);
  // });

  // 2nd call takes the IATA and uses it in amadeus search parameters
  // $.ajax({
  //   url: queryURL,
  //   method: "GET"
  // }).then(function (response) {
  //   console.log(response);
  //   console.log(response.Runtime);
  // });

  // 3rd call takes the airline code and runs it through Aviation Edge to get the airline names
  // $.ajax({
  //   url: queryURL,
  //   method: "GET"
  // }).then(function (response) {
  //   console.log(response);
  //   console.log(response.Runtime);
  // });

  // Then we have to take the results and post them to the webpage using append method to create new divs

})