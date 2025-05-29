const schoolSubjects = [
  { de: 'das Fach/Schulfach', hu: 'tantárgy', en: 'subject/school subject' },
  { de: 'Fächer (pl)', hu: 'tantárgyak', en: 'subjects' },
  { de: 'lernen', hu: 'tanulni', en: 'to learn, to study' },
  { de: 'die (Mittags)pause', hu: '(ebéd)szünet', en: '(lunch) break' },
  { de: 'die Stunde', hu: 'óra', en: 'lesson' },
  { de: 'der Stundenplan', hu: 'órarend', en: 'timetable' },
  { de: 'Biologie', hu: 'biológia', en: 'biology' },
  { de: 'Chemie', hu: 'kémia', en: 'chemistry' },
  { de: 'Deutsch', hu: 'német', en: 'German' },
  { de: 'Englisch', hu: 'angol', en: 'English' },
  { de: 'Erdkunde', hu: 'földrajz', en: 'geography' },
  { de: 'Französisch', hu: 'francia', en: 'French' },
  { de: 'Fremdsprachen (pl)', hu: 'idegen nyelvek', en: 'foreign languages' },
  { de: 'Geschichte', hu: 'történelem', en: 'history' },
  { de: 'Informatik', hu: 'informatika', en: 'computing' },
  { de: 'Kunst', hu: 'művészet', en: 'art' },
  { de: 'Mathematik', hu: 'matematika', en: 'maths' },
  { de: 'Musik', hu: 'zene', en: 'music' },
  { de: 'Naturwissenschaften (pl)', hu: 'természettudományok', en: 'sciences' },
  { de: 'Physik', hu: 'fizika', en: 'physics' },
  { de: 'Spanisch', hu: 'spanyol', en: 'Spanish' },
  { de: 'Sport', hu: 'testnevelés', en: 'PE' },
];

const timeExpressions = [
  { de: 'um ... (Uhr)', hu: '... órakor', en: "at ... (o'clock)" },
  {
    de: 'halb neun/zehn/elf...',
    hu: 'fél kilenc/tíz/tizenegy...',
    en: 'half past eight/nine/ten...',
  },
  { de: 'Viertel vor/nach', hu: 'negyed múlva/előtt', en: 'quarter to/past (the hour)' },
  { de: 'dann', hu: 'aztán', en: 'then, next' },
  { de: 'zum Beispiel', hu: 'például', en: 'for example' },
  { de: 'abends/am Abend', hu: 'este', en: 'in the evening' },
  { de: 'nachmittags/am Nachmittag', hu: 'délután', en: 'in the afternoon' },
];

const schoolOpinions = [
  {
    de: 'Ich bin stark/schwach in...',
    hu: 'Erős/gyenge vagyok...',
    en: 'I am good/bad at...',
  },
  { de: 'Deutsch interessiert mich.', hu: 'Érdekel a német.', en: 'German interests me.' },
  {
    de: 'Fremdsprachen interessieren mich.',
    hu: 'Érdekelnek az idegen nyelvek.',
    en: 'Languages interest me.',
  },
  { de: 'Mir gefällt Mathe.', hu: 'Tetszik a matek.', en: 'I like maths.' },
  {
    de: 'Mir gefallen Kunst und Sport.',
    hu: 'Tetszik a művészet és a testnevelés.',
    en: 'I like art and PE.',
  },
];

const adjectives = [
  { de: 'mega', hu: 'mega', en: 'mega' },
  { de: 'total', hu: 'teljesen', en: 'totally' },
  { de: 'voll', hu: 'nagyon', en: 'really' },
  { de: 'anstrengend', hu: 'fárasztó', en: 'tiring' },
  { de: 'ätzend', hu: 'borzasztó', en: 'awful' },
  { de: 'bescheuert', hu: 'hülye', en: 'stupid' },
  { de: 'einfach', hu: 'egyszerű', en: 'easy' },
  { de: 'interessant', hu: 'érdekes', en: 'interesting' },
  { de: 'langweilig', hu: 'unalmas', en: 'boring' },
  { de: 'nervig', hu: 'idegesítő', en: 'annoying' },
  { de: 'nützlich', hu: 'hasznos', en: 'useful' },
  { de: 'praktisch', hu: 'praktikus', en: 'practical' },
  { de: 'prima', hu: 'kiváló', en: 'great' },
  { de: 'schrecklich', hu: 'szörnyű', en: 'awful' },
  { de: 'schwierig', hu: 'nehéz', en: 'difficult' },
  { de: 'spannend', hu: 'izgalmas', en: 'exciting' },
  { de: '(un)wichtig', hu: '(nem) fontos', en: '(un)important' },
];

