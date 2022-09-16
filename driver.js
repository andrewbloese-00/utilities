const X = require("./services");

const article = `An excerpt is a quoted fragment from a book, novel, poem, short story, article, speech, or other literary work that is used to give the reader a specific example from the source. The term excerpt has been used since the 15th century and originates from a Latin word meaning ''plucked out.'' Synonyms for excerpt include quotation, quote, fragment, and extract.

Writers use excerpts for several reasons. These can be grouped into three categories.

First, a writer can use an excerpt to support what they feel or think about a subject. More specifically, a writer may incorporate an excerpt to:

Strengthen their argument by incorporating the language of an authoritative writer.
Argue against another writer's position on a topic and clarify the strengths of their own position.
Second, a writer can use an excerpt to focus readers' attention on what they want them to understand and remember. More specifically, a writer may incorporate an excerpt to:

Help the reader understand something that is new, important, or complex.
Include a distinctive phrase from someone else's writing that will stick in the reader's memory.
Third, a writer can incorporate an excerpt when they intend to analyze the excerpt or offer their own commentary on the excerpt.

Regardless of the writer's reason for using an excerpt, an excerpt in a sentence is always surrounded by quotation marks.`
const angle =  X.str.getFrequencyTable(article,true)
console.log(angle)