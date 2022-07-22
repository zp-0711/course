<template>
  <div>
    <el-select v-model="teachersList.tid" class="m-2" placeholder="教师名称" size="large" @change="getCourseList">
      <el-option v-for="item in teachersList" :key="item.tid" :label="item.tname" :value="item.tid" />
    </el-select>
    <el-select v-model="courseList.id" placeholder="课程名称" size="large" clearable class="filter-item"
      style="margin-left: 8px;width: 200px">
      <el-option v-for="item in courseList" :key="item.id" :label="item.name" :value="item.id" />
    </el-select>
    <el-button type="primary" style="margin-left:10px" size="large" @click="getStudentsList">查询</el-button>
  </div>
  <div class="el_table">
    <el-card>
      <el-table :data="studentsList" border style="width: 100%" stripe>
        <el-table-column prop="bid" label="班级编号" width="180" />
        <el-table-column prop="major" label="专业" width="180" />
        <el-table-column prop="sid" label="学号" width="180" />
        <el-table-column prop="name" label="学生姓名" width="180" />
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
import { reactive, ref } from 'vue'
import { getStudentsScoreByCourseId, postSubmitScore } from '../../api/student'
import { getTeacherCourseById, getTeachers } from '../../api/teacher'
import { ElMessage } from 'element-plus'

const teachersList = ref([])
const getTeacherList = async () => {
  const { data, errno } = await getTeachers()
  if (errno !== 0) {
    ElMessage({
      duration: 800,
      center: true,
      message: '查询教师列表失败',
      type: 'warning'
    })
  } else {
    teachersList.value.push(...data)
  }
}

const courseList = ref([])

const getCourseList = async (val) => {
  courseList.value = []
  const { data, errno } = await getTeacherCourseById(val)
  if (errno !== 0) {
    ElMessage({
      duration: 800,
      center: true,
      message: '查询教师课程失败',
      type: 'warning'
    })
  } else {
    data.forEach((items) => {
      const rObj = {}
      rObj.name = items.course.cname
      rObj.id = items._id
      courseList.value.push(rObj)
    })
    console.log('所有课程信息', courseList)
  }
}

const studentsList = reactive([])

const getStudentsList = async () => {
  if (courseList.value.id) {
    const { data, errno } = await getStudentsScoreByCourseId(courseList.value.id)
    console.log('查询学生的分数信息', data)
    if (errno !== 0) {
      ElMessage({
        duration: 800,
        center: true,
        message: '查询失败',
        type: 'warning'
      })
    } else {
      studentsList.splice(0, studentsList.length)
      data.forEach(function (items) {
        const obj = {}
        obj.sid = items.student.sid
        obj.name = items.student.sname
        obj.bid = items.class.bid
        obj.major = items.class.major
        obj.score = items.score
        obj.id = items.id
        studentsList.push(obj)
        console.log('studentsList', studentsList)
      })
      ElMessage({
        duration: 800,
        center: true,
        message: '查询成功',
        type: 'success'
      })
    }
  } else {
    ElMessage({
      duration: 800,
      center: true,
      message: '请选择课程',
      type: 'warning'
    })
  }
}

const ScoreData = reactive([])

const submitScore = async () => {
  studentsList.forEach((items) => {
    const obj = {}
    obj.sid = items.sid
    obj.score = items.score
    ScoreData.push(obj)
  })
  const id = studentsList[1].id
  console.log(id)
  const { errno } = await postSubmitScore(id, ScoreData)
  if (errno !== 0) {
    ElMessage({
      duration: 800,
      center: true,
      message: '提交失败',
      type: 'warning'
    })
  } else {
    ElMessage({
      duration: 800,
      center: true,
      message: '提交成功',
      type: 'success'
    })
  }
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
