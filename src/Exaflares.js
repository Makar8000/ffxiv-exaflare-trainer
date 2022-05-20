import React, { useRef, useState } from 'react';
import DangerousIcon from '@mui/icons-material/Dangerous';
import DoneIcon from '@mui/icons-material/Done';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useSound from 'use-sound';
import { useContainerDimensions } from './util/useContainerDimensions';
import exaImg from './assets/exaflare.png';
import correctSound from './assets/correct.wav';
import incorrectSound from './assets/incorrect.wav';
import { findSafeSpot } from './util/utils';

const Exaflare = (props) => {
  // TODO: fix this garbage
  const style = {
    transform: `rotate(${props.direction * 45}deg)`
  };
  if (props.marginTop)
    style.marginTop = props.marginTop;

  let w = props.width;
  w = Math.floor(350 * (props.width / 750));
  if (w > 350) w = 350;

  return <img
    src={exaImg}
    onClick={props.onClick}
    draggable={false}
    alt='exaflare'
    style={style}
    width={`${w}vw`}
    height="auto"

  />
}

const ExaflaresContainer = (props) => {
  const [Icon, setIcon] = useState({ Component: DangerousIcon, color: 'transparent' });
  const ref = useRef(null);
  const { width } = useContainerDimensions(ref);

  const [playRight] = useSound(correctSound, { volume: props.volume });
  const [playWrong] = useSound(incorrectSound, { volume: props.volume });
  const onFailure = () => {
    playWrong();
    setIcon({ Component: DangerousIcon, color: '#ff3d00' });
  }
  const onSuccess = () => {
    playRight();
    setIcon({ Component: DoneIcon, color: '#00e676' });
    props.randomize();
  }

  const exas = props.exaflares;
  const safeSpot = findSafeSpot(exas);
  const onClickSfx = {
    rear: onFailure,
    left: onFailure,
    right: onFailure,
  }
  onClickSfx[safeSpot.key] = onSuccess;

  return (
    <Box ref={ref} sx={{ flexGrow: 1 }
    }>
      <Grid container
        columnSpacing={2}
        rowSpacing={0}
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ textAlign: "center" }}
      >
        <Grid item zeroMinWidth xs={12}>
          <Icon.Component sx={{ color: Icon.color, fontSize: 50 }} />
        </Grid>
        <Grid item zeroMinWidth xs={12}>
          <Typography>{"Front"}</Typography>
        </Grid>
        <Grid item zeroMinWidth xs={6}>
          <Exaflare onClick={onClickSfx.left} direction={exas.left.dir} width={width} />
        </Grid>
        <Grid item zeroMinWidth xs={6}>
          <Exaflare onClick={onClickSfx.right} direction={exas.right.dir} width={width} />
        </Grid>
        <Grid item zeroMinWidth xs={12}>
          <Exaflare onClick={onClickSfx.rear} direction={exas.rear.dir} width={width} marginTop={-20} />
        </Grid>
        <Grid item zeroMinWidth xs={12}>
          <Typography>{"Rear"}</Typography>
        </Grid>
      </Grid>
    </Box >
  );
}

export default ExaflaresContainer;