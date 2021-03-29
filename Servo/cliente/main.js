const url = 'http://localhost:3000';

setInterval(() => {
    axios({
        method: 'get',
        url: `${url}/data`,
    })
        .then(function ({ data }) {
            document.getElementById('data').innerHTML = data.contador;
            console.log(data.contador);
        })
        .catch(err => console.log(err))
}, 2000);


