// const { createApolloFetch } = require('apollo-fetch')
require('isomorphic-fetch')
var remark = require('remark')
var recommended = require('remark-preset-lint-recommended')
var html = require('remark-html')
var report = require('vfile-reporter')

const host = 'https://awe-quiz-builder.herokuapp.com'

// const fetch = createApolloFetch({
//   uri: host+'/graphql'
// })

// const id = 1
const id = '5ee92fc00712a0ae8389be90'

// const query = `
// query {
//   quiz(id: "1") {
//     title
//     questions {
//       id
//       content
//       layout
//       answer_width
//       answer_gap
//       image_aspect_ratio
//       slug
//       answers {
//         image {
//           url
//         }
//         content
//         answer_metrics {
//           __typename
//           ...on ComponentMetricsMyersBriggs {
//             mind
//             energy
//             tactics
//             nature
//             identity
//           }
//           ...on ComponentMetricsCharity {
//             charity {
//               charity_name
//               amount_raised
//             }
//           }
//         }
//       }
//     }
//     interstitials {
//       id
//       label
//       content
//       layout
//       transition
//       slug
//       position {
//         __typename
//         ...on ComponentInterstitialAbsolute {
//           slot
//         }
//         ...on ComponentInterstitialRelativeToQuestion {
//           question {
//             id
//           }
//           question_offset
//         }
//       }
//     }
//     results {
//       result_name
//       description
//       result_metrics {
//         ... on ComponentMetricsMyersBriggs {
//           mind
//           energy
//           tactics
//           nature
//           identity
//         }
//       }
//     }
//     results_metrics {
//       ...on ComponentMetricsMyersBriggsResults {
//         mind {
//           result_name
//         }
//         energy {
//           result_name
//         }
//         nature {
//           result_name
//         }
//         tactics {
//           result_name
//         }
//         identity {
//           result_name
//         }
//       }
//     }
//     font_color
//     progress_color
//   }
// }`

module.exports = Promise.all([
    fetch(host+'/quizzes/'+id).then(res => res.json()),
    fetch(host+`/questions?quiz_eq=`+id).then(res => res.json()),
    fetch(host+'/interstitials?quiz_eq='+id).then(res => res.json())
  ]).then(([quiz, questions, interstitials]) => {
    const dataObj = preprocessQuiz(quiz, questions, interstitials)

    // dataObj.analytics = runAnalytics(dataObj)

    return dataObj
  }
)

function preprocessQuiz(quizObj, questionObj, interstitials) {
  const blank = deleteProps(blankPersonality(quizObj.results_metrics[0]), ['_id', 'id', 'createdAt', 'updatedAt', '__v', '__component'])
  console.log('blank', blank)

  quizObj.questions.forEach(q => { 
    //preformat question uris
    q.slug = 'q/'+q.slug

    // merge in answers to quiz's question data
    q.answers = questionObj.find(question => question.id === q.id).answers

    q.answers.forEach(a => a.answer_metrics = [{}])

    if (q.answer_metrics[0] && q.answer_metrics[0].__component === 'metrics.myers-briggs-answers') {
      q.answer_metrics[0] = deleteProps(q.answer_metrics[0], ['__component', '_id', 'createdAt', 'updatedAt', '__v'])

      Object.keys(q.answer_metrics[0]).forEach(key => {
        if (key === 'id') return

        q.answer_metrics[0][key].forEach((item, i, arr) => {
          const answer = q.answers.find(a => a.id === item.id)
          if (!answer.answer_metrics) {
            answer.answer_metrics = [{}]
          }
          const val = -1 + i * 2 / (arr.length - 1)
          answer.answer_metrics[0][key] = val
        })
      })
    } else if (q.answer_metrics[0] && q.answer_metrics[0].__component === 'metrics.charity') {
      q.answer_metrics.forEach(metric => {
        q.answers.find(a => a.id === metric.answer.id).answer_metrics[0] = {
          __component: metric.__component,
          charity: metric.charity,
        }
      })
    }

    console.log(q.answers.map(({label, answer_metrics}) => { label, answer_metrics }))
  
    remark()
      .use(recommended)
      .use(html)
      .process(q.content, function(err, file) {
        console.error(report(err || file))
        q.content = String(file)
      })

    // preprocess answers
    q.answers.forEach(a => {
      // reformat image urls to include host
      if (a.image) {
        a.image.url = host + a.image.url
      }

      if (!a.answer_metrics[0].__component) {
        a.answer_metrics[0].__component = 'metrics.myers-briggs-answers'
      }

      remark()
        .use(recommended)
        .use(html)
        .process(a.content, function(err, file) {
          console.error(report(err || file))
          a.content = String(file)
        })
    })

    q.answer_metrics = deleteProps(q.answer_metrics, ['id'])
  }) 

  // preprocess interstitials
  quizObj.interstitials = interstitials
  const interPropsToDelete = ['created_at', 'quiz', 'updated_at']

  // slot in the interstitials with the questions.
  quizObj.interstitials = quizObj.interstitials.map(interstitial => {
    interstitial = deleteProps(interstitial, interPropsToDelete)
    if (!interstitial.position[0]) return 
    if (interstitial.position[0].__component === 'interstitial.absolute') {
      quizObj.questions.splice(interstitial.position[0].slot, 0, interstitial)
    }
    else if (interstitial.position[0].__component === 'interstitial.relative-to-question') {
      quizObj.questions.splice(quizObj.questions.findIndex(elem => elem.id === interstitial.position[0].question.id) + interstitial.position[0].question_offset , 0, interstitial) 
    }

    // preformat interstitial slugs
    interstitial.slug = 'i/' + interstitial.slug

    remark()
      .use(recommended)
      .use(html)
      .process(interstitial.content, function(err, file) {
        console.error(report(err || file))
        interstitial.content = String(file)
      })

    return interstitial
  })


  //preprocess results_metrics
  const rmPropsToDelete = ['id', '_id', '__component', 'createdAt', 'updatedAt', '__v']
  quizObj.results_metrics[0] = deleteProps(quizObj.results_metrics[0], rmPropsToDelete)

  Object.keys(quizObj.results_metrics[0]).forEach(key => {
    quizObj.results_metrics[0][key].forEach((item, i, arr) => {
      const val = -1 + i * 2 / (arr.length - 1)
      item.value = val
    })
  })

  //preprocess results
  quizObj.results.forEach(result => {
    result.result_metrics = [Object.assign({}, blank)]
    Object.keys(result.result_metrics[0]).forEach(key => {
      result.result_metrics[0][key] = quizObj.results_metrics[0][key].find(item => item.result_name === result.result_name).value
    })
  })

  return cleanupQuiz(quizObj)
}

