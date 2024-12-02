// Elementos del DOM
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const resultsContainer = document.querySelector('#results');

// Función para buscar imágenes en la API de la NASA
async function fetchNASAImages(query) {
    try {
        const response = await fetch(`https://images-api.nasa.gov/search?q=${query}`);
        if (!response.ok) {
            throw new Error('Error al realizar la solicitud');
        }

        const data = await response.json();
        displayResults(data.collection.items);
    } catch (error) {
        console.error('Error al buscar imágenes:', error);
        resultsContainer.innerHTML = '<p>Error al cargar las imágenes.</p>';
    }
}

// Función para mostrar resultados
function displayResults(items) {
    resultsContainer.innerHTML = ''; // Limpiar resultados anteriores

    if (items.length === 0) {
        resultsContainer.innerHTML = '<p>No se encontraron resultados.</p>';
        return;
    }

    items.forEach(item => {
        const image = item.links?.[0]?.href || '';
        const title = item.data?.[0]?.title || 'Sin título';
        const description = item.data?.[0]?.description || 'Sin descripción';
        const date = item.data?.[0]?.date_created || 'Fecha no disponible';

        const card = `
            <div class="card" style="width: 18rem;">
                <img src="${image}" class="card-img-top" alt="${title}">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${description}</p>
                    <p class="card-text"><small class="text-muted">Fecha: ${date}</small></p>
                </div>
            </div>
        `;
        resultsContainer.innerHTML += card;
    });
}

// Evento de envío del formulario
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
        fetchNASAImages(query);
    }
});
