import React from 'react'
import { Button, Offcanvas } from 'react-bootstrap'
import { Categories } from './Categories'
import { Category } from '../../domain/interfaces/Category';

interface FilteringOffcanvasProps {
  showOffcanvas: boolean;
  toggleOffcanvas: () => void;
  selectedCategories: string[];
  categories: Category[];
  counts: { [key: string]: number };
  clearSelectedCategories: () => void;
  handleCategoryClick: (category: string) => void;
}

export const FilteringOffcanvas = ({ 
  showOffcanvas,
  toggleOffcanvas,
  selectedCategories,
  categories,
  counts,
  clearSelectedCategories,
  handleCategoryClick,
 }: FilteringOffcanvasProps) => {
  return (
    <Offcanvas placement='end' show={showOffcanvas} onHide={toggleOffcanvas}>
      <Offcanvas.Header>
        <Button variant='custom' onClick={toggleOffcanvas}>Done</Button>
        <Offcanvas.Title>Filters</Offcanvas.Title>
        <Button variant='custom' onClick={() => clearSelectedCategories()}>Clear filters</Button>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Categories
          counts={counts}
          selectedCategories={selectedCategories} 
          categories={categories} 
          handleCategoryClick={handleCategoryClick} 
        />
      </Offcanvas.Body>
    </Offcanvas>
  )
}
