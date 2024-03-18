import { useState } from "react"
import CharacterInfo from "../../components/characterInfo"
import CharacterList from "../../components/characterList"
import RandomCharacter from "../../features/randomCharacter"
import ErrorBoundary from "../../shared/errorBoundary"

const HomePage = () => {
    const [selectedChar, setState] = useState(null)

    const onCharSelected = (id) => {
        setState(prevstate => prevstate = id)
    }

    return (
        <>
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
        </>
    )
}

export default HomePage