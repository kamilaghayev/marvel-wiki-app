import { useState, useEffect } from 'react';
import ApiMarvel from '../../../shared/api/ApiMarvel';
import CharacterInfoView from '../../characterInfoView';
import Skeleton from '../../skeleton';

import ErrorMessage from '../../../shared/ui/errorMessage';
import Spinner from '../../../shared/ui/spinner';
import './characterInfo.scss';

const CharacterInfo = ({charId}) => {
    
    const [ state, setState ] = useState({
        char: null,
        loading: false,
        error: false
    })

    const apiMarvel = new ApiMarvel();
    

    const onCharReUpdated = () => {
        setState(prevstate => ({
            ...prevstate,
            loading: true
        }))
    }

    const onCharLoaded = (char) => {
        setState(prevstate => ({
            ...prevstate,
            char,
            loading: false
        }))
    }
    const onError = () => {
        setState(prevstate =>({
            ...prevstate,
            error: true
        }))
    }


    const updateChar = () => {
        if (!charId)  return;
        
        onCharReUpdated();

        apiMarvel.getCharacter(charId)
            .then(onCharLoaded)
            .catch(onError)
    }

    useEffect(() => {
        updateChar()

    }, [charId]);


    const {char, error, loading} = state;

    const skeleton = char || error || loading ? null :  <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/> : null;
    const loader = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <CharacterInfoView char={char}/> : null;
    
    return (
        <>
            {skeleton}
            {errorMessage}
            {loader}
            {content}
        </>
    )
}

export default CharacterInfo