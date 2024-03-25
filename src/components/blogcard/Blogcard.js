import Image from "next/image";
import "./Blogcard.css";

const Blogcard = ({ blog }) => {

  const getFormattedDate = () => {
    const date = new Date(blog.updatedAt);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const formattedDate = `${date.getDate()} ${months[date.getMonth() - 1]}, ${date.getFullYear()}`;
    return formattedDate
  }

  return (
    <div className="blogcard">
      {blog.thumbnail ? (
        <div
          className="bc-img"
          style={{
            background: `url('${blog.thumbnail}') center center/cover`,
          }}
        ></div>
      ) : null}

      <div className="bc-body">
        <div>
          <div className="bc-header">
            <Image src={blog.author.profileLogo ? blog.author.profileLogo : ""} alt="" />
            <span>{blog.author.name}</span>
            <span className="bc-date">{getFormattedDate()}</span>
          </div>

          <div className="bc-content">
            <h2>{blog.title}</h2>
            <p>{blog.content.slice(0, 400)}</p>
          </div>
        </div>

        <div className="bc-footer">
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
