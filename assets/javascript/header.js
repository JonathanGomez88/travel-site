
//  Slideshow Activity
//  ** SOLUTION **

// TODO: Put links to our images in this image array.
var images = ['assets/images/airplane.png', 'assets/images/goldengate.jpg', 'assets/images/goldengateclouds.png','assets/images/mountain.jpg','assets/images/windmill.jpg','assets/images/palmbeach.jpg','assets/images/leaningtower.jpg','assets/images/skyline.jpg','assets/images/snowcappedmt.jpg','assets/images/washdc.jpg','assets/images/balloons.jpg','assets/images/dubai.jpg','assets/images/sky.jpg' ];

// Variable showImage will hold the setInterval when we start the slideshow
var showImage;

// Count will keep track of the index of the currently displaying picture.
var count = 0;

// This function will replace display whatever image it's given
// in the 'src' attribute of the img tag.
function displayImage() {
 
 
  // $("#image-holder").html("<img src=" + images[count] + " height='420px' width='105%'>");
 $("#image-holder").css("background-image","url("+images[count]+")");

}

function nextImage() {
  //  TODO: Increment the count by 1.
  count++;

  // TODO: Show the loading gif in the "image-holder" div.
  // $("#image-holder").html("<img src='images/loading.gif' width='200px'/>");

  // TODO: Use a setTimeout to run displayImage after 1 second.
  setTimeout(displayImage, 1000);

  // TODO: If the count is the same as the length of the image array, reset the count to 0.
  if (count === images.length) {
    count = 0;
  }
}

  // TODO: Use showImage to hold the setInterval to run nextImage.
  showImage = setInterval(nextImage, 7000);



function stopSlideshow() {

  // TODO: Put our clearInterval here:
  clearInterval(showImage);

}

// This will run the display image function as soon as the page loads.
displayImage();
