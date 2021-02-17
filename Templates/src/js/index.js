import '../src/css/'

/*
    //HMR(hot module replacement)
    if (module.hot) {
        module.hot.accept('./modulechanged.js', function () {
            functionchanged()
        })
    };
*/



// use import syntax to pack test as a separate file which could be lazy loading or prefetch
// warning: prefetch may have compatibility issue  
// document.getElementById().onclick = function(){
//     import(/* webpackChunkName: 'test', webpackPrefetch: true */'./test')
//         .then(() => {
//             //file loading succeed
//             functionloaded()
//         })
//         .catch(() => {
//             //file loading failed
//             console.log('File loading failed!')
//         });
// };


/*
    //register serviceworker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker
            .register('/service-worker.js/')
            .then(() => {
                console.log('SW register succeed!');
            })
            .catch(() => {
                console.log('SW register failed!');
            });
        });
    }

*/