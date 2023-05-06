import React, { useContext, useEffect, useState } from 'react'
import MyContext from '../Context/context'
import styled from 'styled-components'
import { MdOutlineContentCopy } from 'react-icons/md'
import { GrRefresh } from 'react-icons/gr'

const PasswordContainer = styled.div`
    width: 100%;

    .inner-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: .8rem;

        .icon {
            cursor: pointer;
            opacity: 0.8;
        }
        .password {
            flex-basis: 70%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border: .5px solid #979595;
            border-radius: 10px;
            padding: 7px 10px;
            margin-right: 10px;
            .password-span{
                margin-right: 15px;
            }
        }
        .button {
            box-sizing: border-box;
            max-width: 100px;
            display: flex;
            align-items: center;
            background-color: ${({ theme }) => theme.colors.accent};
            padding: 7px 10px;
            border-radius: 10px;
            cursor: pointer;
            .copy-icon {
                margin-right: 2px;
                
            }
        }
    }

    .feedback {
        padding: 5px;
        font-size: .7rem;
        color:  ${({ theme }) => theme.colors.green};
    }

    .copy-container{
        margin-top: 10px;
        .copied {
            font-size: 0.9rem;
            padding: 10px;
            border-radius: 10px;
            background: ${({theme}) => theme.colors.accent};
        }

    }
    .strong{
        color: ${({theme}) => theme.colors.strong};
    }
    .medium{
        color: ${({theme}) => theme.colors.medium};
    }
    .weak{
        color: ${({theme}) => theme.colors.weak};
    }
`

const Copy = () => {
    const { password, setRefresh } = useContext(MyContext)
    const [copied, setCopied] = useState(false)

    const handleRefresh = () => {
        setRefresh(prevValue => setRefresh(!prevValue));
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(password)
        setCopied(true)
    }

    useEffect(() => {
        if (copied) {
            const timer = setTimeout(() => {
                setCopied(false)
            }, 3000);

            return () => {
                clearTimeout(timer)
            }
        }
    }, [copied])

    return (
        <PasswordContainer>
            <div className="inner-container">
                <div className="password">
                    <span className='password-span'>
                        {password}
                    </span>
                    <GrRefresh className='refresh-icon icon' onClick={handleRefresh} />
                </div>
                <div className="button" onClick={handleCopy}>
                    <MdOutlineContentCopy className='copy-icon icon' size={20}  />
                    <span>Copy</span>
                </div>
            </div>
            <div className="feedback">
                {
                    password.length > 15 ?
                        <span className='strong'>Strong</span>
                    : password.length > 10 ?
                        <span className='medium'>Medium</span>
                        : <span className='weak'>Weak</span>
                }
            </div>
            {
                copied &&
                <div className='copy-container'>
                    <span className='copied'>Copied</span>
                </div>

            }
        </PasswordContainer>
    )
}

export default Copy