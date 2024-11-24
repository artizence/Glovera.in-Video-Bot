"use client";


export function saveToLocalStorage(key: string, data: FormData) {
  const json = Object.fromEntries(data)
  const dataStr = JSON.stringify(json);
  localStorage.setItem(key, dataStr)
  console.log(dataStr);
}
