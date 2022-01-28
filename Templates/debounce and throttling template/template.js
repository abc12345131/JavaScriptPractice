
function debounce(delay, callback) {
    let timeOut
    return (value) => {
        clearTimeout(timeOut)
        timeOut = setTimeout({
            callback(value)
        }, delay)
    }
}

function throttling (delay, callback) {
    let timeOut
    return () => {
        if(!timeOut) {
            timeOut = setTimeout({
                callback()
            }, delay)
            timeOut=null
        }
    }
}