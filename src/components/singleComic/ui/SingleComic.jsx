import { useEffect, useState } from 'react';
import useApiMarvel from '../../../shared/api/ApiMarvel';

import './singleComic.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { setContent } from '../../../shared/utils/setContent';

const SingleComic = () => {
    const [comic , setComic] = useState(null);
    const {process, setProcess, getSingleComic} = useApiMarvel();
    
    const comicId = useParams().id;
    useEffect(() => {
        onRequest(comicId)
    }, []);

    const onRequest = (id) => {
        getSingleComic(id)
            .then(characterLoaded)
            .then(() => setProcess('success'))
    }

    const characterLoaded = (res) => {
        setComic(res)
    }

    return (
        <div className="single-comic">
            {setContent(process, SingleComicView, comic)}
        </div>
    )
}

const SingleComicView = ({data}) => {
    const {title, description, thumbnail, price, language, pageCount}= data;

    const navigate = useNavigate()
    const goBack = () => {
        navigate(-1)
    }
    return (
        <>
            <Helmet>
                <meta
                    name="marvel comics page"
                    content={`page with ${title} comic`}
                />
                <title>{title}</title>
            </Helmet>
            
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <a onClick={goBack} className="single-comic__back">Back to all</a>
        </>
    )
}

export default SingleComic