export const getIdFromUrl = (url) => {
    const parts = url.split('/');

    const id = parts[parts.length - 1];

    return id;
}

