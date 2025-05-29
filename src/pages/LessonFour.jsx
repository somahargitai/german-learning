import LanguageExercise from '../components/LanguageExercise';
import {
  schoolSubjects,
  timeExpressions,
  schoolOpinions,
  adjectives,
  schoolActivities,
  teachers,
  schoolFacilities,
  schoolRules,
  afterSchoolActivities,
  schoolSubjectSentences,
  teacherSentences,
  schoolFacilitySentences,
  afterSchoolActivitySentences,
} from '../translations/lessonFourData';

function LessonFour() {
  const availableLanguagePairs = ['de-hu', 'hu-de', 'de-en', 'en-de', 'hu-en', 'en-hu'];

  const vocabularyArrays = [
    schoolSubjects,
    timeExpressions,
    schoolOpinions,
    adjectives,
    schoolActivities,
    teachers,
    schoolFacilities,
    schoolRules,
    afterSchoolActivities,
  ];

  const sentenceArrays = [
    schoolSubjectSentences,
    teacherSentences,
    schoolFacilitySentences,
    afterSchoolActivitySentences,
  ];

  const vocabularyCategories = [
    { key: 'schoolSubjects', label: 'School Subjects', data: schoolSubjects },
    { key: 'timeExpressions', label: 'Time Expressions', data: timeExpressions },
    { key: 'schoolOpinions', label: 'School Opinions', data: schoolOpinions },
    { key: 'adjectives', label: 'Adjectives', data: adjectives },
    { key: 'schoolActivities', label: 'School Activities', data: schoolActivities },
    { key: 'teachers', label: 'Teachers', data: teachers },
    { key: 'schoolFacilities', label: 'School Facilities', data: schoolFacilities },
    { key: 'schoolRules', label: 'School Rules', data: schoolRules },
    { key: 'afterSchoolActivities', label: 'After School Activities', data: afterSchoolActivities },
  ];

  const sentenceCategories = [
    { key: 'schoolSubjectSentences', label: 'School Subject Sentences', data: schoolSubjectSentences },
    { key: 'teacherSentences', label: 'Teacher Sentences', data: teacherSentences },
    { key: 'schoolFacilitySentences', label: 'School Facility Sentences', data: schoolFacilitySentences },
    { key: 'afterSchoolActivitySentences', label: 'After School Activity Sentences', data: afterSchoolActivitySentences },
  ];

  return (
    <LanguageExercise
      title="Lesson Four Practice"
      availableLanguagePairs={availableLanguagePairs}
      vocabularyArrays={vocabularyArrays}
      sentenceArrays={sentenceArrays}
      vocabularyCategories={vocabularyCategories}
      sentenceCategories={sentenceCategories}
    />
  );
}

export default LessonFour; 