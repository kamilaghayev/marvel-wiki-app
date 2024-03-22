import { useEffect, useState } from 'react';
import useApiMarvel from '../../../shared/api/ApiMarvel';
import ComicsListItems from '../../comicsListItems';
import { setContent } from '../../../shared/utils/setContent';
import './comicsList.scss';

const ComicsList = () => {
    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(0);
    const [newItemLoad, setNewItemLoad] = useState(false);
    const [comicsListEnded, setComicsListEnded] = useState(false);
    const {process, setProcess, getAllComics} = useApiMarvel();

    useEffect(() => {
        onRequest(offset, true)
    }, [])
    
    const onRequest = (offset, initial) => {
        initial ? setNewItemLoad(false) : setNewItemLoad(true);
        getAllComics(offset)
            .then(comicsLoaded)
            .then(() => setProcess('success'))
    }

    const comicsLoaded = (newComics) => {
        if (newComics.length < 8) setComicsListEnded(true);

        setNewItemLoad(false)
        setComics(prevComics => ([...prevComics, ...newComics]));
        setOffset(prevOffset => prevOffset + 8);
    }

    const isListEnded = {'display' : comicsListEnded ? 'none' : 'block'};

    
    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {setContent(process, RenderList, comics)}
            </ul>
            <button 
                className="button button__main button__long"
                style={isListEnded}
                disabled={newItemLoad}
                onClick={() => onRequest(offset, false)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export const RenderList = ({data}) => {
    
    return data.map(comic => <ComicsListItems key={comic.id} comic={comic}/>) 
}
export default ComicsList