import { generateMessages } from '@cucumber/gherkin'
import { IdGenerator, SourceMediaType, type Envelope } from '@cucumber/messages'

export interface GherkinParseError {
  message: string
  line?: number
  column?: number
}

export interface GherkinParseResult {
  valid: boolean
  errors: GherkinParseError[]
  ast: Envelope['gherkinDocument'] | null
  uri: string
}

export function parseFeature(source: string, uri = 'feature.feature'): GherkinParseResult {
  const errors: GherkinParseError[] = []
  let ast: Envelope['gherkinDocument'] | null = null

  const messages = generateMessages(source, uri, SourceMediaType.TEXT_X_CUCUMBER_GHERKIN_PLAIN, {
    newId: IdGenerator.uuid(),
    includeSource: false,
    includePickles: false,
    includeGherkinDocument: true,
  })

  for (const envelope of messages) {
    if (envelope.parseError) {
      errors.push({
        message: envelope.parseError.message,
        line: envelope.parseError.source?.location?.line,
        column: envelope.parseError.source?.location?.column,
      })
    }
    if (envelope.gherkinDocument) {
      ast = envelope.gherkinDocument
    }
  }

  return { valid: errors.length === 0, errors, ast, uri }
}
