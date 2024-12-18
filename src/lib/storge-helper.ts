"use client";

export function getLocalStorage(key: string, defaultValue: any) {
  const stickyValue = localStorage.getItem(key);

  if (stickyValue !== null && stickyValue !== "undefined") {
    console.log(stickyValue);

    try {
      return stickyValue;
    } catch (error) {
      console.error("Error parsing localStorage value", error);
      return defaultValue;
    }
  }
  return defaultValue;
}

export function setLocalStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}
