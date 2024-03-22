import { _apiBase, _apiKey, _baseOffset, _issueNumber } from "../constants";
import { useHttp } from "../hooks/http.hook";

const useApiMarvel = () => {
    const {loading, error, process, setProcess, request, clearError} = useHttp();

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }
    const getCharacterFromName = async (name) => {
        const res = await request(`${_apiBase}characters?nameStartsWith=${name}&${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }
    const getAllComics = async (offset = 0) => {
        
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformComics);
    }

    const getSingleComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
        return _transformComics(res.data.results[0])
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
    
    const _transformComics = (comics) => {
		return {
			id: comics.id,
			title: comics.title,
			description: comics.description || "There is no description",
			pageCount: comics.pageCount
				? `${comics.pageCount} p.`
				: "No information about the number of pages",
			thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
			language: comics.textObjects[0]?.language || "en-us",
			// optional changing operator
			price: comics.prices[0].price
				? `${comics.prices[0].price}$`
				: "not available",
		};
	};

    const mySlice = (input, num) => {
        if (typeof input !== "string") {
            return input.slice(0, num)
        }
        if (input.length >= num) {
            return `${input.slice(0, num)}...`;
        }
        return input;
    }

    return {
        loading, 
        error,
        process,
        setProcess,
        clearError, 
        getAllCharacters, 
        getCharacter,
        getCharacterFromName,
        getAllComics,
        getSingleComic, 
        mySlice
    }
}

export default useApiMarvel;
