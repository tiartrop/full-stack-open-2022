import { useState, useEffect } from "react";

import Person from "./components/Person";
import Notification from "./components/Notification";
import personService from "./services/persons";

const Filter = ({ searchName, onChange }) => {
  return (
    <div>
      <span>filter shown with</span>
      <input value={searchName} onChange={onChange} />
    </div>
  );
};

const PersonForm = ({ addPerson, formData }) => {
  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          <span>name:</span>
          <input
            value={formData.newName}
            onChange={formData.handleNameChange}
          />
        </div>
        <div>
          <span>number:</span>
          <input value={formData.newNum} onChange={formData.handleNumChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

const Persons = ({ showArr, deletePerson }) => {
  return (
    <div>
      {showArr.map((person) => (
        <Person
          key={person.id}
          person={person}
          deletePerson={() => deletePerson(person)}
        />
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [searchName, setSearchName] = useState("");
  const [message, setMessage] = useState({ content: null, type: "" });

  let same = false;

  useEffect(() => {
    personService.getAll().then((res) => {
      setPersons(res);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNum,
      id: persons.length + 1,
    };

    for (let person of persons) {
      if (personObject.name === person.name) {
        if (
          window.confirm(
            `${newName} is already added to phonebook, replace the old number with a new one?`
          )
        ) {
          updatePerson(person.id, personObject);
          setNewName("");
          setNewNum("");
        }
        same = true;
        break;
      }
    }

    if (!same) {
      personService.create(personObject).then((res) => {
        setPersons(persons.concat(res));
        setMessage({ content: `Added ${newName}`, type: "success" });
        setTimeout(() => setMessage({ content: null, type: "" }), 5000);
        setNewName("");
        setNewNum("");
      });
    }
  };

  const updatePerson = (id, changePerson) => {
    personService
      .update(id, changePerson)
      .then((res) => {
        setMessage({
          content: `Changed ${changePerson.name}`,
          type: "success",
        });
        setTimeout(() => setMessage({ content: null, type: "" }), 5000);
        setPersons(persons.map((person) => (person.id !== id ? person : res)));
      })
      .catch(() => {
        setMessage({
          content: `Information of ${changePerson.name} has already been removed from server`,
          type: "error",
        });
        setTimeout(() => setMessage({ content: null, type: "" }), 5000);
        setPersons(persons.filter((n) => n.id !== id));
      });
  };

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .del(person.id)
        .then(() => {
          setMessage({ content: `Deleted ${person.name}`, type: "success" });
          setTimeout(() => setMessage({ content: null, type: "" }), 5000);
          setPersons(persons.filter((n) => n.id !== person.id));
        })
        .catch(() => {
          setMessage({
            content: `Information of ${person.name} has already been removed from server`,
            type: "error",
          });
          setTimeout(() => setMessage({ content: null, type: "" }), 5000);
          setPersons(persons.filter((n) => n.id !== person.id));
        });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumChange = (event) => {
    setNewNum(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchName(event.target.value);
  };

  const personToShow = () => {
    if (searchName === "") {
      return persons;
    } else {
      return persons.filter((person) =>
        person.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }
  };

  const formData = { newName, newNum, handleNameChange, handleNumChange };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter searchName={searchName} onChange={handleSearchChange}></Filter>
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} formData={formData}></PersonForm>
      <h3>Numbers</h3>
      <Persons showArr={personToShow()} deletePerson={deletePerson}></Persons>
    </div>
  );
};

export default App;
