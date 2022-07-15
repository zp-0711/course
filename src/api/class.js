import service from './request'

const getClasses = () => {
  return service({
    url: '/class',
    method: 'GET'
  })
}

const getClassCourses = (id) => {
  const bid = id.toString()
  return service({
    url: '/arrange/class/' + bid,
    method: 'GET'
  })
}

export {
  getClasses,
  getClassCourses
}