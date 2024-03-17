import { useState, useEffect } from 'react';

import mjolnir from '../../../resources/img/mjolnir.png';
import ApiMarvel from '../../../shared/api/ApiMarvel';
import Spinner from '../../../shared/ui/spinner';
import RandomCharView from '../../../components/randomCharView';
import ErrorMessage from '../../../shared/ui/errorMessage';
import './randomCharacter.scss';

const beginState = {
    char: {},
    loading: true,
    error: false
}
const RandomCharacter = () => {
    const [ state, setState ] = useState(beginState)

    const apiMarvel = new ApiMarvel();

    const onItemLoading = () => setState(prevstate => ({...prevstate,loading: true}));
    const onItemLoaded = () => setState(prevstate => ({...prevstate, loading: false}));

    const onCharLoaded = (char) => {
        setState(prevstate =>({
            ...prevstate,
            char,
            loading: false,
        }))
    }

    const onError = () => {
        setState(prevstate => ({
            ...prevstate,
            loading: false, 
            error: true
        }))
    }

    const updateCharacter = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011333) + 1011000);
        onItemLoading();
        apiMarvel
            .getCharacter(id)
            .then(res => {onCharLoaded(res)})
            .catch(onError)
    }
    
    useEffect(() => {
        updateCharacter()
        
        return () => {
        };
    }, []);

    const {char, loading, error } = state; 

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