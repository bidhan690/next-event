import classes from './comment-list.module.css';

function CommentList(props) {
  const {items} = props;

  return (
    <ul className={classes.comments}>
      {items.map((data) => {
        return (
          <li key={data._id}>
            <p>{data.text}</p>
            <div>
              By <address>{data.name}</address>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default CommentList;
