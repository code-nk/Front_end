<template>
  <el-table :data="allDemos" height="75vh" max-height="75vh" style="width: 100%">
    <el-table-column fixed prop="name" label="Name" width="250" />
    <el-table-column prop="email" label="Email"  width="250"/>
    <el-table-column prop="status" label="Status" width="250" />
     <el-table-column prop="text_reminder_number" label="Number" width="250" />
     <el-table-column prop="membership_email" label="Membership Email" width="250" />
     <el-table-column prop="start_time" label="Start Time" width="250" />
          <el-table-column prop="end_time" label="End Time" width="250" />
  </el-table>
   <el-pagination background layout="prev, pager, next" 
    @current-change="handleCurrentChange"
    :total="totalPages" />
</template>

<script>
import {useDemoStore} from "@/store/demos.js"
export default {
  data() {
    return {
      demoStore: useDemoStore(),
      allDemos: null,
      totalPages:0,
      currentPage:1
    }
  },
  methods: {
    async fetchAllDemos() {
      const response = await this.demoStore.fetchAllDemos(this.currentPage);
      this.allDemos = response.data.data;
      this.totalPages=response.data.total;
    },
    async handleCurrentChange(val) {
      this.currentPage = val;
      const response = await this.demoStore.fetchAllDemos(val);
      this.allDemos = response.data.data;
    }
  },
  async mounted() {
    await this.fetchAllDemos();
  }
}

</script>

<script setup>
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>
