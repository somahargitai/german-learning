import { useEffect, useState } from "react";
import {
  AppBar,
  Stack,
  Toolbar,
  Box,
  Typography,
  Button,
  Container,
} from "@mui/material";

function Nouns() {
  const [lastFailsIndexes, setLastFailsIndexes] = useState([]);
  const [passedInLastTen, setPassedInLastTen] = useState(Array(10).fill(false));
  const [successCounter, setSuccessCounter] = useState(0);
  const [actualIndex, setActualIndex] = useState(0);
  const [actualWord, setActualWord] = useState("");
  const [actualLanguage, setActualLanguage] = useState("de");
  const [solutions, setSolutions] = useState([
    { solution: "bla", visible: false },
    { solution: "blabla", visible: false },
    { solution: "blablabla", visible: false },
  ]);
  const [showButtonDisabled, setShowButtonDisabled] = useState(false);

  function addLastFailsIndexes(index) {
    const newIndexes = [...lastFailsIndexes, index];
    setLastFailsIndexes(newIndexes);
  }

  function getNextWordIndex() {
    if (successCounter < 5 && lastFailsIndexes.length > 5) {
      const randomElementFromLastFails =
        lastFailsIndexes[Math.floor(Math.random() * lastFailsIndexes.length)];

      return randomElementFromLastFails;
    }

    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * words.length);
    } while (randomIndex === actualIndex);

    return randomIndex;
  }

  const setSolutionsItemVisible = (index) => {
    setSolutions(
      solutions.map((solution, si) =>
        si === index ? { ...solution, visible: true } : solution
      )
    );
  };

  function setNextPassed() {
    if (solutions[0].visible === false) {
      setSolutionsItemVisible(0);
    } else if (solutions[1].visible === false) {
      setSolutionsItemVisible(1);
    } else if (solutions[2].visible === false) {
      setSolutionsItemVisible(2);
      setShowButtonDisabled(true);
    }
  }

  function setNewInLastTen(newPassed) {
    const newList = [...passedInLastTen.slice(1), newPassed];
    setPassedInLastTen(newList);
  }

  function getRandomLanguage() {
    const languages = ["de", "hu"];
    const randomIndex = Math.floor(Math.random() * languages.length);
    const chosenLanguage = languages[randomIndex];
    return chosenLanguage;
  }

  function setNextWord() {
    const language = getRandomLanguage();
    const nextWordIndex = getNextWordIndex();
    const nextItem = words[nextWordIndex];
    const nextWord = nextItem[language];

    setActualLanguage(language);
    setActualIndex(nextWordIndex);
    setActualWord(nextWord);

    const translationSolution = language === "de" ? nextItem.hu : nextItem.de;
    const pluralSolution = nextItem.de_pl;
    const pronounSolution = nextItem.pronoun;
    const solutionsRefill = [
      { solution: translationSolution, visible: false },
      { solution: pronounSolution, visible: false },
      { solution: pluralSolution, visible: false },
    ];

    setSolutions(solutionsRefill);
    setShowButtonDisabled(false);
  }

  useEffect(() => {
    setNextWord();
  }, []);

  useEffect(() => {
    setSuccessCounter(passedInLastTen.filter((passed) => passed).length);
  }, [passedInLastTen]);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
        // 56+56+6+16
        paddingTop: "134px",
        marginTop: 0,
      }}
    >
      {/* subheader  */}
      <AppBar position="fixed" sx={{ marginTop: "60px" }}>
        <Toolbar
          sx={{
            // "primary.main", "primary.light",
            backgroundColor: "primary.dark",
            color: "white",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            Nouns
          </Typography>
          <Typography variant="h4">{successCounter} / 10</Typography>
        </Toolbar>
      </AppBar>

      {/* main content */}
      <Box
        id="word"
        sx={{
          marginTop: "10px",
          borderBottom: "3px solid black",
          paddingBottom: "10px",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h2">{actualWord}</Typography>
      </Box>

      {/* translation table  */}
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        width="100%"
        paddingX={2}
        paddingTop={3}
      >
        {/* label column */}
        <Stack
          direction="column"
          spacing={2}
          width="30%"
          minHeight={300}
          justifyContent="center"
          sx={{
            borderRight: "2px solid black",
            textAlign: "right",
            paddingRight: 2,
          }}
        >
          <Typography variant="h4">
            {actualLanguage === "hu" ? "de" : "hu"}
          </Typography>
          <Typography variant="h4">e/r/s</Typography>
          <Typography variant="h4">pl</Typography>
        </Stack>

        {/* value column */}
        <Stack
          direction="column"
          spacing={2}
          width="70%"
          minHeight={300}
          justifyContent="center"
        >
          {solutions.length > 0 && (
            <>
              <Typography variant="h4">
                {solutions[0].visible ? solutions[0].solution : "-"}
              </Typography>
              <Typography variant="h4">
                {solutions[1].visible ? solutions[1].solution : "-"}
              </Typography>
              <Typography variant="h4">
                {solutions[2].visible ? solutions[2].solution : "-"}
              </Typography>
            </>
          )}
        </Stack>
      </Stack>

      {/* Footer */}
      <Box
        sx={{
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100%",
          padding: 2,
          bgcolor: "background.paper",
          boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
        }}
      >
        {/* Footer Markers */}
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          sx={{ mx: 2 }}
        >
          <Button
            disabled={!showButtonDisabled}
            onClick={() => {
              setNewInLastTen(false);
              addLastFailsIndexes(actualIndex);
              setNextWord();
            }}
            endIcon="❌"
            variant="contained"
            sx={{ flexGrow: 1 }}
          >
            Failed
          </Button>
          <Button
            disabled={!showButtonDisabled}
            onClick={() => {
              setNewInLastTen(true);
              setNextWord();
            }}
            endIcon="✅"
            variant="contained"
            sx={{ flexGrow: 1 }}
          >
            Passed
          </Button>
        </Stack>

        {/* Footer Show */}
        <Stack direction="row" justifyContent="center" sx={{ mt: 2, mx: 2 }}>
          <Button
            disabled={showButtonDisabled}
            onClick={() => setNextPassed()}
            variant="contained"
            sx={{ flexGrow: 1 }}
          >
            Show
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}

export default Nouns;

const words = [
  { pronoun: "das", de: "Märchen", hu: "mese", de_pl: "Märchen" },
  { pronoun: "die", de: "Geschichte", hu: "történet", de_pl: "Geschichten" },
  { pronoun: "das", de: "Rotkäppchen", hu: "Piroska", de_pl: "Rotkäppchen" },
  { pronoun: "die", de: "Szene", hu: "jelenet", de_pl: "Szenen" },
  { pronoun: "das", de: "Bild", hu: "kép", de_pl: "Bilder" },
  { pronoun: "die", de: "Sache", hu: "tárgy", de_pl: "Sachen" },
  { pronoun: "das", de: "Mädchen", hu: "lány", de_pl: "Mädchen" },
  { pronoun: "die", de: "Großmutter", hu: "nagymama", de_pl: "Großmütter" },
  { pronoun: "das", de: "Käppchen", hu: "kis sapka", de_pl: "Käppchen" },
  { pronoun: "die", de: "Mütze", hu: "sapka", de_pl: "Mützen" },
  { pronoun: "der", de: "Morgen", hu: "reggel", de_pl: "Morgen" },
  { pronoun: "der", de: "Korb", hu: "kosár", de_pl: "Körbe" },
  { pronoun: "der", de: "Wein", hu: "bor", de_pl: "Weine" },
  { pronoun: "der", de: "Kuchen", hu: "sütemény", de_pl: "Kuchen" },
  { pronoun: "der", de: "Wald", hu: "erdő", de_pl: "Wälder" },
  { pronoun: "der", de: "Wolf", hu: "farkas", de_pl: "Wölfe" },
  { pronoun: "das", de: "Tier", hu: "állat", de_pl: "Tiere" },
  { pronoun: "die", de: "Angst", hu: "félelem", de_pl: "Ängste" },
  {
    pronoun: "die",
    de: "Viertelstunde",
    hu: "negyedóra",
    de_pl: "Viertelstunden",
  },
  { pronoun: "das", de: "Haus", hu: "ház", de_pl: "Häuser" },
  { pronoun: "die", de: "Eichen", hu: "tölgyek", de_pl: "Eichen" },
  { pronoun: "die", de: "Wiese", hu: "rét", de_pl: "Wiesen" },
  { pronoun: "die", de: "Blumen", hu: "virágok", de_pl: "Blumen" },
  {
    pronoun: "der",
    de: "Blumenstrauß",
    hu: "virágcsokor",
    de_pl: "Blumensträuße",
  },
  { pronoun: "die", de: "Vögel", hu: "madarak", de_pl: "Vögel" },
  { pronoun: "die", de: "Sonne", hu: "nap", de_pl: "Sonnen" },
  { pronoun: "die", de: "Tür", hu: "ajtó", de_pl: "Türen" },
  { pronoun: "die", de: "Stimme", hu: "hang", de_pl: "Stimmen" },
  { pronoun: "die", de: "Kleider", hu: "ruhák", de_pl: "Kleider" },
  { pronoun: "das", de: "Bett", hu: "ágy", de_pl: "Betten" },
  { pronoun: "der", de: "Jäger", hu: "vadász", de_pl: "Jäger" },
  { pronoun: "die", de: "Schere", hu: "olló", de_pl: "Scheren" },
  { pronoun: "die", de: "Steine", hu: "kövek", de_pl: "Steine" },
  { pronoun: "das", de: "Fell", hu: "szőrme", de_pl: "Felle" },
];
