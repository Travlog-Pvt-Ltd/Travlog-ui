import Image from "next/image";
import "./Blogcard.css";

const Blogcard = ({ blog }) => {
  console.log(blog);

  const date = new Date(blog.updatedAt);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const formattedDate = `${date.getDate()} ${
    months[date.getMonth() - 1]
  }, ${date.getFullYear()}`;

  return (
    <div className="blogcard">
      {blog.attachments[0] ? (
        <div
          className="bc-img"
          style={{
            background: `url('${blog.attachments[0]}') center center/cover`,
          }}
        ></div>
      ) : null}

      <div className="bc-body">
        <div>
        <div className="bc-header">
          <Image src={blog.author.profileImage} alt="" />
          <span>{blog.author.name}</span>
          <span className="bc-date">{formattedDate}</span>
        </div>

        <div className="bc-content">
          <h2>{blog.title}</h2>
          <p>{blog.content.slice(0, 400)}</p>
        </div>
        </div>

        <div className="bc-footer">
          {/* <span>{blog.tags}</span> */}
          <span>{blog.likes.length} likes </span>
          <span>{blog.commentCount} dislikes </span>
          <span>{blog.views.length} comments </span>
        </div>
      </div>
    </div>
  );
};

export default Blogcard;
