<template>
  <div style="display:flex;justify-content:space-between">
    <span style="font-size:x-large">当前课程 : &nbsp;{{ name }}</span>
    <el-button type="primary" @click="goBack">返回</el-button>
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
        <el-button type="primary" style="margin:10px 5px 0px 0px;" size="large" @click="submitScore">提交分数</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { getStudentsScoreByCourseId, postSubmitScore } from '../../api/student'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref(router.currentRoute.value.query.name)
const studentsList = reactive([])
const getStudentsList = async () => {
  if (router.currentRoute.value.query.id) {
    const { data, errno } = await getStudentsScoreByCourseId(JSON.parse(router.currentRoute.value.query.id) || '')
    if (errno) {
      ElMessage({
        duration: 800,
        center: true,
        message: '查询失败',
        type: 'warning'
      })
      return
    }

    studentsList.splice(0, studentsList.length)
    data.forEach(function (items) {
      studentsList.push({
        sid: items.student.sid,
        name: items.student.sname,
        bid: items.class.bid,
        major: items.class.major,
        score: items.score,
        id: items.id
      })
    })

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
    message: '请通过路由跳转',
    type: 'warning'
  })
}

getStudentsList()

const ScoreData = ref([])
const submitScore = async () => {
  ScoreData.value = studentsList.map((items) => {
    return {
    sid: items.sid,
    score: items.score
    }
  })
  const id = studentsList[1].id
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