const schoolActivities = [
  {
    de: '(Texte) auswendig lernen',
    hu: '(szöveget) kívülről megtanulni',
    en: 'to learn (texts) off by heart',
  },
  { de: 'eine gute/schlechte Idee', hu: 'jó/rossz ötlet', en: 'a good/bad idea' },
  { de: 'faszinierend', hu: 'lenyűgöző', en: 'fascinating' },
  { de: 'Fragen stellen', hu: 'kérdéseket feltenni', en: 'to ask questions' },
  { de: 'Hausaufgaben machen', hu: 'házi feladatot írni', en: 'to do homework' },
  { de: 'im Internet forschen', hu: 'interneten kutatni', en: 'to do research online' },
  { de: 'mit Freunden lernen', hu: 'barátokkal tanulni', en: 'to study with friends' },
  { de: 'Notizen machen', hu: 'jegyzeteket készíteni', en: 'to make notes' },
  { de: 'spicken', hu: 'csalni', en: 'to cheat' },
  { de: 'Vokabeln lernen', hu: 'szavakat tanulni', en: 'to learn vocabulary' },
];

const teachers = [
  { de: 'der/die Lehrer/Lehrerin', hu: 'tanár', en: 'teacher' },
  { de: 'hilfsbereit', hu: 'segítőkész', en: 'helpful' },
  { de: 'nett', hu: 'kedves', en: 'nice, friendly' },
  { de: 'streng', hu: 'szigorú', en: 'strict' },
  { de: 'sympathisch', hu: 'szimpatikus', en: 'kind' },
  { de: 'unfreundlich', hu: 'barátságtalan', en: 'unfriendly' },
];

const schoolFacilities = [
  { de: 'die Aula', hu: 'aula', en: '(assembly) hall' },
  { de: 'der Flur', hu: 'folyosó', en: 'corridor' },
  { de: 'der Informatikraum', hu: 'informatika terem', en: 'computer room' },
  { de: 'die Kantine', hu: 'menza', en: 'canteen' },
  { de: 'das Klassenzimmer', hu: 'tanterem', en: 'classroom' },
  { de: 'das Labor', hu: 'laboratórium', en: 'science lab' },
  { de: 'das Lehrerzimmer', hu: 'tanári szoba', en: 'staff room' },
  { de: 'der Schulhof', hu: 'iskolaudvar', en: 'playground, school yard' },
  { de: 'das Sekretariat', hu: 'titkárság', en: "admin office, secretary's office" },
  { de: 'die Sporthalle', hu: 'tornaterem', en: 'sports hall' },
];

const schoolRules = [
  { de: 'eine gute/schlechte Regel', hu: 'jó/rossz szabály', en: 'a good/bad rule' },
  { de: 'Schulrechte (pl)', hu: 'iskolai jogok', en: 'school rights' },
  { de: 'Schulregeln (pl)', hu: 'iskolai szabályok', en: 'school rules' },
  { de: 'das Handy benutzen', hu: 'mobiltelefont használni', en: 'to use your mobile phone' },
  {
    de: 'einen Klassensprecher haben',
    hu: 'osztályfőnököt választani',
    en: 'to have a student representative',
  },
  { de: 'im Flur rennen', hu: 'futni a folyosón', en: 'to run in the corridor' },
  { de: 'im Unterricht Wasser trinken', hu: 'vizet inni az órán', en: 'to drink water in class' },
  { de: 'Kaugummi kauen', hu: 'rágót rágni', en: 'to chew gum' },
  { de: 'Klassenfahrten machen', hu: 'osztálykirándulásra menni', en: 'to go on school trips' },
  {
    de: 'mit dem Vertrauenslehrer sprechen',
    hu: 'a bizalmi tanárral beszélni',
    en: 'to speak with the student welfare teacher',
  },
  { de: 'mobben', hu: 'zaklatni', en: 'to bully' },
  { de: 'pünktlich sein', hu: 'pontosnak lenni', en: 'to be punctual/on time' },
  {
    de: 'Schuluniform/Make-up tragen',
    hu: 'iskolai egyenruhát/sminket viselni',
    en: 'to wear school uniform/make-up',
  },
  { de: 'seine eigene Kleidung tragen', hu: 'saját ruhát viselni', en: 'to wear your own clothes' },
];

