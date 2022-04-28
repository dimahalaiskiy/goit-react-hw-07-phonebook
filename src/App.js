import React, { useEffect } from 'react';
import Title from './Components/Title';
import Phonebook from './Components/PhoneBookField';
import Contacts from './Components/Contacts';
import FilterContactsInput from './Components/FilterContactsInput';
import { Container } from './Components/Title/Title.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  filterContacts,
  fetchContacts,
  addContactToServer,
} from 'redux/contactsSlice';

const App = () => {
  const dispatch = useDispatch();
  const { items, error, status } = useSelector(state => state.contacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const setContactName = (e, name, number) => {
    e.preventDefault();

    let isUniq = items?.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isUniq) {
      toast('Контакт с таким именем уже существует!');
      return;
    }

    dispatch(addContactToServer({ name, number }));
  };

  const setFilteredContact = e => {
    const { value } = e.target;
    dispatch(filterContacts(value));
  };

  return (
    <Container>
      <Title title="Phonebook">
        <Phonebook addContact={setContactName} />
      </Title>
      <Title title="Contacts"></Title>
      <FilterContactsInput setFilter={setFilteredContact} />
      {status === 'loading' && <h1>Loading...</h1>}
      {error && <h2>An error: {error}</h2>}
      <Contacts />
      <ToastContainer />
    </Container>
  );
};

export default App;
