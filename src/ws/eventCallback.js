import userResolves from '../request/user'

export default {
  cb2001: (res) => {
    userResolves.loginResolve(res);
    console.log(res)
  }
}
