import 'bootstrap/dist/css/bootstrap.css'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {BrowserRouter} from 'react-router-dom'
import store from './redux/store'
import { Provider } from 'react-redux'


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App/>
      </Provider>
    </BrowserRouter>    
  </React.StrictMode>,
  document.getElementById('root')
)

//monitor if anything changed in redux, re-render the component
// no need for react-redux
// store.subscribe(()=>{
//   ReactDOM.render(
//     <React.StrictMode>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>    
//     </React.StrictMode>,
//     document.getElementById('root')
//   );  
// })

reportWebVitals();
