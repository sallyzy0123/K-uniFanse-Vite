const getAllCategoriesQuery = `
query Categories {
    categories {
      id
      category_name
    }
  }
`;

const getCategory = `
query Category($categoryId: ID!) {
  category(id: $categoryId) {
    id
    category_name
  }
}`;

export { getAllCategoriesQuery, getCategory };
