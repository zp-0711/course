const TOKEN_TIME = 'tokenTime'

const TOKEN_TIME_VALUE = 1 * 60 * 60 * 1000
    // 登录时设置时间
export const setTokenTime = () => {
    localStorage.setItem(TOKEN_TIME, Date.now())
}

// 获取
export const getTokenTime = () => {
    return localStorage.getItem(TOKEN_TIME)
}

// 是否已经过期
export const diffTokenTime = () => {
    const currentTime = Date.now()
    const tokenTime = getTokenTime()
    return currentTime - tokenTime > TOKEN_TIME_VALUE
}