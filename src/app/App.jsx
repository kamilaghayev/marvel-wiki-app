import { Component } from "react";
import Header from "../components/header"
import RandomCharacter from "../features/randomCharacter"
import CharacterList from "../components/characterList"
import CharacterInfo from "../components/characterInfo"

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
                    <RandomCharacter/>
                    <div className="char__content">
                        <CharacterList onCharSelected={this.onCharSelected}/>
                        <CharacterInfo charId={this.state.selectedChar}/>
                    </div>
                </main>
            </div>
        )
    }
}

export default App