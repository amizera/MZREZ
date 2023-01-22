import * as React from 'react';

import {ImageBox} from '../../Components/CustomBoxes/CustomBoxes';

import { Amplify, Storage, Auth, API } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import { formFields } from '../../Config/AuthConfig';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import { DateRangePicker } from 'react-dates';

  const section = {
    height: "100%",
    paddingTop: 5,
    backgroundColor: "#fff",
    position: "relative",
    width: "93%",
    display: "block"
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const ItemSquare = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundSize: 'cover',
    backgroundPosition: 'center center'
    
  }));

/*
  <Item   
  className='square'
  display="flex"
  //justifyContent="center"
  //alignItems="center"
  sx={{
  bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
  color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
  border: '1px solid',
  borderColor: (theme) =>
      theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
  p: 0,
  m: 0,
  borderRadius: '10px 0 0 10px',
  fontSize: '0.875rem',
  fontWeight: '700',
  //backgroundImage: `url(${props.image[0]})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center center'
  
}}></Item>
*/

export default class Reservations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      focusedInput: null,
    };
  }

 //function Reservations(props) {
  render() {
  return (
    <Authenticator formFields={formFields} >
    {({ signOut, user }) => (
      <React.Fragment >
        <CssBaseline />
        <Container maxWidth="md" sx={{ bgcolor: '#CFCFCF' }}>
          <Paper elevation={3} sx={{  height: '100vh' }}>

              <Box sx={{ flexGrow: 1 }}>
                <Grid
                  container
                  spacing={2}
                  direction="column"
                  alignItems="center"
                  //justifyContent="center"
                  style={{ minHeight: '100vh' }}
                  sx={{pt:3}}
                  xs={12}
                >
                  <Grid xs={10}>
                    <Item sx={{border: '1px solid'}}  elevation={0}>
                      <Typography variant="h4" component="h2">
                        MZ909 Międzyzdroje
                      </Typography>
                      <Typography variant="subtitle1">
                        Promenada Gwiazd 29
                      </Typography>
                    </Item>
                  </Grid>
                  <Grid container xs={10} spacing={0.5}>
                    <Grid xs={6}>
                      <Item className='square' sx={{borderRadius: '10px 0 0 10px'}} ></Item>
                    </Grid>
                    <Grid xs={3} >
                      <Stack spacing={0.5} sx={{m: 0}}>
                        <Item className='square' sx={{borderRadius: '0 10px 0 0'}} ></Item>
                        <Item className='square' sx={{borderRadius: '0 0 10px 0'}} ></Item>
                      </Stack>
                    </Grid>
                    <Grid sx={{p:1}} xs={3}>
                      Opis
                    </Grid>
                  </Grid>

                  <DateRangePicker
                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                    startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                    endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                    onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                  />
                </Grid>
              </Box>

          </Paper>
        </Container>
      </React.Fragment>
    )}</Authenticator>
  )
  }
}
