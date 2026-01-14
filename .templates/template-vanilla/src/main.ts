import './app.css'
import { app } from './app'

let container = document.querySelector('#app')
if (!container) {
  container = document.createElement('div')
  container.id = 'app'
  document.body.appendChild(container)
}

container.replaceChildren(app.render())
