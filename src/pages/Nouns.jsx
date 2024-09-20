import {
  AppBar,
  Stack,
  Toolbar,
  Box,
  Typography,
  Button,
  Container,
  TableContainer,
} from "@mui/material";
import { useState } from "react";

function Nouns() {
  const [passedInLastTen, setPassedInLastTen] = useState(Array(10).fill(false));
  const [successCounter, setSuccessCounter] = useState(0);
  const [actualIndex, setActualIndex] = useState(0);
  const [actualLanguage, setActualLanguage] = useState("de");

  function getNextWord() {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * words.length);
    } while (randomIndex === actualIndex);

    setActualIndex(randomIndex);
  }

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
            justifyContent: "center",
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
        </Toolbar>
      </AppBar>

      {/* main content */}
      <Box
        id="success-counter"
        sx={{
          border: "3px solid black",
          borderRadius: "20px",
          padding: "10px",
        }}
      >
        <Typography variant="h3">{successCounter} / 10</Typography>
      </Box>
      <Box
        id="word"
        sx={{
          marginTop: "40px",
          borderBottom: "3px solid black",
        }}
      >
        <Typography variant="h2">{words[actualIndex].de}</Typography>
      </Box>

      {/* translation table  */}
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        width="100%"
        paddingX={2}
        paddingTop={5}
      >
        <Stack
          direction="column"
          spacing={2}
          width="30%"
          sx={{
            borderRight: "1px solid black",
            textAlign: "right",
            paddingRight: 2,
          }}
        >
          <Typography variant="h4">hu</Typography>
          <Typography variant="h4">e/r/s</Typography>
          <Typography variant="h4">pl</Typography>
        </Stack>
        <Stack
          direction="column"
          spacing={2}
          width="70%"
          //
        >
          <Typography variant="h4">{words[actualIndex].hu}</Typography>
          <Typography variant="h4">{words[actualIndex].pronoun}</Typography>
          <Typography variant="h4">die {words[actualIndex].de_pl}</Typography>
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
          <Button endIcon="❌" variant="contained" sx={{ flexGrow: 1 }}>
            Failed
          </Button>
          <Button endIcon="✅" variant="contained" sx={{ flexGrow: 1 }}>
            Passed
          </Button>
        </Stack>

        {/* Footer Show */}
        <Stack direction="row" justifyContent="center" sx={{ mt: 2, mx: 2 }}>
          <Button variant="contained" sx={{ flexGrow: 1 }}>
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
