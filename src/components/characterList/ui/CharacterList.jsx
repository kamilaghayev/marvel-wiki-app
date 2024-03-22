import { useEffect, useState } from 'react';
import { _baseOffset } from '../../../shared/constants';
import { setContent } from '../../../shared/utils/setContent';
import useApiMarvel from '../../../shared/api/ApiMarvel';
import CharacterItem from '../../characterItem';

import './characterList.scss';


const CharacterList = ({onCharSelected}) => {
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(_baseOffset);
    const [charListEnded, setCharListEnded] = useState(false);
    const {process, setProcess, clearError, getAllCharacters} = useApiMarvel();
    

    
    useEffect(() => {
        onRequest(offset, true);
        
        
    }, []);

    const onUpdatedCharList = (newCharList) => {
        if(newCharList.length < 9) {
            setCharListEnded(true)
        }
        setCharList(prevstate =>([...prevstate, ...newCharList]));
        setNewItemLoading(false);
        setOffset(prevstate => prevstate + 9);
    }

    
    
    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);

        getAllCharacters(offset)
            .then(onUpdatedCharList)
            .then(() => setProcess('success'))
    }
    
    
    const handleLoadMore = () => {
        
        if (!charListEnded && !newItemLoading) {
            onRequest(offset, false);
        }
    };

    return (
        <div className="char__list">
            {setContent(process, RenderContent, charList, {onCharSelected})}

            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{display: charListEnded ? "none" : 'block'}}
                onClick={handleLoadMore}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

const RenderContent = ({data, onCharSelected}) => {
    return (
        <ul className="char__grid">
            {data.map(item => (
                <CharacterItem onCharSelected={onCharSelected} char={item} key={item.id} />
            ))}
        </ul>
    );
}
export default CharacterList