const afterSchoolActivities = [
  { de: 'die AG (= Arbeitsgemeinschaft)', hu: 'szakkör', en: 'after-school club' },
  { de: 'der Chor', hu: 'kórus', en: 'choir' },
  { de: 'die Anti-Mobbing-AG', hu: 'antizaklatás szakkör', en: 'anti-bullying club' },
  { de: 'die Bastel-AG', hu: 'kézműves szakkör', en: 'crafts club' },
  { de: 'die Film-AG', hu: 'film szakkör', en: 'film club' },
  { de: 'die Fußball-AG', hu: 'futball szakkör', en: 'football club' },
  { de: 'die Hausaufgaben-AG', hu: 'házi feladat szakkör', en: 'homework club' },
  { de: 'die Informatik-AG', hu: 'informatika szakkör', en: 'computing club' },
  { de: 'die Leichtathletik-AG', hu: 'atlétika szakkör', en: 'athletics club' },
  { de: 'die Nachhilfe', hu: 'továbbképzés', en: 'extra tuition' },
  { de: 'die Schach-AG', hu: 'sakk szakkör', en: 'chess club' },
  { de: 'die Streetdance-AG', hu: 'streetdance szakkör', en: 'streetdance club' },
  { de: 'die Theater-AG', hu: 'színház szakkör', en: 'drama/theatre club' },
  { de: 'die Umwelt-AG', hu: 'környezetvédelmi szakkör', en: 'environmental action group' },
];

// Sentences
const schoolSubjectSentences = [
  {
    de: 'Was hast du am Montag?',
    hu: 'Mit tanulsz hétfőn?',
    en: 'What do you have on Monday?',
  },
  {
    de: 'Ich bin stark/schwach in...',
    hu: 'Erős/gyenge vagyok...',
    en: 'I am good/bad at...',
  },
  { de: 'Deutsch interessiert mich.', hu: 'Érdekel a német.', en: 'German interests me.' },
  {
    de: 'Fremdsprachen interessieren mich.',
    hu: 'Érdekelnek az idegen nyelvek.',
    en: 'Languages interest me.',
  },
  { de: 'Mir gefällt Mathe.', hu: 'Tetszik a matek.', en: 'I like maths.' },
  {
    de: 'Mir gefallen Kunst und Sport.',
    hu: 'Tetszik a művészet és a testnevelés.',
    en: 'I like art and PE.',
  },
  { de: 'Ich bin stark in Biologie.', hu: 'Erős vagyok biológiából.', en: 'I am good at biology.' },
  { de: 'Ich bin schwach in Chemie.', hu: 'Gyenge vagyok kémiából.', en: 'I am bad at chemistry.' },
  {
    de: 'Physik ist sehr interessant.',
    hu: 'A fizika nagyon érdekes.',
    en: 'Physics is very interesting.',
  },
  { de: 'Geschichte ist langweilig.', hu: 'A történelem unalmas.', en: 'History is boring.' },
  { de: 'Sport macht Spaß.', hu: 'A testnevelés szórakoztató.', en: 'PE is fun.' },
  { de: 'Mathe ist schwierig.', hu: 'A matek nehéz.', en: 'Maths is difficult.' },
  { de: 'Kunst ist spannend.', hu: 'A művészet izgalmas.', en: 'Art is exciting.' },
  { de: 'Musik ist prima.', hu: 'A zene kiváló.', en: 'Music is great.' },
  {
    de: 'Informatik ist praktisch.',
    hu: 'Az informatika praktikus.',
    en: 'Computing is practical.',
  },
];

const teacherSentences = [
  {
    de: 'Mein Lehrer/Meine Lehrerin gibt zu viele Hausaufgaben auf.',
    hu: 'A tanárom túl sok házi feladatot ad.',
    en: 'My teacher gives too much homework.',
  },
  {
    de: 'Mein Lehrer/Meine Lehrerin gibt gute/schlechte Noten.',
    hu: 'A tanárom jó/rossz jegyeket ad.',
    en: 'My teacher gives good/bad marks.',
  },
  {
    de: 'Mein Lehrer ist sehr nett.',
    hu: 'A tanárom nagyon kedves.',
    en: 'My teacher is very nice.',
  },
  { de: 'Meine Lehrerin ist streng.', hu: 'A tanárnőm szigorú.', en: 'My teacher is strict.' },
  { de: 'Der Lehrer ist hilfsbereit.', hu: 'A tanár segítőkész.', en: 'The teacher is helpful.' },
  { de: 'Die Lehrerin ist sympathisch.', hu: 'A tanárnő szimpatikus.', en: 'The teacher is kind.' },
  {
    de: 'Mein Lehrer ist unfreundlich.',
    hu: 'A tanárom barátságtalan.',
    en: 'My teacher is unfriendly.',
  },
  {
    de: 'Die Lehrerin gibt viele Hausaufgaben.',
    hu: 'A tanárnő sok házi feladatot ad.',
    en: 'The teacher gives a lot of homework.',
  },
  {
    de: 'Der Lehrer ist nicht streng.',
    hu: 'A tanár nem szigorú.',
    en: 'The teacher is not strict.',
  },
  {
    de: 'Meine Lehrerin ist sehr hilfsbereit.',
    hu: 'A tanárnőm nagyon segítőkész.',
    en: 'My teacher is very helpful.',
  },
  {
    de: 'Der Lehrer ist sympathisch und nett.',
    hu: 'A tanár szimpatikus és kedves.',
    en: 'The teacher is kind and nice.',
  },
  {
    de: 'Die Lehrerin gibt gute Noten.',
    hu: 'A tanárnő jó jegyeket ad.',
    en: 'The teacher gives good marks.',
  },
];

