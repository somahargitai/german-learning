export function getRandomLanguage(languages) {
  const randomIndex = Math.floor(Math.random() * languages.length);
  const chosenLanguage = languages[randomIndex];
  return chosenLanguage;
}
