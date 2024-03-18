import { useEffect, useState } from 'react';
import useApiMarvel from '../../../shared/api/ApiMarvel';
import Spinner from '../../../shared/ui/spinner';
import ErrorMessage from '../../../shared/ui/errorMessage';

import './singleComic.scss';

const SingleComic = () => {
    const [comic , setComic] = useState(null);
    const {loading, error, getSingleComic} = useApiMarvel();
    
    const comicId = 23356;

    useEffect(() => {
        onRequest(comicId)
    }, []);

    const onRequest = (id) => {
        getSingleComic(id)
            .then(characterLoaded)
    }

    const characterLoaded = (res) => {
        setComic(res)
    }

    const isLoading = loading ? <Spinner/> : (comic && <SingleComicView comic={comic}/>);

    return (
        <div className="single-comic">
            {error ? <ErrorMessage/> : isLoading}
        </div>
    )
}

const SingleComicView = ({comic}) => {
    console.log(comic);
    const {title, description, thumbnail, price, language, pageCount}= comic;

    return (
        <>
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <a href="#" className="single-comic__back">Back to all</a>
        </>
    )
}

export default SingleComic