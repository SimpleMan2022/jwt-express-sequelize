import React, { useState } from "react"
import axios from "axios"
import { useHistory } from "react-router-use-history"

function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [msg, setMsg] = useState("")
  const history = useHistory()

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:5000/users", {
        name,
        email,
        password,
        confirm,
      })

      history.push("/")
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg)
      }
    }
  }

  return (
    <section className="hero has-background-grey-light is-success is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4-desktop">
              <form className="box" onSubmit={handleRegister}>
                {!msg ? null : (
                  <div className="notification is-danger">{msg}</div>
                )}

                <div className="field mt-5">
                  <label htmlFor="username" className="label">
                    Username
                  </label>
                  <div className="controls">
                    <input
                      id="username"
                      type="text"
                      className="input"
                      placeholder="username or Username"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <label htmlFor="email" className="label">
                    email
                  </label>
                  <div className="controls">
                    <input
                      id="email"
                      type="email"
                      className="input"
                      placeholder="email or email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <label htmlFor="password" className="label">
                    Password
                  </label>
                  <div className="controls">
                    <input
                      id="password"
                      type="password"
                      className="input"
                      placeholder="******"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <label htmlFor="confirm" className="label">
                    Confirm Password
                  </label>
                  <div className="controls">
                    <input
                      id="confirm"
                      type="password"
                      className="input"
                      placeholder="******"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <button className="button is-success is-fullwidth">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register
