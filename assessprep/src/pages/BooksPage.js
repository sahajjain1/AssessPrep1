import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { useAuth } from "../hooks/useAuth";
import SearchBar from "../components/SearchBar";
import BookDetailsModal from "../components/BookDetailModal";
import { fetchBooks, searchBooks } from "../services/bookService";
import DraggableBookList from "../components/DraggableBookList";
import { ThemeContext } from '../context/ThemeContext';

const BooksPage = () => {
  const { logout } = useAuth();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [view, setView] = useState("grid");
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBooks();
        setBooks(data);
        setFilteredBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = useCallback(async (query) => {
    if (!query) {
      setFilteredBooks(books);
      return;
    }
    try {
      console.log('hiting')

      const filtered = await searchBooks(query);
      setFilteredBooks(filtered);
    } catch (error) {
      console.error("Error searching books:", error);
    }
  }, [books]);

  const handleBookClick = useCallback((book) => {
    setSelectedBook(book);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedBook(null);
  }, []);

  const handleDragEnd = useCallback((sourceIndex, destinationIndex) => {
    const updatedBooks = [...filteredBooks];
    const [removed] = updatedBooks.splice(sourceIndex, 1);
    updatedBooks.splice(destinationIndex, 0, removed);
    setFilteredBooks(updatedBooks);
  }, [filteredBooks]);

  const toggleView = useCallback(() => {
    setView((prevView) => (prevView === "grid" ? "list" : "grid"));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Book Collection</h1>
        <div>
          <button
            className={`bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2 ${
              view === "grid" ? "bg-blue-500 hover:bg-blue-700" : ""
            }`}
            onClick={toggleView}
          >
            Grid
          </button>
          <button
            className={`bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ${
              view === "list" ? "bg-blue-500 hover:bg-blue-700" : ""
            }`}
            onClick={toggleView}
          >
            List
          </button>
          <button
            className={`bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2 ${
              theme === "dark" ? "bg-blue-500 hover:bg-blue-700" : ""
            }`}
            onClick={toggleTheme}
          >
            {theme === "light" ? "Dark" : "Light"}
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
      <SearchBar onSearch={handleSearch} />
      {filteredBooks.length > 0 ? (
        <DraggableBookList
          books={filteredBooks}
          view={view}
          onBookClick={handleBookClick}
          onDragEnd={handleDragEnd}
        />
      ) : (
        <p className="text-center text-gray-500">No books found.</p>
      )}
      {selectedBook && (
        <BookDetailsModal book={selectedBook} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default BooksPage;

///responsive with dragable and both fetchBooks, searchBooks and list and grid view