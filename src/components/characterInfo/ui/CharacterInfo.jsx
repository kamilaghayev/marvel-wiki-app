import { useState, useEffect } from 'react';
import useApiMarvel from '../../../shared/api/ApiMarvel';
import CharacterInfoView from '../../characterInfoView';
import Skeleton from '../../skeleton';

import ErrorMessage from '../../../shared/ui/errorMessage';
import Spinner from '../../../shared/ui/spinner';
import './characterInfo.scss';

const CharacterInfo = ({charId}) => {
    
    const [ char, setChar ] = useState(null)
    const {loading, error, clearError, getCharacter} = useApiMarvel();
    


    const onCharLoaded = (character) => {
        setChar(character)
    }


    const updateChar = () => {
        if (!charId)  return;
        
        clearError()
        
        getCharacter(charId)
            .then(onCharLoaded)
    }

    useEffect(() => {
        updateChar()

    }, [charId]);



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