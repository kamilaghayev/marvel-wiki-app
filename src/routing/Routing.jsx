import { Route, Router } from "react-router-dom"
import HomePage from "../pages/homePage"
import ComicsPage from "../pages/comicsPage/ComicsPage"
import SingleComicPage from "../pages/singleComicPage"

const Routing = () => {
    return (
        <Router>
            <Route exact path="/">
                <HomePage/>
            </Route>
            <Route exact path="/comics">
                <ComicsPage/>
            </Route>
            <Route exact path="/comics/:id">
                <SingleComicPage/>
            </Route>
            <Route path="*">
                
            </Route>
        </Router>
    )
}

export default Routing