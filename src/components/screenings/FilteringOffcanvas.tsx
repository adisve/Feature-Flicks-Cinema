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
  setSelectedCategories: (selectedCategories: string[]) => void;
  handleCategoryClick: (category: string) => void;
}

export const FilteringOffcanvas: React.FC<FilteringOffcanvasProps> = (props) => {
  return (
    <Offcanvas placement='end' show={props.showOffcanvas} onHide={props.toggleOffcanvas}>
      <Offcanvas.Header>
        <Button variant='custom' onClick={props.toggleOffcanvas}>Done</Button>
        <Offcanvas.Title>Filters</Offcanvas.Title>
        <Button variant='custom' onClick={() => props.setSelectedCategories([])}>Clear filters</Button>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Categories
          counts={props.counts}
          selectedCategories={props.selectedCategories} 
          categories={props.categories} 
          handleCategoryClick={props.handleCategoryClick} 
        />
      </Offcanvas.Body>
    </Offcanvas>
  )
}
