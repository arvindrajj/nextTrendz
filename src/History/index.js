/* eslint-disable import/no-mutable-exports */
import {useHistory} from 'react-router-dom'

export let history = null

export const History = () => {
  history = useHistory()
  return null
}
