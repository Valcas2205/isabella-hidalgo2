'use client'
import { useState } from 'react'
import { Shell, WorkCard, works } from '@/components/site-chrome'

export default function Gallery() {
  const [filter, setFilter] = useState('All works')
  const cats = ['All works', 'Paintings', 'Works on paper', 'Prints']
  const shown = filter === 'All works' ? works : works.filter(w => w.category === filter)

  return (
    <Shell>
      <div className="gallery-page section-shell">
        <div className="gallery-layout">
          
          {/* Sidebar */}
          <aside className="gallery-sidebar">
            <h2 className="sidebar-title">Explore</h2>
            
            <div className="filter-group">
              <div className="filter-header">
                Sold Out
                <div className="toggle"></div>
              </div>
            </div>

            <div className="filter-group open">
              <div className="filter-header">Medium <span>−</span></div>
              <ul className="filter-list">
                {cats.map(c => (
                  <li key={c}>
                    <button 
                      className={filter === c ? 'active' : ''} 
                      onClick={() => setFilter(c)}
                    >
                      {c}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="filter-group">
              <div className="filter-header">Format <span>+</span></div>
            </div>
            
            <div className="filter-group">
              <div className="filter-header">Size <span>+</span></div>
            </div>

            <div className="filter-group">
              <div className="filter-header">Price <span>+</span></div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="gallery-main">
            <div className="gallery-main-header">
              <h1 className="gallery-title">Artwork</h1>
              <select className="gallery-sort" aria-label="Sort artworks">
                <option>Name - A-Z</option>
                <option>Price - Low to High</option>
                <option>Price - High to Low</option>
              </select>
            </div>

            <div className="gallery-grid-new">
              {shown.map((work) => (
                <WorkCard key={work.title} work={work} />
              ))}
            </div>
          </main>

        </div>
      </div>
    </Shell>
  )
}
