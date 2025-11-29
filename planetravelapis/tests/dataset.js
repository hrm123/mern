


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
          comment
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
module.exports = {
  query1,
  query1Result,
  query2,
  query2Response
};
