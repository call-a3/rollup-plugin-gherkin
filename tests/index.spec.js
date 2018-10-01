import { rollup } from 'rollup'
import hypothetical from 'rollup-plugin-hypothetical'

import rollupPluginGherkin from '../src'

test('should compile Gherkin code correctly', async () => {
  const bundle = await rollup({
    input: './test/gherkin.feature',
    plugins: [
      hypothetical({
        files: {
          './test/gherkin.feature': `Feature: Background

  Background: a simple background
    Given the minimalism inside a background


  Scenario: minimalistic
    Given the minimalism
    When a minimalist is minimalistic
    Then minimalism is minimally achieved
`,
        },
      }),
      rollupPluginGherkin(),
    ],
  })

  const { code, map } = await bundle.generate({ format: 'es', sourcemap: true })

  expect(code).toMatchSnapshot()
  expect(map).not.toBeFalsy()
})

test('should not crash on an empty file', async () => {
  const bundle = await rollup({
    input: './test/gherkin.feature',
    plugins: [
      hypothetical({
        files: {
          './test/gherkin.feature': '',
        },
      }),
      rollupPluginGherkin(),
    ],
  })

  const { code, map } = await bundle.generate({ format: 'es', sourcemap: true })

  expect(code).toMatchSnapshot()
  expect(map).not.toBeFalsy()
})

test('should not output a sourcemap when disabled', async () => {
  const bundle = await rollup({
    input: './test/gherkin.feature',
    plugins: [
      hypothetical({
        files: {
          './test/gherkin.feature': `Feature: minimalism

  Scenario: minimalistic
    Given the minimalism
`,
        },
      }),
      rollupPluginGherkin({
        sourcemap: false,
      }),
    ],
  })

  const { map } = await bundle.generate({ format: 'es', sourcemap: false })

  expect(map).toBeFalsy()
})

test('should not touch a non-gherkin file', async () => {
  const bundle = await rollup({
    input: './test/gherkin.js',
    plugins: [
      hypothetical({
        files: {
          './test/gherkin.js': `console.log(42)
`,
        },
      }),
      rollupPluginGherkin(),
    ],
  })

  const { map } = await bundle.generate({ format: 'es', sourcemap: false })

  expect(map).toBeFalsy()
})
