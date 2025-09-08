import React, { useState } from "react";
import Header from "./components/Header";
import "./App.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface Book {
  id: number;
  name: string;
}

export default function App() {
  const [books, setBooks] = useState<Book[]>([
    { id: 1, name: "Clean Code" },
    { id: 2, name: "Design Patterns" },
    { id: 3, name: "Refactoring" },
    { id: 4, name: "Domain-Driven Design" },
    { id: 5, name: "The Pragmatic Programmer" },
  ]);

  const [newName, setNewName] = useState("");
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  // quản lý modal
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;

    const newBook: Book = {
      id: books.length > 0 ? books[books.length - 1].id + 1 : 1,
      name: newName,
    };

    setBooks([...books, newBook]);
    setNewName("");
  };

  const confirmDeleteBook = (id: number) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const handleDeleteBook = () => {
    if (deleteId !== null) {
      setBooks(books.filter((p) => p.id !== deleteId));
      setDeleteId(null);
    }
    setShowModal(false);
  };

  const startEditBook = (book: Book) => setEditingBook({ ...book });

  const saveEditBook = () => {
    if (!editingBook) return;
    setBooks(books.map((p) => (p.id === editingBook.id ? editingBook : p)));
    setEditingBook(null);
  };

  const cancelEdit = () => setEditingBook(null);

  return (
    <div>
      <Header />
      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          placeholder="Tên sản phẩm"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button type="submit">Thêm</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tiêu đề</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {books.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>
                {editingBook?.id === p.id ? (
                  <input
                    type="text"
                    value={editingBook.name}
                    onChange={(e) =>
                      setEditingBook({ ...editingBook, name: e.target.value })
                    }
                  />
                ) : (
                  p.name
                )}
              </td>
              <td>
                {editingBook?.id === p.id ? (
                  <>
                    <button className="save" onClick={saveEditBook}>
                      Lưu
                    </button>
                    <button className="cancel" onClick={cancelEdit}>
                      Hủy
                    </button>
                  </>
                ) : (
                  <>
                    <button className="edit" onClick={() => startEditBook(p)}>
                      ✏️
                    </button>
                    <button
                      className="delete"
                      onClick={() => confirmDeleteBook(p.id)}
                    >
                      🗑️
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
          {books.length === 0 && (
            <tr>
              <td colSpan={3}>Không tìm thấy sản phẩm nào</td>
            </tr>
          )}
        </tbody>
      </table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc muốn xóa sản phẩm này?</Modal.Body>
        <Modal.Footer>
          <Button variant="close" onClick={() => setShowModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleDeleteBook}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
