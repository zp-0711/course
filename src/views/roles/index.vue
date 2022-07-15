<template>
<div>
    <el-select v-model="value" class="m-2" placeholder="教师名称" size="large">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
      <el-button type="primary" size="large" @click="queryTable">查询教师课表</el-button>
  </div>
  <div class="table-k">
    <el-card class="box-card">
  <el-table :data="tableData" border  stripe style="width: 100%;" class="table-content" @cell-click="dj">
    <el-table-column fixed prop="time" label="时间" width="min-width" align="center"/>
    <el-table-column prop="Mon" label="周一" width="min-width"  align="center"/>
    <el-table-column prop="Tue" label="周二" width="min-width"  align="center"/>
    <el-table-column prop="Wed" label="周三" width="min-width" align="center"/>
    <el-table-column prop="Thur" label="周四" width="min-width" header-align="center" align="center"/>
    <el-table-column prop="Fri" label="周五" width="min-width" header-align="center" align="center"/>
    <el-table-column prop="Sat" label="周六" width="min-width" header-aligin="center" align="center"/>
    <el-table-column prop="Sun" label="周日" width="min-width" header-aligin="center" align="center"/>
  </el-table>
  </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getTeachers } from '../../api/teacher'
const options = ref([])

// const ff = async () => {
//   await getTeachers().then(res => {
//     options = res.data.map(function (obj) {
//       const rObj = {}
//       rObj.value = obj.tid
//       rObj.label = obj.tname
//       return rObj
//     }).catch(() => {
//       console.log('error')
//     })
//   })
// }
// ff()
const getTeacherList = async () => {
  const result = await getTeachers()
  console.log(result)
  // options.push(list.data)
  result.data.map(function (obj) {
    const rObj = {}
    rObj.value = obj.tid
    rObj.label = obj.tname
    options.value.push(rObj)
  })
}
getTeacherList()

const tableData = [
  {
    time: '8:00-10:00',
    Mon: '计算流体力学',
    Tue: '',
    Wed: '',
    Thur: '',
    Fri: '',
    Sat: '',
    Sun: ''
  },
  {
    time: '10:00-12:00',
    Mon: '',
    Tue: '',
    Wed: '',
    Thur: '',
    Fri: '',
    Sat: '',
    Sun: ''
  },
  {
    time: '14:00-16:00',
    Mon: '',
    Tue: '',
    Wed: '',
    Thur: '',
    Fri: '',
    Sat: '',
    Sun: ''
  },
  {
    time: '16:00-18:00',
    Mon: '',
    Tue: '',
    Wed: '',
    Thur: '',
    Fri: '',
    Sat: '',
    Sun: ''
  }
]
// const options = [
//   {
//     value: 'Option1',
//     label: 'Option1'
//   },
//   {
//     value: 'Option2',
//     label: 'Optiojn2'
//   }
// ]
const queryTable = () => {
  alert('hello')
}
const dj = (row, column, cell, event) => {
  console.log(row)
  console.log(column)
  console.log(cell)
  console.log(event)
  console.log('jdskaf')
}
</script>

<style scoped>
.table-k{
  margin: 10px;
  padding: 3px;
  /* background-color: rgb(101, 150, 210); */
}
.elSelect{
  padding: 20px 10px 5px 10px;
}
</style>