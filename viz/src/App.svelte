<script>
  import { onMount } from "svelte";
  import Summary from "./components/Summary.svelte";
  import CountryChart from "./components/CountryChart.svelte";
  import Layout from "./Layout.svelte";
  import countries from "./../growthRate.json";

  let sortBy = "growthRateLast10Days";
  const setSortBy = _sortBy => {
    sortBy = _sortBy;
  };

  export let name;
</script>

<style>
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
  #countryboxes {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 5px;
    grid-auto-flow: row;
  }
  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<Layout>
  <h1 slot="header">Covid 19</h1>
  <!-- <div slot="side">
    <ul>
      <li>Hej</li>
      <li>Hoj</li>
    </ul>
  </div> -->
  <div slot="main">
    <Summary />
    <p>
      Sort by
      <button
        disabled={sortBy === 'caseCount'}
        on:click={setSortBy.bind(null, 'caseCount')}>
        cases
      </button>
      <button
        disabled={sortBy === 'deathCount'}
        on:click={setSortBy.bind(null, 'deathCount')}>
        deaths
      </button>
      <button
        disabled={sortBy === 'growthRateLast10Days'}
        on:click={setSortBy.bind(null, 'growthRateLast10Days')}>
        growth rate
      </button>
    </p>
    <div id="countryboxes">
      {#each countries.sort((a, b) => {
        return a[sortBy] > b[sortBy] ? -1 : 1;
      }) as country}
        <CountryChart {country} />
      {/each}
    </div>
  </div>
</Layout>
