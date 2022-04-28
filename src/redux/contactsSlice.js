import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const DATAURL =
  'https://6264585594374a2c50661ef2.mockapi.io/contacts/contacts/';

export const fetchContacts = createAsyncThunk(
  'contacts/getContacts',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(DATAURL);
      if (!response.ok) {
        throw new Error(`Can't load contacts, Server error.`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteContactFromServer = createAsyncThunk(
  'contacts/deleteContactFromServer',
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(`${DATAURL}${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Cant delete contact, Server error.`);
      }
      dispatch(deleteContact(id));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addContactToServer = createAsyncThunk(
  'contacts/addContactToServer',
  async function (contact, { rejectWithValue, dispatch }) {
    try {
      const contactData = {
        name: contact.name,
        phone: contact.number,
      };
      const response = await fetch(DATAURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      const { id, name, phone } = await response.json();

      console.log(phone);

      if (!response.ok) {
        throw new Error(`Cant add contact, Server error.`);
      }

      dispatch(addContact({ id, name, phone }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    filter: '',
    loading: 'idle',
    status: null,
    error: null,
  },
  reducers: {
    addContact: (state, action) => {
      state.items.push(action.payload);
    },
    deleteContact: (state, action) => {
      return {
        items: state.items.filter(contact => contact.id !== action.payload),
        filter: state.filter,
      };
    },
    filterContacts: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: {
    [fetchContacts.pending]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchContacts.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.items = action.payload;
    },
    [fetchContacts.rejected]: setError,
    [deleteContactFromServer.rejected]: setError,
    [addContactToServer.rejected]: setError,
  },
});

export const { addContact, deleteContact, filterContacts } =
  contactsSlice.actions;

export default contactsSlice;
