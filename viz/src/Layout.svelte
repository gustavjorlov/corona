<style>
  header {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-area: header;
  }
  div {
    box-sizing: border-box;
    /* border: 1px solid #eee; */
  }
  div#content {
    display: grid;
    grid-gap: 5px;
    grid-template-areas: "header header" "main main";
    grid-template-columns: 200px auto;
  }
  div#side {
    grid-area: side;
  }
  div#main {
    grid-area: main;
    padding: 5px;
  }
</style>

<div id="content">
  <header>
    <slot name="header" />
  </header>
  <!-- <div id="side">
    <slot name="side" />
  </div> -->
  <div id="main">
    <slot name="main" />
  </div>
  <slot />
</div>
