import './characterList.scss';
import useApiMarvel from '../../../shared/api/ApiMarvel';
import CharacterItem from '../../characterItem';
import Spinner from '../../../shared/ui/spinner';
import ErrorMessage from '../../../shared/ui/errorMessage';
import { _baseOffset } from '../../../shared/constants';
import { useEffect, useState } from 'react';



const CharacterList = ({onCharSelected}) => {
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(_baseOffset);
    const [charListEnded, setCharListEnded] = useState(false);
    const {loading, error, clearError, getAllCharacters} = useApiMarvel();
    

    
    useEffect(() => {
        onRequest(offset, true);
        
        return () => {
        };
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
    }
    
    const renderContent = (charList) => {
        return (
            <ul className="char__grid">
                {charList.map(item => (
                    <CharacterItem onCharSelected={onCharSelected} char={item} key={item.id} />
                ))}
            </ul>
        );
    }
    
    const isLoading = loading && !newItemLoading ? <Spinner/> : renderContent(charList);
    
    const handleLoadMore = () => {
        
        if (!charListEnded && !newItemLoading) {
            onRequest(offset, false);
        }
    };

    return (
        <div className="char__list">
            {error ? <ErrorMessage/> : isLoading}
            {isLoading}

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

export default CharacterList