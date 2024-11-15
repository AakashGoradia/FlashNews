import { formatDistanceToNow } from 'date-fns';
import { ArrowRight } from 'lucide-react';
import type { Article } from '../types';

interface NewsCardProps {
  article: Article;
  isActive?: boolean;
  onClick: () => void;
}

export function NewsCard({ article, isActive = false, onClick }: NewsCardProps) {
  return (
    <div 
      onClick={onClick}
      className={`
        flex bg-white rounded-lg overflow-hidden cursor-pointer
        transform transition-all duration-300 hover:shadow-lg
        ${isActive 
          ? 'ring-2 ring-primary-500 shadow-lg scale-[1.02]' 
          : 'shadow-md hover:scale-[1.01]'
        }
      `}
    >
      <div className="w-1/3 flex-shrink-0">
        {article.urlToImage && (
          <img 
            src={article.urlToImage} 
            alt={article.title}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      
      <div className="w-2/3 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="px-3 py-1 bg-primary-50 text-primary-700 text-sm font-medium rounded-full">
              {article.source.name}
            </span>
            <span className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
            </span>
          </div>
          
          <h3 className="text-xl font-semibold mb-2 line-clamp-2 text-gray-900">
            {article.title}
          </h3>
          
          <p className="text-gray-600 line-clamp-2">
            {article.description}
          </p>
        </div>

        <div className="mt-4 flex items-center text-primary-600 group">
          <span className="text-sm font-medium">Read full article</span>
          <ArrowRight size={16} className="ml-2 transform transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
}