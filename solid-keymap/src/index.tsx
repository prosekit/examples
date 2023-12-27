/* @refresh reload */
import './styles.css'
import { render } from 'solid-js/web'
import Editor from './editor'

const root = document.getElementById('root')

render(() => <Editor />, root!)
