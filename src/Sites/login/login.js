const urlParams = new URLSearchParams(window.location.search);

const sendLogin = async function(e) {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const username = document.getElementById('username').value;

    var urlencoded = new URLSearchParams();
    urlencoded.append("username", username);
    urlencoded.append("password", document.getElementById('password').value);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow',
    };

    const response = await fetch("http://localhost:8940/api/v1/login?redir=/test", requestOptions)
    .catch(error => console.log('error', error));
    if(response.ok) {
        if(urlParams.has('redir')) {
            window.location.href = urlParams.get('redir') + `?username=${username}&icon=0&id=0`;
        } else {
            window.location.href = response.url + ``;
        }
        console.log(response);
    }
}

document.getElementById('login-form').addEventListener('submit', function(e){sendLogin(e)});