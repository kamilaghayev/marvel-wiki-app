import { BrowserRouter } from "react-router-dom"
import { Helmet } from "react-helmet"
import Header from "../components/header"
import Routing from "../routing"

const App = () => {


    return (
        <BrowserRouter>
            <div className="app">
                <Helmet>
                    <meta 
                        name="Marvel information portal" 
                        content="this is a marvel information portal, marvel mini wikipedia"  
                    />
                    <title>Marvel information portal</title>
                </Helmet>
                <Header/>
                <main>
                    <Routing/>
                </main>
            </div>
        </BrowserRouter>
    )
}

export default App