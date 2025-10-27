const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL;

export const api = {
  // Carousel Posters
  getCarouselPosters: async () => {
    const response = await fetch(`${API_BASE_URL}/readCarouselPosters`);
    return response.json();
  },

  addCarouselPoster: async (data) => {
    const response = await fetch(`${API_BASE_URL}/addCarouselPoster`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  deleteCarouselPoster: async (id) => {
    const response = await fetch(`${API_BASE_URL}/deleteCarouselPoster/${id}`, {
      method: 'GET',
    });
    return response.json();
  },

  // Movies
  getMovies: async () => {
    const response = await fetch(`${API_BASE_URL}/readMovies`);
    return response.json();
  },

  addMovie: async (data) => {
    const response = await fetch(`${API_BASE_URL}/addMovie`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  deleteMovie: async (id) => {
    const response = await fetch(`${API_BASE_URL}/deleteMovie/${id}`, {
      method: 'GET',
    });
    return response.json();
  },

  // Get movie trailer by movieId
  getMovieTrailer: async (movieId) => {
    const response = await fetch(`${API_BASE_URL}/getMovieTrailer/${movieId}`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // The backend returns a plain string, not JSON
    return response.text();
  },
};