import Header from "../components/header"
import ComicsPage from "../pages/comicsPage/ComicsPage"
import HomePage from "../pages/homePage"

const App = () => {


    return (
        <div className="app">
            <Header/>
            <main>
                <HomePage/>
                <ComicsPage/>
            </main>
        </div>
    )
}

export default App