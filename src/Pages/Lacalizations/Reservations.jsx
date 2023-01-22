import * as React from 'react';
import {useParams} from "react-router-dom"
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

import * as queries from '../../graphql/queries';


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
  

  function withRouter(Component) {
    function ComponentWithRouter(props) {
      let params = useParams()
      return <Component {...props} params={params} />
    }
    return ComponentWithRouter
  }

class Reservations extends React.Component {

  state={
    startDate: null,
    endDate: null,
    focusedInput: null,
    apartmentId: null,
    apartment: null
  };

  getApartmentById = async(apartmentId) => {
    console.log("getApartmentById VVVV apartmentId");
    console.log(apartmentId)
    console.log("getApartmentById AAA apartmentId");
    if (!apartmentId) {
      return [];
    }
    try {
      const res = await API.graphql({ query: queries.getApartment, variables: {id: apartmentId} });
      console.log("getApartmentById VVVV res");
      console.log(res);
      console.log("getApartmentById AAA res");
      const data = res.data.getApartment.items;
      return res;
    } catch (err) {
      console.log(err)
    }
  }

  static getDerivedStateFromProps(props, state) {
    console.log("getDerivedStateFromProps")
    return {
      apartmentId : props.params.apartmentId
    }
  }

  async componentDidMount() {
    const id = this.state.apartmentId
    try{
      const res = await this.getApartmentById(id)
      console.log(res.data.getApartment)
      this.setState({apartment: res.data.getApartment})
    }catch (err){
      console.log(err)
    }
  }
  

  componentDidUpdate() {console.log("componentDidUpdate")

  }






  render() {
    if (this.state.apartment) {
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
                            {this.state.apartment.name}
                          </Typography>
                          <Typography variant="subtitle1">
                          {this.state.apartment.street} {this.state.apartment.streetNo}{(this.state.apartment.apartmentNo)? "/"+this.state.apartment.apartmentNo:null} {this.state.apartment.postalCode} {this.state.apartment.city}
                          </Typography>
                        </Item>
                      </Grid>
                      <Grid container xs={10} spacing={0.5}>
    
                        <Grid xs={6}>
                          <ItemSquare className='square' sx={{borderRadius: '10px 0 0 10px', backgroundImage: "url(http://mzrezimages01124634-dev.s3-website.eu-central-1.amazonaws.com/protected/eu-central-1:7ad2b216-94e9-489d-96d2-8bba7de90032/"+this.state.apartment.images[0]+")"}} ></ItemSquare>
                        </Grid>
                        <Grid xs={3} >
                          <Stack spacing={0.5} sx={{m: 0}}>
                            <ItemSquare className='square' sx={{borderRadius: '0 10px 0 0', backgroundImage: "url(http://mzrezimages01124634-dev.s3-website.eu-central-1.amazonaws.com/protected/eu-central-1:7ad2b216-94e9-489d-96d2-8bba7de90032/"+this.state.apartment.images[1]+")"}} ></ItemSquare>
                            <ItemSquare className='square' sx={{borderRadius: '0 0 10px 0', backgroundImage: "url(http://mzrezimages01124634-dev.s3-website.eu-central-1.amazonaws.com/protected/eu-central-1:7ad2b216-94e9-489d-96d2-8bba7de90032/"+this.state.apartment.images[2]+")"}} ></ItemSquare>
                          </Stack>
                        </Grid>
                        <Grid sx={{p:1}} xs={3}>
                      
                        <Typography variant="body1" className='square'>{this.state.apartment.description}</Typography>

                        </Grid>
                        
                        
                      </Grid>
                      <Grid container xs={10} spacing={0.5}>
    
                        <Grid xs >
                        <Item >
                          <Stack spacing={0.5} sx={{m: 0}}>
                            
                              <DateRangePicker
                                startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                                startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                                endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                                endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                                onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                              />
                            
                              <button>rezerwuj</button>
    
         
                          </Stack>
                          </Item>
                        </Grid>
                        
                      </Grid>
    
                    </Grid>
                  </Box>
    
              </Paper>
            </Container>
          </React.Fragment>
        )}</Authenticator>
      )
    }
  
  return (<div> PUSTO </div>)
  }
  
}

const withParamReservations = withRouter(Reservations);

export default withParamReservations;
