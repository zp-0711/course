<template>
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
import { ref } from 'vue'
import { getAllCourses } from '../../api/class'
import { ElMessage } from 'element-plus'
const courseTableData = ref([])
const getList = async () => {
  const { data, errno } = await getAllCourses()

  if (errno) {
    ElMessage({
      duration: 800,
      center: true,
      message: '获取课程列表失败',
      type: 'warning'
    })
    return
  }

  courseTableData.value = data
}
getList()
</script>
