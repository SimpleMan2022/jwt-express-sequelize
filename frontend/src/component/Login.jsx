import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-use-history"
import axios from "axios"

function Login() {
  const history = useHistory()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [msg, setMsg] = useState("")

  const Auth = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:5000/login", { email, password })
      history.push("/dashboard")
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
              <form className="box" onSubmit={Auth}>
                {!msg ? null : (
                  <div className="notification is-danger">{msg}</div>
                )}
                <div className="field mt-5">
                  <label htmlFor="email" className="label">
                    Email or Username
                  </label>
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="Email or Username"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <label htmlFor="email" className="label">
                    Password
                  </label>
                  <div className="controls">
                    <input
                      type="password"
                      className="input"
                      placeholder="******"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <button className="button is-success is-fullwidth">
                    Login
                  </button>
                </div>
                <div className="has-text-centered">
                  <p>
                    Don't have an account? <Link to="/register">Register</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
