// Checkea si un objeto no tiene elementos
const isObjectEmpty = (object) => {
    // Obtiene los pares de llave valor del objeto en un vector
    const entries = Object.entries(object);

    // Obtiene la longitud de tal vector
    const length = entries.length;

    // Si la longitud es cero (el vector está vacío), el objeto
    // está vacío
    return length == 0;
};

export default isObjectEmpty;