import React, { useRef, useEffect, useCallback, memo } from "react";
import styled from "styled-components";

const DialogContainer = styled.dialog`
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  background-color: white;
  width: 600px;

  &::backdrop {
    background: rgba(0, 0, 0, 0.5);
  }
`;

const DialogHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
`;

const DialogContent = styled.div`
  padding: 1.5rem;

  img {
    width: 100%;
    height: 400px;
    margin-bottom: 1rem;
  }

  h2 {
    margin: 0 0 0.5rem;
    font-size: 1.5rem;
  }

  p {
    margin: 0.5rem 0;
  }
`;

const BookDetailsModal = memo(({ book, onClose }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.showModal();

      return () => {
        dialog.close();
      };
    }
  }, []);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <DialogContainer ref={dialogRef}>
      <DialogHeader>
        <CloseButton onClick={handleClose}>&#10005;</CloseButton>
      </DialogHeader>
      <DialogContent>
        <img src={book.image} alt={book.title} />
        <h2>{book.title}</h2>
        <p>{book.subtitle || 'No subtitle'}</p>
        <p>ISBN: {book.isbn13}</p>
        <p>Price: {book.price}</p>
      </DialogContent>
    </DialogContainer>
  );
});

export default BookDetailsModal;

/// dont want to use modal from bootstrap or tailwind as the are low in performance and big in size thn Genric HTML <dialog> tag which provide max performace as it is a tag