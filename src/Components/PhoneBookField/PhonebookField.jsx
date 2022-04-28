import { Form, Label, Input, Button } from './PhonebookField.styled';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const PhonebookField = ({ addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const setInputValue = e => {
    const { name, value } = e.target;

    if (name === 'name') {
      setName(value);
    } else {
      setNumber(value);
    }
  };

  return (
    <Form onSubmit={e => addContact(e, name, number)}>
      <Label>
        Name
        <Input
          onChange={setInputValue}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </Label>
      <Label>
        Number
        <Input
          onChange={setInputValue}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </Label>
      <Button type="submit">Add Contact</Button>
    </Form>
  );
};

export default PhonebookField;

PhonebookField.propTypes = {
  addContact: PropTypes.func.isRequired,
};
