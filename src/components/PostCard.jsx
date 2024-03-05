import axios from 'axios'
import { Button, Card } from 'react-bootstrap'
import { Pen } from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'
import EditPost from './HomeComponents/EditPost'
import Swal from 'sweetalert2'
const PostCard = ({ id, userId, userName, userImg, postImage, postDate, postTitle, postDescription, comments_count }) => {
    const dispatch = useDispatch()
    const title = useRef()
    const description = useRef()
    const [postData, setPostData] = useState({})
    const [editPost, setEditPost] = useState(false)
    const logInState = useSelector(state => state.LogInState)
    const userInfo = localStorage.getItem('userInfo')
    return (
        <Card className='PostCard'>
            <EditPost
                editPost={editPost}
                setEditPost={setEditPost}
                postInfo={postData}
            />
            <Card.Header>
                <Link to={localStorage.getItem("token") ? "/profile" : "/"} className='userName' onClick={() => dispatch({ type: "userId", id: userId })}>
                    <img src={userImg} alt="" />
                    <span>@{userName}</span>
                </Link>
                {
                    logInState && JSON.parse(userInfo).id === userId &&
                    <div className='post-actions'>
                        <Button onClick={() => {
                            setPostData({
                                title: title.current.innerHTML,
                                description: description.current.innerHTML,
                                postId: id
                            })
                            setEditPost(true)
                        }}>edit</Button>
                        <Button variant='danger' onClick={() => {
                            const headers = { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } }
                            Swal.fire({
                                title: "Are you sure?",
                                text: "You won't be able to revert this!",
                                icon: "question",
                                showCancelButton: true,
                                cancelButtonColor: "#87adbd",
                                confirmButtonColor: "#dc3545",
                                confirmButtonText: "delete",
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    axios.delete(`https://tarmeezacademy.com/api/v1/posts/${id}`, headers)
                                        .then(() => {
                                            axios.get("https://tarmeezacademy.com/api/v1/posts").then(response => dispatch({ type: "posts", data: response.data.data }))
                                        })
                                    Swal.fire({
                                        title: "Deleted!",
                                        text: "Your post has been deleted.",
                                        icon: "success"
                                    });
                                }
                            });
                        }}>delete</Button>
                    </div>
                }
            </Card.Header>
            <Card.Img src={postImage} />
            <Card.Body>
                <b className="post-date">{postDate}</b>
                <Card.Title ref={title}>{postTitle}</Card.Title>
                <Card.Text ref={description}>{postDescription}</Card.Text>
                <div className="comments-button">
                    <hr />
                    <Link to={"/Comments"} className='btn btn-primary moreComments' onClick={() => {
                        axios.get(`https://tarmeezacademy.com/api/v1/posts/${id}`).then(response => {
                            dispatch({ type: "comments", commentsData: response.data.data })
                        })
                    }}>
                        <Pen />
                        <span>({comments_count})</span>
                        <span>Comments</span>
                    </Link>
                </div>
            </Card.Body>
        </Card>
    )
}
export default PostCard