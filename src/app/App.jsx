import Header from "../components/header"
import ComicsPage from "../pages/comicsPage/ComicsPage"
import HomePage from "../pages/homePage"
import SingleComicPage from "../pages/singleComicPage"

const App = () => {


    return (
        <div className="app">
            <Header/>
            <main>
                <HomePage/>
                <ComicsPage/>
                <SingleComicPage/>
            </main>
        </div>
    )
}

export default App