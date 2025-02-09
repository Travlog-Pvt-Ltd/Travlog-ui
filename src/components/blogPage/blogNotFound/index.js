import Link from 'next/link';
import styles from './styles.module.css';

const BlogNotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>Post not found</h2>
        <Link href='/' className={styles['home-link']}>
          Return home
        </Link>
      </div>
    </div>
  );
};

export default BlogNotFound;
