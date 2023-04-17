export default (endpoint) => {
    const root = "http://localhost:8181";

    return `${root}${endpoint}`;
};