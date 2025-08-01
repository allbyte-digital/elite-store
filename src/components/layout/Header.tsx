import React from 'react';
import { 
  ShoppingCart, 
  Search, 
  User, 
  Bell, 
  Menu,
  Heart,
  MapPin
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';

export function Header() {
  const { state, dispatch } = useApp();
  const cartItemsCount = state.cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
            <Menu className="h-6 w-6" />
          </button>

          {/* Logo */}
          <div className="flex items-center">
            <div 
              className="flex-shrink-0 cursor-pointer"
              onClick={() => dispatch({ type: 'SET_CURRENT_PAGE', payload: 'home' })}
            >
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">E</span>
                </div>
                <span className="text-xl font-bold text-gray-900 hidden sm:block">EliteStore</span>
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-lg mx-8 hidden md:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => dispatch({ type: 'SET_CURRENT_PAGE', payload: 'home' })}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                state.currentPage === 'home' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => dispatch({ type: 'SET_CURRENT_PAGE', payload: 'products' })}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                state.currentPage === 'products' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Products
            </button>
            {state.user?.role === 'admin' && (
              <>
                <button 
                  onClick={() => dispatch({ type: 'SET_CURRENT_PAGE', payload: 'analytics' })}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    state.currentPage === 'analytics' 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  Analytics
                </button>
                <button 
                  onClick={() => dispatch({ type: 'SET_CURRENT_PAGE', payload: 'inventory' })}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    state.currentPage === 'inventory' 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  Inventory
                </button>
                <button 
                  onClick={() => dispatch({ type: 'SET_CURRENT_PAGE', payload: 'orders' })}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    state.currentPage === 'orders' 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  Orders
                </button>
              </>
            )}
          </nav>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {/* Location */}
            <div className="hidden lg:flex items-center space-x-1 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>New York</span>
            </div>

            {/* Wishlist */}
            <button className="p-2 text-gray-400 hover:text-gray-500 relative">
              <Heart className="h-6 w-6" />
            </button>

            {/* Notifications */}
            <button className="p-2 text-gray-400 hover:text-gray-500 relative">
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Cart */}
            <button 
              onClick={() => dispatch({ type: 'SET_CURRENT_PAGE', payload: 'cart' })}
              className="p-2 text-gray-400 hover:text-gray-500 relative"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* User menu */}
            {state.user ? (
              <div className="flex items-center space-x-2">
                <img
                  src={state.user.avatar}
                  alt={state.user.name}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="hidden sm:block text-sm font-medium text-gray-700">
                  {state.user.name}
                </span>
              </div>
            ) : (
              <Button
                size="sm"
                onClick={() => dispatch({ type: 'SET_CURRENT_PAGE', payload: 'auth' })}
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile search */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search products..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
    </header>
  );
}