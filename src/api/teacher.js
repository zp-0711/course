import service from './request'

export const getTeachers = () => {
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