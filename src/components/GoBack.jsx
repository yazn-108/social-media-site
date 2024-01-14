import { Link } from "react-router-dom"
const GoBack = () => {
    return (
        <div className="go-back" style={{ margin: "10px 0" }}>
            <Link to={"/"} className='btn btn-outline-primary' onClick={() => sessionStorage.clear()}>go back</Link>
        </div>
    )
}
export default GoBack
