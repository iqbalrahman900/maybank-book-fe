import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import { Toaster } from 'react-hot-toast';

function App() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleEdit = (book) => {
    setSelectedBook(book);
    setIsFormVisible(true);
  };

  const handleClose = () => {
    setSelectedBook(null);
    setIsFormVisible(false);
  };

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100">
        <Toaster position="top-right" />
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

          <div className="px-4 py-6 sm:px-0">
            <div className="flex justify-between items-center">
              
              <h1 className="text-2xl font-semibold text-gray-900">Books Management - MUHAMMAD IQBAL</h1>
              <button
                onClick={() => setIsFormVisible(true)}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Add New Book
              </button>
            </div>
            
            <BookList onEdit={handleEdit} />

            {isFormVisible && (
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                <div className="bg-white rounded-lg p-6 max-w-md w-full">
                  <h2 className="text-xl font-semibold mb-4">
                    {selectedBook ? 'Edit Book' : 'Add New Book'}
                  </h2>
                  <BookForm book={selectedBook} onClose={handleClose} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;