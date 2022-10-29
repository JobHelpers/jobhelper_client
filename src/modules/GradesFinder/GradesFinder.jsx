import {useEffect, useState} from 'react'

import * as api from 'api'
import {getSubjects, getMandatorySubjects} from './utils'
import { Form } from './components';

const GradesFinder = () => {
  const [subjects, setSubjects] = useState([])
  const [mandatorySubjects, setMandatorySubjects] = useState([])

  useEffect(()=>{
    api.getSubjects()
    .then(({data})=>{
      setSubjects(getSubjects(data));
      setMandatorySubjects(getMandatorySubjects(data))
    })
    .catch((error)=>{
        console.log(error);
    }
  )
  }, [])

  return (
    <div className="container">
      <h1>Бюджет чи контракт?</h1>
      <h3>Допоможемо правильно розставити пріоритети</h3>
      <Form subjects={subjects} mandatorySubjects={mandatorySubjects}/>
    </div>
  );
};

export default GradesFinder;
