// Anexa el endpoint dado a la url de la API que se está
// consumiendo
export default (endpoint) => {
    // La raíz de la URL
    const root = "http://localhost:8181";

    // Se anexan las cadenas
    return `${root}${endpoint}`;
};