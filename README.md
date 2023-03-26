<h1 align="left">feature-flicks-cinema</h1>

<p align="left">
  The purpose of the project is to build a prototype website for a cinema called Feature Flicks, which has two auditoriums and is located in Småstad, Sweden. The goal is to create a frontend using React, React Router, and React Bootstrap that integrates with the provided backend to allow visitors to view movie information, filter by category, book tickets, and receive a receipt with a booking number.
  <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Description](#description)
- [Getting Started](#getting_started)
- [Built Using](#built_using)
- [Authors](#authors)

## 🧐 About <a name = "about"></a>

The purpose of the project is to create a prototype website for Feature Flicks, a small cinema in Småstad, Sweden, to compete with other local cinemas by providing a user-friendly and efficient way for visitors to view movie information, book tickets, and receive a receipt. The project aims to integrate with the provided backend and use React, React Router, and React Bootstrap to create a responsive and visually appealing frontend that meets the grading requirements.

## 👨‍💻 Description <a name = "description"></a>

The code for the UI is divided into several components. The main components to take note of are:

- **App.tsx**
- **Hero.tsx**
- **Screenings.tsx**
- **SelectScreening.tsx**
- **Booking.tsx**
- **BootstrapNavBar.tsx**
- **Footer.tsx**

These components are either components that are visible on every page of the website, or components that house the vast majority of other child components.

<hr>

### App.tsx

This component contains the navigation bar, which is static across pages, and a dynamic react node, which will house the currently selected page.

<hr>

### Hero.tsx

The Hero component functions as the initial page displayed to the users upon arrival. It displays four featured movies that can be pressed in order to navigate to the screening selection for that particular movie. The Hero component contains a list of MoviePosterContainer which display the poster of the movie, the name, runtime, and the categories for the movie.

The state of this component is determined by the useHero hook, which uses the useReducer hook and a number of custom useEffect hooks and dispatch actions.

<hr>

### Screenings.tsx

The **Screenings.tsx** component displays a list of movies, in two different formats. The movies are either represented as list items that are more compact, or movie posters. The two housing components for these two views, respectively, are **ScreeningsListView.tsx** and **ScreeningsPosterView.tsx**. Each list type contains a list of either **ScreeningsListViewContainer.tsx** or **ScreeningsPosterContainer.tsx**, respectively.

**Screenings.tsx** also contains a static header, **ScreeningsHeader.tsx**, at the top, which allows for toggling between the two views and also toggling the visibility of the **FilteringOffCanvas.tsx**. 
The **FilteringOffCanvas.tsx** component displays a list of badges, generated in the **Categories.tsx** component, each containing a category and a number, indicating how many movies in the current filter adhere to the categories selected by the user. The **FilteringOffCanvas.tsx** component also allows the user to clear all the filters and to programmatically close it.

The state of this component is determined by the useSelectScreening hook, which uses the useReducer hook and a number of custom useEffect hooks and dispatch actions.

<hr>

### SelectScreening.tsx

The **SelectScreening.tsx** component appears after the user presses a navigation link contained in either **ScreeningsListViewContainer.tsx**, **ScreeningsPosterViewContainer.tsx**, or **MoviePosterContainer.tsx**. Since each movie can have a variety of screenings, in different auditoriums, the **SelectScreening.tsx** component lets the user select a screening before booking seats for a movie.

The **SelectScreening.tsx** component contains a list of **ScreeningDateContainer.tsx**, which are grouped by auditorium name and contain information about the screenings, like the date, auditorium name, amount of occupied seats to total amount of seats, and a button to navigate to the booking screen for that particular screening. It also contains a header at the top, displaying the name of the movie, its poster, and its categories.

The state of this component is determined by the useScreening hook, which uses the useReducer hook and a number of custom useEffect hooks and dispatch actions.

<hr>

### Booking.tsx

The **Booking.tsx** component is composed of four different components: **MovieScreeningInformation.tsx**, **TicketSum.tsx**, **TicketSelectionContainer.tsx**, and **SeatsGrid.tsx**.

**MovieScreeningInformation.tsx** contains information about the specific screening, like the poster for the movie, auditorium name, and the date for the screening.

**TicketSum.tsx** contains information about the users selected tickets, which price deductions have been applied, the subtotal for the tickets, and the total amount for the tickets.

**TicketSelectionContainer.tsx** contains a list of **TicketSelectionAmountContainer.tsx** components. The amount of these components is determined by the amount of ticket types available in the API, and will let the user remove or add tickets of a specific type.

**SeatsGrid.tsx** contains a grid view of the available seats in the auditorium, with the occupied seats greyed out and the available seats marked with white, which are then toggled to red sequentially, starting from the bottom.

The state of this component is determined by the useBooking hook, which uses the useReducer hook and a number of custom useEffect hooks and dispatch actions.

<hr>

### BootstrapNavbar.tsx

The **BootstrapNavbar.tsx** component contains NavLinks to the different pages available in the application (home/screenings).

<hr>

### Footer.tsx

The **Footer.tsx** component is a very basic footer that contains a copyright mark with my name and is static, displayed on all pages of the application.

<hr>

### NOTE:

The components that make any network calls are all dependent on page state to determine whether or not to display the result acquired from the backend API. If anything fails, the **ErrorMessage.tsx** component will be rendered. While the network call is being made, and since it is asynchronous, the **Loading.tsx** component will be displayed before any other view is rendered. If the user tries to access a route that does not exist, the **ErrorRoute.tsx** component will be rendered.

<hr>

## 🏁 Getting Started <a name = "getting_started"></a>

### Installing

After cloning the repository, open your terminal and run

```
npm i ; npm run dev
```

This will start the local development environment and you can access the website at http://localhost:8080/


## ⛏️ Built Using <a name = "built_using"></a>

- [React Router](https://reactrouter.com/en/main) - Routing Framework
- [Vite](https://vitejs.dev/) - Web Framework
- [React](https://reactjs.org/) - Frontend Framework
- [React Bootstrap](https://react-bootstrap.github.io/) - Frontend Framework
- [Font Awesome](https://fontawesome.com/) - Icons
- [NodeHill Cinema Rest API](https://cinema-rest.nodehill.se/) - API

## ✍️ Authors <a name = "authors"></a>

- [@adisve](https://github.com/adisve) - Idea & Initial work
