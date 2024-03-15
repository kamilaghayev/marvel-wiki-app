import { Component } from 'react';
import './characterList.scss';
import ApiMarvel from '../../../shared/api/ApiMarvel';
import CharacterItem from '../../characterItem';
import Spinner from '../../../shared/ui/spinner';
import ErrorMessage from '../../../shared/ui/errorMessage';
import { _baseOffset } from '../../../shared/constants';

class CharacterList extends Component {
    
    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: _baseOffset,
        charListEnded: false
    }
    
    componentDidMount() {
        this.onRequest();
    }

    apiMarvel = new ApiMarvel();

    onRequest = (offset) => {
        this.onCharListLoading();

        this.apiMarvel.getAllCharacters(offset)
            .then(this.onUpdatedCharList)
            .catch(err => this.onError())
    }
    
    onUpdatedCharList = (newCharList) => {
        if(newCharList.length < 9) {
            this.setState({charListEnded: true})
        }
        this.setState(({charList, offset}) =>({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9
        }))
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }
    onError = () => {
        this.setState({error: true})
    }

    renderContent = (loading, charList) => {
        if (loading) {
            return <Spinner />;
        } else {
            return (
                <ul className="char__grid">
                    {charList.map(item => (
                        <CharacterItem onCharSelected={this.props.onCharSelected} char={item} key={item.id} />
                    ))}
                </ul>
            );
        }
    };


    render () {
        const {charList, loading, error , offset, newItemLoading, charListEnded} = this.state;
        
        const isLoading = loading ? <Spinner/> : this.renderContent(loading, charList);
        const isNewItemsLoading = newItemLoading ? <Spinner/> : null;
        return (
            <div className="char__list">
                {error ? <ErrorMessage/> : isLoading}
                {isNewItemsLoading}

                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{display: charListEnded ? "none" : 'block'}}
                    onClick={() => this.onRequest(offset)}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharacterList