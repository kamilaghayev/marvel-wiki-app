import { _apiBase, _apiKey } from "../constants";

class ApiMarvel {
    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error("Error is respone")
        }

        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${_apiBase}characters?limit=9&offset=111&${_apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${_apiBase}characters/${id}?${_apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (character) => {
        return {
            id: character.id,
            name: character.name,
            description: character.description ? this.mySlice(character.description, 210) : "There is no description for this character",
            thumbnail: `${character.thumbnail.path}.${character.thumbnail.extension}`,
            homepage: character.urls[0].url,
            wiki: character.urls[1].url,
            comics: character.comics.items
        }
    }
    
    mySlice = (input, num) => {
        if (typeof input !== "string") {
            return input.slice(0, num)
        }
        if (input.length >= num) {
            return `${input.slice(0, num)}...`;
        }
        return input;
    }
}

export default ApiMarvel;