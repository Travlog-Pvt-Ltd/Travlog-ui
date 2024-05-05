import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import React, { useState } from 'react'
import Modal from 'react-modal'

const ChoiceModal = ({ open, close, next, create, save }) => {
    const [type, setType] = useState('url')

    const handleSubmit = () => {
        if(next==='create') create(type)
        else save(type)
    }

    return (
        <Modal
            isOpen={open}
            onRequestClose={close}
            style={{
                content: {
                    margin: 'auto',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: "column",
                    borderRadius: "12px",
                    boxShadow: '0px 20px 24px -4px #10182814',
                    width: '90%',
                    maxWidth: "475px",
                    height: '30%',
                    zIndex: "10",
                    padding: "30px 40px 50px",
                    justifyContent: "center",
                    alignItems: "center"
                },
            }}
        >
            <div>Choose the thumbnail for your blog</div>
            <FormControl>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={type}
                    onChange={(e)=>setType(e.target.value)}
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="url" control={<Radio />} label="Url" />
                    <FormControlLabel value="file" control={<Radio />} label="File" />
                </RadioGroup>
            </FormControl>
            <button onClick={handleSubmit} className='btn submit-btn'>{next}</button>
        </Modal>
    )
}

export default ChoiceModal