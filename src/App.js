import React, { useState } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Exaflares from './Exaflares';
import { genRandomExas } from './util/utils';

export default function App() {
  const [exaflares, setExas] = useState(genRandomExas());
  const [volume, setVolume] = useState(0.50);
  const [isError, setError] = useState(false);

  const onVolumeChange = (vol) => {
    const newVol = Number.parseInt(vol);
    if (Number.isNaN(newVol)) {
      setError(true);
    } else {
      setVolume(newVol / 100);
    }
  }

  return (
    <Container maxWidth="md">
      <div style={{ margin: 15, textAlign: "center" }}>
        <Button
          variant="outlined"
          style={{ height: 40, marginRight: 10 }}
          onClick={() => setExas(genRandomExas())}>
          {"Randomize"}
        </Button>
        <TextField
          error={isError}
          style={{ width: 90 }}
          onChange={(e) => { onVolumeChange(e.target.value) }}
          InputProps={{
            endAdornment: <InputAdornment position="end">{"%"}</InputAdornment>,
          }}
          label="Volume"
          defaultValue={50} size="small"
        />
      </div>
      <Exaflares exaflares={exaflares} randomize={() => setExas(genRandomExas())} volume={volume} />
    </Container>
  );
}