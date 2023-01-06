import React from 'react';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useHistory } from 'react-router-dom';
import { executeQuery } from './api';

const Home = () => {
    const [sqlQuery, setSqlQuery] = useState("");
    const [message, setMessage] = useState("");
    const [records, setRecords] = useState([]);
    const [columns, setColumns] = useState([]);

    const history = useHistory();

    useEffect(() => {
        if (!history.location.state) history.push('/');
    }, [history.location.state]);

    const executeSqlQuery = () => {
        let userName = history.location.state?.userData?.userName;
        let password = history.location.state?.userData?.password;
        executeQuery({ query: sqlQuery, userName: userName, password: password })
            .then(response => {
                if (response && response.constructor === ({}).constructor) {
                    if (response.detail) {
                        setMessage(response.detail);
                    }
                    else if (response.code === "42501") {
                        setMessage("Permission Denied");
                    } else {
                        setMessage("Invalid SQL");
                    }
                    setRecords([]);
                    setColumns([]);
                } else {
                    setMessage("success");
                    if (Array.isArray(response) && response.length) {
                        setRecords(response);
                        setColumns(Object.keys(response[0]));
                    } else {
                        setRecords([]);
                        setColumns([]);
                    }
                }
            }).catch(err => {
                setMessage("Invalid SQL");
                setRecords([]);
                setColumns([]);
            });
    }

    return (
        <div className="home mt-4">
            <Form style={{ width: 650 }}>
                <Form.Group className="mb-3">
                    <Form.Label>Enter your SQL query</Form.Label>
                    <Form.Control as="textarea" rows={3} onChange={e => setSqlQuery(e.target.value)} style={{ boxShadow: "0 0 2px gray" }} />
                    <div className="d-flex justify-content-end mt-2">
                        <Button variant="primary" onClick={executeSqlQuery}>
                            EXECUTE
                        </Button>
                    </div>
                </Form.Group>
            </Form>
            {
                message === "success" ?
                    <Alert variant="success">
                        <p>Query completed successfully!</p>
                    </Alert>
                    : (!message ? null : <Alert variant="danger">
                        <p>{message}</p>
                    </Alert>
                    )
            }
            {
                records?.length ?
                    <div style={{ width: 650, height: 450, overflow: "auto" }}>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    {
                                        columns.map(column => <th style={{ textTransform: 'capitalize' }}>{column.replace('_', ' ')}</th>)
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    records.map(record => <tr>
                                        {
                                            columns.map(column => <td>{record[column]}</td>)
                                        }
                                    </tr>)
                                }
                            </tbody>
                        </Table>
                    </div>
                    : null
            }

        </div>
    );
}

export default Home;
