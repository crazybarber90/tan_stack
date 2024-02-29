import React, { useState } from 'react'
import { Credentials } from '../api/querryCustomHooks/Login/loginTypes'
import { useLogin } from '../api/querryCustomHooks/Login/useLogin'

const Login = () => {
  const [userData, setUserData] = useState<Credentials>({
    email: 'nikola',
    password: '123',
  })

  const { mutateAsync: queryLogin, isLoading } = useLogin()

  const handleSubmit = async () => {
    try {
      const user = await queryLogin(userData)
      console.log(user)
    } catch (error) {
      console.error('there was some error', error)
    }
  }

  return (
    <div>
      {isLoading && <div>Loading</div>}
      <button onClick={handleSubmit}>Login</button>
    </div>
  )
}

export default Login
