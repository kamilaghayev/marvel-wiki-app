import Header from "../components/header"
import RandomCharacter from "../features/randomCharacter"
import CharacterList from "../components/characterList"
import CharacterInfo from "../components/characterInfo"
import ErrorBoundary from "../shared/errorBoundary";
import { useState } from "react";

const App = () => {
    const [selectedChar, setState] = useState(null)

    const onCharSelected = (id) => {
        setState(selectedChar = id)
    }

    return (
        <div className="app">
            <Header/>
            <main>
                <ErrorBoundary>
                    <RandomCharacter/>
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharacterList onCharSelected={onCharSelected}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharacterInfo charId={selectedChar}/>
                    </ErrorBoundary>
                </div>
            </main>
        </div>
    )
}

export default App