import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductManager from './components/product/ProductManager';
import ProductSuccess from './components/product/ProductSuccess';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={
              <>
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Product Management</h1>
                <ProductManager />
              </>
            } />
            <Route 
              path="/products/success/:id" 
              element={<ProductSuccess />} 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}