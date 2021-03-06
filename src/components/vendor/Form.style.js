import styled from "styled-components";
//import {Colors}  from '../../styles/vendor/themes/colors'

// const {wineRed,darkRed,lightPink,lightGreen,lighterGreen,darkGreen} = Colors;

// const ContentWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background: #eee;
//   background: ${darkRed};
//   height: 100vh;
// `;

export const Message = styled.p`
 font-size:11px;
 font-style:italic;
 font-weight:500;
 color:#f15a24;
 margin:${props=>props.margin ? props.margin : '-1em 0'};
`

export const Wrapper = styled.div`
  position: relative;
  margin:0;
 // height:100%;
  padding:${props=>props.container ? '1em 2em' : ''};
  order:${props=>props.order};
  display:${props=>props.grid ? 'grid' : props.flex ? 'flex' : 'block'};
    //for grid
    gap: ${props=>props.gap ? `${props.gap}em`:''};
    grid-template-columns: ${props=>props.GTC ? props.GTC : '' };

  align-items:${props=> props.Align ? props.Align : props.flex ? 'center' :''};
  justify-content:${props=> props.Justify ? props.Justify : ''};

  //for flex
  flex-direction:${props=> props.col ? 'column' : ''};

  &.input_container{
    justify-self:center;
  }

   @media (max-width:720px){
    grid-template-columns:1fr;
 
   }

`

export const InputWrapper = styled.div`
  position: relative;
  margin:0;
  order:${props=>props.order};
  display:${props=>props.grid ? 'grid' : props.flex ? 'flex' : 'block'};
    //for grid
    gap: ${props=>props.gap ? `${props.gap}em`:''};
    grid-template-columns: ${props=>props.GTC ? props.GTC : '' };
  align-items:${props=> props.Align ? props.Align : props.flex ? 'center' :''};
  justify-content:${props=> props.Justify ? props.Justify : ''};

  //for flex
  flex-direction:${props=> props.col ? 'column' : ''};

   @media (max-width:720px){
    grid-template-columns:1fr;
   }

   /* &:focus-within {
      label.floating {
        top: -8px;
    }
  } */


`
// export const InputWrapper = styled.div`
//   position: relative;
//   margin:0;
//   order:${props=>props.order};
// `;

export const StyledLabel = styled.label`
  cursor: pointer;
  font-weight: 500;
  text-transform:${(props)=>props.normal ? "" :"capitalize" };
  letter-spacing: -0.008em;
  /* pointer-events:none; */
  //margin:1em 0;
  transition:0.2s ease all; 

  &.floating{
    margin:0;
    /* position:absolute;
    top:1em;
    left:5px;
    padding:0 0.5em;
    background:#fff;
    margin:0;

    &:focus{
      top:-8px;
    }    */
  }
`
export const StyledInput = styled.input`
    font-family:'montserrat';
    font-size:14px;
    font-weight:500;
    padding:${({floating, small})=>floating ? "1.2em" : small ? "0.5em 0.8em;": "1.2em 1em"} !important;
    margin-right:${({checkbox, small})=>checkbox || small ? "1em" :"" };
    display:block;
    width:${(props)=>props.checkbox ? "" :"100%" };
    background:#FFFFFF;
    border:1px solid #C4C4C4;
    text-transform:${(props)=>props.type === "email" ? "lowercase" :"capitalize" };

    :focus{
    outline:none;
    border-bottom:1px solid grey;
   
        /* &:not(::placeholder-shown){
            background:white;
        } */
    
        &:not(::placeholder-shown) ~ .floating {
            top:-8px;
            font-size:13px;
        }
    }
    &::placeholder{
        opacity:0;
        }
    &:not(:placeholder-shown){
       // background:green;
    }
    &:not(:placeholder-shown) ~ .floating {
      top: -8px !important;
      font-size: 13px;
    } 
    /* &:not(:placeholder-shown) ~ label {
            top:-8px;
            font-size:13px;
            color:crimson;
      }
    &:not(:placeholder-shown):not(:focus) ~ label.floating {
      top: -8px !important;
      font-size: 13px;
      background:crimson;
      color:crimson;
    } */

`
export const StyledSelect = styled.select`
display:block;
padding:0.5em 0.8em;
min-width:95px;
font-size:14px;
border:1px solid grey;
`
export const StyledTextArea = styled.textarea`
    font-family:'montserrat';
    font-size:14px;
    font-weight:500;
    padding:${props=>props.floating ? "1.2em" : "1.2em 1em"} !important;
    margin-right:${(props)=>props.checkbox ? "1em" :"" };
    display:block;
    width:${(props)=>props.checkbox ? "" :"100%" };
    background:#FFFFFF;
    border:1px solid #C4C4C4;
    text-transform:${(props)=>props.type === "email" ? "lowercase" :"capitalize" };

    :focus{
    outline:none;
    border-bottom:1px solid grey;
   
        /* &:not(::placeholder-shown){
            background:white;
        } */
    
        &:not(::placeholder-shown) ~ .floating {
            top:-8px;
            font-size:13px;
        }
    }
    &::placeholder{
        opacity:0;
        }
    &:not(:placeholder-shown){
       // background:green;
    }
    &:not(:placeholder-shown) ~ .floating {
      top: -8px !important;
      font-size: 13px;
    } 
    /* &:not(:placeholder-shown) ~ label {
            top:-8px;
            font-size:13px;
            color:crimson;
      }
    &:not(:placeholder-shown):not(:focus) ~ label.floating {
      top: -8px !important;
      font-size: 13px;
      background:crimson;
      color:crimson;
    } */

`

export const StyledForm = styled.form`
  display: grid;
  justify-self: center;
  justify-content:space-around;
  align-items:center;
  grid-template-columns:${props => props.products?'1fr': props.page === 2 ? "repeat(2, minmax(280px,1fr))" :"repeat(2, minmax(280px,400px))"};
 // grid-template-columns: repeat(2, minmax(280px,380px));
  position: relative;
  gap:${props => props.gap?`${props.gap}em`:'4em'};
  width:100%;
  //padding:1em 0 0;

  &.add_products{
    grid-template-columns:1fr
  }
  
  @media (max-width:720px){
    grid-template-columns:${props => props.products?'1fr':`1fr 1fr`};
    width:100%;
    gap:3em;
    margin:3em 0;
  }
  .submit{
      justify-self:flex-end;
      margin-top:0.5em;
  }

  &#signup input, &#signup .input_container {
    max-width:400px;
  }
  /* ${InputWrapper} {
    :focus-within {
      label.floating {
        top: -8px;
      }
    } */

    /* :not(:placeholder-shown):not(:focus) ~ label.floating {
      top: -8px !important;
      font-size: 13px;
    } 
  }
   */


  
  
`;