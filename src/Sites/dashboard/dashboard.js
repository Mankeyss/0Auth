const urlParams = new URLSearchParams(window.location.search);
if(urlParams.has('username')) {
    document.cookie = "username=; expires=Thu, 01 Jan 2000 00:00:00 UTC;";
    document.cookie = `username=${urlParams.get('username')}`;
}
if(urlParams.has('icon')) {
    document.cookie = "icon=; expires=Thu, 01 Jan 2000 00:00:00 UTC;";
    document.cookie = `icon=${urlParams.get('icon')}`;
}
if(urlParams.has('id')) {
    document.cookie = "id=; expires=Thu, 01 Jan 2000 00:00:00 UTC;";
    document.cookie = `id=${urlParams.get('id')}`;
}

if(urlParams.has('username' || 'icon' || 'id')) {
    window.location.href = '/dashboard';
}

function getCookie(name) {
    function escape(s) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
    return match ? match[1] : null;
}
const textnode = document.createTextNode(`Hello, ${getCookie('username')}!`);
const paragraphnode = document.createElement('p');
paragraphnode.appendChild(textnode);
document.getElementById('body').appendChild(paragraphnode);

if(getCookie('username') === null) {
    window.location.href = '/';
}