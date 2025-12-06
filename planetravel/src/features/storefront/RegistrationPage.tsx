import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { gql } from '@apollo/client';
// import { useMutation } from '@apollo/client/react';

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    // Mock registration since backend mutation is missing
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Mock registration:', formData);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert('Registration successful (Mock)! Backend mutation missing.');
        navigate('/products');
    };

    const loading = false;
    const error = null;

    return (
        <div className="flex justify-center items-center min-h-[80vh]">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center mb-4">Create Account</h2>
                    {error && <div className="alert alert-error text-sm">{(error as any).message}</div>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                className="input input-bordered"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="email@example.com"
                                className="input input-bordered"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="********"
                                className="input input-bordered"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button
                                type="submit"
                                className={`btn btn-primary ${loading ? 'loading' : ''}`}
                                disabled={loading}
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;
