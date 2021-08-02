import './App.css';
import AccumulatedDyTable from './AccumulatedDyTable';
import Box from '@material-ui/core/Box';

function App() {
  return (    
    <div className="App">
      
      <Box style={{  padding: '0 200px' }}>
        <h3>Maiores pagadoras</h3>
        <AccumulatedDyTable />
      </Box>      
     
    </div>
  );
}

export default App;
