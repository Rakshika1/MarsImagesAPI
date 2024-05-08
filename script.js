// Function to fetch photos based on the input number of sols
function fetchPhotos() {
    // Get the number of sols from the input field
    var solsInput = document.getElementById('solsInput').value;

    // Construct the API URL with the input number of sols
    var apiUrl = `/api/photos?solsInput=${solsInput}`;

    // Fetch photos from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayPhotos(data.photos);
        })
        .catch(error => console.error('Error fetching photos:', error));
}

// Function to display photos on the page
function displayPhotos(photos) {
    var photosContainer = document.getElementById('photos');
    photosContainer.innerHTML = ''; // Clear previous photos

    photos.forEach(photo => {
        var photoHTML = `
        <div class="photo-container">
          <img src="${photo.img_src}" alt="Mars Photo">
          <p>Sol: ${photo.sol}</p>
          <p>Camera: ${photo.camera.full_name}</p>
          <p>Earth Date: ${photo.earth_date}</p>
        </div>
      `;
        photosContainer.innerHTML += photoHTML;
    });
}
