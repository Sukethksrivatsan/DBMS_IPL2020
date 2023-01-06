export const login = (params) => {
    return fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    })
        .then(response => {
            return response.json().then((data) => {
                return data;
            }).catch((err) => {
                console.log(err);
            });
        });
};

export const executeQuery = (params) => {
    return fetch('http://localhost:3001/executeQuery', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    })
        .then(response => {
            return response.json().then((data) => {
                return data;
            }).catch((err) => {
                console.log(err);
            });
        });
};