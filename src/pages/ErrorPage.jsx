import { Helmet } from "react-helmet"
import GoBack from "../components/GoBack"

const ErrorPage = () => {
    return (
        <div className="ErrorPage">
            <Helmet>
                <title>Not Found</title>
            </Helmet>
            <b>404</b>
            <p>There is nothing here...</p>
            <GoBack />
        </div>
    )
}
export default ErrorPage
