import { createFilter } from 'rollup-pluginutils'
import Gherkin from 'gherkin'

function joinList(list, index) {
  return index !== list.length - 1 ? ',\n' : '\n'
}

export default function rollupPluginGherkin(options = {}) {
  const filter = createFilter(
    options.include || '**/*.feature',
    options.exclude,
  )
  return {
    name: 'gherkin',
    transform(code, id) {
      if (!filter(id)) return undefined
      const parser = new Gherkin.Parser()
      const document = parser.parse(code)
      const pickles = new Gherkin.Compiler().compile(document)
      // console.log(JSON.stringify(pickles, null, '  '))
      if (options.sourcemap !== false) {
        const { SourceNode } = require('source-map')

        const joinPickles = joinList.bind(null, pickles)
        const root = new SourceNode(null, null, id, [
          'const pickles = [\n',
          ...pickles.map((pickle, pickle_index) => {
            const [location] = pickle.locations
            return new SourceNode(
              location.line,
              location.column,
              id,
              [
                '  {\n',
                ...['tags', 'name', 'language', 'locations'].map(
                  key => `    ${key}: ${JSON.stringify(pickle[key])},\n`,
                ),
                '    steps: [\n',
                pickle.steps.map((step, step_index) => {
                  const [location] = step.locations
                  const joinSteps = joinList.bind(null, pickle.steps)
                  return new SourceNode(location.line, location.column, id, [
                    `      ${JSON.stringify(step)}`,
                    joinSteps(step_index),
                  ])
                }),
                '    ]\n  }',
                joinPickles(pickle_index),
              ],
              pickle.name,
            )
          }),
          ']\nexport default pickles\n',
        ])
        root.setSourceContent(id, code)

        const result = root.toStringWithSourceMap({ file: id })
        result.map = result.map.toString()
        return result
      }
      return { code: `export default ${JSON.stringify(pickles)}` }
    },
  }
}
