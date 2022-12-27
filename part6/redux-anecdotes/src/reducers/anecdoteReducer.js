import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdote";

const sortByVotes = (anecdotes) => {
  anecdotes.sort((a, b) => b.votes - a.votes);
  return anecdotes;
};

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    addVote(state, action) {
      const { id } = action.payload;
      return sortByVotes(
        state.map((anecdote) =>
          anecdote.id !== id ? anecdote : action.payload
        )
      );
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return sortByVotes(action.payload);
    },
  },
});

export const { addVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newNote = await anecdoteService.create(content);
    dispatch(appendAnecdote(newNote));
  };
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const changedAnecdote = await anecdoteService.update(anecdote.id, {
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    dispatch(addVote(changedAnecdote));
  };
};

export default anecdoteSlice.reducer;