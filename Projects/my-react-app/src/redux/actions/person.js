import { ENTER } from '../constant';

export const createAction = (name, age) => ({type:ENTER,data:{name,age}})
