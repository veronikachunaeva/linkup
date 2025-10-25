import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
const TheNotes = () => {

  const [ notes, setNotes] = useState([]);

  const getNotes = async () => {
    const res = await fetch('https://linknote.onrender.com/api/notes');
    const json = await res.json();
    const {data} = json;
    setNotes([...notes, ...data])
  }

  useEffect(() => {
    getNotes();
  }, []);
  return ( 
    <div>
      <h1>Notes</h1>

      <div>
        <ul>
          { notes.map(note => <li key={note._id}>
            <dl>
              <dt>Titulo</dt><dd>{note.title}</dd>
              <dt>Descripcion</dt><dd>{note.description}</dd>
              <dt>Estado</dt><dd>{note.status}</dd>
              <dt>Prioridad</dt><dd>{note.priority}</dd>
            </dl>
          </li>) }
        </ul>
      </div>
    </div>
   );
}
 
export default TheNotes;