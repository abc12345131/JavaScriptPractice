export default function getRedirectPath (type, info) {
    let path = '/'
    if(type) {
        path += type
        if(!info) {
            path += 'info'
        }
    }
    return path
}