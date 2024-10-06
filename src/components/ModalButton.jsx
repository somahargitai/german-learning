import { Button } from '@mui/material';

function ModalButton({ label, handleChangeWordSet }) {
  return (
    <Button
      variant="contained"
      onClick={() => {
        handleChangeWordSet(label);
      }}
    >
      {label}
    </Button>
  );
}

export default ModalButton;
