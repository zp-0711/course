import service from './request'

export const getStudents = (id) => {
    return service({
        url: `/class/${id}/student`,
        method: 'GET'
    })
}

export const getStudentsScore = (id) => {
    return service({
        url: `/score/${id}`,
        method: 'GET'
    })
}

export const postSubmitScore = (id, data) => {
    return service({
        url: `/score/${id}/student`,
        method: 'POST',
        data
    })
}