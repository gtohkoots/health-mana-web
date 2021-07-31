export const getCookie = (key) => {
    return localStorage.getItem(key);
}

export const setCookie = (key, value) => {
    return localStorage.setItem(key, value);
}

export const setCookiewtihTTL = (key, value, ttl) => {
    const item = {
        value: value,
        ttl: Date.now() + (ttl*1000),
    }

    localStorage.setItem(key, JSON.stringify(item));
}

export const getCookiewithTTL = (key) => {
    const data = localStorage.getItem(key);
    if (!data) {  
        return null;  
    }

    if (Date.now() > item.ttl) {
        localStorage.removeItem(key);
        return "data expired";
    }
    const item = JSON.parse(data);

    return item.value;
}

export const deleteCookie = (key) => {
    return localStorage.removeItem(key);
}