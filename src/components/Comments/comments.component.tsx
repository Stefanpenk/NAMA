import { BlogProps } from "../../types/types";

const Comments = (article: BlogProps) => {
  return (
    <div>
      {article.comments.map((el) => {
        return (
          <>
            <div>{el.user}</div>
          </>
        );
      })}
    </div>
  );
};

export default Comments;
