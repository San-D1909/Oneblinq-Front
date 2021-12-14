import platform from 'platform';

function OSInfo(){
    return platform.os.toString()
}

function BrowserInfo(){
    return platform.name.toString() + platform.version.toString();
}

function UAInfo(){
    return navigator.userAgent;
}

export {OSInfo, BrowserInfo, UAInfo}
