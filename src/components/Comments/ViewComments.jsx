const ViewComments = ({ commenterName, commenterPicture, commentText }) => {
    return (
        <div className="comment">
            <div className="user-info">
                <img src={commenterPicture} alt="" />
                <span>{commenterName}</span>
            </div>
            <p>{commentText}</p>
        </div>
    )
}
export default ViewComments
