import { User } from '../types'
import userApi from '.'

const registerUser = async (user: User) => {
  try {
    const response = await userApi.post('/register', user)
    return response
  } catch (error) {
    console.log(error)
    return
  }
}

const userApiActions = {
  registerUser,
}

export default userApiActions

// type Todos = {
//   items: readonly {
//     id: string
//     text: string
//   }[]
//   ts: number
// }

// async function fetchTodos(): Promise<Todos> {
//   const res = await axios.get('/api/data')
//   return res.data
// }

// function useTodos() {
//   return useQuery({ queryKey: ['todos'], queryFn: fetchTodos })
// }
