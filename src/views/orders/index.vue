<template>
<div>
 <el-button type="primary" style="margin:10px 20px 0px 0px;" size="large" @click="goBack">返回</el-button>
 <span style="font-size:x-large">当前课程</span>
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
import { reactive } from 'vue'
import { getStudentsScoreByCourseId, postSubmitScore } from '../../api/student'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

const studentsList = reactive([])
const getStudentsList = async () => {
   if (router.currentRoute.value.query.id) {
   const { data, errno } = await getStudentsScoreByCourseId(JSON.parse(router.currentRoute.value.query.id) || '')
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
      message: '请通过路由跳转',
      type: 'warning'
    })
  }
}

getStudentsList()

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

const goBack = () => {
  router.go(-1)
}
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
