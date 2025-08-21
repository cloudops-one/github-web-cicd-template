import { useExample } from './hooks/useExample';
import './App.css';

function App() {
    const { data, loading, error } = useExample();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    if (loading) {
        return (
            <div className="app">
                <h1>React Vite TypeScript App</h1>
                <div className="loading">
                    <p>Loading data from backend...</p>
                    <p className="api-url">API URL: {apiUrl}</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="app">
                <h1>React Vite TypeScript App</h1>
                <div className="error">
                    <h3>Error: {error.message}</h3>
                    {error.status && <p>Status Code: {error.status}</p>}
                    <p>Make sure your backend is running on: {apiUrl}</p>
                    <p>Current API URL: {apiUrl}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="app">
            <h1>React Vite TypeScript App</h1>
            <div className="info">
                <p className="api-url">Connected to: {apiUrl}</p>
            </div>
            <div className="data-container">
                <h2>Data from Backend:</h2>
                <p className="backend-data">{data}</p>
            </div>
        </div>
    );
}

export default App;