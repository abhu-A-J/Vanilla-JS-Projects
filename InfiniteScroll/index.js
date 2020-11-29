const imageContainer = document.getElementById("img-container");
const loader = document.getElementById("loader");

let photosArray = [];

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

const COUNT = 30;
const API_KEY = "ENTER KEY HERE";

const UNSPLAH_URL = `https://api.unsplash.com/photos/random?count=${COUNT}&query=food&client_id=${API_KEY}`;

/* Event handler for loaded images*/
function imageLoaded() {
  imagesLoaded += 1; // number of images loaded
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

/* Helper function to set attributes n element */
function setAttributes(element, attributes) {
  for (let attributeName in attributes) {
    element.setAttribute(attributeName, attributes[attributeName]);
  }
}
/* Function to display photo */
function displayPhoto() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    // Create and <a> tag
    const item = document.createElement("a");
    const aAttributeObject = { href: photo.links.html, target: "_blank" };
    setAttributes(item, aAttributeObject);

    // Create a <img> tag
    const img = document.createElement("img");

    const imgAttributesObject = {
      src: photo.urls.regular,
      alt: photo.description,
      title: photo.description,
    };
    setAttributes(img, imgAttributesObject);

    // Event Listener to check if image ha loaded
    img.addEventListener("load", imageLoaded);

    // Insert img inside anchor
    item.appendChild(img);

    // Insert the a to the image container
    imageContainer.appendChild(item);
  });
}

/* Function to get Photos from API */
async function fetchPhotos() {
  try {
    const response = await fetch(UNSPLAH_URL);
    photosArray = await response.json();
    displayPhoto();
  } catch (err) {
    console.log("Error", err);
  }
}

// Check to see if the scroll is at the end of the page
window.addEventListener("scroll", (e) => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    fetchPhotos();
    ready = false;
  }
});

// On load
fetchPhotos();
