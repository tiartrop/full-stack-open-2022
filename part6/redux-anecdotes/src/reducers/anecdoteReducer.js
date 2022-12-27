import { createSlice } from "@reduxjs/toolkit";

const sortByVotes = (anecdotes) => {
  anecdotes.sort((a, b) => b.votes - a.votes);
  return anecdotes;
};

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    voteAnecdote(state, action) {
      const id = action.payload;
      const anecdoteToChange = state.find((n) => n.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return sortByVotes(
        state.map((anecdote) =>
          anecdote.id !== id ? anecdote : changedAnecdote
        )
      );
    },
    appendAnecdotes(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return sortByVotes(action.payload);
    },
  },
});

export const { createAnecdote, voteAnecdote, appendAnecdotes, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;