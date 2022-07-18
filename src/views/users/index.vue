<template>
  <div>
    <el-button type="primary" style="margin-left:10px" @click="handleFilter" size="large">获取课程列表</el-button>
  </div>
  <div style="padding-top:15px">
    <el-card>
      <el-table :data="courseTableData" border style="width: 100%" stripe>
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
import { reactive } from 'vue'
import { getAllCourses } from '../../api/class'

// 查询教师对应的课程
// 获取列表
const courseTableData = reactive([])
const getList = async () => {
  const { data } = await getAllCourses()
  // data.forEach(function (obj) {
  //   const rObj2 = {}
  //   rObj2.cid = obj.cid
  //   rObj2.cname = obj.cname
  //   rObj2.xueshi = obj.xueshi
  //   rObj2.xuefen = obj.xuefen
  //   rObj2.createdAt = obj.createdAt
  //   courseTableData.push(rObj2)
  //   // console.log('courseTableData', courseTableData)
  // })
      courseTableData.push(data)
}
  getList()
const handleFilter = () => {
}
</script>

<style lang="scss" scoped>
</style>
