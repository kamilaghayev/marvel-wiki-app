import { Component } from "react";
import Header from "../components/header"
import RandomCharacter from "../features/randomCharacter"
import CharacterList from "../components/characterList"
import CharacterInfo from "../components/characterInfo"
import ErrorBoundary from "../shared/errorBoundary";

class App extends Component {

    state = {
        selectedChar: null,
    }

    onCharSelected = (id) => {
        this.setState({selectedChar: id})
    }

    render() {
        return (
            <div className="app">
                <Header/>
                <main>
                    <ErrorBoundary>
                        <RandomCharacter/>
                    </ErrorBoundary>
                    <div className="char__content">
                        <ErrorBoundary>
                            <CharacterList onCharSelected={this.onCharSelected}/>
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <CharacterInfo charId={this.state.selectedChar}/>
                        </ErrorBoundary>
                    </div>
                </main>
            </div>
        )
    }
}

export default App