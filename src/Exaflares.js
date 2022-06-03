import React, { useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook'
import DangerousIcon from '@mui/icons-material/Dangerous';
import DoneIcon from '@mui/icons-material/Done';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useSound from 'use-sound';
import { useContainerDimensions, useWindowDimensions } from './util/useContainerDimensions';
import exaImg from './assets/exaflare.png';
import correctSound from './assets/correct.wav';
import incorrectSound from './assets/incorrect.wav';
import { findSafeSpot } from './util/utils';

const Tutorial = (props) => {
  return <span>
    <Typography sx={{ height: 57, paddingTop: 1 }} >
      {"Tap the position of the uptime Exaflare or slide direction"}
    </Typography>
  </span>
}

const Exaflare = (props) => {
  const style = {
    borderRadius: '50%',
    transform: `rotate(${props.direction * 45}deg)`,
    userSelect: "none",
  };
  if (props.marginTop)
    style.marginTop = props.marginTop;

  return <img
    src={exaImg}
    onClick={props.onClick}
    draggable={false}
    alt='exaflare'
    style={style}
    width={`${props.width}px`}
    height={`auto`}
  />
}

const ExaflaresContainer = (props) => {
  const [Icon, setIcon] = useState({ Component: Tutorial, color: 'white' });
  const ref = useRef(null);
  const { width, height } = useContainerDimensions(ref);
  const { ww, wh } = useWindowDimensions();

  const [playRight] = useSound(correctSound, { volume: props.volume });
  const [playWrong] = useSound(incorrectSound, { volume: props.volume * 0.5 });
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
    shiftmiddle: onFailure,
    shiftleft: onFailure,
    shiftright: onFailure,
  }
  onClickSfx[safeSpot?.key] = onSuccess;
  onClickSfx[`shift${safeSpot?.shift}`] = onSuccess;
  useHotkeys('a', onClickSfx.shiftleft, {}, [onClickSfx.shiftleft]);
  useHotkeys('s', onClickSfx.rear, {}, [onClickSfx.rear]);
  useHotkeys('d', onClickSfx.shiftright, {}, [onClickSfx.shiftright]);
  useHotkeys('q', onClickSfx.left, {}, [onClickSfx.left]);
  useHotkeys('e', onClickSfx.right, {}, [onClickSfx.right]);

  // TODO: fix this garbage
  let mh = Math.min(350, Math.floor(350 * (Math.min(752, (752 / 797.562) * (wh - 70) / 752))));
  let mw = Math.min(350, Math.floor(350 * (width / 752)));
  let w = Math.min(mh, mw);
  let mh2 = Math.min(752, (752 / 797.562) * (wh - 70));

  return (
    <Box ref={ref} sx={{ flex: 1 }}>
      <Grid
        container
        columnSpacing={2}
        rowSpacing={0}
        direction="row"
        justifyContent="center"
        alignItems="center"
        maxWidth={`${mh2}px`}
        style={{ textAlign: "center" }}
      >
        <Grid item zeroMinWidth xs={12}>
          <Icon.Component sx={{ color: Icon.color, fontSize: 50 }} />
        </Grid>
        <Grid item zeroMinWidth xs={12}>
          <Typography>{"Front"}</Typography>
        </Grid>
        <Grid item zeroMinWidth xs={6}>
          <Exaflare onClick={onClickSfx.left} direction={exas.left.dir} width={w} />
        </Grid>
        <Grid item zeroMinWidth xs={6}>
          <Exaflare onClick={onClickSfx.right} direction={exas.right.dir} width={w} />
        </Grid>
        <Grid item zeroMinWidth xs={3} onClick={onClickSfx.shiftleft}>
          <div style={{ height: w, paddingTop: w / 3 - 10 }}>
            <RedoIcon sx={{ fontSize: w / 3, transform: 'rotate(220deg) translate(-50%)' }} />
          </div>
        </Grid>
        <Grid item zeroMinWidth xs={6}>
          <Exaflare onClick={onClickSfx.rear} direction={exas.rear.dir} width={w} marginTop={-20} />
        </Grid>
        <Grid item zeroMinWidth xs={3} onClick={onClickSfx.shiftright}>
          <div style={{ height: w, paddingTop: w / 3 - 10 }}>
            <UndoIcon sx={{ fontSize: w / 3, transform: 'rotate(-220deg) translate(50%)' }} />
          </div>
        </Grid>
        <Grid item zeroMinWidth xs={12}>
          <Typography>{"Rear"}</Typography>
        </Grid>
      </Grid>
    </Box >
  );
}

export default ExaflaresContainer;