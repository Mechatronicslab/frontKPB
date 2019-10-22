<template>
  <q-page padding>
    <div class="row">
      <div class="col-md-12">
        <q-card class="bg-white text-black">
          <chart v-if="loaded" :chartData="chartdata" :options="options">
          </chart>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import Chart from './chart/Chart'
export default {
  name: 'PageIndex',
  components: {
    Chart
  },
  data () {
    return {
      loaded: false,
      chartdata: {
        labels: [],
        datasets: [
          {
            data: [],
            label: 'Non Subsidi',
            backgroundColor: '#2E8B57'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              suggestedMin: 0
            }
          }]
        }
      }
    }
  },
  created () {
    this.getStok()
  },
  methods: {
    getStok () {
      try {
        this.$axios.get('stok/getstok/dika')
          .then(result => {
            if (result.data.err) {
              console.log('error')
            } else {
              // console.log(result.data.stok)
              let stok = result.data.stok
              for (let i = 0; i < stok.length; i++) {
                this.chartdata.labels.push(stok[i].namaPupuk)
                this.chartdata.datasets[0].data.push(stok[i].count)
              }
              this.loaded = true
              console.log(this.chartdata)
            }
          })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
