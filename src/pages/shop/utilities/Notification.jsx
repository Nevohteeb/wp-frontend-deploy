import { Link } from "react-router-dom"
import { CartFill } from 'react-bootstrap-icons'

const Notification = ({ type }) => {
    return (
        <>
            <div id="notification">
                {type} <Link to={`/cart`}><CartFill /> View cart</Link>
            </div>

        </>
    )
}

export default Notification