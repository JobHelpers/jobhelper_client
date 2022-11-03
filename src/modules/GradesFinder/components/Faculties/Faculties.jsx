import './styles.scss'

export const Faculties = (props) => {

  const {faculties, selectedSubjects, subjectGrades} = props;

  const findSubject = (coefficients, id) => {
    if (!coefficients.length) return null
    const currentSubject = coefficients.find(item => item.subjectId === id)
    console.log(currentSubject.coefficient);
    return currentSubject;
  }

  return (
    <div className="container">
      {faculties.map(item => {
        return (
          <div key={item.id} style={{marginBottom: "50px"}}>
            <div>{item.name}</div>
            <div>{item.universityName}</div>

            <div className="row">
              <div className="col">Предмети</div>
              <div className="col">Мінімальний бал</div>
              <div className="col">Ваш бал</div>
              <div className="col">&nbsp;</div>
            </div>

            {selectedSubjects.map(subject => {

              const currentSubject = findSubject(item.coefficients, subject)

              return (
                <div key={subject}>
                  {currentSubject
                    ? (
                      <>
                        <div className="row">
                          <div className="col">{currentSubject.subjectName }</div>
                          <div className="col">{currentSubject.minGrade }</div>
                          <div className="col">{subjectGrades[subject]}</div>
                          <div className="col">&nbsp;</div>
                        </div>
                      </>
                    )
                    : null}
                </div>
              )
            })}
            <hr />
            <div className="row">
              <div className="col">Бюджет</div>
              <div className="col">{item?.maxMinGrade.length ? item.maxMinGrade[0].maxMinBudget : null}</div>
              <div className="col">0</div>
              <div className="col">&nbsp;</div>
            </div>
            <div className="row">
              <div className="col">Контракт</div>
              <div className="col">{item?.maxMinGrade.length ? item.maxMinGrade[0].maxMinContract : null}</div>
              <div className="col">0</div>
              <div className="col">&nbsp;</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
