import axios from 'axios'

export async function fetchTodos() {
  try {
    const url = 'https://jsonplaceholder.typicode.com/todos'
    const response = await axios.get(url)
    return response.data.slice(0, 3)
  } catch (error) {
    console.error('Error fetching todos:', error)
    throw error
  }
}
