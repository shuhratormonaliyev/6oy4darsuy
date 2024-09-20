import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    nationality: '',
    languages: [],
    description: ''
  });

  useEffect(() => {
    let storedUsers = JSON.parse(localStorage.getItem('users'));
    if (!storedUsers) {
        storedUsers = [];
    }
    setUsers(storedUsers);
}, []);
const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  if (type === 'checkbox') {
      setFormData((prev) => {
          const newData = JSON.parse(JSON.stringify(prev));
          newData.languages = checked 
              ? [...newData.languages, value] 
              : newData.languages.filter((lang) => lang !== value);
          return newData;
      });
  } else {
      setFormData((prev) => {
          const newData = JSON.parse(JSON.stringify(prev));
          newData[name] = value;
          return newData;
      });
  }
};
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.nationality || formData.languages.length === 0 || !formData.description) {
      alert("Malumotlarni tekshirib qaytatan kiriting!");
      return;
  }
    const newUsers = [...users, formData];
    setUsers(newUsers);
    localStorage.setItem('users', JSON.stringify(newUsers));
    setFormData({ username: '', email: '', nationality: '', languages: [], description: '' });
  };

  const handleDelete = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
};
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input name="nationality" value={formData.nationality} onChange={handleChange} placeholder="Nationality" required />
        <div>
          <label>
            <input type="checkbox" value="English" onChange={handleChange} /> English
          </label>
          <label>
            <input type="checkbox" value="Uzbek" onChange={handleChange} /> Uzbek
          </label>
          <label>
            <input type="checkbox" value="Russian" onChange={handleChange} /> Russian
          </label>
        </div>
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
        <button type="submit">Save</button>
      </form>
      <div>
        {users.map((user, index) => (
          <div key={index} className="card">
            <h3>{user.username}</h3>
            <p>{user.email}</p>
            <p>{user.nationality}</p>
            <p>Languages: {user.languages.join(', ')}</p>
            <p>{user.description}</p>
            <button className='delete' onClick={() => handleDelete(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;