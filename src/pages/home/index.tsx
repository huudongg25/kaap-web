import { useEffect, useState } from 'react'
import MyHome from '../../views/my-home'
import { getHomeUser } from '../../service/home'

const Home = () => {
  const [userName, setUserName] = useState('')
  const dataHomeUser = async () => {
    try {
      const res = await getHomeUser()
      setUserName(res.data.data?.username)
      localStorage.setItem('avatar-img', res.data.data.avatar)
      localStorage.setItem('user-name', res.data.data.username)
    } catch (error) {}
  }
  useEffect(() => {
    dataHomeUser()
  }, [])

  return (
    <div>
      <MyHome userName={userName} />
    </div>
  )
}

export default Home
