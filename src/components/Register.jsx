import axios from 'axios';
import { useRef } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
const Register = ({ registerState, setRegisterState, setIsLogIn }) => {
    const handleClose = () => setRegisterState(false);
    const imageInput = useRef()
    const nameInput = useRef()
    const userNameInput = useRef()
    const passwordInput = useRef()
    const register = () => {
        const image = imageInput.current.files[0]
        const name = nameInput.current.value.replaceAll("@", "")
        const userName = userNameInput.current.value.replaceAll(/\s+/g, "-").replaceAll("@", "");
        const password = passwordInput.current.value
        const AccountInfo = new FormData()
        AccountInfo.append("image", image)
        AccountInfo.append("name", name)
        AccountInfo.append("username", userName)
        AccountInfo.append("password", password)
        axios.post("https://tarmeezacademy.com/api/v1/register", AccountInfo).then(res => {
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("userInfo", JSON.stringify(res.data.user))
            setIsLogIn(true)
            handleClose(false)
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
                title: "Signed in successfully",
            });
        }).catch((error) => {
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
    return (
        <>
            <Modal show={registerState} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Profile image</Form.Label>
                            <Form.Control
                                type="file"
                                ref={imageInput}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="name"
                                ref={nameInput}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>user name</Form.Label>
                            <div className='user-name-field'>
                                <span>@</span>
                                <Form.Control
                                    type="text"
                                    placeholder="user name"
                                    ref={userNameInput}
                                />
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>password</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="enter your password"
                                ref={passwordInput}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        cancel
                    </Button>
                    <Button variant="primary" onClick={register}>
                        register
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default Register