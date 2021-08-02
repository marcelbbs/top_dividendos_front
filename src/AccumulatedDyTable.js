import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/core/styles';


const styles = theme =>({
  head: {    
    fontWeight: 'bold'    
  },
  table: {  
    width: '100%'    
  },
  
});


class AccumulatedDyTable extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
          };
    }

    componentDidMount() {
        fetch("http://localhost:3000/obterRecomendadasAcumulado")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              items: result
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }

    render(){
      const { classes } = this.props;
      const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
          } else if (!isLoaded) {
            return <div>Loading...</div>;
          } else {
            return (              
                <TableContainer component={Paper} >
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead >
                            <TableRow>
                                <TableCell align="left" className={classes.head}>Ação</TableCell>
                                <TableCell align="left" className={classes.head}>Média de d.y. <br></br>dos últ. 3 anos</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map(item =>(
                                <TableRow key={item.acumulado.acao}>
                                    <TableCell component="th" scope="row">
                                        {item.acumulado.acao}
                                    </TableCell>
                                    <TableCell >
                                        {item.acumulado.mediaDe3Anos.toFixed(2).replace('.',',')}%
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>                    
            );
        }
    }   
}

export default withStyles(styles)(AccumulatedDyTable);
    

