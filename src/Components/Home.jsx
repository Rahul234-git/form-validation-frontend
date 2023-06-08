import React,{ useState,useEffect } from "react";
import '../Assests/Css/Home.css';
import axios from 'axios';


const Home = () => {
    const [userDetails,setUserDetails] = useState({
        firstName:"",
        lastName:"",
        email:""
    });
    const [selectedCountry,setSelectedCountry] = useState('');
    const [selectedState,setSelectedState] = useState('');
    const [selectedCity,setSelectedCity] = useState('');
    const [dob,setDob] = useState('');
    const [age,setAge] = useState('');
    const [countryDetails,setCountry] = useState([]);
    const [radioBtn,setRadioBtn] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const getData =await fetch("http://localhost:4100/api/getCountryName");
            const countryName = await getData.json();
            setCountry(countryName.response);
        }
        fetchData();
    },[]);
    const submitHandler = () => {
        const userData = {
            firstName:userDetails.firstName,
            lastName:userDetails.lastName,
            email:userDetails.email,
            country:selectedCountry,
            state:selectedState,
            city:selectedCity,
            gender:radioBtn,
            dob:dob,
            age:age
        }
        if(userDetails.firstName.length ==0 || !userDetails.firstName.match("^[a-zA-Z]*$")) {
            alert(`!Invalid firstName!, Please fill firstName`);
        }
        else if((userDetails.lastName).length == 0 || !userDetails.lastName.match("^[a-zA-Z]*$")) {
            alert(`!Invalid lastName, Please fill lastName`);
        }
        else if((userDetails.email).length == 0 || !userDetails.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i) ) {
            alert(`!Invalid email, Please fill valid email`);
        }
        else if(!radioBtn) {
            alert(`!Invalid gender, Please fill valid gender`);
        }
        else if(selectedCountry.length == 0) {
            alert(`!Invalid Country, Please select valid countryName`);
        }
        else if(selectedState.length == 0) {
            alert(`!Invalid State, Please select valid stateName`);
        }
        else if(selectedCity.length == 0) {
            alert(`!Invalid City, Please select valid cityName`);
        }
        else if(age < 14 ) {
            alert(`!Invalid DOB, DOB must be older than 14 year`);
            
        }
        else {
            axios({
                method:"POST",
                url:"http://localhost:4100/api/saveData",
                headers:{"Content-Type":'application/json'},
                data:userData
            }).then(result => {
                alert("Hello");
                alert(result.data.message);
            }).catch(error => {
                console.log(error);
            });
        }

    }
    const changeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUserDetails({...userDetails,[name]:value});
    }
    const dobChangeHandler = (event) => {
        const userAge = Math.floor((new Date() - new Date(event).getTime()) / 3.15576e+10);
        setDob(event);
        setAge(userAge);
    }
    return(
        <>
            <div className="header">
            </div>
            <h1 className="header-title">Please Signup</h1>
            <div className="form-cont">
                <div className="first-name-cont">
                    <label className="first-name-label">First Name</label>
                    <input type="text" className="first-name-input" name ="firstName"
                    onChange={changeHandler} value={userDetails.firstName} />
                </div>
                <div className="last-name-cont">
                    <label className="last-name-label">Last Name</label>
                    <input value={userDetails.lastName} type="text" className="last-name-input" name ="lastName"
                    onChange={changeHandler} />
                </div> 
                <div className="email-cont">
                    <label className="email-label">Email</label>
                    <input value={userDetails.email} type="email" className="email-input" name ="email"
                    onChange={changeHandler} />
                </div>
                <div className="country-dropdown-cont">
                    <label className="country-label">Country</label>
                    <select className="country-select-option" name="country"
                     onChange={(event) => setSelectedCountry(event.target.value)}>
                        <option selected disabled>Select</option>
                        {
                            countryDetails.map((item,index) => {
                                return (
                                    <option  name="country" key={index} 
                                    value={userDetails.country}>
                                        {item.CountryName}
                                    </option>
                                )
                            })
                        }
                    </select> 
                </div>
                <div className="state-dropdown-cont">
                    <label className="state-label">State</label>
                    <select className="state-select-option" 
                    onChange={(event) => setSelectedState(event.target.value) }>
                        <option selected disabled>Select</option>
                        {
                            countryDetails.map((item,index) => {
                                return (
                                    <option name="state" key={index}
                                     value={userDetails.state}>
                                        {(item.CountryName) === (selectedCountry) ? item.StateName :""}
                                    </option>
                                )
                            })
                        }       
                    </select>  
                </div>
                <div className="city-dropdown-cont">
                    <label className="city-label">City</label>
                    <select className="city-select-option"
                    onChange={(event) =>setSelectedCity(event.target.value)}>
                        <option selected disabled>Select</option>
                        {
                            countryDetails.map((item,index) => {
                                return (
                                    <option  name="city" key={index}
                                    value={userDetails.city} >
                                        {(item.StateName) === (selectedState) ? item.CityName :""}
                                    </option>
                                )
                            })
                        } 
                    </select>
                </div>
                <div className="gender-radio-btn-cont">
                    <label className="gender-label">Gender</label>
                    <div className="radio-btn-cont">
                        <input type={"radio"} value="Male" name="gender"
                        onClick={() => setRadioBtn("Male") }/>Male
                        <input type={"radio"} value="Male" name="gender"
                        onClick={() => setRadioBtn("Female")}/>Female
                        <input type={"radio"} value="Male" name="gender"
                        onClick={() => setRadioBtn("Other")}/>Other
                    </div>
                </div>
                <div className="dob-cont">
                    <label className="dob-label">DOB</label>
                    <input type={"date"} className="date-input" 

                    onChange={(event) => dobChangeHandler(event.target.value)}

                    value={userDetails.dob} name="dob" />

                </div>
                <div className="age-cont">
                    <label className="age-label">Age</label>
                    <span className="age-span">
                        {age < 14 ? "" : age}
                        </span>
                </div>

                <button className="submit-btn" onClick={submitHandler}>Submit</button>


            </div>
        </>
    )
}

export default Home;
