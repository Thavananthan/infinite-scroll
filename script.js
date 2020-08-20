const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imageLoader = 0;
let totalImages = 0;
let photoArray = [];
// Unsplach API
let count = 5;
const apiKey = 'vU0U3dv0a-Rrvj6UO7cPqbxTGIZFSrewNt69lRByGfU';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
  imageLoader++;
  if (imageLoader === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 30;
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
  }
}

// Helper function to set Attributes onDom Elements
function setAttribute(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}
// Create Elements for links &photos Add to Dom
function displayPhotos() {
  imageLoader = 0;
  totalImages = photoArray.length;
  // Run function for each object in photosArray
  photoArray.forEach((photo) => {
    const item = document.createElement('a');
    setAttribute(item, {
      href: photo.links.html,
      target: '_blank',
    });
    // Create img fro photo
    const img = document.createElement('img');
    setAttribute(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Put <img> inside <a> then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);

    // Event Listener check when each is finished loading
    img.addEventListener('load', imageLoaded);
  });
}
// Get photos from unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photoArray = await response.json();
    displayPhotos();
  } catch (error) {
    // Catch Error here
    console.log(error);
  }
}

// Check to see if scrolling near bottom of page load more phtots

window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    getPhotos();
  }
});

// on load
getPhotos();
