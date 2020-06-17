const { createApolloFetch } = require('apollo-fetch')

const fetch = createApolloFetch({
  uri: 'https://awe-quiz-builder.herokuapp.com/graphql'
})

const query = `
query {
  quiz(id: "5ee92fc00712a0ae8389be90") {
    title
    questions {
      content
      layout
      answer_width
      answer_gap
      slug
      answers {
        content
        answer_metrics {
          ...on ComponentMetricsMyersBriggs {
            mind
            energy
            tactics
            nature
            identity
          }
        }
      }
    }
    results {
      result_name
      description
      result_metrics {
        ... on ComponentMetricsMyersBriggs {
          mind
          energy
          tactics
          nature
          identity
        }
      }
    }
  }
}`

module.exports = fetch({ query }).then(result => {
  const dataObj = result.data.quiz
  // dataObj.analytics = runAnalytics(dataObj)

  return dataObj
})



// function runAnalytics(quizObj) {
//   const analyticsObj = {}

//   analyticsObj.numPermutations = quizObj.questions.map(q => q.answers.length)
//                                                .reduce((acc, val) => acc * val, 1)

//   analyticsObj.resultMetrics = processPermutations(
//     quizObj.questions.map(q => q.answers.map(a => a.answer_metrics[0])),
//     analyticsObj.numPermutations,
//     quizObj.results.map(({result_name, result_metrics}, i) => { return { result_name, result_metrics, count: 0, index: i } })
//   )

//   return analyticsObj
// }

// function processPermutations(qnaArray, numPermutations, resultArray) {
//   const blank = blankPersonality(qnaArray[0][0])
//   const heatmapObj = Object.assign({}, blank)
//   const questionAnswerMaxes = qnaArray.map((q,i) => q.length)
//   let questionAnswerIndices = qnaArray.map(_ => 0)


//   for (let i=0; i < numPermutations; i++) {
//     // run the permutation using questionAnswerIndices as our answers choices.
//     const currPerm = questionAnswerIndices
//       .map((aIndex, qIndex) => {
//         return qnaArray[qIndex][aIndex]
//       })
//       .reduce((acc, val) => {
//         return sumObjectsByKeys(acc, val, qnaArray.length)
//       }, blank)

//     // Woah it's really easy to exceed the call stack max of JS
//     // Object.keys(heatmapObj).map(key => { 
//     //   heatmapObj[key] = (heatmapObj[key] !== 0) ? [...heatmapObj[key], currPerm[key]] : [currPerm[key]]
//     // })

//     const sortedResults = resultArray.sort((a,b) => {
//       const diffA =  Math.abs(personalityDistSum(currPerm, a.result_metrics[0]))
//       const diffB = Math.abs(personalityDistSum(currPerm, b.result_metrics[0]))
//       return (diffA < diffB) ? -1 : 1
//     })

//     resultArray[sortedResults[0].index].count++

//     questionAnswerIndices = incrementAnswers(questionAnswerIndices, questionAnswerMaxes)
//   }

//   resultArray.forEach(res => { res.weight = qnaArray.length / numPermutations * res.count })

//   console.log(resultArray)
//   return resultArray
// }

// function blankPersonality (personalityObj) {
//   const newPersonality = Object.assign({},personalityObj)

//   Object.keys(newPersonality).forEach(key => newPersonality[key] = 0)

//   return newPersonality
// }

// function sumObjectsByKeys(objA, objB, avgFac) {
//   return Object.fromEntries(Object.keys(objA).map(key => [key, objA[key] + objB[key] / avgFac]))
// }

// function divideObjectByKeys(obj, divisor) {
//   return Object.fromEntries(Object.keys(obj).map(key => [key, obj[key] / divisor]))
// }

// function incrementAnswers(curr, max) {
//   let newCurr = [...curr]
//   let overflow = true
//   for (let i=0; i<newCurr.length; i++) {
//     if (newCurr[i] + 1 >= max[i]) {
//       overflow = true
//       newCurr[i] = 0
//     } else if (overflow) {
//       newCurr[i]++
//       overflow = false
//     } else {
//       break
//     }
//   }
//   return newCurr
// }

// function personalityDistSum(mbObjA, mbObjB) {
//   return Object.entries(personalityDistance(mbObjA, mbObjB))
//       .map(entry => entry[1])
//       .reduce((acc, val) => acc + val, 0)
// }

// function personalityDistance (mbObjA, mbObjB) {
//   const distObj = {}

//   Object.keys(mbObjA).forEach(key => distObj[key] = mbObjA[key] - mbObjB[key])

//   return distObj
// }