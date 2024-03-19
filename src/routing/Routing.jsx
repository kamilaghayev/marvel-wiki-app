import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Spinner from "../shared/ui/spinner";
const HomePage = lazy(() =>  import("../pages/homePage"));
const ComicsPage = lazy(() => import("../pages/comicsPage/ComicsPage"));
const SingleComicPage= lazy(() => import("../pages/singleComicPage"));
const Page404 = lazy(() => import("../pages/page404"));

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
        <Suspense fallback={<Spinner/>}>
            <Routes>
                {routeConfig.map((item, i) => {
                    return <Route 
                        key={i}
                        path={item.path}
                        element={item.element}
                    />
                })}
            </Routes>
        </Suspense>
    );
}

export default Routing;
