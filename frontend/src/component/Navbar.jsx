import React, { useState } from "react"
import { useHistory } from "react-router-use-history"
import axios from "axios"

function Navbar() {
  const [isActive, setIsActive] = useState(false)
  const history = useHistory()

  const toggleMenu = () => {
    setIsActive(!isActive)
  }

  const logout = async () => {
    try {
      await axios.delete("http://localhost:5000/logout")
      history.push("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <nav
        className="navbar is-primary "
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand ">
            <a className="navbar-item" href="/">
              My App
            </a>

            <button
              className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
              onClick={toggleMenu}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </button>
          </div>

          <div
            id="navbarBasicExample"
            className={`navbar-menu ${isActive ? "is-active" : ""}`}
          >
            <div className="navbar-start">
              <a className="navbar-item" href="/">
                Home
              </a>

              <a className="navbar-item" href="/about">
                About
              </a>

              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">More</a>

                <div className="navbar-dropdown">
                  <a className="navbar-item" href="/settings">
                    Settings
                  </a>
                  <a className="navbar-item" href="/contact">
                    Contact
                  </a>
                  <hr className="navbar-divider" />
                  <a className="navbar-item" href="/help">
                    Help
                  </a>
                </div>
              </div>
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <button className="button is-light" onClick={logout}>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
