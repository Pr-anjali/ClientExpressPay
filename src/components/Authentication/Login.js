import React, { useContext, useState } from 'react';
import loginpic from "../../images/login1.jpg";
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../features/userSlice';

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch('/signin', {
      method: "POST",
      headers:
      {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });
    const data = res.json();
    if (res.status === 400 || !data) {
      window.alert("Invalid Credentials");
    } else {
      dispatch(login({
        email: email,
        password: password,
        isLoggedin: true,
      }));
      navigate('/')
    }
  }
  return (
    <>
      <section className='sign-in'>
        <div className='container'>
          <div className='signin-content'>
            <div className='signin-form'>
              <h2 className='form-title'>Sign In</h2>
              <form method='POST' className='register-form' id='register-form'>
                <div className='form-group'>
                  <label htmlFor="email">
                    <i className="zmdi zmdi-email material-icons-name"></i>
                  </label>
                  <input type="text" name="email" id="email" autoComplete="off" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email"></input>
                </div>
                <div className='form-group'>
                  <label htmlFor="password">
                    <i className="zmdi zmdi-lock material-icons-name"></i>
                  </label>
                  <input type="password" name="password" id="password" autoComplete="off" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="your Password"></input>
                </div>
                <div className="form-group form-button">
                  <input type="submit" name="signin" id="signin" className='form-submit' value="Log In"
                    onClick={loginUser} />
                </div>

              </form>
            </div>
            <div className='signin-image'>
              <figure>
                <img src={loginpic} alt="login pic" />
              </figure>
              <NavLink to="/signup" className="signup-image-link"> Create an account</NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login