import { Component } from 'react';
import ApiMarvel from '../../../shared/api/ApiMarvel';
import CharacterInfoView from '../../characterInfoView';
import Skeleton from '../../skeleton';

import './characterInfo.scss';
import ErrorMessage from '../../../shared/ui/errorMessage';
import Spinner from '../../../shared/ui/spinner';

class CharacterInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false
    }

    apiMarvel = new ApiMarvel();
    
    componentDidMount() {
        this.updateChar()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar()
        }
    }
    updateChar = () => {
        const {charId} = this.props;
        if (!charId)  return;
        
        this.onCharReUpdated();

        this.apiMarvel.getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    onCharReUpdated = () => {
        this.setState({
            loading: true
        })
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
        })
    }
    onError = () => {
        this.setState({
            error: true
        })
    }

    render() {
        const {char, error, loading} = this.state;

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
}

export default CharacterInfo