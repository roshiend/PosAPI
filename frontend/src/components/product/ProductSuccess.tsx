import React from 'react';
import { ArrowLeft, Eye } from 'lucide-react';
import { Link, useParams, useLocation } from 'react-router-dom';

export default function ProductSuccess() {
  const { id } = useParams();
  const location = useLocation();
  const { productTitle } = location.state || { productTitle: 'Product' };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-center">
              <div className="mx-auto text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  "{productTitle}" was successfully created
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  Your product is now live and ready to be viewed
                </p>
                <div className="flex justify-center space-x-4">
                  <Link
                    to={`/products/${id}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View product
                  </Link>
                  <Link
                    to="/products"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to products
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}