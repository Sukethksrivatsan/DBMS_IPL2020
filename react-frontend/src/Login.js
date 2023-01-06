import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from './api';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errMessage, setErrMessage] = useState("");
    const history = useHistory();

    const loginUser = () => {
        login({ userName: userName, password: password })
            .then(response => {
                if (response.length) {
                    history.push({
                        pathname: "/home",
                        state: {
                            userData: { userName: userName, password: password }
                        }
                    });
                } else {
                    setErrMessage("Incorrect username or password. Please try again");
                }
            })
            .catch(err => {
                setErrMessage(err);
            })
    }

    return (
        <div className="card p-4 mt-4" style={{ width: "370px", boxShadow: "0 0 10px gray" }}>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" onChange={e => setUserName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <div className="mb-3">
                    <span style={{ color: "red" }}>{errMessage}</span>
                </div>
                <div className="d-flex justify-content-center">
                    <Button variant="primary" onClick={loginUser}>
                        LOGIN
                    </Button>
                </div>
            </Form>
        </div>

    );
}

export default Login;
