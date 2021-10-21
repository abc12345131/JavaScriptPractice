export default function formatTime(time) {
    if (!time) return ''
    let date = new Date(time)
    const hour=date.getHours()
    const minute=date.getMinutes()
    const second=date.getSeconds()  
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
        + ' ' + (hour/10>=1?hour:'0'+hour) + ':' + (minute/10>=1?minute:'0'+minute) 
        + ':' + (second/10>=1?second:'0'+second)
}