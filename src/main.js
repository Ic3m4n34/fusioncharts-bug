import Vue from 'vue'
import App from './App.vue'

import VueFusionCharts from 'vue-fusioncharts';
import FusionCharts from 'fusioncharts';
import TimeSeries from 'fusioncharts/fusioncharts.timeseries';

Vue.use(VueFusionCharts, FusionCharts, TimeSeries);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
