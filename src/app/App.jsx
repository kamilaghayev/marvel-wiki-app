import { BrowserRouter } from "react-router-dom"
import Header from "../components/header"
import Routing from "../routing"

const App = () => {


    return (
        <BrowserRouter>
            <div className="app">
                <Header/>
                <main>
                    <Routing/>
                </main>
            </div>
        </BrowserRouter>
    )
}

export default App