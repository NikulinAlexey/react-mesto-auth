import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div className="error-page">
      <h2 className="error-page__title">Страница не найдена 😟</h2>
      <Link to='/sign-in' className='error-page__link'>Вернуться на страницу входа</Link>
    </div>
  )
};

export default PageNotFound;