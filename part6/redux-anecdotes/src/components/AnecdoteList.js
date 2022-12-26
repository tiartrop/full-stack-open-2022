import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { createNotification, deleteNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <li key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </li>
  );
};

const Anecdotes = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter) {
      return anecdotes.filter((a) => a.content.toLowerCase().includes(filter));
    }
    return anecdotes;
  });

  const handleClick = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id));
    dispatch(createNotification(anecdote.content));
    setTimeout(() => dispatch(deleteNotification()), 5000);
  };

  return (
    <ul>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            handleClick(anecdote);
          }}
        />
      ))}
    </ul>
  );
};

export default Anecdotes;
