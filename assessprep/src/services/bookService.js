//we gengeral wll use like ENV + URL + the params but we dont have env so directly using url

const API_URL = "https://api.itbook.store/1.0";

export const fetchBooks = async () => {
  try {
    const response = await fetch(`${API_URL}/new`);
    const data = await response.json();

    if (data.error === "0") {
      return data.books;
    } else {
      console.error("Error fetching books:", data.error);
      return [];
    }
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};

export const searchBooks = async (query) => {
  try {
    console.log('hit')
    const response = await fetch(`${API_URL}/search/${query}`);
    const data = await response.json();

    if (data.error === "0") {
      return data.books;
    } else {
      console.error("Error searching books:", data.error);
      return [];
    }
  } catch (error) {
    console.error("Error searching books:", error);
    return [];
  }
};
