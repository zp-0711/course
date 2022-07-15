import service from './request'

const getTeachers = () => {
    return service({
        url: '/teacher',
        method: 'GET'
    })
}
export const getTeacherCourse = (id) => {
    return service({
        url: `/arrange/teacher/${id}`,
        method: 'GET'
    })
}

export {
    getTeachers
}