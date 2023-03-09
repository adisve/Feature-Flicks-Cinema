import React from 'react'
import { Badge } from 'react-bootstrap';
import { Category } from '../../domain/interfaces/Category';

interface CategoriesProps {
  selectedCategories: string[];
  categories: Category[];
  counts: { [key: string]: number };
  handleCategoryClick: (category: string) => void;
}

export const Categories: React.FC<CategoriesProps> = (props) => {
  return (
    <>
      <h5>Categories</h5>
        { props.categories.map((category) => (
          <Badge
            bg={props.selectedCategories.includes(category.title) ? 'dark' : 'light'}
            key={category.id}
            className='m-1'
            onClick={() => props.handleCategoryClick(category.title)}
          >
          <p className={props.selectedCategories.includes(category.title) ? 'light-badge-font' : 'dark-badge-font'}>
            {`${category.title} `}<span>{`(${props.counts[category.title]})`}</span>
          </p>
          </Badge>
        ))}
    </>
  )
}