import { useParams } from 'react-router-dom'
import './UserPage.css'
export default function UserPage(params) {
    const {user_id} = useParams()
    return(
        <section>
            <h1>User logined</h1>
            <h1>user : {user_id}</h1>
        </section>
    )
};
