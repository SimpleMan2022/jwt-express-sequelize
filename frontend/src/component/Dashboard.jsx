import React, { useEffect } from "react"
import Navbar from "./Navbar"
import { useState } from "react"
import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { useHistory } from "react-router-use-history"

const Dashboard = () => {
  const [name, setName] = useState("")
  const [token, setToken] = useState("")
  const [exp, setExp] = useState("")
  const [users, setUsers] = useState([])
  const history = useHistory()

  useEffect(() => {
    resfreshToken()
  }, [])
  const resfreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token")
      setToken(response.data.accessToken)
      const decoded = jwtDecode(response.data.accessToken)
      setName(decoded.name)
      setExp(decoded.exp)
    } catch (error) {
      if (error.response) {
        history.push("/")
      }
    }
  }

  const axiosJwt = axios.create()

  axiosJwt.interceptors.request.use(
    async (config) => {
      const currentDate = new Date()
      if (exp * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://localhost:5000/token")
        config.headers.Authorization = `Bearer ${response.data.accessToken}`
        setToken(response.data.accessToken)
        const decoded = jwtDecode(response.data.accessToken)
        setName(decoded.name)
        setExp(decoded.exp)
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  const getUsers = async () => {
    const response = await axiosJwt.get("http://localhost:5000/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setUsers(response.data)
  }

  return (
    <>
      <Navbar />
      <div className="container mt-3 font-bold text-xl">
        Welcome to my dashboard, {name}!
      </div>
      <button onClick={getUsers} className="button is-info">
        Get users
      </button>
      <ul>
        {users.map((users) => {
          return <li key={users.id}>{users.name}</li>
        })}
      </ul>
    </>
  )
}

export default Dashboard
