<template>
  <q-page padding>
    <div class="row">
      <div class="col-md-12">
        <q-card flat square class="bg-white text-black">
          <q-card-section class="q-pl-lg text-h6 text-weight-light">
            Tambah Stok
          </q-card-section>
          <q-card-section class="q-pl-lg text-h6 text-weight-light">
            <q-form @submit="onSubmit">
              <div class="row">
                <div class="col-md-6 col-xs-12 q-gutter-y-md">
                  <q-select
                    v-model="jenisPupuk"
                    :options="listJenis"
                    use-input
                    filled
                    clear-icon
                    clearable
                    class="bg-blue-grey-2"
                    input-debounce="0"
                    @filter="filterJenis"
                    label="Nama Pupuk"/>
                    <q-input class="bg-blue-grey-2" label="Jumlah" v-model="sendData.stok" type="number" filled suffix="Kg"/>
                    <div class="q-gutter-sm">
                      <q-radio v-model="sendData.jenisPupuk" val="Subsidi" label="Pupuk Subsidi" />
                      <q-radio v-model="sendData.jenisPupuk" val="Non Subsidi" label="Non Subsidi" />
                    </div>
                    <q-btn type="submit" label="Simpan" unelevated no-caps color="green-8"/>
                </div>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import listJenisFromApi from '../../statics/api/ListJenisPupuk'
export default {
  data () {
    return {
      listJenis: listJenisFromApi,
      jenisPupuk: null,
      sendData: {
        nik: null,
        idPupuk: null,
        namaPupuk: null,
        jenisPupuk: null,
        stok: 0,
        jenisTransaksi: 'Pembelian'
      }
    }
  },
  methods: {
    filterJenis (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.listJenis = listJenisFromApi.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    },
    onSubmit () {
      this.sendData.nik = 'dika'
      this.sendData.idPupuk = this.jenisPupuk.value
      this.sendData.namaPupuk = this.jenisPupuk.label
      try {
        this.$axios.post('stok/addstok', this.sendData)
          .then(res => {
            if (res.data.err) {
              this.$showNotif(res.data.msg, 'red')
            } else {
              this.$showNotif(res.data.msg, 'green-9')
            }
          })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
