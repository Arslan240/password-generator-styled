import React from 'react'
import styled from 'styled-components'
import Copy from './Copy'
import Values from './Values'
import MyProvider from '../Context/MyProvider'

const Card = styled.div`
    background:white;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 500px;
    margin: 0 auto;

    .title {
        margin-bottom: 0

    }
    .sub-title {
        margin-bottom: 20px;
        font-size: .9rem;
        text-align: center;
    }

    .image-container{
        img {
            height: 150px;
        }
    }

`

const PasswordCard = () => {

    return (
        <MyProvider>
            <Card>
                <div className='image-container'>
                    <img src="/assets/password-vector.jpg" alt="password-vector"/>
                </div>
                <h2 className='title'>Password generator</h2>
                <span className='sub-title'>Create strong and secure passwords to keep your accounts safe online.</span>
                <Copy />
                <Values />
            </Card>
        </MyProvider>
    )
}

export default PasswordCard