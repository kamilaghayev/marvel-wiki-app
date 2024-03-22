import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import useApiMarvel from '../../../shared/api/ApiMarvel';

import Spinner from '../../../shared/ui/spinner';
import ErrorMessage from '../../../shared/ui/errorMessage';
import "./singleCharacter.scss";
import { Helmet } from 'react-helmet';

const SingleCharacter = () => {
    const [char, setChar] = useState(null);
    const {loading, error, clearError, getCharacter} = useApiMarvel()
    const charId = useParams().id
    useEffect(() => {
        onRequestChar(charId)
    }, [charId]);

    const onRequestChar = (id) => {
        clearError()

        getCharacter(id)
            .then(CharLoaded)
    }
    const CharLoaded = (res) => {
        setChar(res)
    }
    const isLoading = loading ? <Spinner/> : null;
    const isError = error ? <ErrorMessage/> : null;
    return (
        <>
            {char && <SingleCharacterView char={char}/>}
            {isError}
            {isLoading}
        </>
    )
}

const SingleCharacterView = ({char}) => {

    const {name, thumbnail, description} = char;

    return (
        <div className="single-comic">
            <Helmet>
                <meta
                    name={`marvel ${name} page`}
                    content={`page with marvel ${name} character`}
                />
                <title>{name}</title>
            </Helmet>

            <img src={thumbnail} alt={name} className="single-comic__char-img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
        </div>
    )
}
export default SingleCharacter