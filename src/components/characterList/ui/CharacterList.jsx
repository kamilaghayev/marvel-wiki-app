import './characterList.scss';
import ApiMarvel from '../../../shared/api/ApiMarvel';
import CharacterItem from '../../characterItem';
import Spinner from '../../../shared/ui/spinner';
import ErrorMessage from '../../../shared/ui/errorMessage';
import { _baseOffset } from '../../../shared/constants';
import { useEffect, useState } from 'react';

const FirstState = {
    charList: [],
    loading: true,
    error: false,
    newItemLoading: false,
    offset: _baseOffset,
    charListEnded: false
}

const CharacterList = ({onCharSelected}) => {
    const [state, setState] = useState(FirstState)
    
    const apiMarvel = new ApiMarvel();
    
    const onUpdatedCharList = (newCharList) => {
        if(newCharList.length < 9) {
            setState(prevstate=>({...prevstate,charListEnded: true}))
        }
        setState(prevstate =>({
            ...prevstate,
            charList: [...prevstate.charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: prevstate.offset + 9
        }))
    }

    const onCharListLoading = () => {
        setState(prevstate => ({
            ...prevstate,
            newItemLoading: true
        }))
    }
    const onError = () => {
        this.setState(prevstate =>({...prevstate, error: true}))
    }

    const renderContent = (loading, charList) => {
        if (loading) {
            return <Spinner />;
        } else {
            return (
                <ul className="char__grid">
                    {charList.map(item => (
                        <CharacterItem onCharSelected={onCharSelected} char={item} key={item.id} />
                    ))}
                </ul>
            );
        }
    };

    const onRequest = (offset) => {
        onCharListLoading();

        apiMarvel.getAllCharacters(offset)
            .then(onUpdatedCharList)
            .catch(onError)
    }

    useEffect(() => {
        onRequest();
        
        return () => {
        };
    }, []);

    const {charList, loading, error , offset, newItemLoading, charListEnded} = state;
    
    const isLoading = loading ? <Spinner/> : renderContent(loading, charList);
    const isNewItemsLoading = newItemLoading ? <Spinner/> : null;
    
    const handleLoadMore = () => {
        
        if (!charListEnded && !newItemLoading) {
            onRequest(offset);
        }
    };

    return (
        <div className="char__list">
            {error ? <ErrorMessage/> : isLoading}
            {isNewItemsLoading}

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