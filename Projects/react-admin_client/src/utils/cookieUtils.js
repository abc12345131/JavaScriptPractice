import { USER_KEY } from './constants'
import Cookies from 'universal-cookie'

const cookies = new Cookies();

const cookieUtils = {
    // get user cookie
    getUser () {
        return cookies.get(USER_KEY) || {}
    },
  
    // save user cookie
    // saveUser(user) {
    //     //setting cookie，'/' means any path could use this cookie
    //     cookies.set(USER_KEY, user, { path: '/' })
    // },
  
    // remove user cookie
    removeUser() {
        cookies.remove(USER_KEY)
    }
}

export default cookieUtils