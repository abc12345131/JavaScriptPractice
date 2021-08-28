import { 
    RECEIVE_ADDRESS,
    RECEIVE_FOODCATEGORIES,
    RECEIVE_SHOPS,
    RECEIVE_USER_INFO
} from './mutation-types'

import { reqAddress, reqFoodCategories, reqSearchShops,reqUserInfo } from '../api'

export default {

    getLocation(context) {
        if ("geolocation" in navigator) {
            // check if geolocation is supported/enabled on current browser
            navigator.geolocation.getCurrentPosition(
                function success(position) {
                    // for when getting location is a success
                    context.state.latitude = position.coords.latitude
                    context.state.longitude = position.coords.longitude
                    console.log('Location updated!')
                },
                function error(error_message) {
                    // for when getting location results in an error
                    console.error('An error has occured while retrieving location', error_message)
                }
            )
        } else {
            // geolocation is not supported
            // get your location some other way
            console.log('Geolocation is not enabled on this browser!')
        }
    },

    async getAddress(context) {

        const result = await reqAddress(context.state.latitude, context.state.longitude)

        if (result.status===0) {
            const address = result.data.results[1]
            context.commit(RECEIVE_ADDRESS, {address})
        }
    },

    async getFoodCategories(context) {
    
        const result = await reqFoodCategories()

        if (result.status===0) {
            const foodCategories = result.data
            context.commit(RECEIVE_FOODCATEGORIES, {foodCategories})
        }
    },

    async getShops(context) {

        const { latitude, longitude } = context.state
        const result = await reqSearchShops(latitude,longitude)

        if (result.status===0) {
            const shops = result.data.results
            context.commit(RECEIVE_SHOPS, {shops})
        }
    },

    saveUserInfo(context, userInfo) {
        context.commit(RECEIVE_USER_INFO, {userInfo})
    },

    async getUserInfo(context) {
        const result = await reqUserInfo()
        if(result.status===0) {
            const user = result.data
            context.commit(RECEIVE_USER_INFO, user)
        }
    }

}