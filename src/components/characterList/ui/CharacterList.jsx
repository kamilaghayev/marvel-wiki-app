import { Component } from 'react';
import './characterList.scss';
import ApiMarvel from '../../../shared/api/ApiMarvel';
import CharacterItem from '../../characterItem';
import Spinner from '../../../shared/ui/spinner';
import ErrorMessage from '../../../shared/ui/errorMessage';

class CharacterList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            charList: [],
            loading: true,
            error: false
        }
    }
    
    componentDidMount() {
        this.allCharacters();
    }

    apiMarvel = new ApiMarvel();

    allCharacters = () => {
        this.apiMarvel
        .getAllCharacters()
        .then(res => this.onUpdatedCharList(res))
        .catch(err => this.onError())
    }
    
    onUpdatedCharList = (arr) => {
        this.setState({
            charList: arr,
            loading: false
        })
    }
    
    onError = () => {
        this.setState({error: true})
    }

    renderContent = (loading, charList) => {
        if (loading) {
            return <Spinner />;
        } else {
            return charList.map(item => (
                <CharacterItem onCharSelected={this.props.onCharSelected} char={item} key={item.id} />
            ));
        }
    };


    render () {
        const {charList, loading, error } = this.state;
        
        const isLoading = loading ? <Spinner/> : this.renderContent(loading, charList);
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {error ? <ErrorMessage/> : isLoading}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharacterList