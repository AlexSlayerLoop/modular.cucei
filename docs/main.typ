#import "./lib.typ" as t

#show: t.conf.with(
  title: [
    SISGE
  ],
  abstract: include "modulos/abstract.typ",
  authors: (
    (
      name: "Alejandro Suárez López",
      affiliation: "CENTRO UNIVERSITARIO DE CIENCIAS EXACTAS E INGENIERIAS (CUCEI, UDG)",
      email: "alex-suarez@live.com",
    ),
    (
      name: "Diego Alejandro Martinez Melendez",
      affiliation: "CENTRO UNIVERSITARIO DE CIENCIAS EXACTAS E INGENIERIAS (CUCEI, UDG)",
      email: "diego.martinez4954@alumnos.udg.mx",
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
#include "modulos/diseno.typ"

= Implementación
#include "modulos/implementacion.typ"

= Conclusiones
#include "modulos/conclusiones.typ"
