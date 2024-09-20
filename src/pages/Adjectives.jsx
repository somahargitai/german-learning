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

function Adjectives() {
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
    const supSolution = nextItem.de_su;
    const compSolution = nextItem.de_co;
    const solutionsRefill = [
      { solution: translationSolution, visible: false },
      { solution: compSolution, visible: false },
      { solution: supSolution, visible: false },
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
            Adjectives
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
          <Typography variant="h4">comp</Typography>
          <Typography variant="h4">sup</Typography>
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

export default Adjectives;

const words = [
  { hu: "öreg, régi", de: "alt", de_co: "älter", de_su: "am ältesten" },
  {
    hu: "vonzó",
    de: "attraktiv",
    de_co: "attraktiver",
    de_su: "am attraktivsten",
  },
  { hu: "kék", de: "blau", de_co: "blauer", de_su: "am blauesten" },
  { hu: "szőke", de: "blond", de_co: "blonder", de_su: "am blondesten" },
  { hu: "barna", de: "braun", de_co: "brauner", de_su: "am braunsten" },
  { hu: "gonosz", de: "böse", de_co: "böser", de_su: "am bösesten" },
  { hu: "kövér", de: "dick", de_co: "dicker", de_su: "am dicksten" },
  { hu: "buta", de: "dumm", de_co: "dümmer", de_su: "am dümmsten" },
  { hu: "vékony", de: "dünn", de_co: "dünner", de_su: "am dünnsten" },
  { hu: "komoly", de: "ernst", de_co: "ernster", de_su: "am ernstesten" },
  { hu: "szilárd", de: "fest", de_co: "fester", de_su: "am festesten" },
  { hu: "fitt", de: "fit", de_co: "fitter", de_su: "am fittesten" },
  {
    hu: "szorgalmas",
    de: "fleißig",
    de_co: "fleißiger",
    de_su: "am fleißigsten",
  },
  {
    hu: "kényelmes, kellemes",
    de: "gemütlich",
    de_co: "gemütlicher",
    de_su: "am gemütlichsten",
  },
  {
    hu: "egészséges",
    de: "gesund",
    de_co: "gesünder",
    de_su: "am gesündesten",
  },
  { hu: "nagy", de: "groß", de_co: "größer", de_su: "am größten" },
  { hu: "jó", de: "gut", de_co: "besser", de_su: "am besten" },
  { hu: "szívesen", de: "gern", de_co: "lieber", de_su: "am liebsten" },
  {
    hu: "csúnya",
    de: "hässlich",
    de_co: "hässlicher",
    de_su: "am hässlichsten",
  },
  { hu: "magas", de: "hoch", de_co: "höher", de_su: "am höchsten" },
  { hu: "csinos", de: "hübsch", de_co: "hübscher", de_su: "am hübschesten" },
  {
    hu: "intelligens",
    de: "intelligent",
    de_co: "intelligenter",
    de_su: "am intelligentesten",
  },
  { hu: "fiatal", de: "jung", de_co: "jünger", de_su: "am jüngsten" },
  { hu: "kicsi", de: "klein", de_co: "kleiner", de_su: "am kleinsten" },
  {
    hu: "vicces, furcsa, mókás",
    de: "komisch",
    de_co: "komischer",
    de_su: "am komischsten",
  },
  { hu: "beteg", de: "krank", de_co: "kränker", de_su: "am kränksten" },
  { hu: "rövid", de: "kurz", de_co: "kürzer", de_su: "am kürzesten" },
  { hu: "hangos", de: "laut", de_co: "lauter", de_su: "am lautesten" },
  {
    hu: "hosszúhajú",
    de: "langhaarig",
    de_co: "langhaariger",
    de_su: "am langhaarigsten",
  },
  {
    hu: "unalmas",
    de: "langweilig",
    de_co: "langweiliger",
    de_su: "am langweiligsten",
  },
  { hu: "egyedülálló", de: "ledig", de_co: "lediger", de_su: "am ledigsten" },
  {
    hu: "szeretett, kedves",
    de: "lieb",
    de_co: "lieber",
    de_su: "am liebsten",
  },
  {
    hu: "mulatságos, nevetséges, vicces",
    de: "lustig",
    de_co: "lustiger",
    de_su: "am lustigsten",
  },
  { hu: "fáradt", de: "müde", de_co: "müder", de_su: "am müdesten" },
  { hu: "ideges", de: "nervös", de_co: "nervöser", de_su: "am nervösesten" },
  { hu: "kedves", de: "nett", de_co: "netter", de_su: "am nettesten" },
  {
    hu: "kíváncsi",
    de: "neugierig",
    de_co: "neugieriger",
    de_su: "am neugierigsten",
  },
  {
    hu: "hirtelen",
    de: "plötzlich",
    de_co: "plötzlicher",
    de_su: "am plötzlichsten",
  },
  { hu: "gazdag", de: "reich", de_co: "reicher", de_su: "am reichsten" },
  { hu: "piros", de: "rot", de_co: "röter", de_su: "am rötesten" },
  { hu: "nyugodt", de: "ruhig", de_co: "ruhiger", de_su: "am ruhigsten" },
  { hu: "kerek", de: "rund", de_co: "runder", de_su: "am rundesten" },
  { hu: "nagyon", de: "sehr", de_co: "mehr", de_su: "am meisten" },
  { hu: "karcsú", de: "schlank", de_co: "schlanker", de_su: "am schlanksten" },
  { hu: "gyors", de: "schnell", de_co: "schneller", de_su: "am schnellsten" },
  {
    hu: "feketehajú",
    de: "schwarzhaarig",
    de_co: "schwarzhaariger",
    de_su: "am schwarzhaarigsten",
  },
  { hu: "nehéz", de: "schwer", de_co: "schwerer", de_su: "am schwersten" },
  { hu: "szép", de: "schön", de_co: "schöner", de_su: "am schönsten" },
  { hu: "ritka", de: "selten", de_co: "seltener", de_su: "am seltensten" },
  {
    hu: "sportos",
    de: "sportlich",
    de_co: "sportlicher",
    de_su: "am sportlichsten",
  },
  {
    hu: "szimpatikus",
    de: "sympathisch",
    de_co: "sympathischer",
    de_su: "am sympathischsten",
  },
  { hu: "mély", de: "tief", de_co: "tiefer", de_su: "am tiefsten" },
  { hu: "szomorú", de: "traurig", de_co: "trauriger", de_su: "am traurigsten" },
  { hu: "hűséges", de: "treu", de_co: "treuer", de_su: "am treuesten" },
  {
    hu: "unszimpatikus",
    de: "unsympathisch",
    de_co: "unsympathischer",
    de_su: "am unsympathischsten",
  },
  { hu: "teli", de: "voll", de_co: "voller", de_su: "am vollsten" },
  { hu: "fehér", de: "weiß", de_co: "weißer", de_su: "am weißesten" },
  {
    hu: "gyenge, törékeny",
    de: "zart",
    de_co: "zarter",
    de_su: "am zartesten",
  },
  { hu: "hideg", de: "kalt", de_co: "kälter", de_su: "am kältesten" },
  { hu: "kemény", de: "hart", de_co: "härter", de_su: "am härtesten" },
  { hu: "meleg", de: "warm", de_co: "wärmer", de_su: "am wärmsten" },
  { hu: "hosszú", de: "lang", de_co: "länger", de_su: "am längsten" },
  { hu: "éles", de: "scharf", de_co: "schärfer", de_su: "am schärfsten" },
  { hu: "erős", de: "stark", de_co: "stärker", de_su: "am stärksten" },
  { hu: "nagy", de: "groß", de_co: "größer", de_su: "am größten" },
  { hu: "sok", de: "viel", de_co: "mehr", de_su: "am meisten" },
  { hu: "sötét", de: "dunkel", de_co: "dunkler", de_su: "am dunkelsten" },
  { hu: "drága", de: "teuer", de_co: "teurer", de_su: "am teuersten" },
  { hu: "száraz", de: "trocken", de_co: "trockener", de_su: "am trocknesten" },
  { hu: "külső", de: "der äußere", de_co: "--", de_su: "der äußerste" },
  { hu: "belső", de: "der innere", de_co: "--", de_su: "der innerste" },
  { hu: "felső", de: "der obere", de_co: "--", de_su: "der oberste" },
  { hu: "alsó", de: "der untere", de_co: "--", de_su: "der unterste" },
  { hu: "elülső", de: "der vordere", de_co: "--", de_su: "der vorderste" },
  { hu: "hátsó", de: "der hintere", de_co: "--", de_su: "der hinterste" },
];
