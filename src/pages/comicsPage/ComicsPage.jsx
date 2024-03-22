import Banner from "../../features/banner"
import ComicsList from "../../components/comicsList"
import { Helmet } from "react-helmet"

const ComicsPage = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="marvel comics page"
                    content="page with list of marvel comics"
                />
                <title>Marvel comics page</title>
            </Helmet>
            <Banner/>
            <ComicsList/>
        </>
    )
}

export default ComicsPage