import { TickIcon, CrossIcon } from "components";
import "../GradesFinder/components/Faculties/styles.scss";

export const NmtFaculties = (props) => {
  const { faculties, testGrade } = props;

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
              <div className="col" style={{ color: "grey" }}>
              </div>
            </div>
            <div className="row">
              <div style={{width: "330px"}}>НМТ</div>
              <div style={{width: "330px"}}>103.00</div>
              <div style={{width: "330px"}}>{testGrade}</div> 
            </div>

            <hr />
            <div className="row">
              <div className="col">Бюджет</div>
              <div className="col">
                ≥{" "}
                {item?.maxMinGrade.length
                  ? item.maxMinGrade[0].maxMinBudget
                  : null}
              </div>
              <div className="col">{testGrade}</div>
              <div className="col">
                {item?.maxMinGrade[0]?.maxMinBudget <=
                testGrade ? (
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
              <div className="col">{testGrade}</div>
              <div className="col">
                {item?.maxMinGrade[0]?.maxMinContract <=
                testGrade ? (
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
