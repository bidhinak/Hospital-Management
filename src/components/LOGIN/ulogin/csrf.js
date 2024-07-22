export function getCsrfToken() {
    let token = null;
    const cookies = document.cookie.split(';');
    cookies.forEach(cookie => {
        const [name, value] = cookie.trim().split('=');
        if (name === 'csrftoken') {
            token = value;
        }
    });
    return token;
}