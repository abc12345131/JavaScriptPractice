import { USER_ID } from './constants'
import Cookies from 'universal-cookie'

const cookies = new Cookies();

const cookieUtils = {
    // get user cookie
    getUser () {
        return cookies.get(USER_ID) || {}
    },
  
    // remove user cookie
    removeUser() {
        cookies.remove(USER_ID)
    }
}

export default cookieUtils