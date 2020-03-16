<script>
  export let country;
</script>

<style>
  div {
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    /* border: 1px solid #ddd; */
    border-radius: 8px;
    box-sizing: border-box;
    box-shadow: 1px 1px 4px #ccc;
    /* width: 300px; */
    height: 300px;
  }
  h3 {
    /* margin: 0px; */
    font-size: 28px;
  }
</style>

<div>
  <h3>{country.country}</h3>
  <p>{country.caseCount} cases</p>
  <p>{country.deathCount} deaths</p>
  <p>Growth rate: {Math.round(country.growthRateLast10Days * 100) / 100}x</p>
</div>
