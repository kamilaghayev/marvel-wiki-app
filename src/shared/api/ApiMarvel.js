import { _apiBase, _apiKey, _baseOffset } from "../constants";
import { useHttp } from "../hooks/http.hook";

const useApiMarvel = () => {
    const {loading, error, request, clearError} = useHttp();

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = (character) => {
        return {
            id: character.id,
            name: character.name,
            description: character.description ? mySlice(character.description, 210) : "There is no description for this character", // Corrected: Removed "this."
            thumbnail: `${character.thumbnail.path}.${character.thumbnail.extension}`,
            homepage: character.urls[0].url,
            wiki: character.urls[1].url,
            comics: character.comics.items
        }
    }
    
    const mySlice = (input, num) => {
        if (typeof input !== "string") {
            return input.slice(0, num)
        }
        if (input.length >= num) {
            return `${input.slice(0, num)}...`;
        }
        return input;
    }

    return {loading, error, clearError, getAllCharacters, getCharacter, mySlice}
}

export default useApiMarvel;
