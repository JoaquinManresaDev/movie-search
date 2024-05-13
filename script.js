const apiKey = '2f99e4887f003da3bd6940cd2beb2b6d';
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const moviesList = document.getElementById('movies-list');


searchForm.addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    const searchTerm = searchInput.value.trim();

    if (searchTerm === '') {
        alert('Por favor, ingresa un término de búsqueda.');
        return;
    }

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        displayMovies(data.results);
    } catch (error) {
        console.error('Error al buscar películas:', error);
        alert('Hubo un error al buscar películas. Por favor, intenta nuevamente más tarde.');
    }
});

function displayMovies(movies) {
    moviesList.innerHTML = ''; // Limpiamos el contenido previo de la lista de películas

    if (movies.length === 0) {
        moviesList.innerHTML = '<p>No se encontraron películas.</p>';
        return;
    }

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        const title = movie.title || movie.name;
        const releaseDate = movie.release_date || movie.first_air_date;
        const overview = movie.overview || 'No hay descripción disponible';

        movieCard.innerHTML = `
            <div class="poster">
                <img src="https://via.placeholder.com/150" alt="${title} Poster">
            </div>
            <div class="details">
                <h2>${title}</h2>
                <p>Año de Lanzamiento: ${releaseDate ? releaseDate.substring(0, 4) : 'N/A'}</p>
                <p>${overview}</p>
            </div>
        `;

        moviesList.appendChild(movieCard);
    });
}
