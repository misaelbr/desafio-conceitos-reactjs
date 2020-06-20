import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories')
      .then(response => {
        setRepositories(response.data);
        console.log(response.data);
      });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      id: Math.floor(Math.random() * 1000),
      title: `Teste ${Date.now()}`,
      url: "https://github.com/teste/moodle",
      techs: ["php", "apache", "javascript", "sql", "javascript"]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    console.log(id);
    const { status } = await api.delete(`repositories/${id}`);
    if (status === 204) {
      const repositoryIndex = repositories.findIndex(repository => repository.id === id);

      repositories.splice(repositoryIndex, 1);

      setRepositories([...repositories]);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>{repository.title}
            <button onClick={() => handleRemoveRepository(`${repository.id}`)}>
              Remover
          </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
