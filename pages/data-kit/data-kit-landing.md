---
title: Curated Datasets
permalink: /data/
layout: default
permalink: /data/
lead: Discover issue-specific data recommended by government experts and test-driven by teams working to solve the nation’s biggest challenges.
organization: by The Opportunity Project

cards:
  - title: Workforce Challenges
    image: data-kits/workforce.png
    image-alt: Men in construction protective gear overlooking an area being developed
    link: data/workforce
  - title: Earth Cohort
    image: data-kits/gis.png
    image-alt: Partial view of a paper map of North America laying on a wooden tabletop
    link: data/earth-cohort

---

{% assign data-kits = site.data.data-kits %}
<section class="bg-primary-vivid">
  <section class="usa-section usa-graphic-list grid-container">
    <div class="maxw-mobile-lg desktop:margin-bottom-4">
      <h1 class="hero--heading text-white">
        {{ page.title }}
      </h1>
      <p class="font-sans-2xs text-white">{{ page.organization }}</p>
      <p class="font-sans-md text-white">{{ page.lead }}</p>
    </div>
  </section>
  <div class="data-kit  desktop:margin-left-9">
    <div class="grid-row grid-gap-6">
      {% for kit in data-kits limit:4 %}
      <div class="desktop:grid-col-4 tablet:grid-col-6 data-kit__container">
        <a class="data-kit__button" href="{{site.baseurl}}/{{kit.link}}">
          {% if kit.upcoming %}
          <div class="data-kit__card z-100" style="background-image: url('{{ kit.image | relative_url }}')">
          {% else %}
          <div class="data-kit__card data-kit__active z-100" style="background-image: url('{{ kit.image | relative_url }}')">
            {% endif %}
            <h2 class="z-200">{{kit.title}}</h2>
            <p class="z-200">{{kit.description}}</p>
            {% if kit.upcoming %}
            {% else %}
            <img class="data-kit__arrow" src="{{site.baseurl}}/assets/img/icons/right-arrow.svg" alt="Right Arrow" />
            {% endif %}
          </div>
        </a>
        <div class="data-kit__bg">
          {% if kit.upcoming %}
          <div class="data-kit__upcoming">
            Coming Soon
          </div>
          {% else %}
          <div class="data-kit__stats">
            <img class="data-kit__icon-items" src="{{site.baseurl}}/assets/img/icons/items.svg" alt="Icon for number of datasets"/>
            <p>{{kit.datasets}}</p>
          </div>
          {% endif %}
        </div>
      </div>
      {% endfor %}
    </div>
  </div>
  <div class="padding-x-2 padding-bottom-5 measure-6 margin-x-auto">
    <details class="data-source">
      <summary class="text-white text-bold text-center">Learn more about this project</summary>
      <div class="dkh-details">
        <p class="dkh-details-p">Curated Datasets is a product of <a href="/">The Opportunity Project (TOP)</a>.  TOP brings together the tech industry, government data, and communities through 12-week tech development sprints to create digital products using open data. Since 2016, TOP has catalyzed over 100 products that solve real world problems for Americans. In each sprint, TOP crowdsources suggested datasets and tips from data and subject matter experts across government. The data listed here reflects those expert recommendations, along with useful information on each, and an expert point of contact who can answer questions about the data.  Use these insights to speed up data discovery and kick-start your own project!</p>
        <p class="dkh-details-p">The workforce data module is an evolution of the White House’s JobKit initiative, which compiled federal workforce data from 5 APIs to spur data-driven innovation for the American worker. We built on JobKit by incorporating insights from The Opportunity Project’s 2019 Sprint on Investing in the American Workforce in All Communities, in which workforce data experts from across government helped to curate a total of 57 data sets that are most useful for addressing 4 critical workforce challenges.</p>
      </div>
    </details>
  </div>
</section>
