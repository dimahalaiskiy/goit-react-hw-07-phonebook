import React, { useMemo } from 'react';
import { ContactList, ListItem } from './Contacts.styled';
import { Button } from '../PhoneBookField/PhonebookField.styled';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContactFromServer } from 'redux/contactsSlice';

const Contacts = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.contacts.filter);

  const filteredContacts = useMemo(
    () =>
      contacts?.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      ),
    [filter, contacts]
  );

  return (
    <ContactList>
      {filteredContacts &&
        filteredContacts.map(contact => {
          return (
            <ListItem key={contact.id}>
              <span>
                {contact.name}: {contact.phone}
              </span>
              <Button
                onClick={() => dispatch(deleteContactFromServer(contact.id))}
              >
                Delete
              </Button>
            </ListItem>
          );
        })}
    </ContactList>
  );
};

export default Contacts;
