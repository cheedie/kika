import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import signImage from "../../assets/user/sign-in.png";
import Navbar from '../landing-page/Navbar'
import { StyledButton } from './Button.styled';
import {StyledForm , StyledLabel, StyledInput, Wrapper, Message } from './Form.style';
import {useFormik} from 'formik';
import * as Yup from 'yup'
import Footer from '../landing-page/Footer';
import { useVendorContext } from "../../context/vendor_context";
import { MdArrowBack as Back} from 'react-icons/md';
import verify from '../../utils/verify';


Yup.addMethod(Yup.string, 'availability',function(msg){
  return this.test('availability', msg,async function(value){
    const {path, createError} = this
    const data = {}
    data[path] = value;
    const response = await verify(data)
    return (response.status !== 200 || !response) ? createError({path, message: msg})
  : (response.status === 200 && response.data.key && response.data.message) ? createError({path,  message: response.data.message})
  : true
  //   return verify(data).then((response) => (response.status !== 200 || !response) ? createError({path, message: msg})
  // : (response.status === 200 && response.data.key && response.data.message) ? createError({path,  message: response.data.message})
  // : true)
  })
})



function VendorSignup() {
  const navigate = useNavigate();
  const {uploadVendorDetails} = useVendorContext();

  const [isVisible, setVisible ] = useState(false);
  const [page, setPage ] = useState(1);
  const [progress, setProgress ] = useState(false);
  const [response, setMessage ] = useState({
    message:'',
    error:''
  });
  const FILE_SIZE = 5 * 1024 * 1024;
       
    const {setFieldValue, handleSubmit, handleChange, handleBlur, values, touched, errors} = useFormik({
        initialValues:{
            name:'',
            email:'',
            phone:'',
            password:'',
            business_name:'',
            address:'',
            city:'',
            state:'',
            terms:'',
            id_num:'',
            image:'',
            otp:''
            
        },

        validationSchema:  page === 1 ?  Yup.object({
          name: Yup.string().min(5, 'Fullname is too short').max(30, 'Fullname is too long').required('Required'),
          phone: Yup.string().required('Required').availability("Network error")
          .matches(/^[0-9]+$/, "Phone number must be only digits")
          .min(11, 'Must be up to 11 digits')
          .max(13, 'Cannot exceed 11 digits'),
          email:  Yup.string().email('Invalid email')
          .availability("Could not confirm availability").required('Required'),
          password: Yup.string().required('Required').min(8,'Password should be longer than 8 characters'),
          business_name: Yup.string().min(5, 'Business name is too short').max(30, 'Business name is too long')
          .availability("Could not confirm availability").required('Required'),
          address:  Yup.string().required('Required'),
          city:  Yup.string().required('Required'),
          state:  Yup.string().required('Required'),
          terms: Yup.boolean("Please accept policies").required('Required'),
        }) : Yup.object({
          id_num:  Yup.string().required('Required')
          .matches(/^[0-9]+$/, "ID Number must be only digits")
          .min(15,'ID Number should be 15 digits'),
          image: Yup.mixed().required('Required')
          .test("FILE_SIZE", "Uploaded file is too big.",value => !value || (value && value.size <= FILE_SIZE))
          .test("type", "Only the following formats are accepted: .jpeg, .jpg, .bmp, and .doc", (value) => {
            return !value || (value && (
                  value.type === "image/jpeg" ||
                  value.type === "image/bmp" ||
                  value.type === "image/png"
              ))
          }),
          otp:  Yup.string().required('Required'),
        }),
        
       
        onSubmit:values=>{
           if(page === 1){
            setPage(2)
          } 
          else{
              setProgress(true)
               return uploadVendorDetails(values)
               .then((result)=>{
                 console.log(result);
                 //const message = result.data?.message;
                 if(result.data){
                   setProgress(false)
                  setMessage({message: "Registration successful"})
                  setTimeout(()=> {
                        navigate("/vendor/signin");
                   }
                   ,5000);
                 }else{
                   setProgress(false)
                   setMessage({error: result})
                 }
               });
               
               
          }
        }
         
    })


      
    const form_data = [
      {input_name:"Full Name", short:"name",},
      {input_name:"Email Address", short:"email", input_type: 'email'},
      {input_name:"Phone Number", short:"phone"},
      {input_name:"Password", short:"password", input_type: isVisible ? "text" : "password"},
      {input_name:"Business Name",  short:"business_name",},
      {input_name:"Residential Address", short:"address"},
      {input_name:"City/Town",  short:"city"},
      {input_name:"State",  short:"state"},
    ]

  
  return (
    <div>
        <Navbar />

        {progress ? <ProgressBar><Progress/></ProgressBar> : null}
        <Heading> {page === 1 ? 'Sell on Kika' : 'Vendor Verification'}</Heading>
        <StyledForm 
          onBlur={handleBlur}
          onSubmit={handleSubmit} 
          id='signup' 
          gap={page === 2 ? '1' : "4"}
          enctype="multipart/form-data"
          >

            {page === 1 ?
            <>
            {/* First column */}
            <Wrapper container grid gap="2">
                {form_data.slice(0,4).map((data,index)=>{
                  const {input_name,short, input_type} = data
                  return(
                    <Wrapper key={`${short}-${index}`} grid gap="0.5">
                      <StyledLabel htmlFor={short}> {input_name} </StyledLabel>
                      <StyledInput
                        id={short}
                        name={short}
                        placeholder={input_name}
                        value={values[short]}
                        type={input_type ? input_type : "text"}
                        onChange={handleChange}
                      />
                      {touched[short] && errors[short]?(
                          <Message>{errors[short]}</Message>
                        ) : null}
                      {
                        short === "password" && values.password? 
                        <Wrapper flex>
                          <StyledInput
                            id="show_password"
                            type='checkbox'
                            checkbox
                            onChange={()=>isVisible ? setVisible(false): setVisible(true)}
                          /> 
                          <StyledLabel normal htmlFor={"show_password"}>Show password</StyledLabel>
                        </Wrapper> : null
                      }
                        
                    </Wrapper>
                  )
                })}

              <Wrapper flex>
                <StyledInput
                    id="terms"
                    name="terms"
                    type="checkbox"
                    value={values.terms}
                    onChange={handleChange}
                    checkbox
                  />
                  <StyledLabel normal htmlFor="name"> I accept the KIKA <Link to="/">E-CONTACT POLICIES</Link> </StyledLabel>
                  {touched.terms && errors.terms  ?(
                      <Message>{errors.terms}</Message>
                    ) : null}
              </Wrapper>
              
            </Wrapper>

            {/* Second column */}
            <Wrapper container grid gap="2">
              {form_data.slice(4,8).map((data,index)=>{
                const {input_name,short} = data
                    return(
                      <Wrapper key={`${short}-${index}`} grid gap="0.5">
                        <StyledLabel htmlFor={short}> {input_name} </StyledLabel>
                        <StyledInput
                          id={short}
                          name={short}
                          placeholder={input_name}
                          //autoComplete="off"
                          value={values[short]}
                          onChange={handleChange}
                         
                        />
                        {touched[short] && errors[short]?(
                          <Message>{errors[short]}</Message>
                        ) : null}
                      </Wrapper>
                    )
                })}
              <StyledButton type="submit" id='continue' name='continue'
              label="continue" align-self="end"
              onClick={()=>{
              
               console.log('Onclick errors',errors)
              }}      
              >Continue</StyledButton>
            </Wrapper>
            </>
            :
            <>
            <ExitButton id='back' name='back' onClick={()=>setPage(1)}><Back/> <span> Go back</span></ExitButton>
              <Wrapper className = "input_container" container  grid gap="2">
                <Wrapper grid gap="0.5">
                  <StyledLabel htmlFor='id_num' normal> National Identification Number </StyledLabel>
                  <StyledInput
                    id='id_num'
                    name='id_num'
                    placeholder='National Identification Number'
                    value={values.id_num}
                    onChange={handleChange}
                  />
                  {touched.id_num && errors.id_num?(
                    <Message>{errors.id_num}</Message>
                  ) : null}
                </Wrapper>
                <Wrapper grid gap="0.5">
                  <StyledLabel htmlFor='id' normal>Identification</StyledLabel>
                  <StyledInput
                    id='image'
                    name='image'
                    placeholder='Identification'
                    type="file"
                    accept="image/*"
                    onChange={(event) => setFieldValue("image", event.currentTarget.files[0])}
                  />
                  {touched.image && errors.image ?(
                    <Message>{errors.image}</Message>
                  ) : null}
                </Wrapper>
                <Wrapper grid gap="0.5">
                  <StyledLabel htmlFor='otp' normal> Input code sent to your email address </StyledLabel>
                  <StyledInput
                    id='otp'
                    name='otp'
                    placeholder='Input code'
                    value={values.otp}
                    onChange={handleChange}
                  />
                  {touched.otp && errors.otp?(
                    <Message>{errors.otp}</Message>
                  ) : null}
                </Wrapper>
                      
                <StyledButton type="submit"
                  id="submit" name='submit' label="continue"
                  page={page} 
                >Continue</StyledButton>
                {/* {response.message || response.error ?  */}
                      <Heading 
                      smallHeading
                      color={response.error ? "red": response.message ? "green" : "black" }
                      > 
                      {response.message ? response.messsage : response.error}
                </Heading> 
                {/* : null} */}
              </Wrapper>
              <Wrapper>
                    <Image/>
              </Wrapper>
            </>

            }

        </StyledForm>
        <Footer/>
    </div>
  )
}

export default VendorSignup




const Heading = styled.h1`
  font-style: normal;
  font-weight: 600;
  font-size:${props=> props.smallHeading ? "1em" : "2em"};
  line-height: 78px;
  width:100%;
  text-align:${props=> props.smallHeading ? "left" : "center"};
  color:${({smallHeading, color})=> smallHeading && color ? color : ""};


    @media (max-width:720px){
        font-size:36px;
        line-height:40px;
        
    }
`;
const Image = styled.div`
width:100%;
height:400px;
background:url(${signImage}) no-repeat;
background-size:cover;
`
const ExitButton = styled.button`
border: none;
background: none;
display:flex;
align-items:center;
font-size: 2em;
position: absolute;
    top: -0.8em;
    left: 1em;
    span{
      font-size:14px;
    }

&:hover{
    color:#F15A24;
    cursor:pointer;
    transform:scale(1.2);
}
`

const ProgressBar = styled.div`
width:100%;
height:0.5em;
border-bottom:1px solid grey;
position:relative;
`
const Progress = styled.div`
width:70%;
height:0.5em;
background:crimson;
`



