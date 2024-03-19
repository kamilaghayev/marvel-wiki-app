import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/homePage";
import ComicsPage from "../pages/comicsPage/ComicsPage";
import SingleComicPage from "../pages/singleComicPage";
import Page404 from "../pages/page404";

const routeConfig = [
    {
        path: "/",
        exact: true,
        element: <HomePage/>
    },
    {
        path: "/comics",
        exact: true,
        element: <ComicsPage/>
    },
    {
        path: "/comics/:id",
        exact: true,
        element: <SingleComicPage/>
    },
    {
        path: "*",
        exact: false,
        element: <Page404/>
    }
]
const Routing = () => {
    return (
        <Routes>
            {routeConfig.map((item, i) => {
                return <Route 
                    key={i}
                    path={item.path}
                    element={item.element}
                />
            })}
        </Routes>
    );
}

export default Routing;
