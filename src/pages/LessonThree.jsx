import LanguageExercise from '../components/LanguageExercise';
import {
  sports,
  freeTime,
  time,
  music,
  starsAndTrends,
  school,
} from '../translations/lessonThreeData';

function LessonThree() {
  const availableLanguagePairs = ['de-hu', 'hu-de', 'de-en', 'en-de', 'hu-en', 'en-hu'];

  const vocabularyArrays = [sports, freeTime, time, music, starsAndTrends, school];

  const vocabularyCategories = [
    { key: 'sports', label: 'Sports', data: sports },
    { key: 'freeTime', label: 'Free Time', data: freeTime },
    { key: 'time', label: 'Time', data: time },
    { key: 'music', label: 'Music', data: music },
    { key: 'starsAndTrends', label: 'Stars and Trends', data: starsAndTrends },
    { key: 'school', label: 'School', data: school },
  ];

  return (
    <LanguageExercise
      title="Lesson Three Practice"
      availableLanguagePairs={availableLanguagePairs}
      vocabularyArrays={vocabularyArrays}
      sentenceArrays={[]}
      vocabularyCategories={vocabularyCategories}
      sentenceCategories={[]}
    />
  );
}

export default LessonThree;
