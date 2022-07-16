<template>
  <div>
    <el-select v-model="options.value" class="m-2" placeholder="教师名称" size="large" @change="reqCourse">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-select v-model="calendarTypeOptions.value" placeholder="课程名称" size="large" clearable class="filter-item"
      style="margin-left: 8px;width: 180px">
      <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.label" :value="item.value" />
    </el-select>
    <el-button type="primary" style="margin-left:10px" @click="handleFilter" size="large">获取课程列表</el-button>
  </div>
  <div style="padding-top:15px">
    <el-card>
      <el-table :data="tableData" border style="width: 100%" stripe>
        <el-table-column prop="cid" label="课程编号" width="150" />
        <el-table-column prop="cname" label="课程名称" width="230" />
        <el-table-column prop="xueshi" label="学时" width="180" />
        <el-table-column prop="xuefen" label="学分" width="180" />
        <el-table-column prop="createdAt" label="创建时间" width="230" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { getAllCourses } from '../../api/class'
import { getTeachers, getTeacherCourse } from '../../api/teacher'

const options = ref([])
const calendarTypeOptions = ref([])
const tableData = reactive([])

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
getTeacherList()

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
// 获取列表
const getList = async () => {
  const result = await getAllCourses()
  let rObj = []
  rObj = result.data
  rObj.map(function (obj) {
    const rObj2 = {}
    rObj2.cid = obj.cid
    rObj2.cname = obj.cname
    rObj2.xueshi = obj.xueshi
    rObj2.xuefen = obj.xuefen
    rObj2.createdAt = obj.createdAt
    tableData.push(rObj2)
    console.log('tableData', tableData)
  })
}
  getList()
const handleFilter = () => {
}
</script>

<style lang="scss" scoped>
</style>
