<template>
    <!-- Visitor Data -->
    <el-card class="box-card">
        <div class="flex">
        <div style="width: 50%;">
             <h3 class="font-semibold ml-5">Visitor Stats</h3>
         </div>
        <div class="flex float-right" style="width: 50%;">
        <el-date-picker
            class="mr-10"
            v-model="visitorDateRange.rangeOne"
            type="date"
            placeholder="Start Date"
            @change="this.seeVisitorStats()"
        />
        <el-date-picker
            v-model="visitorDateRange.rangeTwo"
            type="date"
            placeholder="End Date"
            @change="this.seeVisitorStats()"
        />
        </div> 
        </div>
    <el-row :gutter="16">
        <el-col :span="8">
        <div class="statistic-card">
            <el-statistic :value="visitorStats.all_rcrmVisitorId_count">
            <template #title>
                <div style="display: inline-flex; align-items: center">
                Page Views
                <el-tooltip
                    effect="dark"
                    content="Number of page views"
                    placement="top"
                >
                    <el-icon style="margin-left: 4px" :size="12">
                    <Warning />
                    </el-icon>
                </el-tooltip>
                </div>
            </template>
            </el-statistic>
            <div class="statistic-footer">
            <div class="footer-item">
                <span>than</span>
                <span class="green" v-if="calculatePercentageGrowth(visitorStats.allRcrmVisitorIds_lastToLastMonth, visitorStats.all_rcrmVisitorId_count)>0">
                {{ calculatePercentageGrowth(visitorStats.allRcrmVisitorIds_lastToLastMonth, visitorStats.all_rcrmVisitorId_count) }}% ({{ visitorStats.allRcrmVisitorIds_lastToLastMonth }})
                <el-icon>
                    <CaretTop />
                </el-icon>
                </span>
                 <span class="red" v-if="calculatePercentageGrowth(visitorStats.allRcrmVisitorIds_lastToLastMonth, visitorStats.all_rcrmVisitorId_count)<0">
                {{ calculatePercentageGrowth(visitorStats.allRcrmVisitorIds_lastToLastMonth, visitorStats.all_rcrmVisitorId_count) }}% ({{ visitorStats.allRcrmVisitorIds_lastToLastMonth }})
                <el-icon>
                    <CaretBottom />
                </el-icon>
                </span>
            </div>
            </div>
        </div>
        </el-col>
        <el-col :span="8">
        <div class="statistic-card">
            <el-statistic :value="visitorStats.unique_sessionId_count">
            <template #title>
                <div style="display: inline-flex; align-items: center">
                Sessions
                <el-tooltip
                    effect="dark"
                    content="Number of users who logged into the product in one month"
                    placement="top"
                >
                    <el-icon style="margin-left: 4px" :size="12">
                    <Warning />
                    </el-icon>
                </el-tooltip>
                </div>
            </template>
            </el-statistic>
            <div class="statistic-footer">
             <div class="footer-item">
                <span>than</span>
                <span class="green" v-if="calculatePercentageGrowth(visitorStats.uniqueSessionIds_lastToLastMonth, visitorStats.unique_sessionId_count)>0">
                {{ calculatePercentageGrowth(visitorStats.uniqueSessionIds_lastToLastMonth, visitorStats.unique_sessionId_count) }}% ({{ visitorStats.uniqueSessionIds_lastToLastMonth }})
                <el-icon>
                    <CaretTop />
                </el-icon>
                </span>
                 <span class="red" v-if="calculatePercentageGrowth(visitorStats.uniqueSessionIds_lastToLastMonth, visitorStats.unique_sessionId_count)<0">
                {{ calculatePercentageGrowth(visitorStats.uniqueSessionIds_lastToLastMonth, visitorStats.unique_sessionId_count) }}% ({{ visitorStats.uniqueSessionIds_lastToLastMonth }})
                <el-icon>
                    <CaretBottom />
                </el-icon>
                </span>
            </div>
            </div>
        </div>
        </el-col>
        <el-col :span="8">
        <div class="statistic-card">
            <el-statistic :value="visitorStats.unique_rcrmVisitorId_count" title="New transactions today">
            <template #title>
                <div style="display: inline-flex; align-items: center">
                Unique visitors
                </div>
            </template>
            </el-statistic>
            <div class="statistic-footer">
            <div class="footer-item">
                <span>than</span>
                <span class="green" v-if="calculatePercentageGrowth(visitorStats.uniqueSessionIds_lastToLastMonth, visitorStats.unique_rcrmVisitorId_count)>0">
                {{ calculatePercentageGrowth(visitorStats.uniqueSessionIds_lastToLastMonth, visitorStats.unique_rcrmVisitorId_count) }}% ({{ visitorStats.unique_rcrmVisitorId_count }})
                <el-icon>
                    <CaretTop />
                </el-icon>
                </span>
                 <span class="red" v-if="calculatePercentageGrowth(visitorStats.uniqueRcrmVisitorIds_lastToLastMonth, visitorStats.unique_rcrmVisitorId_count)<0">
                {{ calculatePercentageGrowth(visitorStats.uniqueRcrmVisitorIds_lastToLastMonth, visitorStats.unique_rcrmVisitorId_count) }}% ({{ visitorStats.uniqueRcrmVisitorIds_lastToLastMonth }})
                <el-icon>
                    <CaretBottom />
                </el-icon>
                </span>
            </div>
            <div class="footer-item">
                <el-icon :size="14">
                <ArrowRight />
                </el-icon>
            </div>
            </div>
        </div>
        </el-col>
    </el-row>
    </el-card>

    <!-- Calendly Data -->
     <el-card class="box-card mt-10">
          <h3 class="font-semibold ml-5">Calendly Stats</h3>
    <el-row :gutter="16">
        <el-col :span="8">
        <div class="statistic-card">
            <el-statistic :value="98500">
            <template #title>
                <div style="display: inline-flex; align-items: center">
                Daily active users
                <el-tooltip
                    effect="dark"
                    content="Number of users who logged into the product in one day"
                    placement="top"
                >
                    <el-icon style="margin-left: 4px" :size="12">
                    <Warning />
                    </el-icon>
                </el-tooltip>
                </div>
            </template>
            </el-statistic>
            <div class="statistic-footer">
            <div class="footer-item">
                <span>than yesterday</span>
                <span class="green">
                24%
                <el-icon>
                    <CaretTop />
                </el-icon>
                </span>
            </div>
            </div>
        </div>
        </el-col>
        <el-col :span="8">
        <div class="statistic-card">
            <el-statistic :value="693700">
            <template #title>
                <div style="display: inline-flex; align-items: center">
                Monthly Active Users
                <el-tooltip
                    effect="dark"
                    content="Number of users who logged into the product in one month"
                    placement="top"
                >
                    <el-icon style="margin-left: 4px" :size="12">
                    <Warning />
                    </el-icon>
                </el-tooltip>
                </div>
            </template>
            </el-statistic>
            <div class="statistic-footer">
            <div class="footer-item">
                <span>month on month</span>
                <span class="red">
                12%
                <el-icon>
                    <CaretBottom />
                </el-icon>
                </span>
            </div>
            </div>
        </div>
        </el-col>
        <el-col :span="8">
        <div class="statistic-card">
            <el-statistic :value="72000" title="New transactions today">
            <template #title>
                <div style="display: inline-flex; align-items: center">
                New transactions today
                </div>
            </template>
            </el-statistic>
            <div class="statistic-footer">
            <div class="footer-item">
                <span>than yesterday</span>
                <span class="green">
                16%
                <el-icon>
                    <CaretTop />
                </el-icon>
                </span>
            </div>
            <div class="footer-item">
                <el-icon :size="14">
                <ArrowRight />
                </el-icon>
            </div>
            </div>
        </div>
        </el-col>
    </el-row>
    </el-card>
    
