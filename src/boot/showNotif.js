import { Notify } from 'quasar'
let show = (message, jenis) => {
  Notify.create({
    message: message,
    color: jenis,
    timeout: 2000,
    actions: [{ icon: 'close', color: 'white' }]
  })
}
export default async ({ Vue }) => {
  Vue.prototype.$showNotif = show
}

export { show }
