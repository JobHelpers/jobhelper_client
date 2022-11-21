import "./styles.scss";
import { TickIcon, CrossIcon } from "components";

export const Faculties = (props) => {
  const { faculties, selectedSubjects, subjectGrades } = props;

  const findSubject = (coefficients, id) => {
    if (!coefficients.length) return null;
    const currentSubject = coefficients.find((item) => item.subjectId === id);
    return currentSubject;
  };

  const countAvarageGrade = (coefficients) => {
    let avarageGrade = 0;
    const usedCoefficients = coefficients.filter((coef) => {
      return selectedSubjects.includes(coef.subjectId);
    });
    const sumCoefficients = usedCoefficients.reduce((acc, item) => {
      return acc + item.coefficient;
    }, 0);
    selectedSubjects.forEach((subjectId) => {
      const subjectCoefficient = coefficients.find(
        (item) => item.subjectId === subjectId
      );
      const coefficient = subjectCoefficient?.coefficient || 0;
      avarageGrade += subjectGrades[subjectId] * coefficient;
    });
    return Math.trunc(avarageGrade * 1000) / 1000;
  };

  return (
    <div className="container">
      {faculties.map((item) => {
        return (
          <div key={item.id} style={{ marginBottom: 50 }}>
            <div style={{ fontWeight: "bold" }}>{item.name}</div>
            <div style={{ marginTop: 12 }}>{item.universityName}</div>

            <div className="row" style={{ marginTop: 36 }}>
              <div className="col" style={{ color: "grey" }}>
                Предмети
              </div>
              <div className="col" style={{ color: "grey" }}>
                Мінімальний бал
              </div>
              <div className="col" style={{ color: "grey" }}>
                Ваш бал
              </div>
              <div className="col" style={{ color: "grey" }}></div>
            </div>

            {selectedSubjects.map((subject) => {
              const currentSubject = findSubject(item.coefficients, subject);

              return (
                <div key={subject}>
                  {currentSubject ? (
                    <>
                      <div className="row">
                        <div className="col">{currentSubject.subjectName}</div>
                        <div className="col">≥ {currentSubject.minGrade}</div>
                        <div className="col">{subjectGrades[subject]}</div>
                        <div className="col">
                          {currentSubject.minGrade <= subjectGrades[subject] ? (
                            <TickIcon />
                          ) : (
                            <CrossIcon />
                          )}
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>
              );
            })}
            <hr />
            <div className="row">
              <div className="col">Бюджет</div>
              <div className="col">
                ≥{" "}
                {item?.maxMinGrade.length
                  ? item.maxMinGrade[0].maxMinBudget
                  : null}
              </div>
              <div className="col">{countAvarageGrade(item.coefficients)}</div>
              <div className="col">
                {item?.maxMinGrade[0]?.maxMinBudget <=
                countAvarageGrade(item.coefficients) ? (
                  <TickIcon />
                ) : (
                  <CrossIcon />
                )}
              </div>
            </div>
            <div className="row">
              <div className="col">Контракт</div>
              <div className="col">
                ≥{" "}
                {item?.maxMinGrade.length
                  ? item.maxMinGrade[0].maxMinContract
                  : null}
              </div>
              <div className="col">{countAvarageGrade(item.coefficients)}</div>
              <div className="col">
                {item?.maxMinGrade[0]?.maxMinContract <=
                countAvarageGrade(item.coefficients) ? (
                  <TickIcon />
                ) : (
                  <CrossIcon />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
