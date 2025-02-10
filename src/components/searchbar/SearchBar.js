import styles from './SearchBar.module.css';

const SearchBar = () => {
  return (
    <input
      type='text'
      className={styles['search-bar']}
      placeholder='Search destinations or activities...'
    />
  );
};

export default SearchBar;
