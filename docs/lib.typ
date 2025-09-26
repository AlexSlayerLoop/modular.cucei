#let conf(
  title: none,
  authors: (),
  abstract: [],
  keywords: [],
  bibliography: none,
  doc,
) = {
  /* set rules */
  set page(
    paper: "us-letter",
    margin: (left: 3cm, rest: 2.5cm),
    columns: 1,
    footer: context [
      #set align(right)
      #set text(size: 10pt)
      #counter(page).display("1")
    ],
  )
  set par(
    first-line-indent: 3em,
    justify: true,
    leading: 0.65em,
  )
  set text(font: "Times New Roman", size: 12pt)

  /* show rules */
  // 1
  show heading.where(level: 1): set heading(numbering: "I")
  show heading.where(level: 1): it => block(width: 100%)[
    #set align(center)
    #set text(size: 16pt, weight: "bold")
    #smallcaps(it)
  ]

  // 2
  show heading.where(level: 2): set heading(
    numbering: (.., last) => numbering("A.", last),
  )
  show heading.where(level: 2): it => block(width: 100%)[
    #set align(left)
    #set text(size: 14pt, weight: "bold")
    #it
  ]

  // 3
  show heading.where(level: 3): set heading(
    numbering: (.., last) => numbering("1)", last),
  )
  show heading.where(level: 3): it => text(
    size: 12pt,
    style: "italic",
    weight: "regular",
    it,
  )

  show link: set text(font: "Courier", size: 9pt)

  place(
    top + center,
    float: true,
    scope: "parent",
    clearance: 2em,
  )[
    #set align(center)
    #text(24pt, title)

    #let count = authors.len()
    #let ncols = calc.min(count, 2)
    #grid(
      columns: (1fr,) * ncols,
      row-gutter: 1.2em,
      column-gutter: 0.17in,
      ..authors.map(author => [
        #text(11pt)[#author.name] \
        #text(size: 10pt, style: "italic")[#author.affiliation] \
        #link("mailto:" + author.email)
      ]),
    )
  ]

  set align(left)

  par(justify: true)[
    *Abstract--- #abstract*
  ]

  block(
    width: 100%,
  )[*#keywords*]

  block(width: 100%)[
    *Repositorio del Código:* #h(1fr)
    https://github.com/AlexSlayerLoop/modular.cucei \
    *Versión actual del código:* #h(1fr) 0.1 \
    *Licencia del Código:* #h(1fr) Apache license 2.0 \
  ]

  doc

  bibliography
}
