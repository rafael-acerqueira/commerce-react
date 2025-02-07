import React from "react";
import { useState } from "react"
import { useUserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default () => {

  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login } = useUserContext();
  const navigate = useNavigate()

  const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");

  function handleSubmit(e) {
    e.preventDefault()
    const formData = {
      user: user,
      password: password
    }
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrf
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        response.json()
          .then((json) => {
            if (response.status == 200) {
              login(json)
              navigate("/")
            } else {
              setError(json["errors"][0])
            }
          })
      })
  }

  return (
    <>
      {
        error && <div>Erro: {error}</div>
      }
      <div className="user-div">
        <form className="form" onSubmit={handleSubmit}>
          <input type="hidden" name="authenticity_token" value={csrf} />
          <input
            id="user"
            type="text"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            placeholder="user" />
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
          <input
            type="submit"
            value="login"
            className="user_buttons"
            disabled={!(user && password)}
          />
          <h3>OR</h3>
          <button onClick={() => { }} className="user_buttons">Create Account</button>
        </form>
      </div>
    </>

  )
}