<template>
  <div >
    {{type}}
    <div id="chartPie" class="pie-wrap" ></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import store from '@/store';
import clone from '@/lib/clone';

require('echarts/theme/macarons');//引入主题

export default {
  props: ['type'],
  computed: {
    recordList() {
      return store.state.recordList;
    },
    tags() {
      return store.state.tagList;
    }
  },

  data() {
    return {
      chartPie: null,
      chart: [],
    };
  },
  created() {
    const filterRecord = clone(this.recordList).filter(item => item.type === this.type)
    const newTags = [];
    store.commit('fetchTag');
    store.commit('fetchRecord');
    for (let i = 0; i < this.tags.length; i++) {
      newTags.push(this.tags[i].name);
    }
    for (let i = 0; i < newTags.length; i++) {
      let sum = 0;
      for (let j = 0; j < filterRecord.length; j++) {
        if (filterRecord[j].tage.toString().indexOf(newTags[i]) >= 0) {
          sum += filterRecord[j].amount;
        }
      }
      this.chart.push({value: sum, name: newTags[i]});
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.drawPieChart();
    });
  },
  methods: {
    drawPieChart() {
      let mytextStyle = {
        color: '#333',
        fontSize: 25,
      };
      let mylabel = {
        show: true,
        position: 'right',
        offset: [30, 60],
        formatter: '{b} : {c} ({d}%)',
        textStyle: mytextStyle
      };
      this.chartPie = echarts.init(document.getElementById('chartPie'), 'macarons');
      this.chartPie.setOption({
        title: {
          text: '统计表',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          data: this.tags,
          left: 'center',
          top: 'bottom',
          orient: 'horizontal',
        },
        series: [
          {
            name: '总金额',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['50%', '50%'],
            data: this.chart,
            animationEasing: 'cubicInOut',
            animationDuration: 2600,
            label: {
              emphasis: mylabel
            }
          }
        ]
      });
    }
  }
};
</script>

<style lang='scss' scope>
.pie-wrap {
  width: 100%;
  min-height: 400px;
}
</style>