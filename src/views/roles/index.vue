<template>
  <div>
    <el-select v-model="teachersList.tid" class="m-2" style="padding: 0px 10px 5px 15px" placeholder="教师名称" size="large"
      @change="getSchedule">
      <el-option v-for="item in teachersList" :key="item.tid" :label="item.tname" :value="item.tid" />
    </el-select>
    <el-button type="primary" size="large" @click="queryTable">查询教师课表</el-button>
  </div>
  <div class="table-k">
    <el-card class="box-card">
      <el-table :data="Schedule" border stripe style="width: 100%;" class="table-content" @cell-click="dj">
        <el-table-column fixed prop="time" label="时间" width="min-width" align="center" />
        <el-table-column prop="Mon" label="周一" width="min-width" align="center" />
        <el-table-column prop="Tue" label="周二" width="min-width" align="center" />
        <el-table-column prop="Wed" label="周三" width="min-width" align="center" />
        <el-table-column prop="Thur" label="周四" width="min-width" header-align="center" align="center" />
        <el-table-column prop="Fri" label="周五" width="min-width" header-align="center" align="center" />
        <el-table-column prop="Sat" label="周六" width="min-width" header-aligin="center" align="center" />
        <el-table-column prop="Sun" label="周日" width="min-width" header-aligin="center" align="center" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { getTeachers, getTeacherCourseById } from '../../api/teacher'
import { reactive, ref } from 'vue'
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
getTeacherList()

const Schedule = reactive([
  {
    time: '上午 8:00-10:00',
    Mon: '',
    Tue: '',
    Wed: '',
    Thur: '',
    Fri: '',
    Sat: '',
    Sun: ''
  },
  {
    time: '上午 10:00-12:00',
    Mon: '',
    Tue: '',
    Wed: '',
    Thur: '',
    Fri: '',
    Sat: '',
    Sun: ''
  },
  {
    time: '下午 14:00-16:00',
    Mon: '',
    Tue: '',
    Wed: '',
    Thur: '',
    Fri: '',
    Sat: '',
    Sun: ''
  },
  {
    time: '下午 16:00-18:00',
    Mon: '',
    Tue: '',
    Wed: '',
    Thur: '',
    Fri: '',
    Sat: '',
    Sun: ''
  }
])

const getSchedule = async (value) => {
  clearTable()
  // console.log('value: ', value)
  await getTeacherCourseById(value).then(res => {
    res.data.map(function (obj) {
      const arr = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
      const { course } = obj
      const timeNum = obj.time_num
      const class1 = obj.class
      console.log('timeNum', timeNum)
      console.log('class1', class1)
      timeNum.forEach(items => {
        const num1 = Math.floor(items / 7)
        const num2 = items % 7
        const str = arr[num2]
        Schedule[num1][str] = course.cname + ' ' + class1.bid
        console.log('Schedule', Schedule)
      })
    })
  })
}

const queryTable = () => {
  alert('hello')
  // getSchedule()
}

// 清空 Schedule
const clearTable = () => {
  Schedule.splice(0, Schedule.length,
   {
      time: '上午 8:00-10:00',
      Mon: '',
      Tue: '',
      Wed: '',
      Thur: '',
      Fri: '',
      Sat: '',
      Sun: ''
    },
    {
      time: '上午 10:00-12:00',
      Mon: '',
      Tue: '',
      Wed: '',
      Thur: '',
      Fri: '',
      Sat: '',
      Sun: ''
    },
    {
      time: '下午 14:00-16:00',
      Mon: '',
      Tue: '',
      Wed: '',
      Thur: '',
      Fri: '',
      Sat: '',
      Sun: ''
    },
    {
      time: '下午 16:00-18:00',
      Mon: '',
      Tue: '',
      Wed: '',
      Thur: '',
      Fri: '',
      Sat: '',
      Sun: ''
    })
  //    = [
  // ]
}
</script>

<style scoped>
.table-k {
  margin: 10px;
  padding: 3px;
  /* background-color: rgb(101, 150, 210); */
}

.elSelect {
  padding: 20px 10px 5px 10px;
}
</style>