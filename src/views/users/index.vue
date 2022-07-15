<template>
  <div>
    <el-select v-model="value" class="m-2" placeholder="教师名称" clearable size="large">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
  <el-select
              v-model="type"
              placeholder="课程名称"
              size="large"
              clearable
              class="filter-item"
              style="margin-left: 8px;width: 130px">
            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.label" :value="item.value" />
      </el-select>
        <el-button type="primary" style="margin-left:10px" @click="handleFilter">搜索</el-button>
        <el-button type="primary" style="margin-left:10px" @click="handleCreate">添加</el-button>
  </div>
  <div style="padding-top:15px">
    <el-card>
    <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="date" label="课程编号" width="180" />
    <el-table-column prop="name" label="课程名称" width="180" />
    <el-table-column prop="name" label="学时" width="180" />
    <el-table-column prop="name" label="学分" width="180" />
    <el-table-column prop="name" label="创建时间" width="180" />
     <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>

    <!-- <el-buttton></el-buttton> -->
    </el-table>
  </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
// const listLoading = ref(true)

const options = [
  {
    value: 'Option1',
    label: 'Option1'
  },
  {
    value: 'Option2',
    label: 'Option2'
  },
  {
    value: 'Option3',
    label: 'Option3'
  },
  {
    value: 'Option4',
    label: 'Option4'
  },
  {
    value: 'Option5',
    label: 'Option5'
  }
]
const calendarTypeOptions = [
   {
    value: 'Option1',
    label: 'Option1'
  },
  {
    value: 'Option2',
    label: 'Option2'
  }
]
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]
const getList = async() => {
  // listLoading.value = true
  // const { data } = await getArticle( set.listQuery )
  console.log('dfddg')
}
const handleFilter = () => {
  // set.listQuery.page = 1
  getList()
  console.log('sssss')
}

const handleCreate = () => {
  // set.listQuery.page = 1
  getList()
  console.log('sssss')
}
</script>

<style lang="scss" scoped></style>
