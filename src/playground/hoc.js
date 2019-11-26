import React from 'react'
import ReactDOM from'react-dom'


const Info=(props)=>{
    return(
    <div>
      <h1>Info</h1>
      <p>the info is {props.info}</p>
    </div>
    )
}

//regular function(not react component)
//we are wrapping Info component in AdminInfo
const withadminWarning=(WrappedComponent)=>{
    return (props)=>{
        return (<div>
        {props.isAdmin && <p>this is private info.please dont share</p>}
          <WrappedComponent {...props} />
        </div>
        )
    }
}

const requireAuthentication=(WrappedComponent)=>{
    return (props)=>{
        return (
            <div>
                {props.isAuthenticated ? (
                    <WrappedComponent {...props} />
                ):(
                    <p>please login to view</p>
                )}   
                 
            </div>
        )

    }
}
const AdminInfo=withadminWarning(Info)
const AuthInfo=requireAuthentication(Info)


ReactDOM.render(<AuthInfo isAuthenticated={true} isAdmin={true} info="there are the details" />,document.getElementById('app'))