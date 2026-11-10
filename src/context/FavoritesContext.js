import { createContext, useContext, useEffect, useState } from 'react';

import games from '../data/games';
import { STORAGE_KEYS, loadData, saveData } from '../storage/storage';

const FavoritesContext = createContext(undefined);

export function FavoritesProvider({ children }) {
  // Guardamos apenas os ids dos jogos favoritos; os dados completos vêm de games.js.
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Ao abrir o app, recupera os favoritos salvos no AsyncStorage.
  useEffect(() => {
    loadData(STORAGE_KEYS.favorites, []).then((savedIds) => {
      setFavoriteIds(savedIds);
      setIsLoaded(true);
    });
  }, []);

  // Sempre que a lista mudar (depois do carregamento inicial), salva de novo.
  useEffect(() => {
    if (isLoaded) {
      saveData(STORAGE_KEYS.favorites, favoriteIds);
    }
  }, [favoriteIds, isLoaded]);

  // Monta a lista na ordem em que os jogos foram favoritados.
  const favorites = favoriteIds
    .map((id) => games.find((game) => game.id === id))
    .filter(Boolean);

  function addFavorite(game) {
    setFavoriteIds((currentIds) =>
      currentIds.includes(game.id) ? currentIds : [...currentIds, game.id]
    );
  }

  function removeFavorite(gameId) {
    setFavoriteIds((currentIds) => currentIds.filter((id) => id !== gameId));
  }

  function toggleFavorite(game) {
    setFavoriteIds((currentIds) =>
      currentIds.includes(game.id)
        ? currentIds.filter((id) => id !== game.id)
        : [...currentIds, game.id]
    );
  }

  function isFavorite(gameId) {
    return favoriteIds.includes(gameId);
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
