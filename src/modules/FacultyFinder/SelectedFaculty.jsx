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
      <h5 className="budget">мін. бал бюджет : {faculty.maxMinGrade.length ? faculty.maxMinGrade[0].maxMinBudget : null}</h5>
      <h5 className="contract">мін. бал контракт : {faculty.maxMinGrade.length ? faculty.maxMinGrade[0].maxMinContract : null}</h5>
      <div>Предмети для здачі:
        <ul>
          {faculty.coefficients.length ? faculty.coefficients.map((item)=>{
            return (
              <li key={item.id}>{item.subjectName} (мін. бал : {item.minGrade})</li>
            );
          }) : null}
        </ul>
      </div>
    </div>
  ) : null;
}

export default SelectedFaculty;
