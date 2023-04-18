import { UniversityIcon } from '../../components';
import './styles.css';

export const FacultyFinderResults = ({ showFacultyInfo, searchResults, loading, resultsLoaded }) => {
  return (
    <div className="results">
      {loading? <h3>Loading...</h3> : null}
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
                      {u?.faculties.map(f => <li key={f.id} onClick={() => showFacultyInfo(f.id)}>{f.name}</li>)}
                    </ul>
                  ) : null
              }
            </div>
          ))
          : null
      }
      {!loading && resultsLoaded && !searchResults.length ? <h3>Not Found</h3> : null}
      {!resultsLoaded? null : null}
    </div>
  );
};
