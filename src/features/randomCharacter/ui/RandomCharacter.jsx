import { Component } from 'react';
import './randomCharacter.scss';
import mjolnir from '../../../resources/img/mjolnir.png';
import ApiMarvel from '../../../shared/api/ApiMarvel';
import Spinner from '../../../shared/ui/spinner';
import RandomCharView from '../../../components/randomCharView';
import ErrorMessage from '../../../shared/ui/errorMessage';

class RandomCharacter extends Component {
    
    state = {
        char: {},
        loading: true,
        error: false
    }
    componentDidMount() {
        this.updateCharacter()
    }

    apiMarvel = new ApiMarvel();

    onItemLoading = () => this.setState(({loading}) => ({loading: true}));
    onItemLoaded = () => this.setState(({loading}) => ({loading: false}));

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
        })
    }
    

    updateCharacter = () => {
        
        const id = Math.floor(Math.random() * (1011400 - 1011333) + 1011000);
        this.onItemLoading();
        this.apiMarvel
                .getCharacter(id)
                .then(res => {
                    this.onCharLoaded(res)
                    
                })
                .catch(err => {
                    this.onError()
                })
    }

    onError = () => {
        this.setState({
            loading: false, 
            error: true
        })
    }

    render () {
        const {char, loading, error } = this.state; 

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
                    <button onClick={this.updateCharacter} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

export default RandomCharacter