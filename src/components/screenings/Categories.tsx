import React from 'react'
import { Badge } from 'react-bootstrap';
import { Category } from '../../domain/interfaces/Category';

interface CategoriesProps {
  selectedCategories: string[];
  categories: Category[];
  counts: { [key: string]: number };
  handleCategoryClick: (category: string) => void;
}

export const Categories = ({ 
  selectedCategories,
  categories,
  counts,
  handleCategoryClick
 }: CategoriesProps) => {
  return (
    <>
      <h5>Categories</h5>
        { categories.map((category) => (
          <Badge
            bg={selectedCategories.includes(category.title) ? 'dark' : 'light'}
            key={category.id}
            className='m-1'
            onClick={() => handleCategoryClick(category.title)}
          >
          <p className={selectedCategories.includes(category.title) ? 'light-badge-font' : 'dark-badge-font'}>
            {`${category.title} `}<span>{`(${counts[category.title]})`}</span>
          </p>
          </Badge>
        ))}
    </>
  )
}