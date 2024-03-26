import Image from "next/image";
import classes from "./Blogcard.module.css";
import Link from "next/link";
import { formatDate } from "@/util/formatdate";
import accountIcon from '@/assets/images/account.svg';

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
            <Image src={blog.author.profileLogo ? blog.author.profileLogo : accountIcon} alt=""/>
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
          {/* <span>{blog.tags}</span> */}
          <span>{blog.likeCount} likes </span>
          <span>{blog.commentCount} dislikes </span>
          <span>{blog.viewCount} comments </span>
        </div>
      </div>
    </div>
  );
};

export default Blogcard;
