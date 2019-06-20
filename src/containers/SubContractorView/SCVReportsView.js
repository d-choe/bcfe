import React     from 'react';
import {connect} from 'react-redux';

import PropTypes    from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card         from '@material-ui/core/Card';
import Table        from '@material-ui/core/Table';
import TableBody    from '@material-ui/core/TableBody';
import TableHead    from '@material-ui/core/TableHead';
import TableRow     from '@material-ui/core/TableRow';

import CustomTableCell from '../../components/shared/CustomTableCell';

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(1),
    height: 'calc(100vh - 64px - 48px - 16px)',
    overflow: 'auto',
    overflowX: 'hidden',
  },
});

class ConnectedSCVReportsView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell align="center">A</CustomTableCell>
              <CustomTableCell align="center">A</CustomTableCell>
              <CustomTableCell align="center">A</CustomTableCell>
              <CustomTableCell align="center">A</CustomTableCell>
              <CustomTableCell align="center">A</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <CustomTableCell align="center">A</CustomTableCell>
              <CustomTableCell align="center">A</CustomTableCell>
              <CustomTableCell align="center">A</CustomTableCell>
              <CustomTableCell align="center">A</CustomTableCell>
              <CustomTableCell align="center">A</CustomTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

const SCVReportsView = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedSCVReportsView);

SCVReportsView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SCVReportsView);
