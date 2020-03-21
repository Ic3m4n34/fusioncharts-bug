<template>
  <div id="app">
    <fusioncharts
      :width="width"
      :height="height"
      :type="type"
      :data-format="dataFormat"
      :data-source="dataSource"
    >
    </fusioncharts>
  </div>
</template>

<script>
import moment from 'moment';
import FusionCharts from 'fusioncharts';

import bars from '../sample-json-data/bars.json';

export default {
  name: 'app',
  computed: {
    fusionChartData() {
      const fusionDataStore = new FusionCharts.DataStore();
      const fusionTable = fusionDataStore.createDataTable(this.getParsedBars(bars), this.schema);
      return fusionTable;
    },
    parsedClips() {
      return this.getParsedClips(bars);
    },
  },
  data() {
    return {
      loading: false,
      timer: null,
      bars: [],
      executions: [],

      schema: [
        {
          name: "time",
          type: "date",
          format: "%m/%d/%Y, %I:%M:%S"
        },
        {
          name: "price",
          type: "number"
        }
      ],
      width: "100%",
      height: "1000",
      type: "timeseries",
      dataFormat: "json",
      dataSource: {
        data: this.fusionChartData,
        dataMarker: null,
        caption: {
          text: "Open"
        },
        xAxis: {
          clip: null
        },
        yAxis: {
          referenceline: null,
        },
      }
    };
  },
  mounted() {
    this.dataSource.data = this.fusionChartData;
    this.dataSource.xAxis.clip = this.parsedClips;
  },

  methods: {
    async getItems() {
      this.loading = true;
     },
     getParsedBars(bars) {
      return bars.bars.map(bar => {
        return [moment(bar.time).format("MM/DD/YYYY, hh:mm:ss"), bar.open];
      });
    },
     getParsedClips(bars) {
      return bars.clips.map(clip => {
        return {
          from: moment(clip.from).format('MM/DD/YYYY, hh:mm:ss'),
          to: moment(clip.to).format('MM/DD/YYYY, hh:mm:ss'),
          format: '%m/%d/%Y, %I:%M:%S',
        }
      });
    },
    getParsedDataMarkers(executions) {
      return executions.map(execution => {
        const executionType = execution.action;

        return {
          series: 'order',
          time: moment(execution.filledOrCancelledAt).format('MM/DD/YYYY, hh:mm:ss'),
          timeFormat: '%m/%d/%Y, %I:%M:%S',
          identifier: executionType === 'BUY' ? 'B': 'S',
        }
      });
    },
    getParsedOrders(orders) {
      return orders.map(order => {
        return {
          label: order.action,
          value: order.limit,
          style: {
            marker: {
              fill: order.action === 'SELL' ? '#fc0b03': '#3eb005',
              stroke: order.action === 'SELL' ? '#fc0b03': '#3eb005',
            },
          },
        };
      });
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
