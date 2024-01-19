import { useDispatch, useSelector } from 'react-redux'
import ViewComments from '../components/Comments/ViewComments'
import { Button, Container, Form, InputGroup } from 'react-bootstrap'
import axios from 'axios'
import { useRef } from 'react'
import Swal from 'sweetalert2'
import GoBack from '../components/GoBack'
import PostCard from '../components/PostCard'
import { Helmet } from 'react-helmet'
const CommentsPage = () => {
    let data = useSelector(state => state.CommentsData)
    if (data.length === 0 && sessionStorage.getItem("post-comments")) {
        data = JSON.parse(sessionStorage.getItem("post-comments"))
    }
    const dispatch = useDispatch()
    const commentInput = useRef()
    const newComment = () => {
        const headers = { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } }
        axios.post(`https://tarmeezacademy.com/api/v1/posts/${data.id}/comments`, { "body": commentInput.current.value }, headers).then(() => {
            axios.get(`https://tarmeezacademy.com/api/v1/posts/${data.id}`).then(response => {
                dispatch({ type: "comments", commentsData: response.data.data })
            })
            commentInput.current.value = ""
            commentInput.current.blur()
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                },
            });
            Toast.fire({
                icon: "success",
                title: "sent successfully",
            });
        }).catch(error => {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                },
            });
            Toast.fire({
                icon: "error",
                title: error.response.data.message,
            });
        })
    }
    const logInState = useSelector(state => state.LogInState)
    return (
        <Container className="CommentsPage">
            <Helmet>
                <title>Comments</title>
            </Helmet>
            <GoBack />
            {
                <PostCard
                    id={data?.id}
                    userId={data.author?.id}
                    userName={data.author?.username}
                    userImg={data.author?.profile_image}
                    postImage={data?.image}
                    postDate={data?.created_at}
                    postTitle={data?.title}
                    postDescription={data?.body}
                    comments_count={data?.comments_count}
                />
            }
            <div className='comments'>
                {
                    logInState && <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="add your comment.."
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            ref={commentInput}
                            onKeyDown={e => e.key === "Enter" && newComment()}
                        />
                        <Button variant="outline-primary" id="button-addon2" onClick={() => newComment()}>
                            send
                        </Button>
                    </InputGroup>
                }
                {
                    data.comments && data.comments.map((comment, i) => (
                        <ViewComments
                            key={i}
                            commentText={comment.body}
                            commenterPicture={comment.author.profile_image}
                            commenterName={comment.author.name}
                        />
                    ))
                }
            </div>
        </Container >
    )
}
export default CommentsPage