const schoolFacilitySentences = [
  {
    de: 'In meiner Schule gibt es eine Kantine',
    hu: 'Az iskolámban van egy menza',
    en: 'In my school there is a canteen',
  },
  {
    de: 'In meiner Schule gibt es eine Sporthalle.',
    hu: 'Az iskolámban van egy tornaterem.',
    en: 'In my school there is a sports hall.',
  },
  {
    de: 'In meiner Schule gibt es ein Labor.',
    hu: 'Az iskolámban van egy laboratórium.',
    en: 'In my school there is a science lab.',
  },
  {
    de: 'In meiner Schule gibt es eine Aula.',
    hu: 'Az iskolámban van egy aula.',
    en: 'In my school there is an assembly hall.',
  },
  {
    de: 'In meiner Schule gibt es ein Sekretariat.',
    hu: 'Az iskolámban van egy titkárság.',
    en: 'In my school there is an admin office.',
  },
  {
    de: 'In meiner Schule gibt es einen Informatikraum.',
    hu: 'Az iskolámban van egy informatika terem.',
    en: 'In my school there is a computer room.',
  },
  {
    de: 'In meiner Schule gibt es ein Lehrerzimmer.',
    hu: 'Az iskolámban van egy tanári szoba.',
    en: 'In my school there is a staff room.',
  },
  {
    de: 'In meiner Schule gibt es einen Schulhof.',
    hu: 'Az iskolámban van egy iskolaudvar.',
    en: 'In my school there is a school yard.',
  },
  {
    de: 'In meiner Schule gibt es viele Klassenzimmer.',
    hu: 'Az iskolámban sok tanterem van.',
    en: 'In my school there are many classrooms.',
  },
  {
    de: 'In meiner Schule gibt es einen Flur.',
    hu: 'Az iskolámban van egy folyosó.',
    en: 'In my school there is a corridor.',
  },
  { de: 'Die Kantine ist groß.', hu: 'A menza nagy.', en: 'The canteen is big.' },
  {
    de: 'Die Sporthalle ist modern.',
    hu: 'A tornaterem modern.',
    en: 'The sports hall is modern.',
  },
];

const afterSchoolActivitySentences = [
  {
    de: 'Was machst du nach der Schule?',
    hu: 'Mit csinálsz az iskola után?',
    en: 'What do you do after school?',
  },
  {
    de: 'Ich besuche die Theater-AG./ Ich gehe in die Theater-AG.',
    hu: 'Járok színjátszó szakkörre.',
    en: 'I go to drama club',
  },
  { de: 'Ich gehe in den Chor.', hu: 'Járok kórusba.', en: 'I go to choir.' },
  {
    de: 'Ich gehe in die Fußball-AG.',
    hu: 'Járok futball szakkörre.',
    en: 'I go to football club.',
  },
  { de: 'Ich besuche die Bastel-AG.', hu: 'Járok kézműves szakkörre.', en: 'I go to crafts club.' },
  { de: 'Ich gehe in die Film-AG.', hu: 'Járok film szakkörre.', en: 'I go to film club.' },
  {
    de: 'Ich besuche die Informatik-AG.',
    hu: 'Járok informatika szakkörre.',
    en: 'I go to computing club.',
  },
  { de: 'Ich gehe in die Schach-AG.', hu: 'Járok sakk szakkörre.', en: 'I go to chess club.' },
  {
    de: 'Ich besuche die Umwelt-AG.',
    hu: 'Járok környezetvédelmi szakkörre.',
    en: 'I go to environmental club.',
  },
  {
    de: 'Ich gehe in die Leichtathletik-AG.',
    hu: 'Járok atlétika szakkörre.',
    en: 'I go to athletics club.',
  },
  {
    de: 'Ich besuche die Hausaufgaben-AG.',
    hu: 'Járok házi feladat szakkörre.',
    en: 'I go to homework club.',
  },
  {
    de: 'Ich gehe in die Streetdance-AG.',
    hu: 'Járok streetdance szakkörre.',
    en: 'I go to streetdance club.',
  },
];

export {
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
};
