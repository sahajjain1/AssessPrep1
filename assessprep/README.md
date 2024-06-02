# React Book Tracking App

This React application empowers you to manage and explore your book collection with ease.

## Features

**Performance:**

- **Lazy Loading:** Ensures smooth performance for large libraries.
- **Re-rendering Optimization:** Minimizes unnecessary re-renders.
- **Custom Hook:** `useDebounce` optimizes search by preventing excessive API calls.

**Functionality:**

- **Secure Login:** Securely authenticate users with token-based authorization.
- **Book Management:** Fetch data, display books (grid/list), and view details in a modal.
- **Search and Filter:** Find specific books using a refined search and filter system.
- **Drag and Drop:** Reorder your collection visually with drag and drop functionality.

**Design and Responsiveness:**

- **Tailwind CSS:** Sleek and responsive styling for optimal viewing across devices.
- **HTML Dialogs:** Clean, lightweight modal components for user interactions.

**Robustness:**

- **Error Boundary:** Gracefully handles unexpected errors within the app.
- **Comprehensive Testing:** Unit tests ensure the login page's functionality.

## Getting Started

1. Clone the repository: `git clone git@github.com:sahajjain1/AssessPrep.git`
2. Install dependencies: `npm install`
3. Start the development server: `npm start`
4. Open `http://localhost:3000` in your browser

## Dependencies

- React(18.2)
- Context API (efficient state management)
- React Router (navigation)
- React DnD (drag and drop)
- Tailwind CSS (styling)
- Custom Hooks (`useDebounce` and potentially others)

## Project Structure

- `src/components`: Reusable React components
- `src/contexts`: Application context definition
- `src/hooks`: Custom React hooks
- `src/pages`: Page components
- `src/routes`: Routing configuration
- `src/services`: API services

## Usage

- **Search for Books**: Use the search bar to find books by title or author.
- **View Details**: Click on a book to view more details in a modal.
- **Lazy Loading**: Enjoy faster load times with lazy loading for images and routes.
- **Error Management**: Experience a robust application with enhanced error handling.
