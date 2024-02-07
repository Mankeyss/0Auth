try {
    const url = new URL(window.location.href)
    const urlParams = new URLSearchParams(url.search);

    const username = decodeURIComponent(urlParams.get('username'));
    const icon = decodeURIComponent(urlParams.get('icon'));
    const id = decodeURIComponent(urlParams.get('id'));

    const script = document.getElementById('dataDecoder');

    const targetUrl = script.dataset.redirurl;
    console.log(targetUrl, username, icon, id);

    if(urlParams.get('username') && urlParams.get('icon') && urlParams.get('id') && targetUrl) {
        document.cookie = "username=; expires=Thu, 01 Jan 2000 00:00:00 UTC; path=/;";
        document.cookie = "icon=; expires=Thu, 01 Jan 2000 00:00:00 UTC; path=/;";
        document.cookie = "id=; expires=Thu, 01 Jan 2000 00:00:00 UTC; path=/;";

        document.cookie = `username=${username}`;
        document.cookie = `icon=${icon}`;
        document.cookie = `id=${id}`;

        window.location.href = targetUrl;
    } else {
        window.location.href = 'http://localhost:8940/dataerror';
    }
} catch (e) {
    window.location.href = 'http://localhost:8940/dataerror';
}