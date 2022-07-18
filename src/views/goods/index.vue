<template>
  <div>
    <el-select v-model="teachersList.teacherId" class="m-2" placeholder="教师名称" size="large" @change="queryCourse">
      <el-option v-for="item in teachersList" :key="item.teacherId" :label="item.teacherName" :value="item.teacherId" />
    </el-select>
    <el-select v-model="courseList.courseId" placeholder="课程名称" size="large" clearable class="filter-item"
      style="margin-left: 8px;width: 200px">
      <el-option v-for="item in courseList" :key="item.courseId" :label="item.courseName" :value="item.courseId" />
    </el-select>
    <el-button type="primary" style="margin-left:10px" size="large" @click="queryStudents">查询</el-button>
  </div>
  <div class="el_table">
    <el-card>
      <el-table :data="studentsTable" border style="width: 100%" stripe>
        <el-table-column prop="bid" label="班级编号" width="180" />
        <el-table-column prop="major" label="专业" width="180" />
        <el-table-column prop="sid" label="学号" width="180" />
        <el-table-column prop="name" label="学生姓名" width="180" />
        <!-- <el-table-column prop="oldScore" label="分数" width="180" /> -->
        <el-table-column label="重新赋分">
          <template #default="{ row }">
            <template v-if="row">
              <el-input v-model="row.newScore" class="edit-input" size="large" max="100" />
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
import { getStudentsScore, postSubmitScore } from '../../api/student'
import { getTeacherCourse, getTeachers } from '../../api/teacher'
import { ElMessage } from 'element-plus'

const teachersList = ref([])
const getTeacherList = async () => {
  const { data } = await getTeachers()
  // teachersList.push(list.data)
  data.forEach(function (items) {
    const rObj = {}
    rObj.teacherId = items.tid
    rObj.teacherName = items.tname
    teachersList.value.push(rObj)
  })
}

const courseList = ref([])

const queryCourse = async (val) => {
  courseList.value = []
  const { data } = await getTeacherCourse(val)
  data.forEach(function (items) {
    const rObj = {}
    rObj.courseName = items.course.cname
    rObj.courseId = items._id
    courseList.value.push(rObj)
  })
  console.log('所有课程信息', courseList)
}

const studentsTable = reactive([])

const queryStudents = async () => {
  // console.log('courseList.value.courseId', courseList.value.courseId)
  studentsTable.splice(0, studentsTable.length)
  if (courseList.value.courseId) {
    const { data } = await getStudentsScore(courseList.value.courseId)
    console.log('查询学生的分数信息', data)
    data.forEach(function (items) {
      const obj = {}
      obj.sid = items.student.sid
      obj.name = items.student.sname
      obj.bid = items.class.bid
      obj.major = items.class.major
      obj.newScore = items.score
      obj.id = items.id
      studentsTable.push(obj)
      console.log('studentsTable', studentsTable)
    })
    ElMessage({
      duration: 800,
      center: true,
      message: '查询成功',
      type: 'success'
    })
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
  studentsTable.forEach((items) => {
    const obj = {}
    obj.sid = items.sid
    obj.score = items.newScore
    ScoreData.push(obj)
  })
  const id = studentsTable[1].id
  console.log(id)
  const result = await postSubmitScore(id, ScoreData)
  if (result.errno !== 0) {
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
  justify-content: end;
}
</style>
