


const query1 = `
{
  orders {
    subtotal
    items{
      quantity
      product { 
        id
        price
        reviews {
          note
          rating
        }
      }
    }
  }
}
`;
const query1Result = `
{
  "data": {
    "orders": [
      {
        "subtotal": 888.88,
        "items": [
          {
            "quantity": 2,
            "product": {
              "id": "1",
              "price": 42.12,
              "reviews": null
            }
          }
        ]
      }
    ]
  }
}`;


const query2 = `
{
    products{
      id,
      description
    }
  orders {
    id
    subtotal
    customer {
      name
    }
    orderDate
  }
}
`;


const query2Response = `
{
  "data": {
    "products": [
      {
        "id": "1",
        "description": "Red SHoe"
      },
      {
					"id": "2",
					"description": "Blue Jean"
				}
    ],
    "orders": [
      {
        "id": "1",
        "subtotal": 888.88,
        "customer": {
          "name": "John Doe"
        },
        "orderDate": "2022-01-01"
      }
    ]
  }
}
`;

const query3 = `
{
    productsByPrice(minPrice: 10, maxPrice: 40){
      id,
      description
    }
}
`;

const query3Response = `
{
  "data": {
    "productsByPrice": [
      {
        "id": "2",
        "description": "Blue Jean"
      }
    ]
  }
}
`;

const query4 = `
{
  products {
    id,
    description,
    reviews {
      note,
    }
  }
  reviews {
    id,
    note,
    pid
  }
}
`;

const query4Response = `
{
  "data": {
    "products": [
      {
        "id": "1",
        "description": "Red SHoe",
        "reviews": null
      },
      {
        "id": "2",
        "description": "Blue Jean",
        "reviews": null
      }
    ],
    "reviews": [
      {
        "id": "1",
        "note": "Blue Jean are awesome",
        "pid": "2"
      },
      {
        "id": "2",
        "note": "Red shoes are awesome",
        "pid": "1"
      }
    ]
  }
}
`;

const mutation1 = `
mutation AddProduct {
  addProduct(
    description:"GraphQL Distilled",
    price:33.2
  ){
    description
  }
}`;

const mutation1Response = `
{
  "data": {
    "addProduct": {
      "description": "GraphQL Distilled"
    }
  }
}`;


module.exports = {
  query1,
  query1Result,
  query2,
  query2Response,
  query3,
  query3Response,
  query4,
  query4Response,
  mutation1,
  mutation1Response
};
