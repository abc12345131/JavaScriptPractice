import '../src/css/'

if (module.hot) {
    module.hot.accept('./modulechanged.js', function () {
        functionchanged();
    })
}