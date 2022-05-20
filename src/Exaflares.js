import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import useSound from 'use-sound';
import exaImg from './assets/exaflare.png';
import correctSound from './assets/correct.wav';
import incorrectSound from './assets/incorrect.wav';
import { findSafeSpot } from './util/utils';

const Exaflare = (props) => {
  const style = {
    transform: `rotate(${props.direction * 45}deg)`
  };
  if (props.marginTop)
    style.marginTop = props.marginTop;

  return <img
    src={exaImg}
    onClick={props.onClick}
    draggable={false}
    alt='exaflare'
    style={style}
    width="350px"
    height="350px"
  />
}

const ExaflaresContainer = (props) => {
  const [playRight] = useSound(correctSound, { volume: props.volume });
  const [playWrong] = useSound(incorrectSound, { volume: props.volume });

  const exas = props.exaflares;
  const safeSpot = findSafeSpot(exas);
  const onClickSfx = {
    rear: playWrong,
    left: playWrong,
    right: playWrong,
  }
  onClickSfx[safeSpot.key] = () => { playRight(); props.randomize(); console.clear() };

  console.log("Safe spot: " + safeSpot.key);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container
        columnSpacing={2}
        rowSpacing={0}
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ textAlign: "center" }}
      >
        <Grid item zeroMinWidth xs={6}>
          <Exaflare onClick={onClickSfx.left} direction={exas.left.dir} />
        </Grid>
        <Grid item zeroMinWidth xs={6}>
          <Exaflare onClick={onClickSfx.right} direction={exas.right.dir} />
        </Grid>
        <Grid item zeroMinWidth xs={12}>
          <Exaflare onClick={onClickSfx.rear} direction={exas.rear.dir} marginTop={-20} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ExaflaresContainer;