import React                                from 'react';
import {Link, Redirect, Switch, withRouter} from 'react-router-dom';
import SecuredRoute                         from '../../routers/SecuredRoute';
import {connect}                            from 'react-redux';
import {withStyles}                         from '@material-ui/core/styles';
import AppBar                               from '@material-ui/core/AppBar';
import Tabs                                 from '@material-ui/core/Tabs';
import NoSsr                                from '@material-ui/core/NoSsr';
import Tab                                  from '@material-ui/core/Tab';
import AppsIcon                             from '@material-ui/icons/Apps';
import CurrentProjectView                   from './CurrentProjectView/index';
import ProjectDetailView                    from '../../components/ProjectDetailView';
import ProposalDetailView                   from '../../components/ProposalDetailView';
import {compose}                            from 'redux';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  contentWrapper: {
    marginTop: theme.spacing(1),
  },
  toolbarstyle: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.dark,
  },
  buttonAdditional: {
    position: 'absolute',
    float: 'right',
    right: '0',
  },
  waitingSpin: {
    position: 'relative',
    left: 'calc(50% - 10px)',
    top: 'calc(40vh)',
  },
});

class ProjectsView extends React.Component {
  render() {
    const { classes, userProfile, location } = this.props;
    const tabNo = {
      '/projects': 0,
      '/projects/current_pros': 0,
    };

    let curTabPos = tabNo[location.pathname];
    //if (location.pathname.includes("/a_pros/project_detail"))
    curTabPos = 0;

    if (
      !userProfile.user_metadata.roles.includes('Gen') &&
      !userProfile.user_metadata.roles.includes('GenSub') &&
      !userProfile.user_metadata.roles.includes('SuperAdmin')
    )
      return <div> Access Forbidden </div>;

    return (
      <NoSsr>
        <div className={classes.root}>
          <AppBar position="static" className={classes.toolbarstyle}>
            <Tabs value={curTabPos} variant="scrollable" scrollButtons="on">
              <Tab
                component={Link}
                to={`/projects/current_pros`}
                label="Current Projects"
                icon={<AppsIcon />}
              />
            </Tabs>
          </AppBar>

          <main className={classes.contentWrapper}>
            <Switch>
              <SecuredRoute
                path="/projects/current"
                component={CurrentProjectView}
              />
              <SecuredRoute
                path="/projects/proposal_detail/:id"
                component={ProposalDetailView}
              />
              <SecuredRoute
                path="/projects/project_detail/:id"
                component={ProjectDetailView}
              />
              <Redirect path="/projects" to={`/projects/current`} />
            </Switch>
          </main>
        </div>
      </NoSsr>
    );
  }
}

const mapStateToProps = state => ({
  userProfile: state.global_data.userProfile,
})

export default compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps)
)(ProjectsView);
