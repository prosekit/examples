import './app.css'

import { mount } from 'svelte'
import Editor from './editor.svelte'

const app = mount(Editor, { target: document.getElementById('app')! })

export default app
