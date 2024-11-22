<template>
  <div class="movies-container">
    <div class="header">
      <h1>Listado de Películas</h1>
    </div>

    <!-- Filtros -->
    <div class="filters">
      <q-input
        v-model="searchQuery"
        outlined
        placeholder="Buscar película por nombre"
        @input="fetchMovies"
        style="max-width: 300px"
      />
      <q-select
        v-model="language"
        outlined
        label="Idioma"
        :options="languageOptions"
        style="max-width: 200px"
        @update:model-value="fetchMovies"
      />
      <q-select
        v-model="sortBy"
        outlined
        label="Ordenar por"
        :options="sortOptions"
        style="max-width: 200px"
        @update:model-value="fetchMovies"
      />
      <q-checkbox
        v-model="includeAdult"
        label="Incluir contenido para adultos"
        @update:model-value="fetchMovies"
      />
    </div>

    <!-- Películas -->
    <div v-if="movies.length > 0" class="movies-grid">
      <div v-for="movie in movies" :key="movie.id" class="movie-card">
        <img
          :src="getImageUrl(movie.poster_path)"
          :alt="movie.title"
          class="movie-poster"
        />
        <h3>{{ movie.title }}</h3>
        <p>Puntuación: {{ movie.vote_average }}</p>
        <p>Votos: {{ movie.vote_count }}</p>
      </div>
    </div>
    <div v-else>
      <p>No se encontraron resultados para los filtros seleccionados.</p>
    </div>

    <!-- Paginación -->
    <div class="pagination">
      <button
        v-if="currentPage > 1"
        @click="goToPage(currentPage - 1)"
        class="pagination-button"
      >
        Anterior
      </button>
      <button
        v-for="page in visiblePages"
        :key="page"
        :class="{ active: page === currentPage }"
        @click="goToPage(page)"
        class="pagination-button"
      >
        {{ page }}
      </button>
      <button
        v-if="currentPage < totalPages"
        @click="goToPage(currentPage + 1)"
        class="pagination-button"
      >
        Siguiente
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MoviesPage",
  data() {
    return {
      movies: [],
      searchQuery: "",
      currentPage: 1,
      totalPages: 10,
      language: "en-US", // Idioma por defecto
      includeAdult: false,
      sortBy: "popularity.desc", // Ordenar por popularidad
      languageOptions: [
        { label: "Inglés", value: "en-US" },
        { label: "Español", value: "es-ES" },
        { label: "Francés", value: "fr-FR" },
      ],
      sortOptions: [
        { label: "Popularidad", value: "popularity.desc" },
        { label: "Fecha más reciente", value: "release_date.desc" },
        { label: "Fecha más antigua", value: "release_date.asc" },
        { label: "Mejor puntuación", value: "vote_average.desc" },
      ],
    };
  },
  computed: {
    visiblePages() {
      const pages = [];
      const start = Math.max(1, this.currentPage - 2);
      const end = Math.min(this.totalPages, start + 4);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    },
  },
  methods: {
    //Nuevos metodos
    async fetchMovies() {
      const apiKey =
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjg4NjVmNDE1MzRjN2VjNzViYjc1MDAzOWVlOTU4NCIsIm5iZiI6MTczMjI0NTA5OS42NzQ5MjM0LCJzdWIiOiI2NzNmNzk5YTYyNWJjMzM4ZGMzOGJiMGYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.9M5Buek1oNOWps7F8uZcsk3KEqjPCba3zRkPhA7525M";

      const endpoint = `https://api.themoviedb.org/3/discover/movie?include_adult=${this.includeAdult}&include_video=false&language=${this.language}&page=${this.currentPage}&sort_by=${this.sortBy}`;

      try {
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        });
        this.movies = response.data.results || [];
        this.totalPages = response.data.total_pages;
      } catch (error) {
        console.error("Error al obtener películas:", error);
      }
    },
    goToPage(page) {
      if (page < 1 || page > this.totalPages) return;
      this.currentPage = page;
      this.fetchMovies();
    },
    //metodo de obtener img
    getImageUrl(posterPath) {
      return posterPath
        ? `http://image.tmdb.org/t/p/w500${posterPath}`
        : "https://via.placeholder.com/500x750.png?text=No+Image";
    },
  },
  mounted() {
    this.fetchMovies();
  },
};
</script>

<style scoped>
.movies-container {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
}

.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.movie-card {
  background: #ffffff;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.movie-poster {
  max-width: 100%;
  border-radius: 10px;
}

.movie-card h3 {
  margin: 10px 0 5px;
  font-size: 18px;
}

.movie-card p {
  margin: 5px 0;
  font-size: 14px;
  color: #555;
}

/* Paginación */
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
}

.pagination-button {
  padding: 10px 15px;
  border: none;
  background: #333;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}

.pagination-button.active {
  background: #555;
}

.pagination-button:hover {
  background: #444;
}
</style>
