import React from 'react'
import { useAppDispatch } from '../app/hooks'
import { actionResetPersist } from '../app/rootReducer'
import { Navigate } from 'react-router-dom'
import { routeList } from './RouteList'

export const Logout = () => {
  let dispatch = useAppDispatch()
  dispatch({type: actionResetPersist})
  return <Navigate to={routeList.LOGIN} />
}
