import { Component } from 'react';
import Form from 'components/Form/Form';
import Contacts from 'components/Contacts/Contacts';
import Find from 'components/Find/Find';
import styled from 'styled-components';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contactsInLocalStorage = JSON.parse(localStorage.getItem('contacts'));
    if (contactsInLocalStorage) {
      this.setState({ contacts: contactsInLocalStorage });
    }
  }

  componentDidUpdate() {
    const contactsInLocalStorage = JSON.stringify(this.state.contacts);
    localStorage.setItem('contacts', contactsInLocalStorage);
  }

  addContact = contact => {
    const contactsInPhonebook = this.state.contacts;
    const repeatedContact = contactsInPhonebook.find(
      elem => elem.name === contact.name
    );
    if (repeatedContact) {
      alert(`${repeatedContact.name} is already in contacts`);
    } else {
      this.setState(prevState => ({
        contacts: [contact, ...prevState.contacts],
      }));
    }
  };

  handleFindInput = event => {
    this.setState({ filter: event.currentTarget.value.toLowerCase() });
  };

  contactsList = contacts => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter)
    );
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { filter } = this.state;
    return (
      <Wrapper>
        <h1>Phonebook</h1>
        <Form addContact={this.addContact}></Form>
        <h2>Contacts</h2>
        <Find inputValue={filter} onFindInput={this.handleFindInput} />
        <Contacts
          contacts={this.contactsList(this.state.contacts)}
          onDelete={this.deleteContact}
        ></Contacts>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  padding: 8px;
  width: 400px;
  margin: 0 auto;
  background-color: #c2e0fa;
  border-radius: 4px;
  box-shadow: 2px 3px 13px 0px rgba(0, 0, 0, 0.73); ;
`;

export default App;
