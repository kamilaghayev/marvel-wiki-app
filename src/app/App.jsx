import Header from "../components/header"
import RandomCharacter from "../features/randomCharacter"
import CharacterList from "../components/characterList"
import CharacterInfo from "../components/characterInfo"
import decoration from '../resources/img/vision.png';

const App = () => {

    const bgCss = {
        background: `url(${decoration}) no-repeat`, 
        backgroundPosition: 'bottom -70px right -74px'
    }
    return (
        <div style={bgCss}>
            <div className="app">
                <Header/>
                <main>
                    <RandomCharacter/>
                    <div className="char__content">
                        <CharacterList/>
                        <CharacterInfo/>
                    </div>
                    {/* <img className="bg-decoration" src={decoration} alt="vision"/> */}
                </main>
            </div>
        </div>
    )
}

export default App