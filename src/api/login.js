import service from './request'

export const login = (data) => {
    return service({
        url: '/user/login',
        method: 'POST',
        data
    })
}