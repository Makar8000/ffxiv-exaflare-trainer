import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import Exaflares from './Exaflares';
import { genRandomExas } from './util/utils';

export default function App() {
  const [exaflares, setExas] = useState(genRandomExas());
  const [volume, setVolume] = useState(0.50);

  return (
    <Container maxWidth="md">
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 5,
        textAlign: "center"
      }}>
        <Button
          variant="outlined"
          style={{ marginRight: 15, }}
          onClick={() => setExas(genRandomExas())}>
          {"Randomize"}
        </Button>
        <Stack width={200} spacing={2} direction="row" alignItems="center">
          <VolumeDown onClick={() => { setVolume(0) }} />
          <Slider aria-label="Volume"
            value={Math.round(volume * 100)}
            onChange={(e) => { setVolume(Number.parseInt(e.target.value) / 100) }}
          />
          <VolumeUp onClick={() => { setVolume(1) }} />
        </Stack>
      </div>
      <Exaflares exaflares={exaflares} randomize={() => setExas(genRandomExas())} volume={volume} />
    </Container>
  );
}