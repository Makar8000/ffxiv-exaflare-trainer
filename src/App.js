import React, { useState } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Exaflares from './Exaflares';
import Button from '@mui/material/Button';
import { genRandomExas } from './util/utils';

export default function App() {
  const [exaflares, setExas] = useState(genRandomExas());
  const [volume, setVolume] = useState(1);
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
        <Button variant="outlined" style={{ height: 40, marginRight: 10 }} onClick={() => setExas(genRandomExas())}>Randomize</Button>
        <TextField error={isError} style={{ width: 100 }} onChange={(e) => { onVolumeChange(e.target.value) }} label="Volume" defaultValue={100} size="small" />
      </div>
      <Exaflares exaflares={exaflares} randomize={() => setExas(genRandomExas())} volume={volume} />
    </Container>
  );
}