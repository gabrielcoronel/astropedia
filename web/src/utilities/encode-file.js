// Convierte un objeto File en un string con sus contenidos
// en formato DataURL
const encodeFile = (file) => {
    // Se instancia un lector de archivos
    const fileReader = new FileReader();

    // Se crea un promesa para manejar la lectura del archivo
    const promise = new Promise((resolve, reject) => {
        // Se inicia la lectura del archivo
        fileReader.readAsDataURL(file);

        // Si hay un error se rechaza la promesa
        fileReader.onerror = () => reject(fileReader.error);

        // Si todo sale bien, se resuelve la promesa con el resultado
        fileReader.onload = () => resolve(fileReader.result);
    });

    return promise;
};

export default encodeFile;