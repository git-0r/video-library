const useLocalStorage = (key) => {

    const value = localStorage.getItem(key);

    return JSON.parse(value)
}

export { useLocalStorage };