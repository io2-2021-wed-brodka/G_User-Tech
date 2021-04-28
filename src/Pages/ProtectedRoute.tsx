import { ReactNode } from "react"
import { Redirect, Route } from "react-router-dom"
import { LoggedIn } from "../Layout/topbar"

interface IProps {
    children: ReactNode;
    path?: string;
}

export const ProtectedRoute = ({ children, ...props } : IProps) => {
    return (
        <Route {...props}>
            {LoggedIn() ?
                children
                : 
                <Redirect to='/login'/>
            }
        </Route>
      )
  }