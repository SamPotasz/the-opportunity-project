describe('Sprints test', () => {
  const base = '/sprints/'
  const sprintUrls = ['', 'natural-environment', 'built-environment', 'geo-cohort', '2020-census', 'workforce', 'past-sprints']
  it('has the right number of subnav elements', () => {
    for(let i = 0; i < sprintUrls.length; i++) {
      const url = sprintUrls[i]
      cy.visit(base + url)
      cy.get('#sprint-nav ul').children()
        .should('have.length', sprintUrls.length - 1)
    }
  })

  it('highlights the subnav', () => {
    for(let i = 0; i < sprintUrls.length; i++) {
      const url = sprintUrls[i]
      cy.visit(base + url)      
      
      const index = i > 0 ? i - 1 : i
      cy.get('#sprint-nav ul>li>a')
        .eq(index).should('have.class', 'highlight')
    }
  })

  it('recent sprints have 4 problem statements', () => {
    for(let i = 0; i < sprintUrls.length - 1; i++) {
      const url = sprintUrls[i]
      cy.visit(base + url)
      cy.get('.problem-statement').should('have.length', 4)
    }
  })

  it('links to related products return 200s', () => {
    for(let i = 0; i < sprintUrls.length - 1; i++) {
      const url = sprintUrls[i]
      cy.visit(base + url)
      cy.get('.explore-products')
        .should('have.length.at.least', 2)
      cy.get('.explore-products').each(link => {
        cy.request(link.prop('href'))
          .its('status')
          .should('eq', 200)
      })
    }
  })

  it('shows >0 related products after clicking Explore All Products', () => {
    for(let i = 1; i < sprintUrls.length - 1; i++) {
      const url = sprintUrls[i]
      cy.visit(base + url)
      cy.document().then(doc => {
        const links = doc.querySelectorAll('.explore-products')
        for(let i = 0; i < links.length; i++){
          cy.get('.explore-products').eq(i).click({force: true})
          cy.location('pathname').should('eq', '/showcase/')
          const searchString = links[i].href.split("/").pop()
          const term = searchString.split('=').pop()
          cy.location('search').should('eq', searchString)
          cy.get('#search-field').should('have.value', term)
          cy.get('.product-card:not(.pc-inactive)')
            .should('have.length.at.least', 1)

          cy.go('back')
          cy.location('pathname').should('eq', `${base}${url}/`)
        }
      })
    }
  })
})

describe.skip('past sprints test', () => {
  const categories = [
    { name: "Workforce", amt: 5 },
    { name: "Education", amt:  7 },
    { name: "Equity", amt: 3 },
    { name: "Housing", amt: 3}
  ]
  const numPs = categories.reduce(
    ((accumulator, currVal) => accumulator + currVal.amt), 0)
  console.log(numPs)

  beforeEach(() => {
    cy.visit('/sprints/past-sprints/')
  })

  it('displays right amt of sprints', () => {
    cy.get('.problem-statement').should('have.length', numPs)
  })

  it('displays right amt of sprints per category', () => {
    // open the page with workforce selected
    cy.get('.problem-statement.ps-active')
      .should('have.length', categories[0].amt)
    
    for(const cat of categories) {
      cy.get(`#${cat.name}`).click()
      cy.get('.problem-statement.ps-active')
        .should('have.length', cat.amt)
    }

    // click first button again
    cy.get(`#${categories[0].name}`).click()
    cy.get('.problem-statement.ps-active')
      .should('have.length', categories[0].amt)
  })
})