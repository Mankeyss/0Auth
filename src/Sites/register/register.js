const sendRegister = async function(e) {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("username", document.getElementById('username').value);
    urlencoded.append("displayname", document.getElementById('displayname').value);
    urlencoded.append("password", document.getElementById('password').value);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow',
    };

    const response = await fetch("http://localhost:8940/api/v1/register", requestOptions)
    .catch(error => console.log('error', error));
    if(response.ok) window.location.href = response.url;
}

document.getElementById('register-form').addEventListener('submit', function(e){sendRegister(e)});