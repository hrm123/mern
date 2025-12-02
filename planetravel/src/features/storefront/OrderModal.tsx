import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gql } from '@apollo/client';
import { useQuery, useMutation } from '@apollo/client/react';

const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    products {
      id
      description
      price
    }
  }
`;

const CREATE_ORDER = gql`
  mutation CreateOrder($productId: ID!, $quantity: Int!) {
    createOrder(productId: $productId, quantity: $quantity) {
      id
      subtotal
    }
  }
`;

const OrderModal = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);

    // Note: We are fetching all products and filtering because there's no getProductById in the schema we saw.
    // Ideally we would use a specific query.
    const { loading, error, data } = useQuery<{ products: any[] }>(GET_PRODUCT, { variables: { id } });
    const [createOrder, { loading: orderLoading }] = useMutation(CREATE_ORDER);

    if (loading) return <div className="modal modal-open"><div className="modal-box"><span className="loading loading-spinner"></span></div></div>;
    if (error) return <div className="modal modal-open"><div className="modal-box text-error">Error: {error.message}</div></div>;

    const product = data?.products.find((p: any) => p.id === id);

    if (!product) return <div className="modal modal-open"><div className="modal-box">Product not found</div></div>;

    const handleOrder = async () => {
        try {
            await createOrder({ variables: { productId: id, quantity } });
            alert(`Order placed for ${quantity} x ${product.description}`);
            navigate('/products');
        } catch (err) {
            console.error('Order failed:', err);
            alert('Order failed!');
        }
    };

    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Order {product.description}</h3>
                <p className="py-4">Price: ${product.price}</p>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Quantity</span>
                    </label>
                    <input
                        type="number"
                        min="1"
                        className="input input-bordered w-full max-w-xs"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                    />
                </div>

                <div className="modal-action">
                    <button className="btn" onClick={() => navigate('/products')}>Cancel</button>
                    <button className="btn btn-primary" onClick={handleOrder}>Place Order</button>
                </div>
            </div>
        </div>
    );
};

export default OrderModal;
