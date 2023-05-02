import {useEffect, useState} from "react";
import {getFacultyInfo} from '../../api';

const SelectedFaculty = (props)=>{

  const [faculty, setFaculty] = useState(null);

  useEffect(()=>{
    getFacultyInfo(props.id).then(({data})=>{
      setFaculty(data[0]);
    })
  }, [props.id])

  console.log(faculty);

  return faculty? (
    <div className="faculty-info-card">
      <p>faculty id: {props.id}</p>
      <h4>{faculty.name}</h4>
      <h5 className="budget">мін. бал бюджет : {faculty.maxMinGrade[0].maxMinBudget}</h5>
      <h5 className="contract">мін. бал контракт : {faculty.maxMinGrade[0].maxMinContract}</h5>
      <p>Предмети для здачі:
        <ul>
          {faculty.coefficients.map((item)=>{
            return (
              <li>{item.subjectName} (мін. бал : {item.minGrade})</li>
            );
          })}
        </ul>
      </p>
    </div>
  ) : null;
}

export default SelectedFaculty;
