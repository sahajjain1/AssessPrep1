import React, { memo, useCallback } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styled from 'styled-components';

const StyledBookItem = styled.div`
  background-color: #eeeeee;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: move;
  overflow: hidden;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    transform: scale(1.05);
  }
`;
const DraggableBookList = memo(({ books, view, onBookClick, onDragEnd }) => {
  const handleDrop = useCallback(
    (item, monitor, targetIndex) => {
      if (!monitor.isOver()) return;
      const sourceIndex = item.index;
      if (sourceIndex !== targetIndex) {
        onDragEnd(sourceIndex, targetIndex);
      }
    },
    [onDragEnd]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className={`grid ${
          view === 'grid'
            ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'
            : 'grid-cols-1 gap-4 p-4'
        }`}
      >
        {books.map((book, index) => (
          <DraggableBookItem
            key={book.isbn13}
            book={book}
            index={index}
            handleDrop={handleDrop}
            view={view}
            onBookClick={onBookClick}
          />
        ))}
      </div>
    </DndProvider>
  );
});

const DraggableBookItem = memo(({ book, index, handleDrop, view, onBookClick }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'book',
    item: { id: book.isbn13, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'book',
    hover: (item, monitor) => {
      if (!monitor.isOver({ shallow: true })) return;
      handleDrop(item, monitor, index);
    },
  });

  const opacity = isDragging ? 0.5 : 1;

  const handleClick = useCallback(() => {
    onBookClick(book);
  }, [onBookClick, book]);

  return (
    <StyledBookItem
      ref={(node) => drag(drop(node))}
      style={{ opacity }}
      className={`${view === 'list' ? 'flex' : ''}`}
      onClick={handleClick}
    >
      <div
        className={`${
          view === 'grid' ? 'h-40 w-full' : 'h-32 w-32'
        } object-cover`}
      >
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-full"
          loading="lazy"
        />
      </div>
      <div className={`p-4 ${view === 'list' ? 'flex flex-col justify-center' : ''}`}>
        <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
        <p className="text-gray-600 mb-2">{book.subtitle || 'No subtitle'}</p>
        <p className="text-gray-500">{book.isbn13}</p>
        <p className="text-gray-500">{book.price}</p>
      </div>
    </StyledBookItem>
  );
});



export default DraggableBookList;

// didnt had much idea reagrading dnd so have writen this by reserching across the web