import { Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import  * as auth from '../auth';

function Register() {
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

    const { password, email } = formValue;
    
    auth.register(password, email)
      .then(() => {
        navigate('/sign-in');
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="intro-form">
      <h2 className="intro-form__title">Регистрация</h2>
      <form className="intro-form__form">
        <input
          required
          type="email"
          name="email"
          minLength={5}
          value={formValue.email || ''}
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
          value={formValue.password || ''}
          id="password-input"
          placeholder="Пароль"
          onChange={handleChange}
          className="intro-form__input"
        />
        <button
          className="intro-form__submit" type="submit" onClick={handleSubmit}>Зарегистрироваться</button>
      </form>
      <p className='intro-form__paragraph'>Уже зарегистрированы? <Link className='intro-form__link' to="/sign-in">Войти</Link></p>
    </div>
  );
}

export default Register; 