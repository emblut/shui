import search from '../../assets/search.png';
import './SearchBar.css';

export default function SearchBar({ classNames, value, onChange, onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(value.trim());
    onChange('')
  };

  return (
    <form className={`${classNames} search-form`} onSubmit={handleSubmit}>
      <input
        className='search-form__input'
        type='text'
        placeholder='Search username'
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
      />
      <button className='search-form__btn' type='submit' aria-label='Search'>
        <img className='search-form__btn-icon' src={search} alt='Search icon' />
      </button>
    </form>
  );
}
