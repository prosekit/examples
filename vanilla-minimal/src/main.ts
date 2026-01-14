import './app.css'
import { renderEditor } from './editor'

let container = document.querySelector('#app')
if (!container) {
  container = document.createElement('div')
  container.id = 'app'
  document.body.appendChild(container)
}

container.replaceChildren(renderEditor())
