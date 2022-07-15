<template>
  <el-menu
    active-text-color="#ffd04b"
    :background-color="variables.menuBg"
    class="el-menu-vertical-demo"
    :default-active="defaultActive"
    text-color="#fff"
    router
    unique-opened
    :collapse="!$store.getters.siderType"
  >
    <el-sub-menu
      :index="item.id"
      v-for="(item, index) in menusList"
      :key="item.id"
    >
      <template #title>
        <el-icon>
          <component :is="iconList[index]"></component>
        </el-icon>
        <span>{{ item.authName }}</span>
      </template>
      <el-menu-item
        :index="'/' + it.path"
        v-for="it in item.children"
        :key="it.id"
        @click="savePath(it.path)"
      >
        <template #title>
          <el-icon>
            <component :is="icon"></component>
          </el-icon>
          <span>{{ it.authName }}</span>
        </template>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { ref } from 'vue'
import variables from '@/styles/variables.scss'

const iconList = ref(['user', 'setting', 'shop', 'tickets', 'pie-chart'])
const icon = ref('menu')

const defaultActive = ref(sessionStorage.getItem('path') || '/users')
const menusList = ref([])
const initMenusList = async () => {
  menusList.value = [
      {
        id: 125,
        authName: '课程管理',
        path: 'users',
        children: [{
          id: 110,
          authName: '课程列表',
          path: 'users',
          children: [],
          order: null
        }],
        order: 1
      },
      {
        id: 103,
        authName: '课表管理',
        path: 'rights',
        children: [{
          id: 111,
          authName: '教师课表',
          path: 'roles',
          children: [],
          order: null
        },
        {
          id: 112,
          authName: '班级课表',
          path: 'rights',
          children: [],
          order: null
        }],
        order: 2
      },
      {
        id: 101,
        authName: '课程评分',
        path: 'goods',
        children: [{
          id: 104,
          authName: '教师评分',
          path: 'goods',
          children: [],
          order: null
        }
        // {
        //   id: 115,
        //   authName: '分类参数',
        //   path: 'params',
        //   children: [],
        //   order: 2
        // },
        // {
        //   id: 121,
        //   authName: '商品分类',
        //   path: 'categories',
        //   children: [],
        //   order: 3
        // }
        ],
        order: 1
      }
  ]
}
initMenusList()

const savePath = (path) => {
  sessionStorage.setItem('path', `/${path}`)
}
</script>

<style lang="scss" scoped></style>