</template>

<script setup>

</script>

<script>
import {useVisitorStore} from "@/store/visitor.js"
import {
  ArrowRight,
  CaretBottom,
  CaretTop,
  Warning,
} from '@element-plus/icons-vue'

export default {
    components: {
        ArrowRight,
        CaretBottom,
        CaretTop,
        Warning,
    },
    data() {
        return {
            visitorStats: '',
            visitorDateRange: {
                rangeOne: this.dateToday(),
                rangeTwo: this.dateToday()
            }
        }
    },
    methods: {
        dateToday() {
            // Create a new Date object
            var today = new Date();

            // Extract individual components of the date
            var year = today.getFullYear();
            var month = (today.getMonth() + 1).toString().padStart(2, '0'); // Zero-padding for single-digit months
            var day = today.getDate().toString().padStart(2, '0'); // Zero-padding for single-digit days

            // Format the date as a string in "YYYY-MM-DD" format
            var formattedDate = `${year}-${month}-${day}`;
            return formattedDate;
        },
        async seeVisitorStats() {
            const rangeOne = this.visitorDateRange.rangeOne
            const rangeTwo = this.visitorDateRange.rangeTwo
           const response  = await useVisitorStore().visitorStats(rangeOne, rangeTwo);
           this.visitorStats = response.data;
        },
        calculatePercentageGrowth(oldValue, newValue) {
            // Ensure both values are numbers to avoid potential issues
            oldValue = parseFloat(oldValue);
            newValue = parseFloat(newValue);

            // Check if oldValue is not zero to avoid division by zero
            if (oldValue !== 0) {
                // Calculate the percentage growth
                const percentageGrowth = ((newValue - oldValue) / Math.abs(oldValue)) * 100;
                return percentageGrowth;
            } else {
                // Handle the case where the old value is zero
                if (newValue === 0) {
                    return 0; // No growth since both values are zero
                } else {
                    return Infinity; // Handle the case where old value is zero, and new value is non-zero
                }
            }
        }
    },
    async mounted() {
        await this.seeVisitorStats();
    }
}
</script>

<style scoped>
:global(h2#card-usage ~ .example .example-showcase) {
  background-color: var(--el-fill-color) !important;
}

.el-statistic {
  --el-statistic-content-font-size: 28px;
}

.statistic-card {
  height: 100%;
  padding: 20px;
  border-radius: 4px;
  background-color: var(--el-bg-color-overlay);
}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-top: 16px;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}

.green {
  color: var(--el-color-success);
}
.red {
  color: var(--el-color-error);
}
</style>
