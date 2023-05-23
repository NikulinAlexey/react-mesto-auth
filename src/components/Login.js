import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as auth from '../auth';

function Login({ onLogin }) {
  const navigate = useNavigate();
  
  const [formValue, setFormValue] = useState({
    password: '',
    email: '',
  });
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setFormValue({
      ...formValue,
      [name]: value
    })
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { password, email  } = formValue;

    auth.authorize(password, email)
      .then(data => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
        }
      })
      .then(() => {
        onLogin(email);
      })
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        console.log(err)
      })

  }
  return (
    <div className="intro-form">
      <h2 className="intro-form__title">Вход</h2>
      <form className="intro-form__form">
        <input
          required
          type="email"
          name="email"
          minLength={5}
          value={formValue.email}
          id="email-input"
          placeholder="Email"
          onChange={handleChange}
          className="intro-form__input"
        />
        <input
          required
          type="password"
          name="password"
          minLength={5}
          value={formValue.password}
          id="password-input"
          placeholder="Пароль"
          onChange={handleChange}
          className="intro-form__input"
        />
        <button className="intro-form__submit" type="submit" onClick={handleSubmit}>Войти</button>
      </form>
    </div>
  );
}

export default Login; 