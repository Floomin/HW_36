import { useState, useRef, useEffect } from "react";
import NoteList from "./components/NoteList";
import NoteItem from "./components/NoteItem";
import "./App.css";

const App = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users/1"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleAddNote = (event) => {
    event.preventDefault();
    const newNote = inputRef.current.value.trim();
    if (newNote) {
      setNotes([...notes, newNote]);
      inputRef.current.value = "";
    }
  };

  const handleDeleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  return (
    <div className="app-container">
      {/* Загрузка данных пользователя */}
      {loading ? (
        <p>Загрузка данных пользователя...</p>
      ) : error ? (
        <p>Ошибка: {error}</p>
      ) : userData ? (
        <h1>Привет, {userData.name}!</h1>
      ) : null}

      {/* Форма для добавления новой заметки */}
      <form onSubmit={handleAddNote}>
        <input ref={inputRef} type="text" placeholder="Введите заметку" />
        <button type="submit">Добавить</button>
      </form>

      {/* Условный рендеринг заметок */}
      {notes.length === 0 ? (
        <p>Нотаток немає</p>
      ) : (
        <NoteList>
          {notes.map((note, index) => (
            <NoteItem
              key={index}
              note={note}
              onDelete={() => handleDeleteNote(index)}
            />
          ))}
        </NoteList>
      )}
    </div>
  );
};

export default App;
