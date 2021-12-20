import platform from 'platform';

export const OSInfo = () => {
    return platform.os.toString()
}

export const BrowserInfo = () => {
    return platform.name.toString() + platform.version.toString();
}

export const UAInfo = () => {
    return navigator.userAgent;
}

export const FullInfo = () => {
    return OSInfo + BrowserInfo + UAInfo;
}

