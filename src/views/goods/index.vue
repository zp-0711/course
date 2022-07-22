<template>
  <div>
    <el-select v-model="teachersList.tid" class="m-2" placeholder="教师名称" size="large" @change="getCourseList">
      <el-option v-for="item in teachersList" :key="item.tid" :label="item.tname" :value="item.tid" />
    </el-select>
    <el-select v-model="courseList._id" placeholder="课程名称" size="large" clearable class="filter-item"
      style="margin-left: 8px;width: 200px">
      <el-option v-for="item in courseList" :key="item._id" :label="item.course.cname" :value="item._id" />
    </el-select>
    <el-button type="primary" style="margin-left:10px" size="large" @click="getStudentsList">查询</el-button>
  </div>
  <div class="el_table">
    <el-card>
      <el-table :data="studentsList" border style="width: 100%" stripe>
        <el-table-column prop="class.bid" label="班级编号" width="180" />
        <el-table-column prop="class.major" label="专业" width="180" />
        <el-table-column prop="student.sid" label="学号" width="180" />
        <el-table-column prop="student.sname" label="学生姓名" width="180" />
        <el-table-column label="重新赋分">
          <template #default="{ row }">
            <template v-if="row">
              <el-input v-model="row.score" class="edit-input" size="large" max="100" />
            </template>
          </template>
        </el-table-column>
      </el-table>
      <div class="button_submit">
        <el-button type="primary" style="margin:10px 20px 0px 0px;" size="large" @click="submitScore">提交分数</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getStudentsScoreByCourseId, postSubmitScore } from '../../api/student'
import { getTeacherCourseById, getTeachers } from '../../api/teacher'
import { ElMessage } from 'element-plus'

const teachersList = ref([])
const getTeacherList = async () => {
  const { data, errno } = await getTeachers()

  if (errno) {
    ElMessage({
      duration: 800,
      center: true,
      message: '查询教师列表失败',
      type: 'warning'
    })
    return
  }
  teachersList.value = data
}

const courseList = ref([])

const getCourseList = async (value) => {
  courseList.value = []
  const { data, errno } = await getTeacherCourseById(value)
  if (errno) {
    ElMessage({
      duration: 800,
      center: true,
      message: '查询教师课程失败',
      type: 'warning'
    })
    return
  }
  courseList.value = data
  console.log('所有课程信息', courseList)
}

const studentsList = ref([])

const getStudentsList = async () => {
  if (courseList.value._id) {
    const { data, errno } = await getStudentsScoreByCourseId(courseList.value._id)
    console.log('查询学生的分数信息', data)

    if (errno) {
      ElMessage({
        duration: 800,
        center: true,
        message: '查询失败',
        type: 'warning'
      })
      return
    }

    studentsList.value.splice(0, studentsList.value.length)
    studentsList.value = data
    console.log('studentsList.value', studentsList.value)

    ElMessage({
      duration: 800,
      center: true,
      message: '查询成功',
      type: 'success'
    })
    return
  }

  ElMessage({
    duration: 800,
    center: true,
    message: '请选择课程',
    type: 'warning'
  })
}

const ScoreData = ref([])

const submitScore = async () => {
  ScoreData.value = studentsList.value.map((items) => {
    const obj = {}
    obj.sid = items.student.sid
    obj.score = items.score
    return obj
  })

  const id = studentsList.value[1].id
  const { errno } = await postSubmitScore(id, ScoreData.value)

  if (errno) {
    ElMessage({
      duration: 800,
      center: true,
      message: '提交失败',
      type: 'warning'
    })
    return
  }

  ElMessage({
    duration: 800,
    center: true,
    message: '提交成功',
    type: 'success'
  })
}

getTeacherList()
</script>

<style lang="scss" scoped>
.el_table {
  padding-top: 15px;
}

.button_submit {
  display: flex;
  justify-content: flex-end;
}
</style>
