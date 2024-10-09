import { useState } from "react";
import PropTypes from "prop-types";

const TodoForm = ({ addTodo }) => {
  const [title, setTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([
    {
      id: 1,
      text: "Trabalho",
    },
    {
      id: 2,
      text: "Pessoal",
    },
    {
      id: 3,
      text: "Estudos",
    },
  ]);
  const [isManagingCategories, setIsManagingCategories] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !selectedCategory) {
      alert("Preencha todos os campos para criar a tarefa.");
      return;
    }
    addTodo(title, selectedCategory);
    setTitle("");
    setSelectedCategory("");
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategory.trim()) {
      alert("Digite um nome para a categoria");
      return;
    }

    const categoryExists = categories.some((cat) => cat.text.toLowerCase() === newCategory.toLowerCase());

    if (categoryExists) {
      alert("Esta categoria já existe");
      return;
    }

    const newCategoryObj = {
      id: Math.max(...categories.map((cat) => cat.id)) + 1,
      text: newCategory.trim(),
    };

    setCategories([...categories, newCategoryObj]);
    setNewCategory("");
  };

  const handleRemoveCategory = (categoryId) => {
    if (categories.length <= 1) {
      alert("Você precisa manter pelo menos uma categoria");
      return;
    }

    setCategories(categories.filter((cat) => cat.id !== categoryId));
    if (selectedCategory === categories.find((cat) => cat.id === categoryId)?.text) {
      setSelectedCategory("");
    }
  };

  return (
    <div className="todo-form">
      {!isManagingCategories ? (
        <>
          <h2>Criar Tarefa</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              maxLength={40}
              placeholder="Digite o título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="">Selecione uma categoria</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.text}>
                  {cat.text}
                </option>
              ))}
            </select>
            <div className="actions">
              <button type="submit">Criar tarefa</button>
              <button type="button" onClick={() => setIsManagingCategories(true)}>
                Gerenciar categorias
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <h2>Gerenciar Categorias</h2>
          <form onSubmit={handleAddCategory}>
            <input
              type="text"
              placeholder="Nova categoria"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              maxLength={20}
            />
            <button type="submit">Adicionar categoria</button>
          </form>
          <div className="todo-list">
            {categories.map((cat) => (
              <div key={cat.id} className="todo">
                <div className="content">
                  <p>{cat.text}</p>
                </div>
                <div className="actions">
                  <button type="button" className="remove" onClick={() => handleRemoveCategory(cat.id)}>
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => setIsManagingCategories(false)}>
            Voltar para criar tarefa
          </button>
        </>
      )}
    </div>
  );
};

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default TodoForm;
