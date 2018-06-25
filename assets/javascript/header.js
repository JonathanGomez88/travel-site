
// Put links to our images in this image array.
var images = ['assets/images/beach.jpg', 'assets/images/bridge.jpg', 'assets/images/lake.jpg', 'assets/images/canada.jpg', 'assets/images/goldenGate.jpg', 'assets/images/palmTrees.jpg', 'assets/images/paris.jpg', 'assets/images/beach&hills.jpg', 'assets/images/skyline2.jpg', 'assets/images/sydney.jpg'];

// Variable showImage will hold the setInterval when we start the slideshow
var showImage;

// Count will keep track of the index of the currently displaying picture.
var count = 0;

// This function will replace display whatever image it's given.
function displayImage() {

  $("#image-holder").css("background-image", "url(" + images[count] + ")");
}

function nextImage() {
  //  Increment the count by 1.
  count++;

  //Use a setTimeout to run displayImage after 1 second.
  setTimeout(displayImage, 1000);

  // If the count is the same as the length of the image array, reset the count to 0.
  if (count === images.length) {
    count = 0;
  }

}

//  Use showImage to hold the setInterval to run nextImage.
showImage = setInterval(nextImage, 8500);

// This will run the display image function as soon as the page loads.
displayImage()