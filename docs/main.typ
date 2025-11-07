#import "./lib.typ" as t

#show: t.conf.with(
  title: [
    SIRC AI
  ],
  abstract: include "modulos/abstract.typ",
  authors: (
    (
      name: "Alejandro Suárez López",
      affiliation: "CENTRO UNIVERSITARIO DE CIENCIAS EXACTAS E INGENIERIAS (CUCEI, UDG)",
      email: "alex-suarez@live.com",
    ),
    (
      name: "Diego Alejandro",
      affiliation: "CENTRO UNIVERSITARIO DE CIENCIAS EXACTAS E INGENIERIAS (CUCEI, UDG)",
      email: "alejandro.suarez6397@alumnos.udg.mx",
    ),
    (
      name: "Eugene Deklan",
      affiliation: "Honduras State",
      email: "e.deklan@hstate.hn",
    ),
  ),
  keywords: [Palabras Clave--- Registro de candidaturas; inteligencia
    artificial; visión por computadora; OCR; verificación documental; sistemas
    distribuidos; procesos electorales; gobierno digital. ],
  bibliography: bibliography(
    "refs.bib",
    full: true,
    title: "Referencias Bibliográficas",
  ),
)

// PD: una cuartilla equivale entre 250 y 300 palabras aproximadamente.

= Introducción
#include "modulos/introduccion.typ"

= Planteamiento del Problema
#include "modulos/planteamiento_del_problema.typ"

= Objetivos
#include "modulos/objetivos.typ" // TODO: TERMINAR

= Justificación
#include "modulos/justficacion.typ" // TODO: TERMINAR

= Estado del Arte
#include "modulos/estado_del_arte.typ"

= Hipótesis
#include "modulos/hipotesis.typ" // TODO: TERMINAR

= Diseño
#include "modulos/diseno.typ" // TODO: completar

= Implementación
#include "modulos/implementacion.typ" // TODO: TERMINAR

= Conclusiones
#include "modulos/conclusiones.typ" // TODO: TERMINAR
