const isObjectEmpty = (object) => {
    const entries = Object.entries(object);
    const length = entries.length;

    return length == 0;
};

export default isObjectEmpty;