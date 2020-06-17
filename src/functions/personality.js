export const calculateMyersBriggs = (mbObj) => {
    return ((mbObj.mind < 0) ? 'I' : 'E') +
           ((mbObj.energy < 0) ? 'S' : 'N') +
           ((mbObj.nature < 0) ? 'T' : 'F') +
           ((mbObj.tactics < 0) ? 'J' : 'P') + 
           '-' +
           ((mbObj.identity < 0) ? 'A' : 'T')
}

export const personalityDistance = (mbObjA, mbObjB) => {
    const distObj = {}

    Object.keys(mbObjA).forEach(key => distObj[key] = mbObjA[key] - mbObjB[key])

    return distObj
}

export const personalityDistSum = (mbObjA, mbObjB) => {
    return Object.entries(personalityDistance(mbObjA, mbObjB))
        .map(entry => entry[1])
        .reduce((acc, val) => acc + Math.abs(val), 0)
}

export const blankPersonality = (personalityObj) => {
    const newPersonality = Object.assign({},personalityObj)

    Object.keys(newPersonality).forEach(key => newPersonality[key] = 0)

    return newPersonality
}
