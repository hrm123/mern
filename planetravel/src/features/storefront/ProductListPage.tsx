import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { useNavigate } from 'react-router-dom';

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      description
      price
    }
  }
`;

const ProductListPage = () => {
    const { loading, error, data } = useQuery<{ products: any[] }>(GET_PRODUCTS);
    const navigate = useNavigate();

    if (loading) return <div className="text-center p-10"><span className="loading loading-spinner loading-lg"></span></div>;
    if (error) return <div className="alert alert-error">Error: {error.message}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Available Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.products?.map((product: any) => (
                    <div key={product.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                        <figure className="px-10 pt-10">
                            <div className="w-full h-48 bg-base-300 rounded-xl flex items-center justify-center text-4xl">
                                📦
                            </div>
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{product.description}</h2>
                            <p className="text-xl font-semibold text-primary">${product.price.toFixed(2)}</p>
                            <div className="card-actions">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => navigate(`/order/${product.id}`)}
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductListPage;
