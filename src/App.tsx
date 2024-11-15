import { useState } from 'react';
import { Newspaper } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { NewsCard } from './components/NewsCard';
import { ArticlePreview } from './components/ArticlePreview';
import type { Article, Category } from './types';

// Temporary mock data until API integration
const mockArticles: Article[] = [
  {
    title: "Breaking News: Amazing Discovery",
    description: "Scientists have made an incredible breakthrough in quantum computing that could revolutionize the way we process information. This discovery opens new possibilities in the field of quantum mechanics and computational science...",
    url: "https://example.com",
    urlToImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
    publishedAt: new Date().toISOString(),
    source: { name: "Tech Daily" },
    content: "Scientists have made an incredible breakthrough in quantum computing..."
  },
  {
    title: "New Technology Advancement",
    description: "Revolutionary new technology promises to transform the industry with groundbreaking innovations in artificial intelligence and machine learning, leading to more efficient and intelligent systems...",
    url: "https://example.com",
    urlToImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
    publishedAt: new Date().toISOString(),
    source: { name: "Science Weekly" },
    content: "Revolutionary new technology promises to transform the industry..."
  }
];

function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('general');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm z-20 flex-shrink-0">
        <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Newspaper className="h-8 w-8 text-primary-600" />
              <h1 className="text-2xl font-bold text-gray-900">NewsFlash</h1>
            </div>
            <div className="lg:hidden">
              <Sidebar
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0 border-r border-gray-200 bg-white">
          <div className="sticky top-0 h-full overflow-y-auto">
            <Sidebar
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 overflow-y-auto transition-all duration-300 ${
          selectedArticle ? 'lg:mr-[40rem]' : ''
        }`}>
          <div className="max-w-5xl mx-auto px-4 py-6">
            <div className="space-y-6">
              {mockArticles.map((article, index) => (
                <NewsCard
                  key={index}
                  article={article}
                  isActive={selectedArticle?.url === article.url}
                  onClick={() => setSelectedArticle(article)}
                />
              ))}
            </div>
          </div>
        </main>

        {/* Article Preview */}
        <ArticlePreview
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      </div>
    </div>
  );
}

export default App;