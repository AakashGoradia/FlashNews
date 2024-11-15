import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { Category } from '../types';

interface SidebarProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

const categories: Category[] = ['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'];

export function Sidebar({ selectedCategory, onSelectCategory }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className={`
        fixed inset-x-0 top-0 h-screen bg-white shadow-xl transition-all duration-300 z-40
        transform ${isOpen ? 'translate-y-0' : '-translate-y-full lg:translate-y-0'}
        lg:static lg:transform-none lg:shadow-none lg:h-auto
      `}>
        <div className="p-6">
          <div className="flex items-center justify-between lg:justify-start mb-8">
            <h2 className="text-xl font-bold text-gray-900">Categories</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <nav>
            <ul className="space-y-1">
              {categories.map((category) => (
                <li key={category}>
                  <button
                    onClick={() => {
                      onSelectCategory(category);
                      setIsOpen(false);
                    }}
                    className={`
                      w-full px-4 py-2.5 rounded-lg capitalize transition-all
                      flex items-center justify-between group
                      ${selectedCategory === category 
                        ? 'bg-primary-50 text-primary-700 font-medium' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                    `}
                  >
                    {category}
                    {selectedCategory === category && (
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}