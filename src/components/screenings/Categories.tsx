import React from 'react'
import { Badge } from 'react-bootstrap';

interface CategoriesProps {
  selectedCategories: string[];
  categories: any[];
  handleCategoryClick: (category: string) => void;
}

export const Categories: React.FC<CategoriesProps> = (props) => {
  return (
    <>
      <h5>Categories</h5>
        { props.categories.map(({ category, count }) => (
          <Badge
            bg={props.selectedCategories.includes(category) ? 'dark' : 'light'}
            key={category}
            className='m-1'
            onClick={() => props.handleCategoryClick(category)}
          >
            <p className={props.selectedCategories.includes(category) ? 'light-badge-font' : 'dark-badge-font'}>{`${category} `}<span>{`(${count})`}</span></p>
          </Badge>
        ))}
    </>
  )
}