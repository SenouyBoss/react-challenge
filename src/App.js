import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container, Row, Col, Form, FormGroup,FormControl, FormCheck, Button, Card, Image, FormLabel} from 'react-bootstrap'
import { BiHelpCircle } from 'react-icons/bi';
import { useState } from "react";
function App() {
  
  // localStorage.clear();
  // still left to do: required + photo + justify paragraph
  var users = JSON.parse(localStorage.getItem("users") || "[]");
  
  const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  const months = [
    {value: 1, text: 'JAN'},
    {value: 2, text: 'FEV'},
    {value: 3, text: 'MAR'},
    {value: 4, text: 'AVR'},
    {value: 5, text: 'MAY'},
    {value: 6, text: 'JUN'},
    {value: 7, text: 'JUL'},
    {value: 8, text: 'AOU'},
    {value: 9, text: 'SEP'},
    {value: 10, text: 'OCT'},
    {value: 11, text: 'NOV'},
    {value: 12, text: 'DEC'}
  ];
  const years = [1901,1902,1903,1904,1905,1906,1907,1908,1909,1910,
    1911,1912,1913,1914,1915,1916,1917,1918,1919,1920,
    1921,1922,1923,1924,1925,1926,1927,1928,1929,1930,
    1931,1932,1933,1934,1935,1936,1937,1938,1939,1940,
    1941,1942,1943,1944,1945,1946,1947,1948,1949,1950,
    1951,1952,1953,1954,1955,1956,1957,1958,1959,1960,
    1961,1962,1963,1964,1965,1966,1967,1968,1969,1970,
    1971,1972,1973,1974,1975,1976,1977,1978,1979,1980,
    1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,
    1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,
    2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,
    2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,
    2021,2022,2023];

    const [userInfo, setUserInfo] = useState({
        fName:"",
        lName:"",
        contact:"",
        day:0,
        month:0,
        year:0,
        genre:"",
        photo:"",
        dob:"",
    });

    /*const handleChange = (event) => {
      setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
    };*/
    const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "photo") {
      const file = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setUserInfo((prevState) => ({
          ...prevState,
          [name]: reader.result,
        }));
      };
    } else {
      setUserInfo((prevState) => ({ ...prevState, [name]: value }));
    }
  }
    
    /*const getBase64 = (file) => {
      return new Promise((resolve,reject) => {
         const reader = new FileReader();
         reader.onload = () => resolve(reader.result);
         reader.onerror = error => reject(error);
         reader.readAsDataURL(file);
      });
    }*/
    
    


    function handleSubmit(e) {
      e.preventDefault();
      console.log(userInfo);
      console.log("date of birth before is: "+userInfo.dob);
      var db = "" + userInfo.day + "/" + userInfo.month + "/" + userInfo.year;
      console.log("date of birth concatenated is: "+db);
      userInfo.dob = db;
      //const pic = JSON.parse(localStorage.getItem("fileBase64"));
      console.log("image to upload finally is: "+userInfo.photo);
      
      
      console.log(userInfo);


      alert('User registered!');
      
      users.push(userInfo);
      console.log("Added user #" + userInfo.contact + "  "+ userInfo.photo);
      localStorage.setItem("users", JSON.stringify(users));
      setUserInfo({ fName: "", lName: "", contact: "", genre: "", photo: "", day:0, month:0, year:0, dob: "" });

    }

    if (users.length > 0){
    console.log("# of users: " + users.length);
    users.forEach(function(user, index) {
        console.log("idex [" + index + "]: " + user.photo);
    });
    }
    
    const data = new Array(users.length).fill().map((value, index) => ({ id: index, title: users[index].fName + " " + users[index].lName, body: users[index].genre + " " + users[index].dob, pic: users[index].photo }))

  return (
    <div className="App">
            <Container fluid={true} className="god-container" style={{paddingLeft: 0, paddingRight: 0}}>
                <Row className="god-row" style={{marginRight: 0, marginLeft: 0}}>
                    <Col xs="12" md="9" className="sidebar" style={{paddingLeft: 0, paddingRight: 0}}> 
                        <h2 className="left-justify" style={{marginLeft: 15}}>S'inscrire</h2>
                        <h5 className="left-justify" style={{marginLeft: 15, color: '#6c757d' }}>C'est rapide et facile</h5>
                        <hr />
                        <Form onSubmit={handleSubmit} onChange={handleChange}>
                  
                          <FormGroup className="side-by-side" style={{marginLeft: 15}}>
                            <FormControl   name="fName" placeholder="Prénom" value={userInfo.fName}  required />
                            <FormControl   name="lName" placeholder="Nom de famille" value={userInfo.lName} style={{marginLeft: 15}} required />
                          </FormGroup>
                          <FormGroup style={{marginTop: 15, marginLeft: 15}}>
                            <FormControl  type="text" name="contact" placeholder="numéro mobile ou email" value={userInfo.contact}  defaultValue="" required />
                          </FormGroup><br/><br/>

                          <FormLabel className="left-justify" style={{marginLeft: 15}}>Date de naissance <BiHelpCircle /></FormLabel>
                          <FormGroup className="side-by-side" style={{marginLeft: 15}}>     

                            <Form.Select name="day" value={userInfo.day} required >
                            <option></option>
                                {days.map(day => <option key={day} value={day}>{day}</option>)}                            
                            </Form.Select>
                            
                            <Form.Select style={{marginLeft: 15}} name="month" value={userInfo.month} required >
                            <option></option>
                            {months.map(item => 
                              <option key={item.value} value={item.value}>{item.text}</option>)}                                                           
                            </Form.Select>

                            <Form.Select style={{marginLeft: 15}} name="year" value={userInfo.year} required >
                            <option></option>
                                {years.map(year => <option key={year} value={year}>{year}</option>)}                            
                            </Form.Select>
                            

                          </FormGroup><br />

                          <FormLabel className="left-justify" style={{marginLeft: 15}}>Genre <BiHelpCircle /></FormLabel>
                          <FormGroup className="side-by-side" style={{marginLeft: 15}} type='radio' value={userInfo.genre} required >
                              <FormCheck name="genre"  value="Homme" type="radio" label="Homme" onClick={handleChange} />
                              <FormCheck name="genre"  value="Femme" type="radio" label="Femme" onClick={handleChange}/>
                          </FormGroup><br/>

                          <FormLabel className="left-justify" style={{marginLeft: 15}}>Photo <BiHelpCircle /></FormLabel>
                          <FormGroup className="side-by-side" style={{marginLeft: 15}}>
                            <Form.Control type="file" size="lg" name="photo" required  >
                              
                            </Form.Control>
                          </FormGroup><br />
                          
                          <FormGroup  style={{marginLeft: 15}}>
                          <div className="text-left">
                          <Form.Label className="text-left text-start">En cliquant sure S'inscrire, vous acceptez nos <a href="" >Conditions générales </a>. Découvrez comment nous recueillons,
                           utilisons et partageons vos données en lisant notre <a href="" >Politique de confidentialité</a>
                            et comment nous utilisons les cookies et autres technologies similaires en consultant notre <a href="" >Politique d'utilisation des cookies</a>.
                             Vous recevrez peut-être des notifications par texto de notre part et vous pouvez à tout moment vous désabonner. </Form.Label><br /><br />
                         </div>
                          </FormGroup>

                          <FormGroup>
                             <Button type="submit" size="lg" variant="success" >S'inscrire</Button><br /><br />
                          </FormGroup>

                        </Form>
                    </Col>
                    <Col xs="12" md="3" className="not-sidebar">
                        
                    <Container >

<div className="mr-auto ml-auto text-left" style={{ margin: '2px' }}>
  <h2 className="left-justify" style={{marginLeft: 15}}>List of Users: </h2>
{data.map(((item) => (
    <Card className="card bg-light mt-4" style={{ borderStyle: 'none', textAlign: 'left' }} key={item.id} >

        <Card.Body className="card-body d-flex justify-content-between align-items-center align-items-md-center">
            <div style={{ width: '131px' }}><Image roundedCircle='true' className="col-12"  alt='avatar' src={item.pic} /></div>
            <div className="col-7 col-sm-9 col-md-9 col-lg-10 text-left" style={{ paddingLeft: '12px' }}>
                <Card.Subtitle className='text-dark'>{item.title}</Card.Subtitle>
                <Card.Text className="mb-2 text-muted" size='sm'>{item.body}  {userInfo.dob}</Card.Text>
            </div>
            
        </Card.Body>

        </Card>)))}</div></Container>


                    </Col>
                </Row>
            </Container>
        </div>
  );
}

export default App;
