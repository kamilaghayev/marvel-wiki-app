import { useState, useEffect } from 'react';

import mjolnir from '../../../resources/img/mjolnir.png';
import useApiMarvel from '../../../shared/api/ApiMarvel';
import Spinner from '../../../shared/ui/spinner';
import RandomCharView from '../../../components/randomCharView';
import ErrorMessage from '../../../shared/ui/errorMessage';
import './randomCharacter.scss';


const RandomCharacter = () => {
    const [ char, setChar ] = useState({})

    const {loading, error, clearError, getCharacter} = useApiMarvel()


    const onCharLoaded = (char) => {
        setChar(char)
    }


    const updateCharacter = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011333) + 1011000);
        
        getCharacter(id)
            .then(res => onCharLoaded(res))
    }
    
    useEffect(() => {
        updateCharacter()
        
        return () => {
            clearError()
        };
    }, []);


    const isLoading = loading ? <Spinner/> : <RandomCharView character={char}/>;
    const isError = error ? <ErrorMessage/> : isLoading;

    return (
        <div className="randomchar">
            {isError}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateCharacter} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

export default RandomCharacter