function cleanupQuiz(quizObj) {
  Object.keys(quizObj.results_metrics[0]).forEach(key => {
    quizObj.results_metrics[0][key] = quizObj.results_metrics[0][key].map(item => {
      return {
        result_name: item.result_name,
        value: item.value,
      }
    })
  })

  return quizObj
}



function runAnalytics(quizObj) {
  const analyticsObj = {}

  const questions = quizObj.questions.filter(q => q.slug.includes('q/'))

  analyticsObj.numPermutations = questions.map(q => q.answers.length)
    .reduce((acc, val) => acc * val, 1)

  analyticsObj.resultMetrics = processPermutations(
    questions.map(q => q.answers.map(a => a.answer_metrics[0])),
    analyticsObj.numPermutations,
    quizObj.results.map(({result_name, result_metrics}, i) => { return { result_name, result_metrics, count: 0, index: i } })
  )

  return analyticsObj
}

function processPermutations(qnaArray, numPermutations, resultArray) {
  const blank = deleteProps(blankPersonality(qnaArray[0][0]), ['__component'])
  // const heatmapObj = Object.assign({}, blank)
  const questionAnswerMaxes = qnaArray.map((q,i) => q.length)
  let questionAnswerIndices = qnaArray.map(_ => 0)


  for (let i=0; i < numPermutations; i++) {
    // run the permutation using questionAnswerIndices as our answers choices.
    const currPerm = questionAnswerIndices
      .map((aIndex, qIndex) => {
        return qnaArray[qIndex][aIndex]
      })
      .reduce((acc, val) => {
        if (val.__component === 'metrics.charity') return acc
        return sumObjectsByKeys(acc, deleteProps(val, ['__component']), qnaArray.length)
      }, blank)

    // Woah it's really easy to exceed the call stack max of JS
    // Object.keys(heatmapObj).map(key => { 
    //   heatmapObj[key] = (heatmapObj[key] !== 0) ? [...heatmapObj[key], currPerm[key]] : [currPerm[key]]
    // })

    const sortedResults = resultArray.sort((a,b) => {
      const diffA =  Math.abs(personalityDistSum(currPerm, deleteProps(a.result_metrics[0], ['__component'])))
      const diffB = Math.abs(personalityDistSum(currPerm, deleteProps(b.result_metrics[0],  ['__component'])))
      return (diffA < diffB) ? -1 : 1
    })

    resultArray[sortedResults[0].index].count++

    questionAnswerIndices = incrementAnswers(questionAnswerIndices, questionAnswerMaxes)
  }

  resultArray.forEach(res => { res.weight = qnaArray.length / numPermutations * res.count })

  console.log(resultArray)
  return resultArray
}

function blankPersonality (personalityObj) {
  const newPersonality = Object.assign({},personalityObj)

  Object.keys(newPersonality).forEach(key => newPersonality[key] = 0)

  return newPersonality
}

function sumObjectsByKeys(objA, objB, avgFac) {
  return Object.fromEntries(Object.keys(objA).map(key => [key, objA[key] + objB[key] / avgFac]))
}

function divideObjectByKeys(obj, divisor) {
  return Object.fromEntries(Object.keys(obj).map(key => [key, obj[key] / divisor]))
}

function incrementAnswers(curr, max) {
  let newCurr = [...curr]
  let overflow = true
  for (let i=0; i<newCurr.length; i++) {
    if (newCurr[i] + 1 >= max[i]) {
      overflow = true
      newCurr[i] = 0
    } else if (overflow) {
      newCurr[i]++
      overflow = false
    } else {
      break
    }
  }
  return newCurr
}

function personalityDistSum(mbObjA, mbObjB) {
  return Object.entries(personalityDistance(mbObjA, mbObjB))
      .map(entry => entry[1])
      .reduce((acc, val) => acc + val, 0)
}

function personalityDistance (mbObjA, mbObjB) {
  const distObj = {}

  Object.keys(mbObjA).forEach(key => distObj[key] = mbObjA[key] - mbObjB[key])

  return distObj
}

function deleteProps(obj, props) {
  const newObj = {}
  Object.keys(obj).forEach(key => {
    if (props.indexOf(key) === -1) {
      newObj[key] = obj[key]
    }
  })
  return newObj
}