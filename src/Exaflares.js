import React, { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook'
import DangerousIcon from '@mui/icons-material/Dangerous';
import DoneIcon from '@mui/icons-material/Done';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useSound from 'use-sound';
import exaImg from './assets/exaflare.png';
import bossImg from './assets/boss.png';
import correctSound from './assets/correct.wav';
import incorrectSound from './assets/incorrect.wav';
import { findSafeSpot } from './util/utils';

const ExaflaresContainer = (props) => {
  const [Icon, setIcon] = useState({ Component: DoneIcon, color: 'transparent' });
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
    shiftleft: onFailure,
    shiftright: onFailure
  }
  onClickSfx[safeSpot?.key] = onSuccess;
  onClickSfx[`shift${safeSpot?.shift}`] = onSuccess;

  useHotkeys('a', onClickSfx.shiftleft, {}, [onClickSfx.shiftleft]);
  useHotkeys('s', onClickSfx.rear, {}, [onClickSfx.rear]);
  useHotkeys('d', onClickSfx.shiftright, {}, [onClickSfx.shiftright]);
  useHotkeys('q', onClickSfx.left, {}, [onClickSfx.left]);
  useHotkeys('e', onClickSfx.right, {}, [onClickSfx.right]);

  const base = 200;
  const pad = 0.02 * base;
  const exaSize = (base / 2) - pad;
  return (
    <Box sx={{ flex: 1, marginTop: 2 }}>
      <Grid
        container
        rowSpacing={1}
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ textAlign: "center" }}
      >
        <Grid item zeroMinWidth xs={12}>
          <Typography>
            {"Tap the position of the uptime Exaflare or slide direction"}
          </Typography>
        </Grid>
        <Grid item zeroMinWidth xs={12}>
          <Icon.Component sx={{ color: Icon.color, fontSize: 50 }} />
        </Grid>
        <Grid item zeroMinWidth xs={12}>
          <svg viewBox={`0 0 ${base} ${exaSize * 2 - pad}`}>
            <clipPath id="circleClip" clipPathUnits="objectBoundingBox">
              <circle cx=".5" cy=".5" r=".5" />
            </clipPath>
            <image id={'boss'}
              href={bossImg}
              opacity={0.5}
              width={base / 1.5}
              height={base / 1.5}
              x={(base / 2) - ((base / 1.5) / 2)}
              y={(base / 2) - ((base / 1.5) / 2) - (pad * 5)}
            />
            <g transform="translate(-31 80) scale(0.1) rotate(5)">
              <g fill="white" transform="matrix(0 -1.4732 1.4731 0 -24.025 1460.4)">
                <g fill="white" transform="matrix(0 -.89120 .89120 0 352.6 899.59)">
                  <path
                    fill="white"
                    d="m109.91 36.812c-62.548 14.439-109.29 70.188-109.91 136.97h48.406c0.56121-39.834 26.012-73.619 61.5-86.562v-50.406z"
                    transform="matrix(0 1.1221 -1.1221 0 541.51 266.67)"
                  />
                  <path fill="white" d="m401.86 384.46 68.34 77.194 71.312-77.315" />
                </g>
              </g>
            </g>
            <g transform="translate(88 91) scale(0.1) rotate(-5)">
              <g fill="white" transform="matrix(0 -1.4732 -1.4731 0 1460.5 1460.4)">
                <g fill="white" transform="matrix(0 -.89120 .89120 0 352.6 899.59)">
                  <path
                    fill="white"
                    d="m109.91 36.812c-62.548 14.439-109.29 70.188-109.91 136.97h48.406c0.56121-39.834 26.012-73.619 61.5-86.562v-50.406z"
                    transform="matrix(0 1.1221 -1.1221 0 541.51 266.67)"
                  />
                  <path fill="white" d="m401.86 384.46 68.34 77.194 71.312-77.315" />
                </g>
              </g>
            </g>
            <rect id={'shiftleft'} fill={'transparent'}
              width={base / 2}
              height={exaSize}
              y={exaSize - pad}
              onClick={onClickSfx.shiftleft}
            />
            <rect id={'shiftright'} fill={'transparent'}
              width={base / 2}
              height={exaSize}
              x={base / 2}
              y={exaSize - pad}
              onClick={onClickSfx.shiftright}
            />
            <image id={'left'}
              href={exaImg}
              clipPath="url(#circleClip)"
              transform={`rotate(${exas.left.dir * 45} ${exaSize / 2} ${exaSize / 2})`}
              width={exaSize}
              height={exaSize}
              onClick={onClickSfx.left}
            />
            <image id={'right'}
              href={exaImg}
              clipPath="url(#circleClip)"
              transform={`rotate(${exas.right.dir * 45} ${base - (exaSize / 2)} ${exaSize / 2})`}
              width={exaSize}
              height={exaSize}
              x={base - exaSize}
              onClick={onClickSfx.right}
            />
            <image id={'rear'}
              href={exaImg}
              clipPath="url(#circleClip)"
              transform={`rotate(${exas.rear.dir * 45} ${base / 2} ${(exaSize * 2 - pad) - (exaSize / 2)})`}
              width={exaSize}
              height={exaSize}
              x={(base / 2) - (exaSize / 2)}
              y={exaSize - pad}
              onClick={onClickSfx.rear}
            />
          </svg>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ExaflaresContainer;