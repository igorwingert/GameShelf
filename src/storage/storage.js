import AsyncStorage from '@react-native-async-storage/async-storage';

// Chaves usadas no AsyncStorage (armazenamento chave-valor do dispositivo).
export const STORAGE_KEYS = {
  profile: '@gameshelf:profile',
  favorites: '@gameshelf:favorites',
};

// Lê um valor salvo e converte de texto (JSON) para objeto.
// Retorna `fallback` se não houver nada salvo ou se a leitura falhar.
export async function loadData(key, fallback) {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? JSON.parse(value) : fallback;
  } catch (error) {
    console.warn(`Erro ao ler ${key} do AsyncStorage:`, error);
    return fallback;
  }
}

// Converte o valor para texto (JSON) e salva no dispositivo.
export async function saveData(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Erro ao salvar ${key} no AsyncStorage:`, error);
  }
}
