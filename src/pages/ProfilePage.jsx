import axios from "axios"
import AddPost from "../components/ProfileComponents/AddPost"
import Profile from "../components/ProfileComponents/Profile"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import UserPosts from "../components/ProfileComponents/UserPosts"
import { Helmet } from "react-helmet-async"
const ProfilePage = () => {
    const posts = useSelector(state => state.PostsData)
    let userId = useSelector(state => state.UserId)
    userId !== 0 && sessionStorage.setItem("UserId", JSON.stringify(userId))
    if (userId === 0) {
        userId = JSON.parse(sessionStorage.getItem("UserId"))
    }
    const [userData, setUserData] = useState({})
    const [userPosts, setUserPosts] = useState([])
    useEffect(() => {
        axios.get(`https://tarmeezacademy.com/api/v1/users/${userId}`).then((res) => setUserData(res.data.data))
        axios.get(`https://tarmeezacademy.com/api/v1/users/${userId}/posts`).then((res) => setUserPosts(res.data.data))
    }, [userId, posts])
    return (
        <div className="Profile-page">
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <Profile userData={userData} />
            {userId === JSON.parse(localStorage.getItem("userInfo")).id && <AddPost />}
            <UserPosts userPostsData={userPosts} />
        </div>
    )
}
export default ProfilePage
