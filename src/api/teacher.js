import service from './request'

export const getTeachers = () => {
    return service({
        url: '/teacher',
        method: 'GET'
    })
}
export const getTeacherCourseById = (id) => {
    return service({
        url: `/arrange/teacher/${id}`,
        method: 'GET'
    })
}