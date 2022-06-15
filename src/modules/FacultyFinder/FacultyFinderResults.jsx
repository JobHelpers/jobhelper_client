import { UniversityIcon } from '../../components';
import './styles.css';

export const FacultyFinderResults = ({ searchResults, loading }) => {
  return (
    <div className="results">
      {loading ? <h3>Loading...</h3> : null}
      {
        searchResults?.length
          ? searchResults.map(u => (
            <div key={u.id}>
              <div className="university">
                <div className="u-icon"><UniversityIcon /></div>
                <div className="u-name">{u.name}</div>
              </div>
              {
                u?.faculties?.length
                  ? (
                    <ul>
                      {u?.faculties.map(f => <li key={f.id}>{f.name}</li>)}
                    </ul>
                  ) : null
              }
            </div>
          ))
          : null
      }
    </div>
  );
};
