import { useEffect } from "react";
// import {
//   getCities,
//   getSpecialities,
//   getSubjects,
//   getUniversities,
//   getFaculties,
//   getSpecialitiesWithGroupedSubjects,
//   getSpecialitiesWithSubjects
// } from './api';

function App() {

  useEffect(() => {
    // getCities().then((c) => console.log(c.data));
    // getSpecialities().then((c) => console.log(c.data));
    // getSpecialitiesWithSubjects().then((c) => console.log(c.data));
    // getSpecialitiesWithGroupedSubjects().then((c) => console.log(c.data));
    // getSubjects().then((c) => console.log(c.data));
    // getUniversities({ speciality: 122, city: 1 }).then((c) => console.log(c.data));
    // getFaculties({ university: 244, speciality: 122 }).then((c) => console.log(c.data));
  }, []);

  return (
    <div>App</div>
  );
}

export default App;
