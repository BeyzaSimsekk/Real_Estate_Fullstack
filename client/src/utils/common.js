export const getMenuStyles = (menuOpened) => {
  if (document.documentElement.clientWidth <= 800) {
    return { right: !menuOpened && "-100%" };
  }
};

export const sliderSettings = {
  slidesPerView: 1,
  spaceBetween: 50,
  breakpoints: {
    480: {
      slidesPerView: 1,
    },
    600: {
      slidesPerView: 2
    },
    750: {
      slidesPerView: 3
    },
    1100: {
      slidesPerView: 4,
    },
  },

};

export const updateFavorites = (id, favorites) => {
  if(favorites.includes(id)){
    return favorites.filter((resId) => resId !== id)
  }
  else{
    return [...favorites, id]
  }
}

export const checkFavorites = (id, favorites) => {
  if (!Array.isArray(favorites)) return "white";
  return favorites.includes(id) ? "#fa3e5f" : "white";  //ya da return favorites?.includes(id) ? "#fa3e5f" : "white";
};

export const validateString = (value) => {
  return value?.length < 3 || value === null ? "Must have at least 3 characters" : null 
}
