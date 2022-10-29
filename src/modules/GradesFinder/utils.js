const mandatorySubjects = [1, 29]

export const getSubjects = (data) => {
  return data.filter((item) => !mandatorySubjects.includes(Number(item.id)));
}

export const getMandatorySubjects = (data) => {
  return data.filter((item) => mandatorySubjects.includes(Number(item.id)));
}
