import { useMutation } from '@tanstack/react-query'
import { Credentials } from './loginTypes'
import { Profile } from '../Profile/profileTypes'

// FETCH
const fetchLogin = async (credentials: Credentials): Promise<Profile> => {
  try {
    const response = await fetch(`https://nikola.rs/v1/users/login-app-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    if (!response) {
      throw Error('Failed login')
    }
    const data = await response.json()

    if (data.auth_key) {
      await localStorage.setItem('token', data.auth_key)
      await localStorage.setItem('user', JSON.stringify(data))
    }
    return data
  } catch (error) {
    throw new Error('Error during login')
  }
}

// AXIOS
const axiosLogin = async (credentials: Credentials): Promise<Profile> => {
  //api = 'https://nikola.rs/v1'
  const response = await api.post(`/users/login-app-user`, credentials)
  if (response.data.auth_key) {
    await localStorage.setItem('token', response.data.auth_key)
    await localStorage.setItem('user', JSON.stringify(response.data))
  }
}

//THIS IS CUSTOM HOOK WHICH WILL BE IMPORTED IN COMPONENT AND EXECUTE FUNCTIONS FROM UP
export const useLogin = () => {
  return useMutation((userData: Credentials) => fetchLogin(userData), {
    onSuccess: () => console.log('RADIIIIIII'),
    onError: () => console.log('NE RADIIIIII'),
  })
}
