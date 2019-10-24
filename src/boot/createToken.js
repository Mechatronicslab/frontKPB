import { LocalStorage } from 'quasar'

let token = () => {
  return {
    token: {
      'username': LocalStorage.getItem('username'),
      'x-access-token': LocalStorage.getItem('user')
    },
    distributor: {
      distributor: LocalStorage.getItem('dataUser')
    }
  }
}
export default async ({ Vue }) => {
  Vue.prototype.$createToken = token
}

export { token }
