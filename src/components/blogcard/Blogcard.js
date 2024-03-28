import Image from "next/image";
import classes from "./Blogcard.module.css";
import Link from "next/link";
import { formatDate } from "@/utils/formatdate";
import accountIcon from '@/assets/logos/account.svg';
import heartIcon from '@/assets/logos/heart.svg';
import tagIcon from '@/assets/logos/tag.svg';
import commentIcon from '@/assets/logos/comment.svg';
import dotsIcon from '@/assets/logos/dots.svg';
import bookmarkIcon from '@/assets/logos/bookmark.svg';
import viewIcon from '@/assets/logos/view.svg';

const Blogcard = ({ blog }) => {
  const formattedDate = formatDate(blog.updatedAt);

  return (
    <div className={classes.blogcard}>
      {blog.thumbnail ? (
        <div
          className={classes["bc-img"]}
          style={{
            background: `url('${blog.thumbnail}') center center/cover`,
          }}
        ></div>
      ) : null}

      <div className={classes["bc-body"]}>
        <div>
          <div className={classes["bc-header"]}>
            <Image src={blog.author.profileLogo ? blog.author.profileLogo : accountIcon} alt="" />
            <span>{blog.author.name}</span>
            <span className={classes["bc-date"]}>{formattedDate}</span>
          </div>

          <Link href={`/${blog._id}`}>
            <div className={classes["bc-content"]}>
              <h2>{blog.title}</h2>
              <p>{blog.content.slice(0, 400)}</p>
            </div>
          </Link>
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
    </div>
  );
};

export default Blogcard;
