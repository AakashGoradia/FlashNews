import { X, ExternalLink } from 'lucide-react';
import type { Article } from '../types';

interface ArticlePreviewProps {
  article: Article | null;
  onClose: () => void;
}

export function ArticlePreview({ article, onClose }: ArticlePreviewProps) {
  if (!article) return null;

  return (
    <>
      {/* Mobile overlay */}
      <div 
        className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Preview panel */}
      <aside className={`
        fixed inset-y-0 right-0 w-full md:w-[600px] lg:w-[40rem] bg-white z-50
        transform transition-transform duration-300 overflow-hidden
        ${article ? 'translate-x-0' : 'translate-x-full'}
        lg:shadow-2xl
      `}>
        <div className="h-full overflow-y-auto">
          <div className="sticky top-0 bg-white z-10 p-4 border-b flex items-center justify-between">
            <span className="font-medium text-gray-600">Article Preview</span>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close preview"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6">
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full aspect-video object-cover rounded-lg mb-6"
              />
            )}

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-primary-50 text-primary-700 text-sm font-medium rounded-full">
                  {article.source.name}
                </span>
                <time className="text-sm text-gray-500">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </time>
              </div>

              <h1 className="text-3xl font-bold text-gray-900">{article.title}</h1>
              
              <p className="text-gray-700 leading-relaxed">{article.content || article.description}</p>

              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg
                  hover:bg-primary-700 transition-colors group"
              >
                <span>Read full article</span>
                <ExternalLink size={16} className="ml-2 transform transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}