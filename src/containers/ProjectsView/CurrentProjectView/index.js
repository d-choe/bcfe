import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllProjects } from '../../../actions/gen-actions';
import { createStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { CircularProgress, Table, TableBody, TableHead, TablePagination, TableRow } from '@material-ui/core';

import CustomTableCell from '../../../components/shared/CustomTableCell';
import { compose } from "redux";

const styles = theme => createStyles({
  root: {
    flexGrow: 1,
    height: 'calc(100vh - 64px - 48px - 16px)',
    overflow: 'hidden',
  },
  tableWrap: {
    overflow: 'auto',
    maxHeight: 'calc(100vh - 64px - 48px - 48px - 16px)',
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  waitingSpin: {
    position: 'relative',
    left: 'calc(50% - 10px)',
    top: 'calc(40vh)',
  },
});

class CurrentProjectView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rowsPerPage: 20,
      currentPage: 0,
    };
  }

  componentDidMount() {
    this.props.getAllProjects(0, 0);
  }

  handleChangePage = (event, page) => {
    // const { userProfile } = this.props;
    this.setState({ currentPage: page });

    this.props.getAllProjects(page, this.state.rowsPerPage);
  };

  handleChangeRowsPerPage = event => {
    const { projects } = this.props;

    const rowsPerPage = event.target.value;
    const currentPage =
      rowsPerPage >= projects.totalElements ? 0 : this.state.currentPage;

    this.setState({
      rowsPerPage: rowsPerPage,
      currentPage: currentPage,
    });

    this.props.getAllProjects(currentPage, rowsPerPage);
  };

  render() {
    const { classes, projects } = this.props;

    if (projects === null) {
      return <CircularProgress className={classes.waitingSpin} />;
    }

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrap}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell> Project Title </CustomTableCell>
                <CustomTableCell align="center">Budget</CustomTableCell>
                <CustomTableCell align="center">Due Date</CustomTableCell>
                <CustomTableCell align="center">Discription</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.content.map(row => (
                <TableRow
                  className={classes.row}
                  key={row.id}
                  hover
                  onClick={() => {
                    this.props.history.push('/projects/project_detail/' + row.id);
                  }}
                >
                  <CustomTableCell component="th" scope="row">
                    {row.title}
                  </CustomTableCell>
                  <CustomTableCell align="center">{row.budget}</CustomTableCell>
                  <CustomTableCell align="center">{row.due && row.due.slice(0, 10)}</CustomTableCell>
                  <CustomTableCell align="center">
                    {row.description}
                  </CustomTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          style={{ overflow: 'auto' }}
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={projects.totalElements}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.currentPage}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllProjects: (page, size) => dispatch(getAllProjects(page, size)),
  };
};

const mapStateToProps = state => ({
  projects: state.gen_data.allprojects,
});

export default compose(
  withRouter,
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
)(CurrentProjectView)
