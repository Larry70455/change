# What the redaction step does and does not do

`ingest/redact.py` removes phone numbers, emails, links, street addresses, card
and SSN patterns, and substitutes every known contact name with a role label.
That is real and worth doing. It is also not anonymization, and the difference
matters if this goes public with your name on it.

## Why stripping numbers is not enough

**You are the index.** The account is published under your name, tied to your
custody case. Anyone who knows you knows who "the kids' mother" is. The alias
does not conceal her; it just removes her name from the page. For anyone in
your life, the mapping is obvious on sight.

**Content re-identifies.** A message can name a school, a birthday, an employer,
a car, a diagnosis, an in-joke. A person is reconstructable from a handful of
those even with every proper noun stripped. The residual-name scan catches
capitalized words; it cannot catch "the place we went after the hearing."

**Scrubbing is pattern matching.** It finds what it has patterns for. A surname
that never appeared in your contacts, a nickname, a misspelling, a number
written as words — these ride straight through. That is why the tool prints a
review list instead of reporting success. Read it every run.

**Her messages are hers.** She wrote them to you privately. Publishing them
pseudonymously is still publishing them. That is a choice you are making on her
behalf, and no amount of scrubbing converts it into her choice.

**The kids have the strongest claim and no say.** A pseudonymized custody
narrative is still searchable by the people who know the family, permanently,
including by them at an age they can read it.

## About the "AI has sanitized this" preface

If the preface is read as *the tool removed identifying details*, it is
accurate. If it is read as *the people in this are unidentifiable*, it is not,
and it may do harm by making readers — and you — less careful than the material
warrants.

If you want a preface that holds up, say what is true:

> Names, numbers, and addresses have been removed or replaced. The people
> described are still identifiable to anyone who knows me. Their words are
> quoted without their consent, and that is my decision, not theirs.

That sentence costs nothing and is defensible. The vaguer version is not.

## Worth doing before publishing anything

- Read the residual-name list on every run, not the first one only.
- Read every kept message yourself. The tool decides nothing about content.
- `include: false` is the default for a reason. Add people deliberately.
- Show a family-law attorney in Oklahoma the actual draft, not a description of
  it. A self-authored account is ordinarily an admission by a party opponent;
  the pseudonyms do not change that, and neither does calling it a narrative.
