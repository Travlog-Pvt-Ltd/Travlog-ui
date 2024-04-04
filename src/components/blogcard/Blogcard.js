import Image from "next/image";
import classes from "./Blogcard.module.css";
import { formatDate } from "@/utils/formatdate";
import accountIcon from '@/assets/logos/account.svg';
import heartIcon from '@/assets/logos/heart.svg';
import tagIcon from '@/assets/logos/tag.svg';
import commentIcon from '@/assets/logos/comment.svg';
import dotsIcon from '@/assets/logos/dots.svg';
import bookmarkIcon from '@/assets/logos/bookmark.svg';
import viewIcon from '@/assets/logos/view.svg';
import { useRouter } from "next/navigation";
import parse from "html-react-parser"

const Blogcard = ({ blog }) => {
  const router = useRouter()

  const getBlogContent = (content) => {
    const result = content.replace(/<img[^>]*>/g, '').replace(/<a[^>]*>(.*?)<\/a>/g, '$1').replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ');
    return result
  }

  return (
    <>
      {blog.thumbnail ? (
        <img onClick={() => router.push(`/${blog._id}`)} loading="lazy" className={classes["bc-img"]} src={blog.thumbnail} alt="Blog thumbnail" />
      ) : null}

      <div className={classes["bc-body"]}>
        <div>
          <div className={classes["bc-header"]}>
            <Image src={blog.author.profileLogo ? blog.author.profileLogo : accountIcon} alt="" />
            <span>{blog.author.name}</span>
            <span className={classes["bc-date"]}>{formatDate(blog.createdAt)}</span>
          </div>
          <div onClick={() => router.push(`/${blog._id}`)} className={classes["bc-content"]}>
            <h2>{blog.title}</h2>
            {parse(`${getBlogContent(blog.content)}`)}
          </div>
        </div>

        <div className={classes["bc-footer"]}>
          <div className={classes.tags}>
            <span className={classes.icons}><Image src={tagIcon} /> tags</span>
          </div>
          <div className={classes.iconContainer}>
            <span className={classes.icons}><p>{blog.viewCount}</p> <Image src={viewIcon} /> </span>
            <span className={classes.icons}><p>{blog.likeCount}</p> <Image src={heartIcon} /> </span>
            <span className={classes.icons}><p>{blog.commentCount}</p> <Image src={commentIcon} /> </span>
            <span className={classes.icons}><Image src={bookmarkIcon} /> </span>
            <span className={classes.icons}><Image src={dotsIcon} /> </span>
          </div>
        </div>
      </div>
    </>
  )
};

export default Blogcard;
