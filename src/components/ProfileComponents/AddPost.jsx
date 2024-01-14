import axios from "axios"
import { useRef, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { useDispatch } from "react-redux"
import Swal from "sweetalert2"
const AddPost = () => {
    const dispatch = useDispatch()
    const [addPost, setAddPost] = useState(false)
    const titleInput = useRef()
    const descriptionInput = useRef()
    const imageInput = useRef()
    const add = () => {
        const image = imageInput.current.files[0]
        const title = titleInput.current.value
        const description = descriptionInput.current.value
        const postData = new FormData()
        postData.append("image", image)
        postData.append("title", title)
        postData.append("body", description)
        const headers = { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } }
        axios.post("https://tarmeezacademy.com/api/v1/posts", postData, headers).then(() => {
            setAddPost(false)
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
                title: "Published successfully",
            });
            axios.get("https://tarmeezacademy.com/api/v1/posts").then(response => dispatch({ type: "posts", data: response.data.data }))
        }).catch(() => {
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
                title: "Deployment failed",
            });
        })
    }
    return (
        <div className="new-post">
            <Modal show={addPost}>
                <Modal.Header>
                    <Modal.Title>new post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="post title"
                                ref={titleInput}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>description</Form.Label>
                            <textarea placeholder="post description" ref={descriptionInput}></textarea>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>image</Form.Label>
                            <Form.Control
                                type="file"
                                ref={imageInput}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setAddPost(false)}>
                        cancel
                    </Button>
                    <Button variant="primary" onClick={add}>
                        add
                    </Button>
                </Modal.Footer>
            </Modal>
            <button className="AddPost" onClick={() => setAddPost(true)}></button>
        </div>
    )
}
export default AddPost
