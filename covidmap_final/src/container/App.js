import Shanghai from "./Shanghai";
import '../style/App.css'
function App() {
  return (
    <>
      <header>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.2.0/dist/leaflet.css"
        />
        <script src="https://unpkg.com/leaflet@1.2.0/dist/leaflet.js"></script>
      </header>
      <Shanghai />
    </>
  );
}

export default App;
