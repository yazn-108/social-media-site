import axios from 'axios';
import { useRef } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
const LogIn = ({ loginState, setLoginState, setIsLogIn }) => {
    const handleClose = () => setLoginState(false);
    const userNameInput = useRef()
    const passwordInput = useRef()
    const logIn = () => {
        const userName = userNameInput.current.value
        const password = passwordInput.current.value
        if (userName.value !== "" && password.value !== "") {
            axios.post("https://tarmeezacademy.com/api/v1/login", {
                "username": userName,
                "password": password
            }).then(res => {
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
    }
    return (
        <>
            <Modal show={loginState} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>LogIn</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>user name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="username"
                                autoFocus
                                ref={userNameInput}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
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
                        Close
                    </Button>
                    <Button variant="primary" onClick={logIn}>
                        LogIn
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}
export default LogIn