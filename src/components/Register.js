import IntroForm from './IntroForm'
import {Link} from 'react-router-dom'

function Register() {
  return (
    <IntroForm title="Регистрация" textOfButton="Зарегистрироваться">
      <p className='intro-form__paragraph'>Уже зарегистрированы? <Link className='intro-form__link' to="/sign-in">Войти</Link></p>
    </IntroForm>
  );
}

export default Register; 