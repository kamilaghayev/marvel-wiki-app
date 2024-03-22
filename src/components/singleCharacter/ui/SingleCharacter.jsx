import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import useApiMarvel from '../../../shared/api/ApiMarvel';

import { Helmet } from 'react-helmet';
import "./singleCharacter.scss";
import { setContent } from '../../../shared/utils/setContent';

const SingleCharacter = () => {
    const [char, setChar] = useState(null);
    const {process, setProcess, clearError, getCharacter} = useApiMarvel();

    const charId = useParams().id;

    useEffect(() => {
        onRequestChar(charId)
    }, [charId]);

    const onRequestChar = (id) => {
        clearError()

        getCharacter(id)
            .then(CharLoaded)
            .then(() => setProcess('success'))
    }
    const CharLoaded = (res) => {
        setChar(res)
    }
    return (
        <>
            {setContent(process, SingleCharacterView, char)}
        </>
    )
}

const SingleCharacterView = ({data}) => {

    const {name, thumbnail, description} = data;

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