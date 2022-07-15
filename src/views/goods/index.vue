<template>
  <div>
    <el-select v-model="options.value" class="m-2" placeholder="教师名称" size="large" @change="reqCourse">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
  <el-select
              v-model="calendarTypeOptions.value"
              placeholder="课程名称"
              size="large"
              clearable
              class="filter-item"
              style="margin-left: 8px;width: 200px"
              @change="queryStudents">
            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.label" :value="item.value" />
      </el-select>
        <el-button type="primary" style="margin-left:10px" size="large" @click="submitScore">搜索学生</el-button>
  </div>
  <div class="el_table">
    <el-card>
    <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="bid" label="班级编号" width="180" />
    <el-table-column prop="major" label="专业" width="180" />
    <el-table-column prop="sid" label="学号" width="180" />
    <el-table-column prop="name" label="学生姓名" width="180" />
    <!-- <el-table-column prop="oldScore" label="分数" width="180" /> -->
    <el-table-column label="重新赋分" >
       <template #default="{ row }">
              <template v-if="row">
                <el-input v-model="row.newScore" class="edit-input" size="large"/>
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

// const value = ref('')
// const listLoading = ref(true)

const options = ref([])
const calendarTypeOptions = ref([])
const tableData = reactive([])
const data = reactive([])
// const scores = ref([])
// 获取教师列表
const getTeacherList = async () => {
  const result = await getTeachers()
  // options.push(list.data)
  result.data.map(function (obj) {
    const rObj = {}
    rObj.value = obj.tid
    rObj.label = obj.tname
    options.value.push(rObj)
  })
}
// 查询教师对应的课程
const reqCourse = async (val) => {
  calendarTypeOptions.value.splice(0, calendarTypeOptions.value.length)
  const result = await getTeacherCourse(val.toString())
  // console.log(result.data)
    result.data.map(function (obj) {
    const rObj = {}
    // 班级编号
    rObj.value = obj.class.bid + obj._id
    // 课程名称
    rObj.label = obj.course.cname
    // 课程唯一id
    rObj.cid = obj.course.cid
    // 排课表的id
    rObj.id = obj._id
    calendarTypeOptions.value.push(rObj)
  })
  console.log('所有课程信息', calendarTypeOptions)
}

// 查询学生,para:班级编号bid
const queryStudents = async (val) => {
  tableData.splice(0, tableData.length)
  // const result = await getStudents(val.slice(0, 4))
  // console.log('查询学生的信息', result.data)
  //   let rObj = []
  //   rObj = result.data.sids
  //   console.log(rObj)
  //   rObj.map(function (obj) {
  //   const rObj2 = {}
  //   rObj2.sid = obj.sid
  //   rObj2.name = obj.sname
  //   rObj2.bid = obj.bid
  //   rObj2.major = obj.major
  //   tableData.push(rObj2)
  // })
  const result = await getStudentsScore(val.slice(4))
    console.log('查询学生的分数信息', result.data)
        let rObj = []
        rObj = result.data
        // console.log(rObj)
        rObj.map(function (obj) {
        const rObj2 = {}
        rObj2.sid = obj.student.sid
        rObj2.name = obj.student.sname
        rObj2.bid = obj.class.bid
        rObj2.major = obj.class.major
        // rObj2.oldScore = obj.score
        rObj2.newScore = obj.score
        rObj2.id = obj.id
        tableData.push(rObj2)
        console.log('tacleData', tableData)
      })
}

// 提交分数,params:tableData.id
const submitScore = async() => {
  tableData.map((items) => {
    const obj = {}
    obj.sid = items.sid
    obj.score = items.newScore
    data.push(obj)
  })
  const id = tableData[1].id
  console.log(id)
  const result = await postSubmitScore(id, data)
  if (result.errno !== 0) {
    console.log(result.message)
    }
  console.log('data数据', data)
}

getTeacherList()
</script>

<style lang="scss" scoped>
.el_table{
  padding-top: 15px;
}
.button_submit{
 display: flex;
 justify-content: end;
}
</style>
