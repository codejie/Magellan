const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.person.token,
  avatar: state => state.person.avatar,
  name: state => state.person.name
}
export default getters
