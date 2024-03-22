import { useState, useEffect } from 'react';
import useApiMarvel from '../../../shared/api/ApiMarvel';
import { setContent } from '../../../shared/utils/setContent';
import CharacterInfoView from '../../characterInfoView';

import './characterInfo.scss';

const CharacterInfo = ({charId}) => {
    
    const [ char, setChar ] = useState(null)
    const {process, setProcess, clearError, getCharacter} = useApiMarvel();
    


    const onCharLoaded = (character) => {
        setChar(character)
    }


    const updateChar = () => {
        if (!charId)  return;
        
        clearError()
        
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('success'))
    }

    useEffect(() => {
        updateChar()

    }, [charId]);


    
    return (
        <>
            {setContent(process, CharacterInfoView, char, {skeleton: true})}
        </>
    )
}

export default CharacterInfo