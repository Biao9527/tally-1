<template>
  <div>
    <div class="title">
      {{ type }}
    </div>
    <div id="chartPie" class="pie-wrap"></div>
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
    },
  },

  data() {
    return {
      chartPie: null,
      chart: [],
    };
  },
  created() {
    store.commit('fetchTag');
    store.commit('fetchRecord');
    this.init();
  },
  mounted() {
    this.$nextTick(() => {
      this.drawPieChart();
    });
  },
  updated() {
    this.init();
    this.$nextTick(() => {
      this.drawPieChart();
    });
  },
  methods: {
    init() {
      this.chart = [];
      const filterRecord = clone(this.recordList).filter(item => item.type === this.type);
      const newTags = [];
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
    drawPieChart() {
      let title = this.type === '-' ? title = '支出统计' : title = '收入统计';
      let mytextStyle = {
        color: '#ff852a',
        fontSize: 25,
      };
      let mylabel = {
        show: false,
        position: 'right',
        offset: [30, 60],
        formatter: '{c} ({d}%)',
        textStyle: mytextStyle
      };
      this.chartPie = echarts.init(document.getElementById('chartPie'), 'macarons');
      this.chartPie.setOption({
        title: {
          text: title,
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{c} ({d}%)',
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
            textStyle: mytextStyle,
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

.title {
  display: none;
}
</style>