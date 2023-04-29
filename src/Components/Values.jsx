import React, { useContext, useEffect, useState } from 'react'
import MyContext from '../Context/context'
import styled from 'styled-components'

const FormContainer = styled.div`
    width: 100%;
    margin-top: 10px;
    padding: 10px 0;

    div {
        margin-bottom: 10px;
    }

    .password-count {
        display: flex;
        flex-direction: column;
        .count-span {
            border: 1px solid;
            padding: 5px 10px;
        }
        .msg{
            margin-top: 10px;
        }
        .max-length-msg{
            background-color: #bf0000;
            font-size: 0.9rem;
            padding: 6.5px 12px;
            color: white;
            border-radius: 10px;
        }

    }
    .options {
        display: flex;
        justify-content: space-between;


        input[type="checkbox"] {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;

            /* Add a custom border */
            border: 2px solid #aaa;

            /* Add a custom border-radius */
            border-radius: 5px;

            /* Add a custom size */
            width: 20px;
            height: 20px;

            /* Add a custom background color */
            background-color: #ffffff;
        }

        input[type="checkbox"]:checked{
            border: none;
            background-color: ${({ theme }) => theme.colors.accent};
        }
    }
    
`

const SliderContainer = styled.div`
  display: flex;
  align-items: center;

  input[type="range"]{
    background-color: #3d8899;
  }
`;

const SliderInput = styled.input.attrs({ type: "range", min: 1, max: 20 })`
  flex: 1;
  margin: 0 10px;
`;




const Values = () => {
    const { refresh, setPassword } = useContext(MyContext)
    const [count, setCount] = useState(10);
    const [isUppercase, setIsUpperCase] = useState(false)
    const [isLowercase, setIsLowerCase] = useState(false)
    const [spChars, setSpChars] = useState(true)
    const [isNumbers, setIsNumbers] = useState(true)
    const [maxReached, setMaxReached] = useState(false);
    const maxCount = 20;

    const handleCountChange = (event) => {
        const newCount = parseInt(event.target.value);
        console.log(newCount)
        if (newCount > maxCount) {
            setCount(maxCount);
            setMaxReached(true);
        }
        else if (!isNaN(newCount)) {
            setCount(newCount);
        }
        else {
            setCount(1);
        }
    };

    const handleSliderChange = (event) => {
        const newCount = parseInt(event.target.value);
        setCount(newCount);
    };

    const handleUpperCase = () => {
        setIsUpperCase(!isUppercase)
    }
    const handleLowerCase = () => {
        setIsLowerCase(!isLowercase)
    }
    const handleSpChars = () => {
        setSpChars(!spChars)
    }
    const handleNumbers = () => {
        setIsNumbers(!isNumbers)
    }

    function generatePassword() {
        if(!isUppercase & !isLowercase & !spChars & !isNumbers){
            return "";
        }
        const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        const lowercase = "abcdefghijklmnopqrstuvwxyz"
        const spCharacters = "!@#$%^&*()_+~`|}{[]:;?><,./-="
        const numbers = "0123456789"
        let availableCharacters = []
        let password = "";

        if (isUppercase) {
            availableCharacters = [...availableCharacters, ...uppercase]
        }
        if (isLowercase) {
            availableCharacters = [...availableCharacters, ...lowercase]
        }
        if (spChars) {
            availableCharacters = [...availableCharacters, ...spCharacters]
        }
        if (isNumbers) {
            availableCharacters = [...availableCharacters, ...numbers]
        }

        for (let i = 0; i < count; i++) {
            const index = Math.floor(Math.random() * availableCharacters.length)
            password += availableCharacters[index];
        }
        return password;
    }

    useEffect(() => {
        if (maxReached) {
            const timer = setTimeout(() => setMaxReached(false), 3000)
            return () => {
                clearTimeout(timer)
            }
        }
    }, [maxReached])

    useEffect(() => {
        setPassword(generatePassword())
    }, [isUppercase, isLowercase, spChars, isNumbers, count, refresh])

    return (
        <FormContainer>
            <div className="password-count">
                <div>
                    <span>Password Count: </span>
                    <input className='count-span' value={count === 0 ? "" : count} onChange={handleCountChange}></input>
                </div>

                {
                    maxReached &&
                    <div className='msg'>
                        <span className="max-length-msg">Max Length is 20</span>
                    </div>
                }
            </div>
            <SliderContainer>
                <label htmlFor="password-slider">Password Length:</label>
                <SliderInput
                    id="password-slider"
                    value={count}
                    onChange={handleSliderChange}
                />
            </SliderContainer>
            <div className="uppercase options">
                <span>Uppercase</span>
                <input type="checkbox" name="checkbox" checked={isUppercase} onChange={handleUpperCase} />
            </div>
            <div className="lowercase options">
                <span>Lowercase</span>
                <input type="checkbox" name="checkbox" checked={isLowercase} onChange={handleLowerCase} />
            </div>
            <div className="sp-chars options">
                <span>Special Characters</span>
                <input type="checkbox" name="checkbox" checked={spChars} onChange={handleSpChars} />
            </div>
            <div className="numbers options">
                <span>Numbers</span>
                <input type="checkbox" name="checkbox" checked={isNumbers} onChange={handleNumbers} />
            </div>
        </FormContainer>
    )
}

export default Values