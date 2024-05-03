const addMerchandiseQuery = `
mutation AddMerchandise($merchandise: MerchandiseInput!) {
  addMerchandise(merchandise: $merchandise) {
    merchandise {
      id
      merchandise_name
      price
      description
      filename
      category {
        id
        category_name
      }
      owner {
        id
        user_name
        email
      }
    }
    message
  }
}
`;
const MerchandisesQuery = `
query Merchandises {
  merchandises {
    id
    merchandise_name
    price
    description
    filename
    category {
      id
      category_name
    }
    owner {
      id
      user_name
      email
    }
  }
}
`;

const MerchandiseQuery = `
query Merchandise($merchandiseId: ID!) {
  merchandise(id: $merchandiseId) {
    id
    merchandise_name
    price
    description
    filename
    category {
      id
      category_name
    }
    owner {
      id
      user_name
      email
    }
  }
}`;

export { addMerchandiseQuery, MerchandisesQuery, MerchandiseQuery };
