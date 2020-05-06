import { createMuiTheme } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange'; // Where you get the collors 
import green from '@material-ui/core/colors/green';

const materialTheme = createMuiTheme({
  palette: {
    primary: orange,
    secondary: green,
  }
});

export default materialTheme