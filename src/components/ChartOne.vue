<template>
  <div
    class="col-span-12 rounded border border-gray-200 bg-white p-5 shadow-md hover:shadow-2xl duration-300 sm:px-7.5 xl:col-span-8">
    <div class="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
      <div class="flex">
        <span
          class="mt-1 mr-2 flex h-4 w-4 items-center justify-center rounded-full border border-gray-800 bg-gray-800">
          <span class="block h-2 w-2 rounded-full"></span>
        </span>
        <div class="w-full">
          <p class="font-semibold text-gray-800">Total Receita</p>
          <p class="text-sm font-medium">{{ chartData.year[0] }} - {{ chartData.year[chartData.year.length - 1] }}</p>
        </div>
      </div>
      <!-- <div>
        <div class="relative z-20 inline-block">
          <select @change="toggle()" name="selectChartOne" id="selectChartOne"
            class="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 text-sm font-medium outline-none">
            <option value="90">Últ. 3 meses</option>
            <option value="180">Últ. 6 meses</option>
            <option value="365">Últ. 12 meses</option>
          </select>
          <span class="absolute top-1/2 right-3 z-10 -translate-y-1/2">
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0.47072 1.08816C0.47072 1.02932 0.500141 0.955772 0.54427 0.911642C0.647241 0.808672 0.809051 0.808672 0.912022 0.896932L4.85431 4.60386C4.92785 4.67741 5.06025 4.67741 5.14851 4.60386L9.09079 0.896932C9.19376 0.793962 9.35557 0.808672 9.45854 0.911642C9.56151 1.01461 9.5468 1.17642 9.44383 1.27939L5.50155 4.98632C5.22206 5.23639 4.78076 5.23639 4.51598 4.98632L0.558981 1.27939C0.50014 1.22055 0.47072 1.16171 0.47072 1.08816Z"
                fill="#637381" />
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M1.22659 0.546578L5.00141 4.09604L8.76422 0.557869C9.08459 0.244537 9.54201 0.329403 9.79139 0.578788C10.112 0.899434 10.0277 1.36122 9.77668 1.61224L9.76644 1.62248L5.81552 5.33722C5.36257 5.74249 4.6445 5.7544 4.19352 5.32924C4.19327 5.32901 4.19377 5.32948 4.19352 5.32924L0.225953 1.61241C0.102762 1.48922 -4.20186e-08 1.31674 -3.20269e-08 1.08816C-2.40601e-08 0.905899 0.0780105 0.712197 0.211421 0.578787C0.494701 0.295506 0.935574 0.297138 1.21836 0.539529L1.22659 0.546578ZM4.51598 4.98632C4.78076 5.23639 5.22206 5.23639 5.50155 4.98632L9.44383 1.27939C9.5468 1.17642 9.56151 1.01461 9.45854 0.911642C9.35557 0.808672 9.19376 0.793962 9.09079 0.896932L5.14851 4.60386C5.06025 4.67741 4.92785 4.67741 4.85431 4.60386L0.912022 0.896932C0.809051 0.808672 0.647241 0.808672 0.54427 0.911642C0.500141 0.955772 0.47072 1.02932 0.47072 1.08816C0.47072 1.16171 0.50014 1.22055 0.558981 1.27939L4.51598 4.98632Z"
                fill="#637381" />
            </svg>
          </span>
        </div>
      </div> -->
    </div>
    <div>
      <div id="chartOne" class="-ml-5">
        <VueApexCharts type="area" height="350" :options="apexOptions" :series="chartData.series" ref="chart" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import StatisticService from '../services/StatisticService';

let chartData = ref(await StatisticService.getStats(JSON.stringify({
  id: 2, interval: 365,
})));
const chart = ref(null);

const apexOptions = {
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left'
  },
  colors: ['#1F2937', '#fec073'],
  chart: {
    height: 335,
    type: 'area',
    dropShadow: {
      enabled: true,
      color: '#623CEA14',
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1
    },

    toolbar: {
      show: false
    }
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300
        }
      }
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350
        }
      }
    }
  ],
  stroke: {
    width: [2, 2],
    curve: 'straight'
  },

  labels: {
    show: false,
    position: 'top'
  },
  grid: {
    xaxis: {
      lines: {
        show: true
      }
    },
    yaxis: {
      lines: {
        show: true
      }
    }
  },
  dataLabels: {
    enabled: false
  },
  markers: {
    size: 4,
    colors: '#fff',
    strokeColors: ['#1F2937', '#fec073'],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5
    }
  },
  xaxis: {
    type: 'category',
    categories: chartData.value.labels,
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    title: {
      style: {
        fontSize: '0px'
      }
    },
    min: 0,
    max: 10000
  }
}

// async function toggle() {
//   const selected = document.getElementById("selectChartOne").value;
//   chartData.value = await StatisticService.getStats(JSON.stringify({
//     id: 2, interval: selected,
//   }));
// }
</script>