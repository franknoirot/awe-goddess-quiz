import fs from 'fs'
import requireFromString from 'require-from-string'

export default async ({ content, attributes }) => {
    if (attributes.role !== 'build-vars') return
    
    // console.log('from within scripts preprocessing!', content)

    let variables = content.split(/;\s*\n\t?|\s*\n\t?/g)
        .map(str => str.trim())
        .filter(possibleVarStr => possibleVarStr && !possibleVarStr.startsWith('//') && /const|let|var/.test(possibleVarStr))
        .map(varStr => {
            const matches = /(const|let|var)\s+(\w+)\s+=\s+(\S+)/.exec(varStr)

            return {
                name: matches[2],
                path: matches[3].replace(/'|"|`/g, ''),
            }
        });

    let variablePromises = await Promise.all(variables.map(async varObj => {
        var strFileContents = fs.readFileSync( './src/svelte-build-vars/'+varObj.path, 'utf8' );

        return requireFromString(strFileContents)
    }))

    // console.log(variables, variablePromises)

    const code = `\t` + variables.map((varObj, i) => {
        return `let ${ varObj.name } = ${ JSON.stringify(variablePromises[i]) };`
    }).join('\n\t')

    // console.log(code);

    return {
        code
    }
}