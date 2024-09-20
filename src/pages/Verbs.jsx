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

function Verbs() {
  const [lastFailsIndexes, setLastFailsIndexes] = useState([]);
  const [passedInLastTen, setPassedInLastTen] = useState(Array(10).fill(false));
  const [successCounter, setSuccessCounter] = useState(0);
  const [actualIndex, setActualIndex] = useState(0);
  const [actualWord, setActualWord] = useState("");
  const [actualLanguage, setActualLanguage] = useState("de");
  const [solutions, setSolutions] = useState([
    { solution: "0", visible: false },
    { solution: "1", visible: false },
    { solution: "2", visible: false },
    { solution: "3", visible: false },
    { solution: "4", visible: false },
    { solution: "5", visible: false },
    { solution: "6", visible: false },
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
    } else if (solutions[3].visible === false) {
      setSolutionsItemVisible(3);
    } else if (solutions[4].visible === false) {
      setSolutionsItemVisible(4);
    } else if (solutions[5].visible === false) {
      setSolutionsItemVisible(5);
    } else if (solutions[6].visible === false) {
      setSolutionsItemVisible(6);
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
    const duSolution = nextItem.du;
    const ichSolution = nextItem.ich;
    const solutionsRefill = [
      { solution: translationSolution, visible: false },
      // singular
      { solution: ichSolution, visible: false },
      { solution: duSolution, visible: false },
      { solution: nextItem.esersie, visible: false },
      // plural
      { solution: nextItem.wir, visible: false },
      { solution: nextItem.ihr, visible: false },
      { solution: nextItem.siepl, visible: false },
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

  // useEffect(() => {
  //   console.log(`actualIndex: ${actualIndex}`);
  //   console.log(`actualWord: ${actualWord}`);
  //   console.log(`actualLanguage: ${actualLanguage}`);
  //   console.log(`showButtonDisabled: ${showButtonDisabled}`);
  //   console.log('------------------------------------------');
  // })

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
            Verbs
          </Typography>
          <Typography variant="h4">{successCounter} / 10</Typography>
        </Toolbar>
      </AppBar>

      <Box
        id="word"
        sx={{
          marginTop: "10px",
          borderBottom: "3px solid black",
          paddingBottom: "10px",
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
          {/* singular */}
          <Typography variant="h4">ich</Typography>
          <Typography variant="h4">du</Typography>
          <Typography variant="h4">r/e/s</Typography>
          {/* plural */}
          <Typography variant="h4">wir</Typography>
          <Typography variant="h4">ihr</Typography>
          <Typography variant="h4">sie/Sie</Typography>
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
              {/* singular */}
              <Typography variant="h4">
                {solutions[1].visible ? solutions[1].solution : "-"}
              </Typography>
              <Typography variant="h4">
                {solutions[2].visible ? solutions[2].solution : "-"}
              </Typography>
              <Typography variant="h4">
                {solutions[3].visible ? solutions[0].solution : "-"}
              </Typography>
              {/* plural */}
              <Typography variant="h4">
                {solutions[4].visible ? solutions[1].solution : "-"}
              </Typography>
              <Typography variant="h4">
                {solutions[5].visible ? solutions[2].solution : "-"}
              </Typography>
              <Typography variant="h4">
                {solutions[6].visible ? solutions[3].solution : "-"}
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

export default Verbs;

const words = [
  {
    de: "ab|nehmen",
    hu: "felszáll, lefogy",
    ich: "nehme ab",
    du: "nimmst ab",
    esersie: "nimmt ab",
    wir: "nehmen ab",
    ihr: "nehmt ab",
    siepl: "nehmen ab",
  },
  {
    de: "aus|brechen",
    hu: "kitör (vulkán)",
    ich: "breche aus",
    du: "brichst aus",
    esersie: "bricht aus",
    wir: "brechen aus",
    ihr: "brecht aus",
    siepl: "brechen aus",
  },
  {
    de: "brechen",
    hu: "tör",
    ich: "breche",
    du: "brichst",
    esersie: "bricht",
    wir: "brechen",
    ihr: "brecht",
    siepl: "brechen",
  },
  {
    de: "erschrecken",
    hu: "megijed",
    ich: "erschrecke",
    du: "erschrickst",
    esersie: "erschrickt",
    wir: "erschrecken",
    ihr: "erschreckt",
    siepl: "erschrecken",
  },
  {
    de: "essen",
    hu: "eszik",
    ich: "esse",
    du: "isst",
    esersie: "isst",
    wir: "essen",
    ihr: "esst",
    siepl: "essen",
  },
  {
    de: "fressen",
    hu: "eszik (zabál, mint az állat)",
    ich: "fresse",
    du: "frisst",
    esersie: "frisst",
    wir: "fressen",
    ihr: "fresst",
    siepl: "fressen",
  },
  {
    de: "geben",
    hu: "adni",
    ich: "gebe",
    du: "gibst",
    esersie: "gibt",
    wir: "geben",
    ihr: "gebt",
    siepl: "geben",
  },
  {
    de: "gelten",
    hu: "jelentkezik",
    ich: "gelte",
    du: "giltst",
    esersie: "gilt",
    wir: "gelten",
    ihr: "geltet",
    siepl: "gelten",
  },
  {
    de: "helfen",
    hu: "segít",
    ich: "helfe",
    du: "hilfst",
    esersie: "hilft",
    wir: "helfen",
    ihr: "helft",
    siepl: "helfen",
  },
  {
    de: "messen",
    hu: "mér",
    ich: "messe",
    du: "misst",
    esersie: "misst",
    wir: "messen",
    ihr: "messt",
    siepl: "messen",
  },
  {
    de: "nehmen",
    hu: "szerez, elvesz",
    ich: "nehme",
    du: "nimmst",
    esersie: "nimmt",
    wir: "nehmen",
    ihr: "nehmt",
    siepl: "nehmen",
  },
  {
    de: "quellen",
    hu: "fakad, dülled, árad, dagad",
    ich: "quelle",
    du: "quillst",
    esersie: "quillt",
    wir: "quellen",
    ihr: "quellt",
    siepl: "quellen",
  },
  {
    de: "schmelzen",
    hu: "megolvad",
    ich: "schmelze",
    du: "schmilzt",
    esersie: "schmilzt",
    wir: "schmelzen",
    ihr: "schmelzt",
    siepl: "schmelzen",
  },
  {
    de: "sprechen",
    hu: "beszél",
    ich: "spreche",
    du: "sprichst",
    esersie: "spricht",
    wir: "sprechen",
    ihr: "sprecht",
    siepl: "sprechen",
  },
  {
    de: "stechen",
    hu: "szúrni",
    ich: "steche",
    du: "stichst",
    esersie: "sticht",
    wir: "stechen",
    ihr: "stecht",
    siepl: "stechen",
  },
  {
    de: "sterben",
    hu: "meghal",
    ich: "sterbe",
    du: "stirbst",
    esersie: "stirbt",
    wir: "sterben",
    ihr: "sterbt",
    siepl: "sterben",
  },
  {
    de: "treffen",
    hu: "találkozik",
    ich: "treffe",
    du: "triffst",
    esersie: "trifft",
    wir: "treffen",
    ihr: "trefft",
    siepl: "treffen",
  },
  {
    de: "treten",
    hu: "rúg",
    ich: "trete",
    du: "trittst",
    esersie: "tritt",
    wir: "treten",
    ihr: "tretet",
    siepl: "treten",
  },
  {
    de: "verderben",
    hu: "elront",
    ich: "verderbe",
    du: "verdirbst",
    esersie: "verdirbt",
    wir: "verderben",
    ihr: "verderbt",
    siepl: "verderben",
  },
  {
    de: "vergessen",
    hu: "elfelejt",
    ich: "vergesse",
    du: "vergisst",
    esersie: "vergisst",
    wir: "vergessen",
    ihr: "vergesst",
    siepl: "vergessen",
  },
  {
    de: "werfen",
    hu: "dob",
    ich: "werfe",
    du: "wirfst",
    esersie: "wirft",
    wir: "werfen",
    ihr: "werft",
    siepl: "werfen",
  },
  {
    de: "zu|nehmen",
    hu: "növekedik, erősödik",
    ich: "nehme zu",
    du: "nimmst zu",
    esersie: "nimmt zu",
    wir: "nehmen zu",
    ihr: "nehmt zu",
    siepl: "nehmen zu",
  },
];
