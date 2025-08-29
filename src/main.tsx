import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Main } from './components/shared/main'
import { Provider } from 'react-redux'
import { store } from "../store/index"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Main />
    </Provider>
  </StrictMode>,
)
