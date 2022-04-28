import React from 'react';
import { Label, Input } from '../PhoneBookField/PhonebookField.styled';

const FilterContactsInput = ({ setFilter }) => {
  return (
    <Label>
      Find contact by name
      <Input onChange={setFilter} type="text" name="filter" />
    </Label>
  );
};

export default FilterContactsInput;
