export default function findBook(books, id) {
  return books.find(book => book.id === Number(id));
}
