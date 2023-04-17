const encodeFile = (file) => {
    const fileReader = new FileReader();
    const promise = new Promise((resolve, reject) => {
        fileReader.readAsDataURL(file);

        fileReader.onerror = () => reject(fileReader.error);
        fileReader.onload = () => resolve(fileReader.result);
    });

    return promise;
};

export default encodeFile;