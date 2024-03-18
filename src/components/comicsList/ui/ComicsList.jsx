import { useEffect, useState } from 'react';
import useApiMarvel from '../../../shared/api/ApiMarvel';
import ErrorMessage from '../../../shared/ui/errorMessage';
import Spinner from '../../../shared/ui/spinner';
import ComicsListItems from '../../comicsListItems';
import './comicsList.scss';

const ComicsList = () => {
    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(0);
    const [newItemLoad, setNewItemLoad] = useState(false);
    const [comicsListEnded, setComicsListEnded] = useState(false);
    const {loading, error, getAllComics} = useApiMarvel();

    useEffect(() => {
        onRequest(offset, true)
    }, [])
    
    const onRequest = (offset, initial) => {
        initial ? setNewItemLoad(false) : setNewItemLoad(true);
        getAllComics(offset)
            .then(comicsLoaded)
    }

    const comicsLoaded = (newComics) => {
        if (newComics.length < 8) setComicsListEnded(true);

        setNewItemLoad(false)
        setComics(prevComics => ([...prevComics, ...newComics]));
        setOffset(prevOffset => prevOffset + 8);
    }

    const isLoading = loading && !newItemLoad;
    const isError = error ? <ErrorMessage/> : isLoading;
    const isListEnded = {'display' : comicsListEnded ? 'none' : 'block'};

    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {isError}
                {isLoading ? <Spinner/> : <RenderList comics={comics}/>}
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

const RenderList = ({comics}) => {
    
    return comics.map(comic => <ComicsListItems key={comic.id} comic={comic}/>) 
}
export default ComicsList