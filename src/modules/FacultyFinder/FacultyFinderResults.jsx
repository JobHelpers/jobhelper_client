import { UniversityIcon } from "../../components";
import "./css/styles.css";

// Needed visual symbols: ✅, ❌

export const FacultyFinderResults = ({ searchResults, loading }) => {
  return (
    <div className="results">
      {loading ? (
        // Loader
        <div class="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : null}
      {searchResults?.length
        ? searchResults.map((u) => (
            <div key={u.id}>
              <div className="university">
                <div className="u-icon">
                  <UniversityIcon />
                </div>
                <div className="u-name">{u.name}</div>
              </div>
              {u?.faculties?.length ? (
                <ul>
                  {u?.faculties.map((f) => (
                    <li key={f.id}>{f.name}</li>
                  ))}
                </ul>
              ) : null}
              <div class="footer-line"></div>
            </div>
          ))
        : null}
    </div>
  );
};
