import { UniversityIcon } from '../../components';
import './styles.css';

export const FacultyFinderResults = () => {
  return (
    <div className="results">
      <div>
        <div className="university">
          <div className="u-icon"><UniversityIcon /></div>
          <div className="u-name">Національний університет "Львівська політехніка"</div>
        </div>
        <ul className="faculties">
          <li>Інститут комп'ютерних технологій, автоматики та метрології</li>
          <li>Інститут комп'ютерних наук та інформаційних технологій</li>
        </ul>
      </div>
      <div className="university">
        <div className="u-icon"><UniversityIcon /></div>
        <div className="u-name">Національний університет "Львівська політехніка"</div>
      </div>
      <div className="university">
        <div className="u-icon"><UniversityIcon /></div>
        <div className="u-name">Національний університет "Львівська політехніка"</div>
      </div>
    </div>
  );
};
