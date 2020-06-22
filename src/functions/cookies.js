import Cookies from 'js-cookie'

const cookieKey = 'awe-quiz'

export const setCookie = (data) => {
    Cookies.set(cookieKey, JSON.stringify(data), { expires: 365, sameSite: 'strict' })
    console.log('cookie set!', Cookies.get(cookieKey))
    return cookieKey
}

export const getCookie = () => {
    console.log('getting cookie!')
    return Cookies.getJSON(cookieKey)
}