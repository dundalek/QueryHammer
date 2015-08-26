# QueryHammer

QueryHammer is a visual tool that helps you create queries interactively.

*Work in Progress - when there is something to show this readme will be updated.*

## Motivation

Existing database systems usually use text-based query language for data retrieval. There are basically two ways how you can specify your query:

- text based languages
  - flexible
  - but time consuming to learn
- graphical interfaces
  - intutive, small learning curve
  - but offer limited functuonality
  - hand-crafted - when the new specification is released, these tools need to be updated manually (and that is why they usually offer limited functionality)

The goal of this tool is to combine best of both approaches and work universally for different query languages. This can be achieved by using a formal grammar of the query language (in EBNF or similar format) and generate user interface from it. Additionally a file containing description of keywords and other annotations can be supplied and the tool will display interactive hints that will guide you
