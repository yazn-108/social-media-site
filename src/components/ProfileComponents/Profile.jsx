const Profile = ({ userData }) => {
    Object.keys(userData).length > 0 && sessionStorage.setItem("userData", JSON.stringify(userData))
    if (Object.keys(userData).length === 0 && sessionStorage.getItem("userData") !== null) {
        userData = JSON.parse(sessionStorage.getItem("userData"))
    }
    return (
        <div className="Profile">
            <div className="user">
                <p>@{userData?.username}</p>
                <img src={userData?.profile_image} alt="" />
                <p>{userData?.name}</p>
            </div>
            <div className="nums">
                <div>posts <b>{userData?.posts_count}</b></div>
                <div>Comments <b>{userData?.comments_count}</b></div>
            </div>
        </div>
    )
}
export default Profile
