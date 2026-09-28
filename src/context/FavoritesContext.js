import { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext(undefined);

export function FavoritesProvider({ children }) {
  // Estado compartilhado em memória; reiniciar o app limpa os favoritos.
  const [favorites, setFavorites] = useState([]);

  function addFavorite(game) {
    setFavorites((currentFavorites) => {
      if (currentFavorites.some((favorite) => favorite.id === game.id)) {
        return currentFavorites;
      }

      return [...currentFavorites, game];
    });
  }

  function removeFavorite(gameId) {
    setFavorites((currentFavorites) =>
      currentFavorites.filter((favorite) => favorite.id !== gameId)
    );
  }

  function toggleFavorite(game) {
    setFavorites((currentFavorites) =>
      currentFavorites.some((favorite) => favorite.id === game.id)
        ? currentFavorites.filter((favorite) => favorite.id !== game.id)
        : [...currentFavorites, game]
    );
  }

  function isFavorite(gameId) {
    return favorites.some((favorite) => favorite.id === gameId);
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (context === undefined) {
    throw new Error('useFavorites deve ser usado dentro de FavoritesProvider.');
  }

  return context;
}
