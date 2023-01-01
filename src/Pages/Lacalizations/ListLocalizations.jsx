
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';


import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';



const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

export default function ListLocalizations(props) {

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Paper
    sx={{
    p: 2,
    mt: 2,
    mr: 'auto',
    ml: 'auto',
    maxWidth: 500,
    flexGrow: 1,
    backgroundColor: (theme) =>
    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    }}
    //onClick={() => props.setCurrentLocationId(props.id)}
    
    >
      <Grid container spacing={2} >
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src={props.cover} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                id: {props.id}
              </Typography>
              <Typography variant="body2" gutterBottom>
                name: {props.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                dsc: {props.description}
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
                Rezerwuj           | Edytuj | Usuń
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ cursor: 'pointer' }} component="div">
              <button 
              onClick={handleClickOpen}
              //onClick={(event) => props.deleteLocation(event, props.id)}
              >
                <RemoveCircleIcon />
              </button>
            </Typography>
            <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
                {"Usunąć tą lokalizację?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Usunięcie jest bezpowrotne, nie ma kosza.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button autoFocus sx={{color: '#233742'}} onClick={handleClose}>
                  Nie
                </Button>
                <Button sx={{color: '#233742'}} 
                onClick={(event) => 
                  {setOpen(false)
                  props.deleteLocation(event, props.id)}
                }
                //onClick={handleClose} autoFocus>
                >
                  Tak
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )    
}





